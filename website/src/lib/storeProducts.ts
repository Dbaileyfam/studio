export type StoreProductId = "website" | "epk";

/** Shown on website/EPK order forms and checkout. */
export const ORDER_DELIVERY_NOTE =
  "Your finished website or EPK is delivered by email. Please allow 3–5 days after payment and your completed brief.";

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
    name: "Band Website",
    price: 300,
    tagline: "Your band's home online",
    description:
      "One complete site with bio, music, photos, shows, contact, and links. Simple edits included free; complex changes are $20 per edit.",
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
    price: 150,
    tagline: "Press & booking ready",
    description:
      "Electronic press kit with bio, photos, music/video, and booking info. Simple edits included free; complex changes are $20 per edit.",
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
];

export const WEB_PORTFOLIO_URL =
  "https://dbaileyfam.github.io/801familywebsiteportfolio/";

export const STORE_FORM_EMAIL = "info@801familystudios.com";
