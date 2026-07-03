import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, FileText, Mail, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ORDER_BRIEF_FORM_URL,
  ORDER_DELIVERY_NOTE,
  PAYPAL_QR_SRC,
  STORE_FORM_EMAIL,
  STORE_PACKAGE_PICKER_ORDER,
  STORE_PRODUCTS,
  VENMO_PROFILE_URL,
  VENMO_QR_SRC,
  depositAmount,
  type StoreProduct,
  type StoreProductId,
} from "@/lib/storeProducts";

const parseProduct = (value: string | null): StoreProductId => {
  if (value === "epk" || value === "website" || value === "bundle") return value;
  return "website";
};

const sectionMotion = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const PackageOption = ({
  item,
  selected,
  onSelect,
}: {
  item: StoreProduct;
  selected: boolean;
  onSelect: (id: StoreProductId) => void;
}) => {
  const deposit = depositAmount(item.price);
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`text-left rounded-2xl border p-5 transition-all w-full ${
        selected
          ? "border-[var(--accent-warm)] bg-[var(--accent-warm)]/15 ring-2 ring-[var(--accent-warm)]/40"
          : "border-white/20 bg-black/20 hover:border-white/35"
      }`}
    >
      <span className="text-3xl">{item.icon}</span>
      <p className="text-lg font-semibold text-white mt-3">{item.name}</p>
      <p className="text-2xl font-bold text-teal-300 mt-1">${item.price}</p>
      <p className="text-sm text-gray-300 mt-1">50% deposit: ${deposit}</p>
      <p className="text-sm text-gray-400 mt-2">{item.tagline}</p>
    </motion.button>
  );
};

const StoreOrderForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState<StoreProductId>(() =>
    parseProduct(searchParams.get("product"))
  );

  useEffect(() => {
    const fromUrl = parseProduct(searchParams.get("product"));
    setProduct(fromUrl);
  }, [searchParams]);

  const selectProduct = (id: StoreProductId) => {
    setProduct(id);
    setSearchParams({ product: id }, { replace: true });
  };

  const selected = STORE_PRODUCTS.find((p) => p.id === product)!;
  const deposit = depositAmount(selected.price);
  const packagePickerProducts = STORE_PACKAGE_PICKER_ORDER.map(
    (id) => STORE_PRODUCTS.find((p) => p.id === id)!
  );

  const mailtoHref = `mailto:${STORE_FORM_EMAIL}?subject=${encodeURIComponent(
    `${selected.name} order — completed brief`
  )}&body=${encodeURIComponent(
    `Hi,\n\nI'd like to order the ${selected.name} ($${selected.price}).\n\nI've attached / linked my completed Band Website / EPK Information form and sent a $${deposit} deposit (50%) via PayPal or Venmo.\n\nArtist / band name:\nContact name:\nPhone:\n\nThanks!`
  )}`;

  return (
    <div id="order-form" className="scroll-mt-24 space-y-8">
      <motion.div {...sectionMotion} className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          How to order
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Pick a package, fill out our brief, email it to us, and send a 50% deposit
          through PayPal or Venmo. We start once we have both.
        </p>
        <p className="mt-3 text-sm text-teal-200/90 leading-relaxed">{ORDER_DELIVERY_NOTE}</p>
      </motion.div>

      <motion.div
        {...sectionMotion}
        className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 md:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-300 mb-4">
          Step 1 — Choose your package
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packagePickerProducts.map((item) => (
            <PackageOption
              key={item.id}
              item={item}
              selected={product === item.id}
              onSelect={selectProduct}
            />
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-400">
          Simple edits are free; complex changes are $25/hr. Balance due on delivery.
        </p>
      </motion.div>

      <motion.div
        {...sectionMotion}
        className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 md:p-8"
      >
        <div className="flex items-start gap-3 mb-4">
          <FileText className="h-6 w-6 text-teal-300 shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
              Step 2 — Complete the brief
            </p>
            <p className="text-gray-200 mt-2 leading-relaxed">
              Open the Google Doc, make a copy, and fill in your band or artist details,
              links, and assets for your{" "}
              <span className="text-white font-medium">{selected.name}</span>.
            </p>
          </div>
        </div>
        <Button
          asChild
          className="rounded-full bg-[var(--accent-warm)] text-[var(--bg-base)] hover:bg-amber-400 font-semibold"
        >
          <a href={ORDER_BRIEF_FORM_URL} target="_blank" rel="noopener noreferrer">
            Open brief form
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </motion.div>

      <motion.div
        {...sectionMotion}
        className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 md:p-8"
      >
        <div className="flex items-start gap-3 mb-4">
          <Mail className="h-6 w-6 text-teal-300 shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
              Step 3 — Email your completed form
            </p>
            <p className="text-gray-200 mt-2 leading-relaxed">
              Send the completed brief (or a share link to your copy) to{" "}
              <a
                href={`mailto:${STORE_FORM_EMAIL}`}
                className="text-teal-300 hover:underline font-medium"
              >
                {STORE_FORM_EMAIL}
              </a>
              . Include your package name and contact info.
            </p>
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/30 text-white hover:bg-white/10 font-semibold"
        >
          <a href={mailtoHref}>
            Email {STORE_FORM_EMAIL}
            <Mail className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </motion.div>

      <motion.div
        {...sectionMotion}
        className="rounded-3xl border border-teal-400/30 bg-teal-500/10 p-6 md:p-8"
      >
        <div className="flex items-start gap-3 mb-4">
          <Wallet className="h-6 w-6 text-teal-300 shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
              Step 4 — Pay your 50% deposit
            </p>
            <p className="text-gray-200 mt-2 leading-relaxed">
              For{" "}
              <span className="text-white font-medium">{selected.name}</span>, send a{" "}
              <span className="text-teal-200 font-semibold">${deposit}</span> deposit
              (50% of ${selected.price}) via PayPal or Venmo. Note your band or artist
              name in the payment memo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
            <p className="font-semibold text-white mb-3">PayPal</p>
            <img
              src={PAYPAL_QR_SRC}
              alt="PayPal QR code for 50% deposit"
              className="mx-auto w-44 h-44 rounded-xl bg-white p-2 object-contain"
            />
            <p className="text-sm text-gray-300 mt-3">Scan to pay with PayPal</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
            <p className="font-semibold text-white mb-3">Venmo</p>
            <img
              src={VENMO_QR_SRC}
              alt="801 Family Studios Venmo QR code for website and EPK deposits"
              className="mx-auto w-44 h-44 rounded-xl bg-white p-2 object-contain"
            />
            <p className="text-sm text-gray-300 mt-3">801 Family Studios</p>
            <a
              href={VENMO_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-teal-300 hover:text-teal-200 font-medium mt-1"
            >
              Open Venmo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center leading-relaxed">
          Remaining balance is due when your website or EPK is ready. Questions?{" "}
          <a
            href={`mailto:${STORE_FORM_EMAIL}`}
            className="text-teal-300 hover:underline"
          >
            {STORE_FORM_EMAIL}
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default StoreOrderForm;
