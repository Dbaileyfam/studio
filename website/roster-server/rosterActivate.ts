import type Stripe from "stripe";
import { getSupabaseAdmin } from "./supabaseAdmin.js";

export function profileIdFromSession(session: Stripe.Checkout.Session): string | null {
  const id = session.metadata?.profile_id ?? session.client_reference_id ?? null;
  return id?.trim() || null;
}

export function isCheckoutSessionPaid(session: Stripe.Checkout.Session): boolean {
  return (
    session.status === "complete" &&
    (session.payment_status === "paid" || session.payment_status === "no_payment_required")
  );
}

export async function activateRosterProfile(
  profileId: string,
  session: Stripe.Checkout.Session
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("roster_profiles")
    .update({
      status: "active",
      stripe_checkout_session_id: session.id,
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
      stripe_subscription_id:
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profileId);

  if (error) {
    console.error(error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
