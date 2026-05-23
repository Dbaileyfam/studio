import Stripe from "stripe";
import {
  activateRosterProfile,
  isCheckoutSessionPaid,
  profileIdFromSession,
} from "./lib/rosterActivate.js";
import { getSupabaseAdmin } from "./lib/supabaseAdmin.js";
import { getStripe } from "./lib/stripe.js";

async function notifyAdmin(profileId: string) {
  const email = process.env.ROSTER_FORM_EMAIL ?? "info@801familystudios.com";
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("roster_profiles")
    .select("email, full_name, status, profile")
    .eq("id", profileId)
    .maybeSingle();

  if (!data) return;

  const form = new FormData();
  form.append("_subject", "801 Musician Roster — subscription active (auto)");
  form.append("_template", "table");
  form.append("_captcha", "false");
  form.append("Profile ID", profileId);
  form.append("Status", data.status);
  form.append("Name", data.full_name);
  form.append("Email", data.email);
  form.append("Profile JSON", JSON.stringify(data.profile, null, 2));

  await fetch(`https://formsubmit.co/${encodeURIComponent(email)}`, {
    method: "POST",
    body: form,
  }).catch((err) => console.error("Admin notify failed", err));
}

export async function GET() {
  return new Response(
    "Stripe webhook endpoint (POST only). Configure this URL in Stripe Dashboard → Webhooks.",
    { status: 200, headers: { "Content-Type": "text/plain" } }
  );
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not configured", { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature", { status: 400 });
  }

  const body = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const profileId = profileIdFromSession(session);

      if (profileId && isCheckoutSessionPaid(session)) {
        await activateRosterProfile(profileId, session);
        await notifyAdmin(profileId);
      }
    }

    if (event.type === "customer.subscription.created") {
      const subscription = event.data.object as Stripe.Subscription;
      const profileId = subscription.metadata?.profile_id?.trim();
      if (profileId && subscription.status === "active") {
        const supabase = getSupabaseAdmin();
        await supabase
          .from("roster_profiles")
          .update({
            status: "active",
            stripe_subscription_id: subscription.id,
            stripe_customer_id:
              typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer?.id ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", profileId);
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const profileId = subscription.metadata?.profile_id;
      if (profileId) {
        const supabase = getSupabaseAdmin();
        await supabase
          .from("roster_profiles")
          .update({ status: "cancelled", updated_at: new Date().toISOString() })
          .eq("id", profileId);
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Webhook handler failed", { status: 500 });
  }
}
