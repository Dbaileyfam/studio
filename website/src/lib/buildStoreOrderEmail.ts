import { depositAmount, type StoreProduct, type StoreProductId } from "@/lib/storeProducts";

export type StoreOrderFormFields = {
  artistOrBandName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  genre: string;
  shortBio: string;
  mediumBio: string;
  bio: string;
  photosAndAssets: string;
  musicLinks: string;
  videoLinks: string;
  socialLinks: string;
  bookingContact: string;
  stageInfo: string;
  pressNotes: string;
  showsAndEvents: string;
  pagesWanted: string;
  mainGoal: string;
  domainNotes: string;
  designNotes: string;
  merchNotes: string;
  additionalNotes: string;
};

const filled = (value: string) => value.trim() || "—";

export function buildStoreOrderEmailFields(
  _product: StoreProductId,
  selected: StoreProduct,
  form: StoreOrderFormFields
): Record<string, string> {
  const deposit = depositAmount(selected.price);
  return {
    _subject: `Store order: ${selected.name} — ${form.artistOrBandName.trim()}`,
    Product: `${selected.name} ($${selected.price})`,
    Deposit: `$${deposit} (50%)`,
    "Artist / band name": form.artistOrBandName.trim(),
    "Contact name": form.contactName.trim(),
    Email: form.email.trim(),
    Phone: filled(form.phone),
    Location: filled(form.location),
    Genre: filled(form.genre),
    "Short bio": filled(form.shortBio),
    "Medium bio": filled(form.mediumBio),
    "Full bio": filled(form.bio),
    "Photos, logo & artwork": filled(form.photosAndAssets),
    "Music links": filled(form.musicLinks),
    "Video links": filled(form.videoLinks),
    "Social links": filled(form.socialLinks),
    "Booking info": filled(form.bookingContact),
    "Stage plot / tech rider": filled(form.stageInfo),
    "Press & credits": filled(form.pressNotes),
    "Shows": filled(form.showsAndEvents),
    "Pages wanted": filled(form.pagesWanted),
    "Main goal": filled(form.mainGoal),
    Domain: filled(form.domainNotes),
    "Design ideas": filled(form.designNotes),
    "Merch / store": filled(form.merchNotes),
    "Additional notes": filled(form.additionalNotes),
  };
}
