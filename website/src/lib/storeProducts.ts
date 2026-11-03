export type StoreProductId = "website" | "epk" | "bundle";

/** Shown on website/EPK order instructions. */
export const ORDER_DELIVERY_NOTE =
  "Your finished website or EPK is delivered by email. Please allow 7–14 days after your 50% deposit and completed brief.";

/** Google Doc brief — open and make a copy, fill it out, then email it to us. */
export const ORDER_BRIEF_FORM_URL =
  "https://docs.google.com/document/d/1rhV5WO6LOe0U_e_yFEx_IAnK8kzA7iUa7sjBhU05jsI/copy";

export const VENMO_PROFILE_URL = "https://venmo.com/u/Desiree-Bailey-3";
export const PAYPAL_QR_SRC = "/payments/paypal-qr.png";
export const VENMO_QR_SRC = "/payments/venmo-qr.png";

/** Stripe Pricing Table embed for website / EPK deposits (Websites & EPKs payment step). */
export const STRIPE_PRICING_TABLE_ID = "prctbl_1Tvlhs33fWEaCkVCIOMQKCAr";
export const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51TYdlt33fWEaCkVCA8K0XNczLwzwmrjQjvuWKCitcZmM0B8IcBLkyHXuUuzQh9knJbkrchEwAiPiv0q9H6mNjpQM00nu5GXqVq";

export type StoreProduct = {
  id: StoreProductId;
  name: string;
  price: number;
  tagline: string;
  description: string;
  includes: string[];
  icon: string;
  accent: string;
  borderColor: string;
  /** Direct Stripe Payment Link for this package's deposit. */
  stripePaymentUrl?: string;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "website",
    name: "801 Family Website",
    price: 500,
    tagline: "Your band's home online",
    description:
      "One complete site with bio, music, photos, shows, contact, and links. Simple edits included free; complex changes are $25/hr.",
    includes: [
      "Custom design for your band",
      "Bio, music, photos & show listings",
      "Contact page & social links",
      "Mobile-first, fast loading",
    ],
    icon: "💻",
    accent: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-400/30",
    stripePaymentUrl: "https://buy.stripe.com/dRmfZa8L72II1V5fXEbZe08",
  },
  {
    id: "epk",
    name: "Band EPK",
    price: 200,
    tagline: "Press & booking ready",
    description:
      "Electronic press kit with bio, photos, music/video, and booking info. Simple edits included free; complex changes are $25/hr.",
    includes: [
      "Press-ready bio & photos",
      "Music & video embeds",
      "Booking & contact info",
      "One link for venues & press",
    ],
    icon: "📄",
    accent: "from-amber-500/15 to-teal-500/20",
    borderColor: "border-amber-400/30",
    stripePaymentUrl: "https://buy.stripe.com/fZudR27H39767fpbHobZe07",
  },
  {
    id: "bundle",
    name: "801 Family Website + EPK",
    price: 650,
    tagline: "Site and press kit together",
    description:
      "Full 801 Family Website and electronic press kit in one package. Save $50 vs ordering separately. Simple edits included free; complex changes are $25/hr.",
    includes: [
      "Everything in the 801 Family Website package",
      "Everything in the Band EPK package",
      "One brief, both deliverables",
      "Best value for new bands",
    ],
    icon: "🎁",
    accent: "from-teal-500/20 to-orange-500/20",
    borderColor: "border-teal-400/30",
    stripePaymentUrl: "https://buy.stripe.com/5kQ5kw9PberqfLVaDkbZe06",
  },
];

/** Order form package picker: website & EPK on top row, bundle below. */
export const STORE_PACKAGE_PICKER_ORDER: StoreProductId[] = [
  "website",
  "epk",
  "bundle",
];

export const venmoPayUrl = (amount: number, note: string) =>
  `${VENMO_PROFILE_URL}?txn=pay&amount=${amount}&note=${encodeURIComponent(note)}`;

export const depositAmount = (price: number) => Math.round(price / 2);

export const WEB_PORTFOLIO_URL = "/portfolio/";

export const STORE_FORM_EMAIL = "websites@801familystudios.com";
