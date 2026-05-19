import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildStoreOrderEmailFields } from "@/lib/buildStoreOrderEmail";
import {
  savePendingStoreOrder,
  type PendingStoreOrder,
} from "@/lib/storeOrderSession";
import { submitStoreOrderEmail } from "@/lib/submitStoreOrderEmail";
import {
  ORDER_DELIVERY_NOTE,
  STORE_PRODUCTS,
  type StoreProductId,
} from "@/lib/storeProducts";

const parseProduct = (value: string | null): StoreProductId => {
  if (value === "epk" || value === "website") return value;
  return "website";
};

type FormState = {
  artistOrBandName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  genre: string;
  socialLinks: string;
  musicLinks: string;
  photosAndAssets: string;
  showsAndEvents: string;
  designNotes: string;
  domainNotes: string;
  referenceSites: string;
  shortBio: string;
  pressContact: string;
  bookingContact: string;
  videoLinks: string;
  additionalNotes: string;
};

const emptyForm: FormState = {
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

const sectionMotion = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const StoreOrderForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<StoreProductId>(
    parseProduct(searchParams.get("product"))
  );

  useEffect(() => {
    setProduct(parseProduct(searchParams.get("product")));
  }, [searchParams]);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const selected = STORE_PRODUCTS.find((item) => item.id === product)!;

  const update = (key: keyof FormState, value: string) => {
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

    const order: PendingStoreOrder = {
      productId: product,
      productName: selected.name,
      price: selected.price,
      artistOrBandName: form.artistOrBandName.trim(),
      contactName: form.contactName.trim(),
      email: form.email.trim(),
      submittedAt: new Date().toISOString(),
    };

    const emailFields = buildStoreOrderEmailFields(product, selected, form);

    savePendingStoreOrder(order);
    setForm(emptyForm);

    navigate(
      { pathname: "/store/checkout", search: `?product=${product}` },
      { state: { order } }
    );

    window.setTimeout(() => {
      try {
        submitStoreOrderEmail(emailFields);
      } catch {
        /* checkout still proceeds; email is best-effort */
      }
      setSubmitting(false);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8" id="order-form">
      <motion.div
        {...sectionMotion}
        className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 md:p-8"
      >
        <h3 className="text-xl font-bold text-white mb-2">Choose your package</h3>
        <p className="text-gray-300 text-sm mb-6">
          Select what you want to order, then complete the project brief below.
        </p>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STORE_PRODUCTS.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setProduct(item.id)}
              className={`text-left rounded-2xl border p-5 transition-all ${
                product === item.id
                  ? "border-[var(--accent-warm)] bg-[var(--accent-warm)]/15 ring-2 ring-[var(--accent-warm)]/40"
                  : "border-white/20 bg-black/20 hover:border-white/35"
              }`}
            >
              <span className="text-3xl">{item.icon}</span>
              <p className="mt-3 text-lg font-bold text-white">{item.name}</p>
              <p className="text-2xl font-bold text-[var(--accent-warm)] mt-1">
                ${item.price}
              </p>
              <p className="text-sm text-gray-300 mt-2">{item.tagline}</p>
            </motion.button>
          ))}
        </motion.div>
        <p className="mt-6 text-sm text-gray-400">
          After your brief, you&apos;ll go to checkout to pay. Simple edits are free;
          complex changes are $20 per edit.
        </p>
        <p className="mt-3 text-sm text-teal-200/90 leading-relaxed">{ORDER_DELIVERY_NOTE}</p>
      </motion.div>

      <motion.div
        {...sectionMotion}
        className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 md:p-8 space-y-6"
      >
        <motion.div>
          <h3 className="text-xl font-bold text-white">Contact information</h3>
          <p className="text-sm text-gray-300 mt-1">Who should we reach about this project?</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div className="space-y-2 md:col-span-2">
            <Label htmlFor="artistOrBandName">Artist / band name *</Label>
            <Input
              id="artistOrBandName"
              value={form.artistOrBandName}
              onChange={(e) => update("artistOrBandName", e.target.value)}
              className={fieldClass}
            />
          </motion.div>
          <motion.div className="space-y-2">
            <Label htmlFor="contactName">Your name *</Label>
            <Input
              id="contactName"
              value={form.contactName}
              onChange={(e) => update("contactName", e.target.value)}
              className={fieldClass}
            />
          </motion.div>
          <motion.div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={fieldClass}
            />
          </motion.div>
          <motion.div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={fieldClass}
            />
          </motion.div>
          <motion.div className="space-y-2">
            <Label htmlFor="location">City / state</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. Salt Lake City, UT"
              className={fieldClass}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        {...sectionMotion}
        className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 md:p-8 space-y-6"
      >
        <motion.div>
          <h3 className="text-xl font-bold text-white">Project details</h3>
          <p className="text-sm text-gray-300 mt-1">
            {product === "website"
              ? "Tell us everything we need to build your site."
              : "Tell us everything we need for your press kit."}
          </p>
        </motion.div>

        {product === "epk" && (
          <motion.div className="space-y-2">
            <Label htmlFor="shortBio">Short bio (1–2 sentences for press)</Label>
            <Textarea
              id="shortBio"
              rows={3}
              value={form.shortBio}
              onChange={(e) => update("shortBio", e.target.value)}
              className={fieldClass}
            />
          </motion.div>
        )}

        <motion.div className="space-y-2">
          <Label htmlFor="bio">
            {product === "website" ? "Band bio *" : "Full bio *"}
          </Label>
          <Textarea
            id="bio"
            rows={5}
            value={form.bio}
            onChange={(e) => update("bio", e.target.value)}
            placeholder="Your story, sound, and what makes you unique..."
            className={fieldClass}
          />
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div className="space-y-2">
            <Label htmlFor="genre">Genre / style</Label>
            <Input
              id="genre"
              value={form.genre}
              onChange={(e) => update("genre", e.target.value)}
              className={fieldClass}
            />
          </motion.div>
          {product === "epk" && (
            <>
              <motion.div className="space-y-2">
                <Label htmlFor="pressContact">Press contact email</Label>
                <Input
                  id="pressContact"
                  type="email"
                  value={form.pressContact}
                  onChange={(e) => update("pressContact", e.target.value)}
                  className={fieldClass}
                />
              </motion.div>
              <motion.div className="space-y-2 md:col-span-2">
                <Label htmlFor="bookingContact">Booking contact</Label>
                <Input
                  id="bookingContact"
                  value={form.bookingContact}
                  onChange={(e) => update("bookingContact", e.target.value)}
                  placeholder="Email, phone, or booking agent"
                  className={fieldClass}
                />
              </motion.div>
            </>
          )}
        </motion.div>

        <motion.div className="space-y-2">
          <Label htmlFor="socialLinks">Social media links</Label>
          <Textarea
            id="socialLinks"
            rows={3}
            value={form.socialLinks}
            onChange={(e) => update("socialLinks", e.target.value)}
            placeholder="Instagram, Facebook, TikTok, YouTube, etc."
            className={fieldClass}
          />
        </motion.div>

        <motion.div className="space-y-2">
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
        </motion.div>

        {product === "epk" && (
          <motion.div className="space-y-2">
            <Label htmlFor="videoLinks">Video links (live performance, music videos)</Label>
            <Textarea
              id="videoLinks"
              rows={2}
              value={form.videoLinks}
              onChange={(e) => update("videoLinks", e.target.value)}
              className={fieldClass}
            />
          </motion.div>
        )}

        <motion.div className="space-y-2">
          <Label htmlFor="photosAndAssets">Photos & assets link *</Label>
          <Textarea
            id="photosAndAssets"
            rows={3}
            value={form.photosAndAssets}
            onChange={(e) => update("photosAndAssets", e.target.value)}
            placeholder="Paste links to your photos and assets — Google Drive, Instagram, Facebook, etc."
            className={fieldClass}
          />
          <p className="text-xs text-gray-400">
            Share one or more links where we can view or download your logos, photos, and files.
          </p>
        </motion.div>

        <motion.div className="space-y-2">
          <Label htmlFor="showsAndEvents">
            {product === "website" ? "Upcoming shows & events" : "Upcoming shows / press notes"}
          </Label>
          <Textarea
            id="showsAndEvents"
            rows={3}
            value={form.showsAndEvents}
            onChange={(e) => update("showsAndEvents", e.target.value)}
            className={fieldClass}
          />
        </motion.div>

        {product === "website" && (
          <>
            <motion.div className="space-y-2">
              <Label htmlFor="designNotes">Design / color preferences</Label>
              <Textarea
                id="designNotes"
                rows={3}
                value={form.designNotes}
                onChange={(e) => update("designNotes", e.target.value)}
                placeholder="Colors, mood, fonts, or sites you like..."
                className={fieldClass}
              />
            </motion.div>
            <motion.div className="space-y-2">
              <Label htmlFor="domainNotes">Domain name</Label>
              <Input
                id="domainNotes"
                value={form.domainNotes}
                onChange={(e) => update("domainNotes", e.target.value)}
                placeholder="Do you already own one, or need help choosing?"
                className={fieldClass}
              />
            </motion.div>
            <motion.div className="space-y-2">
              <Label htmlFor="referenceSites">Reference websites you like</Label>
              <Textarea
                id="referenceSites"
                rows={2}
                value={form.referenceSites}
                onChange={(e) => update("referenceSites", e.target.value)}
                className={fieldClass}
              />
            </motion.div>
          </>
        )}

        <motion.div className="space-y-2">
          <Label htmlFor="additionalNotes">Anything else we should know?</Label>
          <Textarea
            id="additionalNotes"
            rows={3}
            value={form.additionalNotes}
            onChange={(e) => update("additionalNotes", e.target.value)}
            className={fieldClass}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-teal-400/25 bg-teal-500/10 px-5 py-4 text-sm text-gray-200 leading-relaxed"
        role="note"
      >
        {ORDER_DELIVERY_NOTE}
      </motion.div>

      <motion.div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-sm text-gray-300">
          Ordering: <span className="text-white font-semibold">{selected.name}</span> —{" "}
          <span className="text-[var(--accent-warm)] font-bold">${selected.price}</span>
        </p>
        <Button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-[var(--accent-warm)] text-[var(--bg-base)] hover:bg-amber-400 px-8 py-6 text-base font-semibold w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Continuing…
            </>
          ) : (
            <>
              Continue to payment — ${selected.price}
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
};

export default StoreOrderForm;
