import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, ExternalLink, Mail, ArrowLeft } from "lucide-react";
import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { Button } from "@/components/ui/button";
import { STORE_FORM_EMAIL, type StoreProductId } from "@/lib/storeProducts";
import { loadPendingStoreOrder, clearPendingStoreOrder } from "@/lib/storeOrderSession";
import { STORE_PAYMENT } from "@/lib/storePayment";

const parseProduct = (value: string | null): StoreProductId => {
  if (value === "epk" || value === "website") return value;
  return "website";
};

const StoreCheckout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = parseProduct(searchParams.get("product"));
  const pending = useMemo(() => loadPendingStoreOrder(), []);
  const payment = STORE_PAYMENT[productId];

  useEffect(() => {
    if (!pending || pending.productId !== productId) {
      navigate("/store#order-form", { replace: true });
    }
  }, [pending, productId, navigate]);

  if (!pending || pending.productId !== productId) {
    return null;
  }

  const hasPaymentLink = Boolean(payment.paymentUrl.trim());

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <motion.div className="page-content">
          <motion.div className="container-inner max-w-lg mx-auto">
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
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-8 w-8 text-teal-300" />
                <h1 className="text-2xl md:text-3xl font-bold text-white">Complete payment</h1>
              </div>

              <p className="text-gray-200 leading-relaxed mb-6">
                Thanks, <span className="text-white font-medium">{pending.contactName}</span>!
                Your <span className="text-white font-medium">{pending.productName}</span> brief
                for <span className="text-white font-medium">{pending.artistOrBandName}</span> was
                sent to our team. Finish checkout below to secure your spot.
              </p>

              <div className="rounded-2xl border border-white/20 bg-black/25 p-5 mb-6">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-gray-300">{pending.productName}</span>
                  <span className="text-2xl font-bold text-teal-300">${pending.price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Confirmation copy will go to {pending.email}
                </p>
              </div>

              {hasPaymentLink ? (
                <Button
                  asChild
                  className="w-full rounded-full bg-[var(--accent-warm)] text-[var(--bg-base)] hover:bg-amber-400 py-6 text-base font-semibold"
                >
                  <a href={payment.paymentUrl} target="_blank" rel="noopener noreferrer">
                    Pay ${pending.price} with {payment.providerLabel}
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <motion.div className="space-y-4">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Online payment is being set up. We received your project details — watch{" "}
                    <span className="text-white">{pending.email}</span> for a payment link from us
                    within 24 hours, or email us now to pay another way.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-white/30 text-white hover:bg-white/10"
                  >
                    <a href={`mailto:${STORE_FORM_EMAIL}?subject=${encodeURIComponent(`Payment: ${pending.productName} — ${pending.artistOrBandName}`)}&body=${encodeURIComponent(`Hi,\n\nI'd like to pay for ${pending.productName} ($${pending.price}) for ${pending.artistOrBandName}.\n\nThanks!`)}`}>
                      <Mail className="mr-2 h-5 w-5" />
                      Email to arrange payment
                    </a>
                  </Button>
                </motion.div>
              )}

              <p className="text-xs text-gray-400 mt-6 text-center">
                Didn&apos;t get a confirmation? Check spam or contact{" "}
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
          </motion.div>
        </motion.div>
      </div>
    </AnimatedPageTransition>
  );
};

export default StoreCheckout;
