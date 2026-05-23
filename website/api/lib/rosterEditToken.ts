import type { SupabaseClient } from "@supabase/supabase-js";
import { siteUrl } from "./stripe.js";

/** Assign edit_token when missing (e.g. profiles created before the edit column existed). */
export async function ensureRosterEditToken(
  supabase: SupabaseClient,
  profileId: string
): Promise<string | null> {
  const { data: row, error } = await supabase
    .from("roster_profiles")
    .select("edit_token")
    .eq("id", profileId)
    .maybeSingle();

  if (error) {
    console.error("ensureRosterEditToken lookup", error);
    return null;
  }

  const existing = row?.edit_token as string | undefined;
  if (existing) return existing;

  const token = crypto.randomUUID();
  const { error: updateError } = await supabase
    .from("roster_profiles")
    .update({ edit_token: token, updated_at: new Date().toISOString() })
    .eq("id", profileId);

  if (updateError) {
    console.error("ensureRosterEditToken update", updateError);
    return null;
  }

  return token;
}

export function rosterEditUrl(token: string): string {
  return `${siteUrl()}/musician-roster/edit?token=${token}`;
}
