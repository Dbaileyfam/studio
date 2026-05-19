export const SHOPIFY_STORE_URL = "https://801familymerch.myshopify.com";

export type MerchProductConfig = {
  handle: string;
  /** Fallback if Shopify JSON is unavailable */
  title: string;
  price: string;
  image: string;
};

export const MERCH_PRODUCTS: MerchProductConfig[] = [
  {
    handle: "unisex-hoodie",
    title: "Studio Kids Design: Kitty Chaos",
    price: "60.99",
    image:
      "https://cdn.shopify.com/s/files/1/0737/6335/6826/files/all-over-print-recycled-unisex-hoodie-white-right-69b0a3f5b398c.jpg?v=1773184041",
  },
  {
    handle: "unisex-zip-hoodie",
    title: "Unisex zip hoodie",
    price: "66.50",
    image:
      "https://cdn.shopify.com/s/files/1/0737/6335/6826/files/all-over-print-recycled-unisex-zip-hoodie-white-front-69b094237decc.jpg?v=1773179948",
  },
  {
    handle: "sports-warmup-hoodie",
    title: "Sports warmup hoodie",
    price: "60.00",
    image:
      "https://cdn.shopify.com/s/files/1/0737/6335/6826/files/all-over-print-mens-sports-warmup-hoodie-back-69b094c70e048.jpg?v=1773180111",
  },
];

export const productUrl = (handle: string) =>
  `${SHOPIFY_STORE_URL}/products/${handle}`;

export const productJsonUrl = (handle: string) =>
  `${SHOPIFY_STORE_URL}/products/${handle}.json`;
