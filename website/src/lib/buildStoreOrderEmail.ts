import { depositAmount, type StoreProduct, type StoreProductId } from "@/lib/storeProducts";

export type StoreOrderFormFields = {
  artistOrBandName: string;
  contactName: string;
  email: string;
  phone: string;
  links: string;
  projectNotes: string;
};

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
    "Artist / band / business": form.artistOrBandName.trim(),
    "Contact name": form.contactName.trim(),
    Email: form.email.trim(),
    Phone: form.phone.trim() || "—",
    Links: form.links.trim() || "—",
    "Project notes": form.projectNotes.trim() || "—",
  };
}
