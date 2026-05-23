import type { MusicianProfileFormData } from "@/lib/buildMusicianProfileEmail";
import { formatRosterLocation } from "@/lib/rosterLocation";
import rosterPlaceholder from "@/assets/studio2.jpg";

export type RosterMusicianCardData = {
  name: string;
  location: string;
  instruments: string;
  genres: string[];
  bio: string;
  availableFor: string[];
  travelDistance: string;
  minimumGigRate: string;
  availability: string[];
  image: string;
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    spotify?: string;
    website?: string;
    epk?: string;
  };
};

const normalizeUrl = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes(".") && !trimmed.includes(" ")) return `https://${trimmed}`;
  return trimmed;
};

const normalizeInstagram = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("@")) {
    return `https://www.instagram.com/${trimmed.slice(1).replace(/\//g, "")}`;
  }
  return normalizeUrl(trimmed);
};

const normalizeTiktok = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("@")) {
    return `https://www.tiktok.com/@${trimmed.slice(1).replace(/\//g, "")}`;
  }
  if (/tiktok\.com/i.test(trimmed)) return normalizeUrl(trimmed);
  const handle = trimmed.replace(/^@/, "").replace(/\//g, "");
  return handle ? `https://www.tiktok.com/@${handle}` : undefined;
};

const normalizeFacebook = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("@")) {
    return `https://www.facebook.com/${trimmed.slice(1).replace(/\//g, "")}`;
  }
  return normalizeUrl(trimmed) ?? `https://www.facebook.com/${trimmed}`;
};

export function buildRosterMusicianCard(
  data: MusicianProfileFormData,
  imageUrl: string
): RosterMusicianCardData {
  return {
    name: data.stageName.trim() || data.fullName.trim(),
    location: formatRosterLocation(data),
    instruments: data.instruments.trim(),
    genres: data.genres.slice(0, 5),
    bio: data.bio.trim(),
    availableFor: data.availableFor,
    travelDistance: data.travelDistance,
    minimumGigRate: data.minimumGigRate.trim(),
    availability: data.availability,
    image: imageUrl || rosterPlaceholder,
    social: {
      instagram: normalizeInstagram(data.instagram),
      facebook: normalizeFacebook(data.facebook),
      tiktok: normalizeTiktok(data.tiktok),
      youtube: normalizeUrl(data.youtube),
      spotify: normalizeUrl(data.spotify),
      website: normalizeUrl(data.website),
      epk: normalizeUrl(data.epk),
    },
  };
}
