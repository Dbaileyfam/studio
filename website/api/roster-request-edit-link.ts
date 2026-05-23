import { corsHeaders, jsonResponse } from "./lib/cors.js";
import { sendRosterEditLinkEmail } from "./lib/rosterEditLinkEmail.js";
import { ensureRosterEditToken, rosterEditUrl } from "./lib/rosterEditToken.js";
import { getSupabaseAdmin } from "./lib/supabaseAdmin.js";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

/** Look up active roster profile by email and return a private edit link (optional Resend email). */
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
      return jsonResponse(
        request,
        {
          ok: false,
          message:
            "We could not look up your profile right now. Try again in a minute or contact 801 Family Studios.",
        },
        500
      );
    }

    if (!row) {
      return jsonResponse(request, {
        ok: false,
        message:
          "No active Musician Roster profile found for that email. Use the same email you used for Stripe checkout, or contact 801 Family Studios.",
      });
    }

    let token = row.edit_token as string | undefined;
    if (!token) {
      token = (await ensureRosterEditToken(supabase, row.id as string)) ?? undefined;
    }

    if (!token) {
      console.error("No edit_token for profile", row.id);
      return jsonResponse(
        request,
        {
          ok: false,
          message:
            "Your profile is active but edit links are not set up yet. Contact 801 Family Studios.",
        },
        500
      );
    }

    const editUrl = rosterEditUrl(token);
    const emailSent = await sendRosterEditLinkEmail(
      row.email as string,
      row.full_name as string,
      editUrl
    );

    return jsonResponse(request, {
      ok: true,
      editUrl,
      emailSent,
      apiVersion: 2,
      message: emailSent
        ? "Your edit link is below. We also emailed a copy — check spam if you do not see it."
        : "Your private edit link is below. Bookmark it to update your listing anytime.",
    });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Server error";
    return jsonResponse(request, { ok: false, message }, 500);
  }
}
