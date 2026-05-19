import { STORE_FORM_EMAIL } from "@/lib/storeProducts";

const IFRAME_NAME = "formsubmit_store_order";

/** Sends order details via FormSubmit (no CORS — uses a hidden form POST). */
export function submitStoreOrderEmail(fields: Record<string, string>): void {
  let iframe = document.getElementById(IFRAME_NAME) as HTMLIFrameElement | null;
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = IFRAME_NAME;
    iframe.id = IFRAME_NAME;
    iframe.title = "Order submission";
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden";
    document.body.appendChild(iframe);
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://formsubmit.co/${encodeURIComponent(STORE_FORM_EMAIL)}`;
  form.target = IFRAME_NAME;
  form.acceptCharset = "UTF-8";

  const hidden: Record<string, string> = {
    ...fields,
    _template: "table",
    _captcha: "false",
  };

  for (const [name, value] of Object.entries(hidden)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  form.remove();
}
