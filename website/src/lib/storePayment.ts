import type { StoreProductId } from "@/lib/storeProducts";

/** Stripe publishable key (safe to use in the browser). */
export const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51TYdlt33fWEaCkVCA8K0XNczLwzwmrjQjvuWKCitcZmM0B8IcBLkyHXuUuzQh9knJbkrchEwAiPiv0q9H6mNjpQM00nu5GXqVq";

export type StripeBuyButtonConfig = {
  buyButtonId: string;
};

/**
 * Stripe Buy Button IDs from the Stripe Dashboard (Payment Links → Buy button).
 * Website and EPK should each have their own button in Stripe — update `epk` when you have it.
 */
export const STRIPE_BUY_BUTTONS: Record<StoreProductId, StripeBuyButtonConfig> = {
  website: {
    buyButtonId: "buy_btn_1TYeAO33fWEaCkVCwSJcbuNE",
  },
  epk: {
    // Replace with your $150 EPK buy button ID when created in Stripe
    buyButtonId: "buy_btn_1TYeAO33fWEaCkVCwSJcbuNE",
  },
};

export const checkoutPath = (productId: StoreProductId) =>
  `/store/checkout?product=${productId}`;
