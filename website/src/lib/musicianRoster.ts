/**
 * When true, roster signup/browse/edit pages show a pause screen and nav links are hidden.
 * Set to false when you are ready to reopen the Musician Roster.
 */
export const ROSTER_PUBLICLY_DISABLED = true;

const ROSTER_PUBLIC_PREFIXES = ["/musician-roster", "/musician-profile-form"] as const;

export function isRosterPublicPath(pathname: string): boolean {
  return ROSTER_PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

/** Stripe Payment Link — $9/month musician roster subscription */
export const ROSTER_STRIPE_URL =
  "https://buy.stripe.com/00wfZa1iF3MM1V5bHobZe05";

/** Stripe Buy Button embed (Dashboard → Payment Links → Buy button) */
export const ROSTER_STRIPE_BUY_BUTTON_ID = "buy_btn_1Ta0pw33fWEaCkVCioYO1a4L";

/** Core roster promise — members keep all gig pay; studio does not take a cut. */
export const ROSTER_NO_COMMISSION =
  "801 Family Studios does not take commission.";

export const ROSTER_FORM_EMAIL = "info@801familystudios.com";

export const ROSTER_PROFILE_FORM_PATH = "/musician-profile-form";

export const ROSTER_THANK_YOU_PATH = "/musician-roster/thank-you";

export const ROSTER_BROWSE_PATH = "/musician-roster/browse";

export const ROSTER_EDIT_PATH = "/musician-roster/edit";

/**
 * Set this as the Payment Link “After payment” URL in Stripe Dashboard
 * (Payment Links → your roster link → After payment → Redirect to your website).
 * Stripe replaces {CHECKOUT_SESSION_ID} with the real checkout session id.
 */
export const ROSTER_STRIPE_SUCCESS_URL =
  "https://www.801familystudios.com/musician-roster/thank-you?session_id={CHECKOUT_SESSION_ID}";

/** Query params Stripe may append after checkout (Payment Link / Checkout). */
export const isRosterPaymentReturn = (params: URLSearchParams): boolean =>
  params.has("session_id") ||
  params.get("redirect_status") === "succeeded" ||
  params.get("payment") === "success";

export const GENRE_OPTIONS = [
  "Rock",
  "Country",
  "Reggae",
  "Jazz",
  "Worship",
  "Pop",
  "Hip-hop",
  "R&B",
  "Blues",
  "Folk",
  "Metal",
  "Electronic",
  "Latin",
  "Other",
] as const;

export const AVAILABLE_FOR_OPTIONS = [
  "Fill-in gigs",
  "Solo shows",
  "Session / studio work",
  "Private events",
  "Weddings & corporate",
  "Teaching / lessons",
] as const;

export const TRAVEL_OPTIONS = [
  "Local only (my area)",
  "Within my metro / region",
  "Statewide",
  "Multi-state / regional",
  "Nationwide — willing to travel",
] as const;

export const AVAILABILITY_OPTIONS = [
  "Weekends",
  "Weekdays",
  "Evenings",
  "Short notice / last-minute",
  "Advance booking preferred",
] as const;

export const CONTACT_PREFERENCE_OPTIONS = [
  "Email",
  "Instagram",
  "Facebook",
  "TikTok",
  "Contact through 801 Family Studios",
] as const;
