import type { StoreProductId } from "@/lib/storeProducts";

/**
 * Payment links for each package. Paste your Square, Stripe, or PayPal checkout URL
 * when ready — the checkout page will show a "Pay now" button for that URL.
 */
export type StorePaymentConfig = {
  /** Label shown on the pay button, e.g. "Square" */
  providerLabel: string;
  /** Leave empty until you add a payment link from your provider */
  paymentUrl: string;
};

export const STORE_PAYMENT: Record<StoreProductId, StorePaymentConfig> = {
  website: {
    providerLabel: "Square",
    paymentUrl: "",
  },
  epk: {
    providerLabel: "Square",
    paymentUrl: "",
  },
};

export const checkoutPath = (productId: StoreProductId) =>
  `/store/checkout?product=${productId}`;
