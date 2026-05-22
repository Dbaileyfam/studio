import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, ArrowLeft, Mail } from "lucide-react";
import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import StripeBuyButton from "@/components/StripeBuyButton";
import { Button } from "@/components/ui/button";
import {
  ORDER_DELIVERY_NOTE,
  STORE_FORM_EMAIL,
  type StoreProductId,
} from "@/lib/storeProducts";
import {
  clearPendingStoreOrder,
  loadPendingStoreOrder,
  readPendingOrderFromLocation,
  savePendingStoreOrder,
  type PendingStoreOrder,
} from "@/lib/storeOrderSession";
import { STRIPE_BUY_BUTTONS } from "@/lib/storePayment";

const parseProduct = (value: string | null): StoreProductId => {
  if (value === "epk" || value === "website" || value === "bundle") return value;
  return "website";
};

const StoreCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const productId = parseProduct(searchParams.get("product"));
  const [pending, setPending] = useState<PendingStoreOrder | null>(null);
  const [checked, setChecked] = useState(false);

  const stripeButton = STRIPE_BUY_BUTTONS[productId];
  const hasStripeButton = Boolean(stripeButton.buyButtonId.trim());

  useEffect(() => {
    const fromNav = readPendingOrderFromLocation(location.state);
    const fromStorage = loadPendingStoreOrder();
    const order = fromNav ?? fromStorage;

    if (order?.productId === productId) {
      if (fromNav) savePendingStoreOrder(order);
      setPending(order);
    } else {
      setPending(null);
    }
    setChecked(true);
  }, [location.key, location.state, productId]);

  useEffect(() => {
    if (!checked) return;
    if (!pending) {
      navigate("/store", { replace: true });
    }
  }, [checked, pending, navigate]);

  useEffect(() => {
    if (pending) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pending]);

  if (!checked || !pending) {
    return null;
  }

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner max-w-lg mx-auto">
            <Link
              to="/store#order-form"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to order form
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-teal-400/30 bg-teal-500/10 p-8 md:p-10"
            >
              <motion.div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-8 w-8 text-teal-300" />
                <h1 className="text-2xl md:text-3xl font-bold text-white">Complete payment</h1>
              </motion.div>

              <p className="text-gray-200 leading-relaxed mb-6">
                Thanks, <span className="text-white font-medium">{pending.contactName}</span>!
                Your <span className="text-white font-medium">{pending.productName}</span> brief
                for <span className="text-white font-medium">{pending.artistOrBandName}</span> was
                sent to our team. Pay securely with Stripe below.
              </p>

              <motion.div className="rounded-2xl border border-white/20 bg-black/25 p-5 mb-6">
                <motion.div className="flex justify-between items-baseline gap-4">
                  <span className="text-gray-300">{pending.productName}</span>
                  <span className="text-2xl font-bold text-teal-300">${pending.price}</span>
                </motion.div>
                <p className="text-xs text-gray-400 mt-2">
                  Receipt and delivery will go to {pending.email}
                </p>
                <p className="text-xs text-teal-200/90 mt-3 leading-relaxed">{ORDER_DELIVERY_NOTE}</p>
              </motion.div>

              {hasStripeButton ? (
                <StripeBuyButton buyButtonId={stripeButton.buyButtonId} />
              ) : (
                <motion.div className="space-y-4">
                  <p className="text-sm text-gray-300 leading-relaxed text-center">
                    Stripe checkout for {pending.productName} is being connected. We have your
                    project details — email us to complete payment for now.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-white/30 text-white hover:bg-white/10"
                  >
                    <a
                      href={`mailto:${STORE_FORM_EMAIL}?subject=${encodeURIComponent(`Payment: ${pending.productName} — ${pending.artistOrBandName}`)}&body=${encodeURIComponent(`Hi,\n\nI'd like to pay $${pending.price} for ${pending.productName} (${pending.artistOrBandName}).\n\nThanks!`)}`}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Email to pay ${pending.price}
                    </a>
                  </Button>
                </motion.div>
              )}

              <p className="text-xs text-gray-400 mt-6 text-center">
                Questions?{" "}
                <a
                  href={`mailto:${STORE_FORM_EMAIL}`}
                  className="text-teal-300 hover:underline"
                >
                  {STORE_FORM_EMAIL}
                </a>
              </p>

              <Button
                type="button"
                variant="ghost"
                className="w-full mt-4 text-gray-400 hover:text-white"
                onClick={() => {
                  clearPendingStoreOrder();
                  navigate("/store");
                }}
              >
                Done — return to store
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default StoreCheckout;
