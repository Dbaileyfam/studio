import { useEffect, useState, type FormEvent } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  buildStoreOrderEmailFields,
  type StoreOrderFormFields,
} from "@/lib/buildStoreOrderEmail";
import { submitStoreOrderEmail } from "@/lib/submitStoreOrderEmail";
import { depositAmount, type StoreProduct, type StoreProductId } from "@/lib/storeProducts";
import { cn } from "@/lib/utils";

const emptyForm: StoreOrderFormFields = {
  artistOrBandName: "",
  contactName: "",
  email: "",
  phone: "",
  links: "",
  projectNotes: "",
};

const fieldClass =
  "bg-[var(--bg-elevated)] border-white/20 text-white placeholder:text-gray-500";

type StoreOrderBriefFormProps = {
  product: StoreProductId;
  selected: StoreProduct;
};

const StoreOrderBriefForm = ({ product, selected }: StoreOrderBriefFormProps) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<StoreOrderFormFields>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const deposit = depositAmount(selected.price);

  useEffect(() => {
    if (location.hash === "#order-brief" || location.hash === "#order-form") {
      setOpen(true);
    }
  }, [location.hash, location.search]);

  const update = (key: keyof StoreOrderFormFields, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const focusField = (fieldId: string) => {
    const el = document.getElementById(fieldId);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (el && "focus" in el) {
      (el as HTMLElement).focus();
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.artistOrBandName.trim()) {
      toast.error("Please enter the artist, band, or business name.");
      focusField("artistOrBandName");
      return;
    }
    if (!form.contactName.trim()) {
      toast.error("Please enter your name.");
      focusField("contactName");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      toast.error("Please enter your email.");
      focusField("email");
      return;
    }

    setSubmitting(true);
    const emailFields = buildStoreOrderEmailFields(product, selected, form);

    try {
      submitStoreOrderEmail(emailFields);
      setForm(emptyForm);
      toast.success(
        `Got it. Next, pay your $${deposit} deposit below.`
      );
      document.getElementById("order-deposit")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setOpen(false);
    } catch {
      toast.error("Could not send the form. Please try again or email us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-2">
      <CollapsibleTrigger asChild>
        <button
          id="order-brief"
          type="button"
          className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--accent-warm)]/50 bg-[var(--accent-warm)]/10 px-5 py-4 text-left transition-colors hover:bg-[var(--accent-warm)]/20 scroll-mt-28"
        >
          <span>
            <span className="block text-base font-semibold text-white">
              {open ? "Order form" : "Fill out the order form"}
            </span>
            <span className="mt-1 block text-sm text-gray-200">
              Name, email, and your links. Takes a couple of minutes.
            </span>
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-teal-300 transition-transform duration-200",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-4 space-y-5 rounded-2xl border border-white/15 bg-black/20 p-5 md:p-6"
        >
          <p className="text-sm text-gray-300 leading-relaxed">
            This is for your{" "}
            <span className="text-white font-medium">{selected.name}</span> ($
            {selected.price}, ${deposit} deposit). Submit it here and we get the email.
            Then pay the deposit in the next step.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="artistOrBandName" className="text-gray-100">
                Artist, band, or business name *
              </Label>
              <Input
                id="artistOrBandName"
                value={form.artistOrBandName}
                onChange={(e) => update("artistOrBandName", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName" className="text-gray-100">
                Your name *
              </Label>
              <Input
                id="contactName"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-100">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="phone" className="text-gray-100">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="links" className="text-gray-100">
              Links
            </Label>
            <Textarea
              id="links"
              rows={3}
              value={form.links}
              onChange={(e) => update("links", e.target.value)}
              placeholder="Music, social, photos, or a Drive folder. One link per line is fine."
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectNotes" className="text-gray-100">
              Project notes
            </Label>
            <Textarea
              id="projectNotes"
              rows={4}
              value={form.projectNotes}
              onChange={(e) => update("projectNotes", e.target.value)}
              placeholder="A short bio, colors you like, upcoming shows, or whether you need a domain. Short is fine."
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
            <p className="text-sm text-gray-300">
              Sending:{" "}
              <span className="text-white font-semibold">{selected.name}</span>
            </p>
            <Button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-[var(--accent-warm)] text-[var(--bg-base)] hover:bg-amber-400 font-semibold w-full sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send order form"
              )}
            </Button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default StoreOrderBriefForm;
