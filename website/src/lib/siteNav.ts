import { SHOPIFY_STORE_URL } from "@/lib/merchProducts";

export const STORE_PATH = "/websites-and-epks";
export const STORE_NAV_LABEL = "Websites & EPKs";
export const MERCH_SHOP_URL = SHOPIFY_STORE_URL;
export const MERCH_NAV_LABEL = "Merch";

export type SiteNavLink =
  | { type: "internal"; path: string; label: string }
  | { type: "external"; href: string; label: string };

/** Nav items after Home (roster paths may be filtered by RosterPublicGate). */
export const SITE_NAV_LINKS: SiteNavLink[] = [
  { type: "internal", path: "/featured-artists", label: "Featured Artists" },
  { type: "internal", path: "/musician-roster", label: "Musician Roster" },
  { type: "internal", path: "/musician-roster/browse", label: "Browse Musicians" },
  { type: "internal", path: "/upcoming-shows", label: "Upcoming Shows" },
  { type: "internal", path: STORE_PATH, label: STORE_NAV_LABEL },
  { type: "external", href: MERCH_SHOP_URL, label: MERCH_NAV_LABEL },
  { type: "internal", path: "/contact", label: "Contact" },
];
