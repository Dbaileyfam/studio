import type Stripe from "stripe";
import { getSupabaseAdmin } from "./supabaseAdmin.js";
import { getStripe } from "./stripe.js";

export type RosterDbStatus = "pending_payment" | "active" | "cancelled";

/** Stripe subscription states that keep a profile on the public roster. */
const STRIPE_ACTIVE = new Set<Stripe.Subscription.Status>(["active", "trialing"]);

export function rosterStatusFromStripeSubscription(
  subscription: Stripe.Subscription
): RosterDbStatus {
  return STRIPE_ACTIVE.has(subscription.status) ? "active" : "cancelled";
}

export async function resolveProfileIdFromSubscription(
  subscription: Stripe.Subscription
): Promise<string | null> {
  const fromMeta = subscription.metadata?.profile_id?.trim();
  if (fromMeta) return fromMeta;

  const supabase = getSupabaseAdmin();
  const { data: bySub } = await supabase
    .from("roster_profiles")
    .select("id")
    .eq("stripe_subscription_id", subscription.id)
    .maybeSingle();

  if (bySub?.id) return bySub.id as string;

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!customerId) return null;

  const { data: byCustomer } = await supabase
    .from("roster_profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (byCustomer?.id as string) ?? null;
}

export async function setRosterProfileStatus(
  profileId: string,
  status: RosterDbStatus,
  stripe?: {
    subscriptionId?: string | null;
    customerId?: string | null;
  }
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const patch: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (stripe?.subscriptionId !== undefined) {
    patch.stripe_subscription_id = stripe.subscriptionId;
  }
  if (stripe?.customerId !== undefined) {
    patch.stripe_customer_id = stripe.customerId;
  }

  const { error } = await supabase.from("roster_profiles").update(patch).eq("id", profileId);
  if (error) console.error("setRosterProfileStatus", profileId, error);
}

/** Reconcile one profile with Stripe before edit or status checks. */
export async function syncRosterProfileSubscription(
  profileId: string
): Promise<RosterDbStatus> {
  const supabase = getSupabaseAdmin();
  const { data: row, error } = await supabase
    .from("roster_profiles")
    .select("id, status, stripe_subscription_id")
    .eq("id", profileId)
    .maybeSingle();

  if (error || !row) {
    console.error("syncRosterProfileSubscription lookup", error);
    return "cancelled";
  }

  const subId = row.stripe_subscription_id as string | null;
  if (!subId) {
    return row.status as RosterDbStatus;
  }

  const stripe = getStripe();
  try {
    const subscription = await stripe.subscriptions.retrieve(subId);
    const next = rosterStatusFromStripeSubscription(subscription);
    if (next !== row.status) {
      await setRosterProfileStatus(profileId, next);
    }
    return next;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (/no such subscription/i.test(msg)) {
      await setRosterProfileStatus(profileId, "cancelled");
      return "cancelled";
    }
    console.error("syncRosterProfileSubscription", profileId, err);
    return row.status as RosterDbStatus;
  }
}

export async function applySubscriptionEvent(
  subscription: Stripe.Subscription
): Promise<void> {
  const profileId = await resolveProfileIdFromSubscription(subscription);
  if (!profileId) {
    console.warn("No roster profile for subscription", subscription.id);
    return;
  }

  const status = rosterStatusFromStripeSubscription(subscription);
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id ?? null;

  await setRosterProfileStatus(profileId, status, {
    subscriptionId: subscription.id,
    customerId,
  });
}
