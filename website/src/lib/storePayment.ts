import type { StoreProductId } from "@/lib/storeProducts";

/** Stripe publishable key (safe to use in the browser). */
export const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51TYdlt33fWEaCkVCA8K0XNczLwzwmrjQjvuWKCitcZmM0B8IcBLkyHXuUuzQh9knJbkrchEwAiPiv0q9H6mNjpQM00nu5GXqVq";

export type StripeBuyButtonConfig = {
  buyButtonId: string;
};

/**
 * Stripe Buy Button IDs from the Stripe Dashboard (Payment Links → Buy button).
 */
export const STRIPE_BUY_BUTTONS: Record<StoreProductId, StripeBuyButtonConfig> = {
  website: {
    buyButtonId: "buy_btn_1TYeC633fWEaCkVCcHnGnFWT",
  },
  epk: {
    buyButtonId: "buy_btn_1TYeAO33fWEaCkVCwSJcbuNE",
  },
  bundle: {
    buyButtonId: "buy_btn_1TZy1F33fWEaCkVCcFFtKT28",
  },
};

export const checkoutPath = (productId: StoreProductId) =>
  `/store/checkout?product=${productId}`;
