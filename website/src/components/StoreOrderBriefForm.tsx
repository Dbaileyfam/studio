import { useState, type FormEvent } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
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
import {
  depositAmount,
  type StoreProduct,
  type StoreProductId,
} from "@/lib/storeProducts";
import { cn } from "@/lib/utils";

const emptyForm: StoreOrderFormFields = {
  artistOrBandName: "",
  contactName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  genre: "",
  socialLinks: "",
  musicLinks: "",
  photosAndAssets: "",
  showsAndEvents: "",
  designNotes: "",
  domainNotes: "",
  referenceSites: "",
  shortBio: "",
  pressContact: "",
  bookingContact: "",
  videoLinks: "",
  additionalNotes: "",
};

const fieldClass =
  "bg-[var(--bg-elevated)] border-white/20 text-white placeholder:text-gray-500";

type StoreOrderBriefFormProps = {
  product: StoreProductId;
  selected: StoreProduct;
};

const StoreOrderBriefForm = ({ product, selected }: StoreOrderBriefFormProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<StoreOrderFormFields>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const deposit = depositAmount(selected.price);

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
      toast.error("Please enter your artist / band name.");
      focusField("artistOrBandName");
      return;
    }
    if (!form.contactName.trim()) {
      toast.error("Please enter your name.");
      focusField("contactName");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Please enter your email.");
      focusField("email");
      return;
    }
    if (!form.bio.trim()) {
      toast.error("Please add your band bio.");
      focusField("bio");
      return;
    }
    if (!form.photosAndAssets.trim()) {
      toast.error("Please add a photos & assets link (Google Drive, social media, etc.).");
      focusField("photosAndAssets");
      return;
    }

    setSubmitting(true);
    const emailFields = buildStoreOrderEmailFields(product, selected, form);

    try {
      submitStoreOrderEmail(emailFields);
      setForm(emptyForm);
      toast.success(
        `Brief sent for ${selected.name}. Next, pay your $${deposit} deposit below.`
      );
      document.getElementById("order-deposit")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setOpen(false);
    } catch {
      toast.error("Could not send the form. Please try again or email your brief.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-6">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/20 bg-black/25 px-5 py-4 text-left transition-colors hover:border-white/35 hover:bg-black/35"
        >
          <span>
            <span className="block text-sm font-semibold uppercase tracking-wide text-teal-300">
              Prefer the on-page form?
            </span>
            <span className="mt-1 block text-sm text-gray-200">
              Fill it out here instead of the Google Doc — tucked away until you need it.
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
          className="mt-4 space-y-6 rounded-2xl border border-white/15 bg-black/20 p-5 md:p-6"
        >
          <p className="text-sm text-gray-300 leading-relaxed">
            Complete this brief for your{" "}
            <span className="text-white font-medium">{selected.name}</span>. When you
            submit, we receive it by email — then pay your ${deposit} deposit in Step 4.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="artistOrBandName">Artist / band name *</Label>
              <Input
                id="artistOrBandName"
                value={form.artistOrBandName}
                onChange={(e) => update("artistOrBandName", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Your name *</Label>
              <Input
                id="contactName"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">City / state</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Salt Lake City, UT"
                className={fieldClass}
              />
            </div>
          </div>

          {(product === "epk" || product === "bundle") && (
            <div className="space-y-2">
              <Label htmlFor="shortBio">Short bio (1–2 sentences for press)</Label>
              <Textarea
                id="shortBio"
                rows={3}
                value={form.shortBio}
                onChange={(e) => update("shortBio", e.target.value)}
                className={fieldClass}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="bio">{product === "epk" ? "Full bio *" : "Band bio *"}</Label>
            <Textarea
              id="bio"
              rows={5}
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              placeholder="Your story, sound, and what makes you unique..."
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre / style</Label>
              <Input
                id="genre"
                value={form.genre}
                onChange={(e) => update("genre", e.target.value)}
                className={fieldClass}
              />
            </div>
            {(product === "epk" || product === "bundle") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pressContact">Press contact email</Label>
                  <Input
                    id="pressContact"
                    type="email"
                    value={form.pressContact}
                    onChange={(e) => update("pressContact", e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bookingContact">Booking contact</Label>
                  <Input
                    id="bookingContact"
                    value={form.bookingContact}
                    onChange={(e) => update("bookingContact", e.target.value)}
                    placeholder="Email, phone, or booking agent"
                    className={fieldClass}
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="socialLinks">Social media links</Label>
            <Textarea
              id="socialLinks"
              rows={3}
              value={form.socialLinks}
              onChange={(e) => update("socialLinks", e.target.value)}
              placeholder="Instagram, Facebook, TikTok, YouTube, etc."
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="musicLinks">
              {product === "website" ? "Music links" : "Music & video links"}
            </Label>
            <Textarea
              id="musicLinks"
              rows={3}
              value={form.musicLinks}
              onChange={(e) => update("musicLinks", e.target.value)}
              placeholder="Spotify, Apple Music, SoundCloud, YouTube..."
              className={fieldClass}
            />
          </div>

          {(product === "epk" || product === "bundle") && (
            <div className="space-y-2">
              <Label htmlFor="videoLinks">Video links (live performance, music videos)</Label>
              <Textarea
                id="videoLinks"
                rows={2}
                value={form.videoLinks}
                onChange={(e) => update("videoLinks", e.target.value)}
                className={fieldClass}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="photosAndAssets">Photos & assets link *</Label>
            <Textarea
              id="photosAndAssets"
              rows={3}
              value={form.photosAndAssets}
              onChange={(e) => update("photosAndAssets", e.target.value)}
              placeholder="Paste links to your photos and assets — Google Drive, Instagram, Facebook, etc."
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="showsAndEvents">
              {product === "website"
                ? "Upcoming shows & events"
                : product === "epk"
                  ? "Upcoming shows / press notes"
                  : "Upcoming shows, events & press notes"}
            </Label>
            <Textarea
              id="showsAndEvents"
              rows={3}
              value={form.showsAndEvents}
              onChange={(e) => update("showsAndEvents", e.target.value)}
              className={fieldClass}
            />
          </div>

          {(product === "website" || product === "bundle") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="designNotes">Design / color preferences</Label>
                <Textarea
                  id="designNotes"
                  rows={3}
                  value={form.designNotes}
                  onChange={(e) => update("designNotes", e.target.value)}
                  placeholder="Colors, mood, fonts, or sites you like..."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domainNotes">Domain name</Label>
                <Input
                  id="domainNotes"
                  value={form.domainNotes}
                  onChange={(e) => update("domainNotes", e.target.value)}
                  placeholder="Do you already own one, or need help choosing?"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referenceSites">Reference websites you like</Label>
                <Textarea
                  id="referenceSites"
                  rows={2}
                  value={form.referenceSites}
                  onChange={(e) => update("referenceSites", e.target.value)}
                  className={fieldClass}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Anything else we should know?</Label>
            <Textarea
              id="additionalNotes"
              rows={3}
              value={form.additionalNotes}
              onChange={(e) => update("additionalNotes", e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
            <p className="text-sm text-gray-300">
              Submitting:{" "}
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
                "Submit brief"
              )}
            </Button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default StoreOrderBriefForm;
