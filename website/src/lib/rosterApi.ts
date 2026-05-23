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
  editUrl?: string;
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

export type ActivateRosterResult = {
  profileId: string;
  status: "active" | "pending_payment";
  message?: string;
  editUrl?: string;
};

export type RosterProfileForEdit = {
  profileId: string;
  email: string;
  fullName: string;
  profile: MusicianProfileFormData;
};

/** After Stripe Checkout, confirm payment and publish the profile (webhook backup). */
export async function activateRosterFromCheckout(
  sessionId: string,
  profileId?: string | null
): Promise<ActivateRosterResult> {
  const params = new URLSearchParams();
  if (sessionId.trim()) params.set("session_id", sessionId.trim());
  if (profileId?.trim()) params.set("profile_id", profileId.trim());
  if (!params.toString()) {
    throw new Error("Missing session_id and profile_id");
  }

  const url = apiBase
    ? `${apiBase}/api/roster-activate?${params}`
    : `/api/roster-activate?${params}`;

  const res = await fetch(url);
  const data = await parseJson<ActivateRosterResult & { error?: string }>(res);
  if (!res.ok && data.error) {
    throw new Error(data.error);
  }
  return {
    profileId: data.profileId,
    status: data.status === "active" ? "active" : "pending_payment",
    message: data.message,
    editUrl: data.editUrl,
  };
}

export async function fetchRosterProfileForEdit(
  token: string
): Promise<RosterProfileForEdit> {
  const url = apiBase
    ? `${apiBase}/api/roster-profile-edit?token=${encodeURIComponent(token)}`
    : `/api/roster-profile-edit?token=${encodeURIComponent(token)}`;

  const res = await fetch(url);
  const data = await parseJson<RosterProfileForEdit & { error?: string }>(res);
  return data;
}

export async function updateRosterProfile(
  token: string,
  profile: MusicianProfileFormData
): Promise<void> {
  const url = apiBase ? `${apiBase}/api/roster-update` : "/api/roster-update";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, profile }),
  });
  await parseJson<{ ok: boolean; error?: string }>(res);
}

export async function requestRosterEditLink(
  email: string
): Promise<{ message: string; sent?: boolean }> {
  const url = apiBase
    ? `${apiBase}/api/roster-request-edit-link`
    : "/api/roster-request-edit-link";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim() }),
  });

  return parseJson<{ message: string; sent?: boolean }>(res);
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
