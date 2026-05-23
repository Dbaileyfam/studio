import { corsHeaders, jsonResponse } from "./lib/cors.js";
import { ensureRosterEditToken, rosterEditUrl } from "./lib/rosterEditToken.js";
import { getSupabaseAdmin } from "./lib/supabaseAdmin.js";

const GENERIC_OK =
  "If an active Musician Roster profile exists for that email, we sent a private edit link. Check your inbox and spam folder.";

async function emailEditLink(toEmail: string, fullName: string, editUrl: string) {
  const form = new FormData();
  form.append("_subject", "801 Musician Roster — edit your profile");
  form.append("_template", "table");
  form.append("_captcha", "false");
  form.append("Name", fullName);
  form.append(
    "Edit your listing",
    editUrl
  );
  form.append(
    "Instructions",
    "Open the edit link above to update your photo, bio, social links, and availability. Bookmark it — this is your private link while you are subscribed."
  );

  await fetch(`https://formsubmit.co/${encodeURIComponent(toEmail)}`, {
    method: "POST",
    body: form,
  });
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

/** Send a private edit link to the email on file for an active roster profile. */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(request, { error: "A valid email is required" }, 400);
    }

    const supabase = getSupabaseAdmin();
    const { data: rows, error } = await supabase
      .from("roster_profiles")
      .select("id, status, email, full_name, edit_token")
      .eq("email", email)
      .eq("status", "active")
      .order("updated_at", { ascending: false })
      .limit(1);

    const row = rows?.[0];

    if (error) {
      console.error(error);
      return jsonResponse(request, { message: GENERIC_OK, sent: false });
    }

    if (!row) {
      return jsonResponse(request, { message: GENERIC_OK, sent: false });
    }

    let token = row.edit_token as string | undefined;
    if (!token) {
      token = (await ensureRosterEditToken(supabase, row.id as string)) ?? undefined;
    }

    if (!token) {
      console.error("No edit_token for profile", row.id);
      return jsonResponse(request, { message: GENERIC_OK, sent: false });
    }

    const editUrl = rosterEditUrl(token);
    await emailEditLink(row.email as string, row.full_name as string, editUrl);

    return jsonResponse(request, { message: GENERIC_OK, sent: true });
  } catch (err) {
    console.error(err);
    return jsonResponse(request, { message: GENERIC_OK, sent: false });
  }
}
