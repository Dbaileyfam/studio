import { createClient } from "@supabase/supabase-js";
import type { PublicRosterProfile } from "@/lib/rosterApi";

export function isSupabaseBrowseConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL?.trim() &&
      import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  );
}

export async function fetchPublicRosterFromSupabase(): Promise<PublicRosterProfile[]> {
  const url = import.meta.env.VITE_SUPABASE_URL!.trim();
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY!.trim();
  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("roster_profiles")
    .select("id, full_name, profile")
    .eq("status", "active")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => ({
    id: row.id as string,
    fullName: row.full_name as string,
    profile: row.profile as Record<string, unknown>,
  }));
}
