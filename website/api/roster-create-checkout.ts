import { corsHeaders, jsonResponse } from "./lib/cors.js";
import { getSupabaseAdmin } from "./lib/supabaseAdmin.js";
import { getStripe, siteUrl } from "./lib/stripe.js";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      fullName?: string;
      profile?: Record<string, unknown>;
    };

    const email = body.email?.trim().toLowerCase();
    const fullName = body.fullName?.trim();
    const profile = body.profile;

    if (!email || !fullName || !profile || typeof profile !== "object") {
      return jsonResponse(request, { error: "Invalid profile payload" }, 400);
    }

    const priceId = process.env.STRIPE_ROSTER_PRICE_ID;
    if (!priceId) {
      return jsonResponse(
        request,
        { error: "STRIPE_ROSTER_PRICE_ID is not configured on the server" },
        503
      );
    }

    const supabase = getSupabaseAdmin();
    const { data: row, error: insertError } = await supabase
      .from("roster_profiles")
      .insert({
        email,
        full_name: fullName,
        profile,
        status: "pending_payment",
      })
      .select("id")
      .single();

    if (insertError || !row) {
      console.error(insertError);
      return jsonResponse(request, { error: "Could not save profile" }, 500);
    }

    const profileId = row.id as string;
    const origin = siteUrl();
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      client_reference_id: profileId,
      metadata: { profile_id: profileId },
      subscription_data: {
        metadata: { profile_id: profileId },
      },
      success_url: `${origin}/musician-roster/thank-you?profile_id=${profileId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/musician-profile-form?profile_id=${profileId}&cancelled=1`,
    });

    await supabase
      .from("roster_profiles")
      .update({
        stripe_checkout_session_id: session.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profileId);

    if (!session.url) {
      return jsonResponse(request, { error: "Stripe did not return a checkout URL" }, 500);
    }

    return jsonResponse(request, {
      profileId,
      checkoutUrl: session.url,
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Server error";
    return jsonResponse(request, { error: message }, 500);
  }
}
