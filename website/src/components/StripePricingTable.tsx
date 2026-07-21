import { useEffect } from "react";
import {
  STRIPE_PRICING_TABLE_ID,
  STRIPE_PUBLISHABLE_KEY,
} from "@/lib/storeProducts";

const SCRIPT_SRC = "https://js.stripe.com/v3/pricing-table.js";
const SCRIPT_ID = "stripe-pricing-table-js";

/**
 * Stripe Pricing Table custom element. Loads the Stripe script once, then mounts
 * the table for website / EPK deposits on the Websites & EPKs page.
 */
const StripePricingTable = () => {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="stripe-pricing-table-wrap w-full overflow-hidden rounded-2xl bg-white/95 p-2 sm:p-4">
      <stripe-pricing-table
        pricing-table-id={STRIPE_PRICING_TABLE_ID}
        publishable-key={STRIPE_PUBLISHABLE_KEY}
      />
    </div>
  );
};

export default StripePricingTable;
