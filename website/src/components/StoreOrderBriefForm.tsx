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
  location: "",
  genre: "",
  shortBio: "",
  mediumBio: "",
  bio: "",
  photosAndAssets: "",
  musicLinks: "",
  videoLinks: "",
  socialLinks: "",
  bookingContact: "",
  stageInfo: "",
  pressNotes: "",
  showsAndEvents: "",
  pagesWanted: "",
  mainGoal: "",
  domainNotes: "",
  designNotes: "",
  merchNotes: "",
  additionalNotes: "",
};

const fieldClass =
  "bg-[var(--bg-elevated)] border-white/20 text-white placeholder:text-gray-500";

type StoreOrderBriefFormProps = {
  product: StoreProductId;
  selected: StoreProduct;
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <fieldset className="space-y-4 border-t border-white/10 pt-5">
    <legend className="text-sm font-semibold uppercase tracking-wide text-teal-300">
      {title}
    </legend>
    {children}
  </fieldset>
);

const StoreOrderBriefForm = ({ product, selected }: StoreOrderBriefFormProps) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<StoreOrderFormFields>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const deposit = depositAmount(selected.price);
  const needsSite = product === "website" || product === "bundle";

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
      toast.error("Please enter the artist or band name.");
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
    if (!form.shortBio.trim() && !form.bio.trim()) {
      toast.error("Please add a short bio or a full bio.");
      focusField("bio");
      return;
    }
    if (!form.photosAndAssets.trim()) {
      toast.error("Please add a link to photos, logo, or artwork.");
      focusField("photosAndAssets");
      return;
    }
    if (!form.musicLinks.trim()) {
      toast.error("Please add music links.");
      focusField("musicLinks");
      return;
    }

    setSubmitting(true);
    const emailFields = buildStoreOrderEmailFields(product, selected, form);

    try {
      submitStoreOrderEmail(emailFields);
      setForm(emptyForm);
      toast.success(`Got it. Next, pay your $${deposit.toLocaleString()} deposit below.`);
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
              Bios, photos, music, shows, and design. Open it when you're ready.
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
            This is the full brief for your{" "}
            <span className="text-white font-medium">{selected.name}</span> (starting
            at ${selected.price.toLocaleString()}, ${deposit.toLocaleString()} deposit).
            Fields marked * are required.
            Fill in the rest with what you have — a link is enough for photos and files.
          </p>

          <Section title="Who you are">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="artistOrBandName" className="text-gray-100">
                  Artist / band name *
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
              <div className="space-y-2">
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
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-100">
                  City / state
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Salt Lake City, UT"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="genre" className="text-gray-100">
                  Genre
                </Label>
                <Input
                  id="genre"
                  value={form.genre}
                  onChange={(e) => update("genre", e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
          </Section>

          <Section title="Bios">
            <div className="space-y-2">
              <Label htmlFor="shortBio" className="text-gray-100">
                Short bio
              </Label>
              <Textarea
                id="shortBio"
                rows={2}
                value={form.shortBio}
                onChange={(e) => update("shortBio", e.target.value)}
                placeholder="1–2 sentences for press and the top of the site."
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mediumBio" className="text-gray-100">
                Medium bio
              </Label>
              <Textarea
                id="mediumBio"
                rows={3}
                value={form.mediumBio}
                onChange={(e) => update("mediumBio", e.target.value)}
                placeholder="A paragraph for the about page or EPK."
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-100">
                Full bio *
              </Label>
              <Textarea
                id="bio"
                rows={5}
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="The full story. A short bio above can stand in if you don't have a long one yet."
                className={fieldClass}
              />
            </div>
          </Section>

          <Section title="Photos, music, and social">
            <div className="space-y-2">
              <Label htmlFor="photosAndAssets" className="text-gray-100">
                Photos, logo, and artwork *
              </Label>
              <Textarea
                id="photosAndAssets"
                rows={3}
                value={form.photosAndAssets}
                onChange={(e) => update("photosAndAssets", e.target.value)}
                placeholder="Link to promo photos, live photos, logo, and album art. Google Drive, Dropbox, or a social profile."
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="musicLinks" className="text-gray-100">
                Music links *
              </Label>
              <Textarea
                id="musicLinks"
                rows={3}
                value={form.musicLinks}
                onChange={(e) => update("musicLinks", e.target.value)}
                placeholder="Spotify, Apple Music, YouTube, Bandcamp, SoundCloud..."
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoLinks" className="text-gray-100">
                Video links
              </Label>
              <Textarea
                id="videoLinks"
                rows={2}
                value={form.videoLinks}
                onChange={(e) => update("videoLinks", e.target.value)}
                placeholder="Best live video and music videos."
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialLinks" className="text-gray-100">
                Social links
              </Label>
              <Textarea
                id="socialLinks"
                rows={3}
                value={form.socialLinks}
                onChange={(e) => update("socialLinks", e.target.value)}
                placeholder="Instagram, Facebook, TikTok, YouTube, and any others."
                className={fieldClass}
              />
            </div>
          </Section>

          <Section title="Booking and shows">
            <div className="space-y-2">
              <Label htmlFor="bookingContact" className="text-gray-100">
                Booking info
              </Label>
              <Textarea
                id="bookingContact"
                rows={3}
                value={form.bookingContact}
                onChange={(e) => update("bookingContact", e.target.value)}
                placeholder="Booking email and phone, set lengths, travel area, and the kinds of events you play."
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stageInfo" className="text-gray-100">
                Stage plot, input list, or tech rider
              </Label>
              <Textarea
                id="stageInfo"
                rows={2}
                value={form.stageInfo}
                onChange={(e) => update("stageInfo", e.target.value)}
                placeholder="Paste it here or add a link. Basic stage notes are fine."
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pressNotes" className="text-gray-100">
                Press, credits, and highlights
              </Label>
              <Textarea
                id="pressNotes"
                rows={3}
                value={form.pressNotes}
                onChange={(e) => update("pressNotes", e.target.value)}
                placeholder="Quotes, reviews, festivals, notable venues, awards, or artists you've opened for."
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="showsAndEvents" className="text-gray-100">
                Upcoming shows and important past shows
              </Label>
              <Textarea
                id="showsAndEvents"
                rows={3}
                value={form.showsAndEvents}
                onChange={(e) => update("showsAndEvents", e.target.value)}
                className={fieldClass}
              />
            </div>
          </Section>

          {needsSite && (
            <Section title="The website">
              <div className="space-y-2">
                <Label htmlFor="pagesWanted" className="text-gray-100">
                  Pages you want
                </Label>
                <Textarea
                  id="pagesWanted"
                  rows={2}
                  value={form.pagesWanted}
                  onChange={(e) => update("pagesWanted", e.target.value)}
                  placeholder="Home, About, Music, Shows, EPK, Contact, Store, Press, Merch..."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainGoal" className="text-gray-100">
                  Main goal
                </Label>
                <Textarea
                  id="mainGoal"
                  rows={2}
                  value={form.mainGoal}
                  onChange={(e) => update("mainGoal", e.target.value)}
                  placeholder="Booking shows, streaming, tickets, merch, press, or contacting management."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domainNotes" className="text-gray-100">
                  Domain or existing site
                </Label>
                <Input
                  id="domainNotes"
                  value={form.domainNotes}
                  onChange={(e) => update("domainNotes", e.target.value)}
                  placeholder="Domain you own, or say if you need help choosing one."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designNotes" className="text-gray-100">
                  Design ideas
                </Label>
                <Textarea
                  id="designNotes"
                  rows={3}
                  value={form.designNotes}
                  onChange={(e) => update("designNotes", e.target.value)}
                  placeholder="Colors, style, vibe, sites you like, and sites you don't."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchNotes" className="text-gray-100">
                  Merch or store
                </Label>
                <Textarea
                  id="merchNotes"
                  rows={2}
                  value={form.merchNotes}
                  onChange={(e) => update("merchNotes", e.target.value)}
                  placeholder="Products or a store link, if you want them on the site."
                  className={fieldClass}
                />
              </div>
            </Section>
          )}

          {!needsSite && (
            <Section title="Look and goal">
              <div className="space-y-2">
                <Label htmlFor="mainGoal" className="text-gray-100">
                  Main goal
                </Label>
                <Textarea
                  id="mainGoal"
                  rows={2}
                  value={form.mainGoal}
                  onChange={(e) => update("mainGoal", e.target.value)}
                  placeholder="Booking, press, playlists, or festivals."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designNotes" className="text-gray-100">
                  Design ideas
                </Label>
                <Textarea
                  id="designNotes"
                  rows={3}
                  value={form.designNotes}
                  onChange={(e) => update("designNotes", e.target.value)}
                  placeholder="Colors, style, vibe, and kits you like."
                  className={fieldClass}
                />
              </div>
            </Section>
          )}

          <div className="space-y-2">
            <Label htmlFor="additionalNotes" className="text-gray-100">
              Anything else
            </Label>
            <Textarea
              id="additionalNotes"
              rows={3}
              value={form.additionalNotes}
              onChange={(e) => update("additionalNotes", e.target.value)}
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
