export type StoreProductId = "website" | "epk" | "bundle";

/** Shown on website/EPK order instructions. */
export const ORDER_DELIVERY_NOTE =
  "Your finished website or EPK is delivered by email. Please allow 7–14 days after your 50% deposit and completed brief.";

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
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "website",
    name: "801 Family Website",
    price: 500,
    tagline: "Your band's home online",
    description:
      "One complete site with bio, music, photos, shows, contact, and links. Simple edits included free; complex changes are $50/hr.",
    includes: [
      "Custom design for your band",
      "Bio, music, photos & show listings",
      "Contact page & social links",
      "Mobile-first, fast loading",
    ],
    icon: "💻",
    accent: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-400/30",
  },
  {
    id: "epk",
    name: "Band EPK",
    price: 200,
    tagline: "Press & booking ready",
    description:
      "Electronic press kit with bio, photos, music/video, and booking info. Simple edits included free; complex changes are $50/hr.",
    includes: [
      "Press-ready bio & photos",
      "Music & video embeds",
      "Booking & contact info",
      "One link for venues & press",
    ],
    icon: "📄",
    accent: "from-amber-500/15 to-teal-500/20",
    borderColor: "border-amber-400/30",
  },
  {
    id: "bundle",
    name: "801 Family Website + EPK",
    price: 650,
    tagline: "Site and press kit together",
    description:
      "Full 801 Family Website and electronic press kit in one package. Save $50 vs ordering separately. Simple edits included free; complex changes are $50/hr.",
    includes: [
      "Everything in the 801 Family Website package",
      "Everything in the Band EPK package",
      "One brief, both deliverables",
      "Best value for new bands",
    ],
    icon: "🎁",
    accent: "from-teal-500/20 to-orange-500/20",
    borderColor: "border-teal-400/30",
  },
];

/** Order form package picker: website & EPK on top row, bundle below. */
export const STORE_PACKAGE_PICKER_ORDER: StoreProductId[] = [
  "website",
  "epk",
  "bundle",
];

export const depositAmount = (price: number) => Math.round(price / 2);

export const WEB_PORTFOLIO_URL =
  "https://dbaileyfam.github.io/801familywebsiteportfolio/";

export const STORE_FORM_EMAIL = "websites@801familystudios.com";

/** Small business sites are quoted by email — not the musician package checkout. */
export const SMALL_BUSINESS_STARTING_PRICE = 2000;
export const SMALL_BUSINESS_DEPOSIT_FROM = 1000;

export const SMALL_BUSINESS_INQUIRY_SUBJECT = "801 Family Website — Small Business";

export const SMALL_BUSINESS_INQUIRY_BODY = `Hi,

I'm interested in a website for my small business.

Business name:
What we do:
Pages we need:
Do we already have a domain?

Thanks!`;

export const SMALL_BUSINESS_INQUIRY_MAILTO = `mailto:${STORE_FORM_EMAIL}?subject=${encodeURIComponent(
  SMALL_BUSINESS_INQUIRY_SUBJECT
)}&body=${encodeURIComponent(SMALL_BUSINESS_INQUIRY_BODY)}`;

export const SMALL_BUSINESS_WEBSITE = {
  name: "801 Family Website for Business",
  startingPrice: SMALL_BUSINESS_STARTING_PRICE,
  depositFrom: SMALL_BUSINESS_DEPOSIT_FROM,
  tagline: "A professional site for your shop or service",
  description:
    "Custom sites for shops, services, and local brands. Sites start at $2,000 and are often more. We email an invoice for 50% of the quoted price to start.",
  includes: [
    "Custom design for your business",
    "Home, about, services & contact",
    "Mobile-first, fast loading",
    "50% deposit invoiced after we review your project",
  ],
  icon: "🏪",
  accent: "from-sky-500/20 to-teal-500/20",
  borderColor: "border-sky-400/30",
};
