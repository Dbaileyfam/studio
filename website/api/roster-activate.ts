import { corsHeaders, jsonResponse } from "./lib/cors.js";
import { ensureRosterEditToken, rosterEditUrl } from "./lib/rosterEditToken.js";
import { activateRosterProfile, isCheckoutSessionPaid, profileIdFromSession } from "./lib/rosterActivate.js";
import { getSupabaseAdmin } from "./lib/supabaseAdmin.js";
import { getStripe } from "./lib/stripe.js";

function isStripeSessionId(value: string): boolean {
  const id = value.trim();
  return id.startsWith("cs_") && id.length > 10 && !/YOUR_|CHECKOUT_SESSION/i.test(id);
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

async function handleActivate(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionIdRaw = searchParams.get("session_id")?.trim() ?? "";
    const profileIdParam = searchParams.get("profile_id")?.trim();
    const stripe = getStripe();

    let sessionId = isStripeSessionId(sessionIdRaw) ? sessionIdRaw : "";
    let profileId = profileIdParam ?? null;

    if (!sessionId && profileId) {
      const supabase = getSupabaseAdmin();
      const { data: row } = await supabase
        .from("roster_profiles")
        .select("id, status, stripe_checkout_session_id, edit_token")
        .eq("id", profileId)
        .maybeSingle();

      if (!row) {
        return jsonResponse(request, { error: "Profile not found. Submit the profile form again." }, 404);
      }

      if (row.status === "active") {
        let token = row.edit_token as string | undefined;
        if (!token) {
          token = (await ensureRosterEditToken(supabase, row.id as string)) ?? undefined;
        }
        return jsonResponse(request, {
          profileId: row.id as string,
          status: "active",
          message: "Your profile is already live on the roster.",
          editUrl: token ? rosterEditUrl(token) : undefined,
        });
      }

      const stored = String(row.stripe_checkout_session_id ?? "");
      if (isStripeSessionId(stored)) sessionId = stored;
    }

    if (!sessionId) {
      if (sessionIdRaw && !isStripeSessionId(sessionIdRaw)) {
        return jsonResponse(
          request,
          {
            error:
              "Invalid checkout link. After paying on Stripe, use the full thank-you URL Stripe sends you — do not replace session_id with placeholder text.",
          },
          400
        );
      }
      return jsonResponse(
        request,
        {
          error: profileId
            ? "No Stripe checkout found for this profile yet. Complete payment from the profile form, or wait a minute and refresh."
            : "session_id or profile_id is required",
        },
        400
      );
    }

    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Invalid checkout session";
      if (/no such checkout\.session/i.test(msg)) {
        return jsonResponse(
          request,
          {
            error:
              "That checkout session was not found in Stripe. Use the thank-you link from your browser right after payment, or submit your profile and pay again from the form.",
          },
          404
        );
      }
      throw err;
    }

    profileId = profileIdFromSession(session) ?? profileId;
    if (!profileId) {
      return jsonResponse(
        request,
        {
          error:
            "This payment is not linked to a roster profile. Complete the profile form first, then pay through the checkout link it provides.",
        },
        400
      );
    }

    if (!isCheckoutSessionPaid(session)) {
      return jsonResponse(request, {
        profileId,
        status: "pending_payment",
        message: "Payment is not complete yet.",
      });
    }

    const result = await activateRosterProfile(profileId, session);
    if (!result.ok) {
      return jsonResponse(request, { error: result.error ?? "Activation failed" }, 500);
    }

    const supabase = getSupabaseAdmin();
    const { data: tokenRow } = await supabase
      .from("roster_profiles")
      .select("edit_token")
      .eq("id", profileId)
      .maybeSingle();

    let editToken = tokenRow?.edit_token as string | undefined;
    if (!editToken) {
      editToken = (await ensureRosterEditToken(supabase, profileId)) ?? undefined;
    }
    const editUrl = editToken ? rosterEditUrl(editToken) : undefined;

    return jsonResponse(request, {
      profileId,
      status: "active",
      message: "Your profile is live on the public musician roster.",
      editUrl,
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Server error";
    return jsonResponse(request, { error: message }, 500);
  }
}

/**
 * Confirms Stripe Checkout after payment and marks the profile active.
 * Used on the thank-you page when the webhook is slow or not configured yet.
 */
export async function GET(request: Request) {
  return handleActivate(request);
}

export async function POST(request: Request) {
  return handleActivate(request);
}
