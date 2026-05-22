import type { ArtistProfileCardData } from "@/components/ArtistProfileCard";
import type { MusicianProfileFormData } from "@/lib/buildMusicianProfileEmail";
import rosterPlaceholder from "@/assets/studio2.jpg";

const normalizeUrl = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes(".") && !trimmed.includes(" ")) {
    return `https://${trimmed}`;
  }
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

export function buildRosterProfilePreview(
  data: MusicianProfileFormData,
  imageUrl: string
): ArtistProfileCardData {
  const city =
    data.cityArea === "Other Utah" && data.cityAreaOther.trim()
      ? data.cityAreaOther.trim()
      : data.cityArea;

  const displayName = data.stageName.trim() || data.fullName.trim();
  const genre =
    data.genres.length > 0
      ? data.genres.slice(0, 4).join(" · ")
      : data.instruments.trim();

  const detailLines = [
    data.instruments.trim(),
    city,
    data.availableFor.length > 0 ? `Available for: ${data.availableFor.join(", ")}` : "",
    data.travelDistance ? `Travel: ${data.travelDistance}` : "",
    data.minimumGigRate.trim() ? `Rate: ${data.minimumGigRate.trim()}` : "",
    data.availability.length > 0 ? `Availability: ${data.availability.join(", ")}` : "",
  ].filter(Boolean);

  const description = [data.bio.trim(), detailLines.join("\n")]
    .filter(Boolean)
    .join("\n\n");

  return {
    name: displayName,
    genre,
    description,
    image: imageUrl || rosterPlaceholder,
    imageFit: "cover",
    social: {
      instagram: normalizeInstagram(data.instagram),
      facebook: normalizeFacebook(data.facebook),
      tiktok: normalizeTiktok(data.tiktok),
      youtube: normalizeUrl(data.youtube),
      music: normalizeUrl(data.spotify),
      website: normalizeUrl(data.website),
      epk: normalizeUrl(data.epk),
    },
  };
}

export function resolveRosterProfileImage(
  profilePhoto: File | null,
  profilePhotoLink: string
): { url: string; revoke?: string } {
  const file = profilePhoto;
  if (file) {
    const url = URL.createObjectURL(file);
    return { url, revoke: url };
  }
  const link = profilePhotoLink.trim();
  if (link && /^https?:\/\//i.test(link)) {
    return { url: link };
  }
  return { url: rosterPlaceholder };
}

export { rosterPlaceholder };
