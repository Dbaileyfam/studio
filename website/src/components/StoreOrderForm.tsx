import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, FileText, Loader2, Mail, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StripePricingTable from "@/components/StripePricingTable";
import {
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
import { submitWebsiteBriefEmail } from "@/lib/submitWebsiteBriefEmail";
import {
  EMPTY_WEBSITE_BRIEF,
  WEBSITE_BRIEF_SECTIONS,
  validateWebsiteBrief,
  websiteBriefMailtoHref,
  type WebsiteBriefFormData,
} from "@/lib/websiteBriefForm";

const fieldClass =
  "bg-[var(--bg-elevated)] border-white/20 text-white placeholder:text-gray-500";

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
  const [brief, setBrief] = useState<WebsiteBriefFormData>(EMPTY_WEBSITE_BRIEF);
  const [sending, setSending] = useState(false);
  const [briefSent, setBriefSent] = useState(false);

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

  const updateField = <K extends keyof WebsiteBriefFormData>(
    key: K,
    value: WebsiteBriefFormData[K]
  ) => {
    setBrief((prev) => ({ ...prev, [key]: value }));
    setBriefSent(false);
  };

  const handleSendBrief = async (event: FormEvent) => {
    event.preventDefault();
    const error = validateWebsiteBrief(brief);
    if (error) {
      toast.error(error);
      return;
    }

    setSending(true);
    try {
      await submitWebsiteBriefEmail(product, brief);
      setBriefSent(true);
      toast.success("Brief sent — we'll reply from websites@801familystudios.com");
      document.getElementById("order-deposit")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        "Couldn't send from the browser. Opening your email app with the brief instead."
      );
      window.location.href = websiteBriefMailtoHref(
        STORE_FORM_EMAIL,
        product,
        brief
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="order-form" className="scroll-mt-24 space-y-8">
      <motion.div {...sectionMotion} className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          How to order
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Pick a package, fill out the brief below, send it to us, and pay your 50%
          deposit. We start once we have both.
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
        <div className="flex items-start gap-3 mb-6">
          <FileText className="h-6 w-6 text-teal-300 shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
              Step 2 — Complete & send the brief
            </p>
            <p className="text-gray-200 mt-2 leading-relaxed">
              Fill this out for your{" "}
              <span className="text-white font-medium">{selected.name}</span>. Hit
              Send brief and it goes straight to{" "}
              <span className="text-teal-200">{STORE_FORM_EMAIL}</span>. Photo and file
              uploads can be Drive/Dropbox links.
            </p>
          </div>
        </div>

        <form onSubmit={handleSendBrief} className="space-y-8">
          {WEBSITE_BRIEF_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="space-y-4 rounded-2xl border border-white/15 bg-black/20 p-5 md:p-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                {section.description && (
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                    {section.description}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field) => {
                  const wide =
                    field.type === "textarea" ||
                    field.key === "bandName" ||
                    field.key === "mainGoal" ||
                    field.key === "websitePages";
                  return (
                    <div
                      key={field.key}
                      className={`space-y-2 ${wide ? "md:col-span-2" : ""}`}
                    >
                      <Label htmlFor={`brief-${field.key}`} className="text-gray-200">
                        {field.label}
                        {field.required ? (
                          <span className="text-amber-300 ml-1">*</span>
                        ) : null}
                      </Label>
                      {field.hint && (
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {field.hint}
                        </p>
                      )}
                      {field.type === "textarea" ? (
                        <Textarea
                          id={`brief-${field.key}`}
                          value={brief[field.key]}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={field.rows ?? 3}
                          required={field.required}
                          className={fieldClass}
                        />
                      ) : (
                        <Input
                          id={`brief-${field.key}`}
                          type={field.type ?? "text"}
                          value={brief[field.key]}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                          className={fieldClass}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {briefSent && (
            <div className="flex items-start gap-3 rounded-2xl border border-teal-400/30 bg-teal-500/10 p-4">
              <CheckCircle2 className="h-5 w-5 text-teal-300 shrink-0 mt-0.5" aria-hidden />
              <p className="text-sm text-teal-100 leading-relaxed">
                Brief sent. Next, pay your ${deposit} deposit below so we can start your{" "}
                {selected.name}.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button
              type="submit"
              disabled={sending}
              className="rounded-full bg-[var(--accent-warm)] text-[var(--bg-base)] hover:bg-amber-400 font-semibold"
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send brief to {STORE_FORM_EMAIL}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-white/30 text-white hover:bg-white/10 font-semibold"
              onClick={() => {
                const error = validateWebsiteBrief(brief);
                if (error) {
                  toast.error(error);
                  return;
                }
                window.location.href = websiteBriefMailtoHref(
                  STORE_FORM_EMAIL,
                  product,
                  brief
                );
              }}
            >
              Open in email app instead
            </Button>
          </div>
        </form>
      </motion.div>

      <motion.div
        id="order-deposit"
        {...sectionMotion}
        className="scroll-mt-24 rounded-3xl border border-teal-400/30 bg-teal-500/10 p-6 md:p-8"
      >
        <div className="flex items-start gap-3 mb-4">
          <Wallet className="h-6 w-6 text-teal-300 shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
              Step 3 — Pay your 50% deposit
            </p>
            <p className="text-gray-200 mt-2 leading-relaxed">
              For{" "}
              <span className="text-white font-medium">{selected.name}</span>, the
              deposit is{" "}
              <span className="text-teal-200 font-semibold">${deposit}</span> (50% of $
              {selected.price}). Pay securely with Stripe below, or use PayPal / Venmo
              and note your band or artist name in the payment memo.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold text-white mb-3 text-center sm:text-left">
            Pay with Stripe
          </p>
          <StripePricingTable />
        </div>

        <div className="mt-8 pt-6 border-t border-white/15">
          <p className="font-semibold text-white mb-4 text-center sm:text-left">
            Or pay with PayPal / Venmo
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
