import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  STORE_FORM_EMAIL,
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
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<StoreProductId>(
    parseProduct(searchParams.get("product"))
  );

  useEffect(() => {
    setProduct(parseProduct(searchParams.get("product")));
  }, [searchParams]);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selected = STORE_PRODUCTS.find((item) => item.id === product)!;

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.artistOrBandName.trim() || !form.contactName.trim() || !form.email.trim()) {
      toast.error("Please fill in band name, your name, and email.");
      return;
    }

    setSubmitting(true);

    const payload: Record<string, string> = {
      _subject: `Store order: ${selected.name} — ${form.artistOrBandName.trim()}`,
      _template: "table",
      Product: `${selected.name} ($${selected.price})`,
      "Artist / band name": form.artistOrBandName.trim(),
      "Contact name": form.contactName.trim(),
      Email: form.email.trim(),
      Phone: form.phone.trim() || "—",
      Location: form.location.trim() || "—",
    };

    if (product === "website") {
      Object.assign(payload, {
        Bio: form.bio.trim() || "—",
        Genre: form.genre.trim() || "—",
        "Social links": form.socialLinks.trim() || "—",
        "Music links": form.musicLinks.trim() || "—",
        "Photos & assets (how you'll send them)": form.photosAndAssets.trim() || "—",
        "Shows & events": form.showsAndEvents.trim() || "—",
        "Design / color preferences": form.designNotes.trim() || "—",
        "Domain notes": form.domainNotes.trim() || "—",
        "Reference sites": form.referenceSites.trim() || "—",
      });
    } else {
      Object.assign(payload, {
        "Short bio": form.shortBio.trim() || form.bio.trim() || "—",
        "Full bio": form.bio.trim() || "—",
        Genre: form.genre.trim() || "—",
        "Press contact": form.pressContact.trim() || "—",
        "Booking contact": form.bookingContact.trim() || form.email.trim(),
        "Social links": form.socialLinks.trim() || "—",
        "Music & video links": form.musicLinks.trim() || form.videoLinks.trim() || "—",
        "Photos & assets (how you'll send them)": form.photosAndAssets.trim() || "—",
        "Shows & press notes": form.showsAndEvents.trim() || "—",
      });
    }

    payload["Additional notes"] = form.additionalNotes.trim() || "—";

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(STORE_FORM_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
      setForm(emptyForm);
      toast.success("Order received! We'll email you within 24 hours.");
    } catch {
      toast.error(
        "Something went wrong sending your order. Email info@801familystudios.com and we'll help."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-teal-400/30 bg-teal-500/10 p-8 md:p-10 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-3">Thank you!</h3>
        <p className="text-gray-200 max-w-lg mx-auto leading-relaxed">
          We received your {selected.name} order request. Watch your inbox for payment
          details and next steps — usually within 24 hours.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 border-white/25 text-white hover:bg-white/10"
          onClick={() => setSubmitted(false)}
        >
          Submit another order
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" id="order-form">
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
          After you submit, we'll email payment instructions and confirm your project
          timeline. Simple edits are free; complex changes are $20 per edit.
        </p>
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
              required
              value={form.artistOrBandName}
              onChange={(e) => update("artistOrBandName", e.target.value)}
              className={fieldClass}
            />
          </motion.div>
          <motion.div className="space-y-2">
            <Label htmlFor="contactName">Your name *</Label>
            <Input
              id="contactName"
              required
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
              required
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
            required
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
          <Label htmlFor="photosAndAssets">Photos & assets *</Label>
          <Textarea
            id="photosAndAssets"
            required
            rows={3}
            value={form.photosAndAssets}
            onChange={(e) => update("photosAndAssets", e.target.value)}
            placeholder="How will you send logos, photos, and files? (Google Drive, Dropbox, email, etc.)"
            className={fieldClass}
          />
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
              Sending…
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Submit order — ${selected.price}
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
};

export default StoreOrderForm;
