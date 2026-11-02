import { useEffect, useState, type FormEvent, type ReactNode } from "react";
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
import { submitStoreOrderEmail } from "@/lib/submitStoreOrderEmail";
import { STORE_FORM_EMAIL } from "@/lib/storeProducts";
import { cn } from "@/lib/utils";

type BriefFields = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  businessType: string;
  shortDescription: string;
  mediumDescription: string;
  fullDescription: string;
  services: string;
  hours: string;
  photosAndAssets: string;
  socialLinks: string;
  reviews: string;
  pagesWanted: string;
  mainGoal: string;
  domainNotes: string;
  designNotes: string;
  products: string;
  additionalNotes: string;
};

const emptyForm: BriefFields = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  location: "",
  businessType: "",
  shortDescription: "",
  mediumDescription: "",
  fullDescription: "",
  services: "",
  hours: "",
  photosAndAssets: "",
  socialLinks: "",
  reviews: "",
  pagesWanted: "",
  mainGoal: "",
  domainNotes: "",
  designNotes: "",
  products: "",
  additionalNotes: "",
};

const fieldClass =
  "bg-[var(--bg-elevated)] border-white/20 text-white placeholder:text-gray-500";

const filled = (value: string) => value.trim() || "—";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <fieldset className="space-y-4 border-t border-white/10 pt-5">
    <legend className="text-sm font-semibold uppercase tracking-wide text-teal-300">
      {title}
    </legend>
    {children}
  </fieldset>
);

