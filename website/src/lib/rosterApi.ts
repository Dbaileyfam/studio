import type { MusicianProfileFormData } from "@/lib/buildMusicianProfileEmail";
import { ROSTER_API_BASE_FALLBACK } from "@/lib/rosterApiBase";
import {
  fetchPublicRosterFromSupabase,
  isSupabaseBrowseConfigured,
} from "@/lib/rosterSupabaseBrowse";

function resolveApiBase(): string {
  const fromEnv = import.meta.env.VITE_ROSTER_API_BASE?.trim();
  const base = fromEnv || ROSTER_API_BASE_FALLBACK.trim();
  return base.replace(/\/$/, "");
}

const apiBase = resolveApiBase();

export type CreateRosterCheckoutResult = {
  profileId: string;
  checkoutUrl: string;
};

export type RosterProfileStatus = {
  profileId: string;
  status: "pending_payment" | "active" | "cancelled";
  email: string;
  fullName: string;
};

/** True when the Vercel roster API URL is available (env or rosterApiBase fallback). */
export function isRosterApiConfigured(): boolean {
  return Boolean(apiBase);
}

/** True when the browse page can load active profiles (Vercel API and/or Supabase anon). */
export function isRosterBrowseConfigured(): boolean {
  return isRosterApiConfigured() || isSupabaseBrowseConfigured();
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return data;
}

export async function createRosterCheckout(
  data: MusicianProfileFormData
): Promise<CreateRosterCheckoutResult> {
  const url = apiBase
    ? `${apiBase}/api/roster-create-checkout`
    : "/api/roster-create-checkout";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email.trim(),
      fullName: data.fullName.trim(),
      profile: data,
    }),
  });

  return parseJson<CreateRosterCheckoutResult>(res);
}

export type PublicRosterProfile = {
  id: string;
  fullName: string;
  profile: Record<string, unknown>;
};

export async function fetchPublicRoster(): Promise<PublicRosterProfile[]> {
  if (apiBase) {
    const res = await fetch(`${apiBase}/api/roster-list`);
    const data = await parseJson<{ profiles: PublicRosterProfile[] }>(res);
    return data.profiles ?? [];
  }
  if (isSupabaseBrowseConfigured()) {
    return fetchPublicRosterFromSupabase();
  }
  throw new Error("Roster browse is not configured");
}

export async function fetchRosterProfileStatus(
  profileId: string
): Promise<RosterProfileStatus> {
  const url = apiBase
    ? `${apiBase}/api/roster-status?profile_id=${encodeURIComponent(profileId)}`
    : `/api/roster-status?profile_id=${encodeURIComponent(profileId)}`;

  const res = await fetch(url);
  return parseJson<RosterProfileStatus>(res);
}
