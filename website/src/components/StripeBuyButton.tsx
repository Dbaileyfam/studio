import { useEffect, useRef } from "react";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/storePayment";

const SCRIPT_SRC = "https://js.stripe.com/v3/buy-button.js";

let scriptPromise: Promise<void> | null = null;

function loadStripeBuyButtonScript(): Promise<void> {
  if (customElements.get("stripe-buy-button")) {
    return Promise.resolve();
  }
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Stripe script failed")));
        return;
      }
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Stripe script failed"));
      document.body.appendChild(script);
    });
  }
  return scriptPromise;
}

type StripeBuyButtonProps = {
  buyButtonId: string;
};

const StripeBuyButton = ({ buyButtonId }: StripeBuyButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadStripeBuyButtonScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        const button = document.createElement("stripe-buy-button");
        button.setAttribute("buy-button-id", buyButtonId);
        button.setAttribute("publishable-key", STRIPE_PUBLISHABLE_KEY);
        containerRef.current.appendChild(button);
      })
      .catch(() => {
        if (containerRef.current) {
          containerRef.current.innerHTML =
            '<p class="text-sm text-red-300 text-center">Payment button could not load. Please refresh or email info@801familystudios.com.</p>';
        }
      });

    return () => {
      cancelled = true;
    };
  }, [buyButtonId]);

  return (
    <div
      ref={containerRef}
      className="stripe-buy-button-container flex justify-center py-2 [&_stripe-buy-button]:w-full"
      aria-label="Stripe payment"
    />
  );
};

export default StripeBuyButton;
