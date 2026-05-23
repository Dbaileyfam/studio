/** Optional transactional email for roster edit links (Resend). */
export async function sendRosterEditLinkEmail(
  toEmail: string,
  fullName: string,
  editUrl: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const from =
    process.env.ROSTER_EMAIL_FROM?.trim() ??
    "801 Family Studios <onboarding@resend.dev>";

  const safeName = fullName.trim() || "there";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [toEmail],
      subject: "801 Musician Roster — edit your profile",
      html: `
        <p>Hi ${escapeHtml(safeName)},</p>
        <p>Use this private link to update your public Musician Roster listing (photo, bio, links, availability):</p>
        <p><a href="${escapeHtml(editUrl)}">${escapeHtml(editUrl)}</a></p>
        <p>Bookmark it — you can return anytime while your subscription is active.</p>
        <p>— 801 Family Studios</p>
      `.trim(),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Resend failed", res.status, text);
    return false;
  }

  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
