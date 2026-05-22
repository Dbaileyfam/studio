import { ROSTER_FORM_EMAIL, ROSTER_STRIPE_SUCCESS_URL } from "@/lib/musicianRoster";

const IFRAME_NAME = "formsubmit_musician_roster";

/** Sends roster profile via FormSubmit (supports optional photo file via multipart POST). */
export function submitMusicianProfileEmail(
  fields: Record<string, string>,
  profilePhoto?: File | null
): void {
  let iframe = document.getElementById(IFRAME_NAME) as HTMLIFrameElement | null;
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = IFRAME_NAME;
    iframe.id = IFRAME_NAME;
    iframe.title = "Musician roster profile submission";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
    document.body.appendChild(iframe);
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://formsubmit.co/${encodeURIComponent(ROSTER_FORM_EMAIL)}`;
  form.target = IFRAME_NAME;
  form.acceptCharset = "UTF-8";
  if (profilePhoto) {
    form.enctype = "multipart/form-data";
  }

  const hidden: Record<string, string> = {
    ...fields,
    _template: "table",
    _captcha: "false",
    _next: `${ROSTER_STRIPE_SUCCESS_URL}?submitted=1`,
  };

  for (const [name, value] of Object.entries(hidden)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  if (profilePhoto) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "profile_photo";
    const transfer = new DataTransfer();
    transfer.items.add(profilePhoto);
    fileInput.files = transfer.files;
    form.appendChild(fileInput);
  }

  document.body.appendChild(form);
  form.submit();
  form.remove();
}