const SmallBusinessBriefForm = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<BriefFields>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (location.hash === "#order-brief" || location.hash === "#order-form") {
      setOpen(true);
      document.getElementById("small-business-brief")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location.hash]);

  const update = (key: keyof BriefFields, value: string) => {
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

    if (!form.businessName.trim()) {
      toast.error("Please enter the business name.");
      focusField("businessName");
      return;
    }
    if (!form.contactName.trim()) {
      toast.error("Please enter your name.");
      focusField("sbContactName");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      toast.error("Please enter your email.");
      focusField("sbEmail");
      return;
    }
    if (!form.shortDescription.trim() && !form.fullDescription.trim()) {
      toast.error("Please add a short description or a full description.");
      focusField("fullDescription");
      return;
    }
    if (!form.services.trim()) {
      toast.error("Please list the services you want on the site.");
      focusField("sbServices");
      return;
    }
    if (!form.photosAndAssets.trim()) {
      toast.error("Please add a link to photos or your logo.");
      focusField("sbPhotos");
      return;
    }

    setSubmitting(true);
    try {
      submitStoreOrderEmail({
        _subject: `Small business website brief — ${form.businessName.trim()}`,
        _replyto: form.email.trim(),
        Product: "Small Business Website (starting at $2,000)",
        Payment: "Invoice for 50% of the quoted price. Balance invoiced when the site is ready.",
        "Business name": form.businessName.trim(),
        "Contact name": form.contactName.trim(),
        Email: form.email.trim(),
        Phone: filled(form.phone),
        Location: filled(form.location),
        "Type of business": filled(form.businessType),
        "Short description": filled(form.shortDescription),
        "Medium description": filled(form.mediumDescription),
        "Full description": filled(form.fullDescription),
        Services: form.services.trim(),
        Hours: filled(form.hours),
        "Photos and logo": form.photosAndAssets.trim(),
        "Social links": filled(form.socialLinks),
        "Reviews and trust": filled(form.reviews),
        "Pages wanted": filled(form.pagesWanted),
        "Main goal": filled(form.mainGoal),
        Domain: filled(form.domainNotes),
        "Design ideas": filled(form.designNotes),
        "Products or store": filled(form.products),
        "Additional notes": filled(form.additionalNotes),
      });
      setForm(emptyForm);
      setOpen(false);
      toast.success("Sent. We'll email an invoice after we review this.");
    } catch {
      toast.error(`Could not send the brief. Email it to ${STORE_FORM_EMAIL}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="small-business-brief" className="mb-10 scroll-mt-28">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            id="order-brief"
            type="button"
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--accent-warm)]/50 bg-[var(--accent-warm)]/10 px-5 py-4 text-left transition-colors hover:bg-[var(--accent-warm)]/20"
          >
            <span>
              <span className="block text-base font-semibold text-white">
                {open ? "Small business brief" : "Fill out the small business brief"}
              </span>
              <span className="mt-1 block text-sm text-gray-200">
                This emails us the details we need to quote and build your site.
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
              Sites start at $2,000 and are often more. This brief emails{" "}
              {STORE_FORM_EMAIL}. We reply with an invoice for 50% of the quoted
              price, and we start when that invoice is paid. Fields marked * are
              required.
            </p>

            <Section title="The business">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="businessName" className="text-gray-100">
                    Business name *
                  </Label>
                  <Input
                    id="businessName"
                    value={form.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sbContactName" className="text-gray-100">
                    Your name *
                  </Label>
                  <Input
                    id="sbContactName"
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sbEmail" className="text-gray-100">
                    Email *
                  </Label>
                  <Input
                    id="sbEmail"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sbPhone" className="text-gray-100">
                    Phone
                  </Label>
                  <Input
                    id="sbPhone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sbLocation" className="text-gray-100">
                    City / state
                  </Label>
                  <Input
                    id="sbLocation"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="Salt Lake City, UT"
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="businessType" className="text-gray-100">
                    Type of business
                  </Label>
                  <Input
                    id="businessType"
                    value={form.businessType}
                    onChange={(e) => update("businessType", e.target.value)}
                    placeholder="HVAC, salon, shop, studio..."
                    className={fieldClass}
                  />
                </div>
              </div>
            </Section>

            <Section title="About the business">
              <div className="space-y-2">
                <Label htmlFor="shortDescription" className="text-gray-100">
                  Short description
                </Label>
                <Textarea
                  id="shortDescription"
                  rows={2}
                  value={form.shortDescription}
                  onChange={(e) => update("shortDescription", e.target.value)}
                  placeholder="1–2 sentences for the top of the site."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mediumDescription" className="text-gray-100">
                  Medium description
                </Label>
                <Textarea
                  id="mediumDescription"
                  rows={3}
                  value={form.mediumDescription}
                  onChange={(e) => update("mediumDescription", e.target.value)}
                  placeholder="A paragraph for the about page."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullDescription" className="text-gray-100">
                  Full description *
                </Label>
                <Textarea
                  id="fullDescription"
                  rows={5}
                  value={form.fullDescription}
                  onChange={(e) => update("fullDescription", e.target.value)}
                  placeholder="The full story. A short description above can stand in."
                  className={fieldClass}
                />
              </div>
            </Section>

            <Section title="Services and hours">
              <div className="space-y-2">
                <Label htmlFor="sbServices" className="text-gray-100">
                  Services *
                </Label>
                <Textarea
                  id="sbServices"
                  rows={4}
                  value={form.services}
                  onChange={(e) => update("services", e.target.value)}
                  placeholder="The services or products customers should see, and what each one includes."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sbHours" className="text-gray-100">
                  Hours
                </Label>
                <Textarea
                  id="sbHours"
                  rows={2}
                  value={form.hours}
                  onChange={(e) => update("hours", e.target.value)}
                  placeholder="Days and hours, or say if you are by appointment."
                  className={fieldClass}
                />
              </div>
            </Section>

            <Section title="Photos and contact">
              <div className="space-y-2">
                <Label htmlFor="sbPhotos" className="text-gray-100">
                  Photos and logo *
                </Label>
                <Textarea
                  id="sbPhotos"
                  rows={3}
                  value={form.photosAndAssets}
                  onChange={(e) => update("photosAndAssets", e.target.value)}
                  placeholder="Link to your logo, shop photos, and team photos. Google Drive, Dropbox, or a social profile."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sbSocial" className="text-gray-100">
                  Social links
                </Label>
                <Textarea
                  id="sbSocial"
                  rows={2}
                  value={form.socialLinks}
                  onChange={(e) => update("socialLinks", e.target.value)}
                  placeholder="Instagram, Facebook, Google, and any others."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sbReviews" className="text-gray-100">
                  Reviews, licenses, and highlights
                </Label>
                <Textarea
                  id="sbReviews"
                  rows={3}
                  value={form.reviews}
                  onChange={(e) => update("reviews", e.target.value)}
                  placeholder="Google reviews, BBB, licenses, awards, or a short line customers should trust."
                  className={fieldClass}
                />
              </div>
            </Section>

            <Section title="The website">
              <div className="space-y-2">
                <Label htmlFor="sbPages" className="text-gray-100">
                  Pages you want
                </Label>
                <Textarea
                  id="sbPages"
                  rows={2}
                  value={form.pagesWanted}
                  onChange={(e) => update("pagesWanted", e.target.value)}
                  placeholder="Home, About, Services, Contact, and any extra pages."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sbGoal" className="text-gray-100">
                  Main goal
                </Label>
                <Textarea
                  id="sbGoal"
                  rows={2}
                  value={form.mainGoal}
                  onChange={(e) => update("mainGoal", e.target.value)}
                  placeholder="Calls, visits, estimates, bookings, or online sales."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sbDomain" className="text-gray-100">
                  Domain or existing site
                </Label>
                <Input
                  id="sbDomain"
                  value={form.domainNotes}
                  onChange={(e) => update("domainNotes", e.target.value)}
                  placeholder="Domain you own, or say if you need help choosing one."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sbDesign" className="text-gray-100">
                  Design ideas
                </Label>
                <Textarea
                  id="sbDesign"
                  rows={3}
                  value={form.designNotes}
                  onChange={(e) => update("designNotes", e.target.value)}
                  placeholder="Colors, style, vibe, sites you like, and sites you don't."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sbProducts" className="text-gray-100">
                  Products or store
                </Label>
                <Textarea
                  id="sbProducts"
                  rows={2}
                  value={form.products}
                  onChange={(e) => update("products", e.target.value)}
                  placeholder="Products or a store link, if you want them on the site."
                  className={fieldClass}
                />
              </div>
            </Section>

            <div className="space-y-2">
              <Label htmlFor="sbNotes" className="text-gray-100">
                Anything else
              </Label>
              <Textarea
                id="sbNotes"
                rows={3}
                value={form.additionalNotes}
                onChange={(e) => update("additionalNotes", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-1">
              <p className="text-sm text-gray-300">
                Emails {STORE_FORM_EMAIL}. We invoice after we review it.
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
                  "Email this brief"
                )}
              </Button>
            </div>
          </form>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default SmallBusinessBriefForm;
