import type { StoreProductId } from "@/lib/storeProducts";
import { STORE_FORM_EMAIL } from "@/lib/storeProducts";
import {
  formatWebsiteBriefEmailBody,
  packageLabel,
  type WebsiteBriefFormData,
} from "@/lib/websiteBriefForm";

/** Sends the website/EPK brief to websites@ via FormSubmit AJAX. */
export async function submitWebsiteBriefEmail(
  productId: StoreProductId,
  data: WebsiteBriefFormData
): Promise<void> {
  const subject = `${packageLabel(productId)} brief — ${data.bandName.trim()}`;
  const message = formatWebsiteBriefEmailBody(productId, data);

  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(STORE_FORM_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _replyto: data.email.trim(),
        package: packageLabel(productId),
        band_artist_name: data.bandName.trim(),
        contact_name: data.contactName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        message,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Could not send brief (${res.status})`);
  }

  const payload = (await res.json().catch(() => null)) as
    | { success?: string | boolean; message?: string }
    | null;

  if (payload && payload.success === false) {
    throw new Error(payload.message || "Could not send brief");
  }
}
