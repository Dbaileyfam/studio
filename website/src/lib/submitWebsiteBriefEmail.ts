import type { StoreProductId } from "@/lib/storeProducts";
import { STORE_FORM_EMAIL } from "@/lib/storeProducts";
import {
  formatWebsiteBriefEmailBody,
  packageLabel,
  type WebsiteBriefFiles,
  type WebsiteBriefFormData,
} from "@/lib/websiteBriefForm";

const MAX_TOTAL_UPLOAD_BYTES = 9 * 1024 * 1024; // FormSubmit ~10MB limit

/** Sends the website/EPK brief to websites@ via FormSubmit AJAX (supports file attachments). */
export async function submitWebsiteBriefEmail(
  productId: StoreProductId,
  data: WebsiteBriefFormData,
  files: WebsiteBriefFiles = {}
): Promise<void> {
  const subject = `${packageLabel(productId)} brief — ${data.bandName.trim()}`;
  const message = formatWebsiteBriefEmailBody(productId, data, files);

  const allFiles = Object.values(files).flat();
  const totalBytes = allFiles.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_UPLOAD_BYTES) {
    throw new Error(
      "Uploads are too large (max about 9MB total). Use Google Drive links for bigger files."
    );
  }

  const form = new FormData();
  form.append("_subject", subject);
  form.append("_template", "table");
  form.append("_replyto", data.email.trim());
  form.append("package", packageLabel(productId));
  form.append("band_artist_name", data.bandName.trim());
  form.append("contact_name", data.contactName.trim());
  form.append("email", data.email.trim());
  form.append("phone", data.phone.trim());
  form.append("message", message);

  for (const [key, list] of Object.entries(files)) {
    list?.forEach((file, index) => {
      form.append(`${key}_${index + 1}`, file, file.name);
    });
  }

  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(STORE_FORM_EMAIL)}`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
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
