import { corsHeaders, jsonResponse } from "./lib/cors.js";
import { activateRosterProfile, isCheckoutSessionPaid, profileIdFromSession } from "./lib/rosterActivate.js";
import { getStripe } from "./lib/stripe.js";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

async function handleActivate(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id")?.trim();
    const profileIdParam = searchParams.get("profile_id")?.trim();

    if (!sessionId) {
      return jsonResponse(request, { error: "session_id is required" }, 400);
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const profileId = profileIdFromSession(session) ?? profileIdParam;
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

    return jsonResponse(request, {
      profileId,
      status: "active",
      message: "Your profile is live on the public musician roster.",
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
