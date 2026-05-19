import type { StoreProduct, StoreProductId } from "@/lib/storeProducts";

export type StoreOrderFormFields = {
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

export function buildStoreOrderEmailFields(
  product: StoreProductId,
  selected: StoreProduct,
  form: StoreOrderFormFields
): Record<string, string> {
  const payload: Record<string, string> = {
    _subject: `Store order: ${selected.name} — ${form.artistOrBandName.trim()}`,
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
      "Photos & assets link": form.photosAndAssets.trim() || "—",
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
      "Photos & assets link": form.photosAndAssets.trim() || "—",
      "Shows & press notes": form.showsAndEvents.trim() || "—",
    });
  }

  payload["Additional notes"] = form.additionalNotes.trim() || "—";
  return payload;
}
