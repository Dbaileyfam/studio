import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is required");
  return new Stripe(key);
}

const PRODUCTION_SITE = "https://www.801familystudios.com";

/** Always send musicians back to the public site, not the Vercel preview URL. */
export function siteUrl(): string {
  const raw = (process.env.SITE_URL ?? PRODUCTION_SITE).trim().replace(/\/$/, "");
  try {
    const host = new URL(raw).hostname;
    if (host.endsWith(".vercel.app")) return PRODUCTION_SITE;
  } catch {
    /* use default */
  }
  return raw || PRODUCTION_SITE;
}
