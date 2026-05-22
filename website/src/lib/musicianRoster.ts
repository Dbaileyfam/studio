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

export const AREA_OPTIONS = [
  "Sandy",
  "Salt Lake City",
  "West Valley",
  "Murray",
  "Draper",
  "Provo",
  "Orem",
  "Lehi",
  "Ogden",
  "Layton",
  "Park City",
  "Other Utah",
] as const;

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
  "Local only (my city)",
  "Salt Lake County",
  "Wasatch Front",
  "Statewide (Utah)",
  "Willing to travel further",
] as const;

export const AVAILABILITY_OPTIONS = [
  "Weekends",
  "Weekdays",
  "Evenings",
  "Short notice / last-minute",
  "Advance booking preferred",
] as const;

export const PHONE_VISIBILITY_OPTIONS = [
  { value: "public", label: "Show on public roster" },
  { value: "private", label: "Private — contact through 801 only" },
] as const;

export const CONTACT_PREFERENCE_OPTIONS = [
  "Email",
  "Instagram",
  "Phone (if listed publicly)",
  "Contact through 801 Family Studios",
] as const;
