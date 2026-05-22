import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is required");
  return new Stripe(key);
}

export function siteUrl(): string {
  return (process.env.SITE_URL ?? "https://www.801familystudios.com").replace(/\/$/, "");
}
