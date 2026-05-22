import type { ArtistProfileCardData } from "@/components/ArtistProfileCard";
import type { MusicianProfileFormData } from "@/lib/buildMusicianProfileEmail";
import {
  buildRosterProfilePreview,
  rosterPlaceholder,
} from "@/lib/rosterProfilePreview";
import type { PublicRosterProfile } from "@/lib/rosterApi";

const asProfile = (raw: Record<string, unknown>): MusicianProfileFormData => ({
  fullName: String(raw.fullName ?? ""),
  stageName: String(raw.stageName ?? ""),
  email: "",
  phone: "",
  cityArea: String(raw.cityArea ?? ""),
  cityAreaOther: String(raw.cityAreaOther ?? ""),
  instruments: String(raw.instruments ?? ""),
  genres: Array.isArray(raw.genres) ? raw.genres.map(String) : [],
  availableFor: Array.isArray(raw.availableFor) ? raw.availableFor.map(String) : [],
  travelDistance: String(raw.travelDistance ?? ""),
  minimumGigRate: String(raw.minimumGigRate ?? ""),
  availability: Array.isArray(raw.availability) ? raw.availability.map(String) : [],
  bio: String(raw.bio ?? ""),
  website: String(raw.website ?? ""),
  instagram: String(raw.instagram ?? ""),
  facebook: String(raw.facebook ?? ""),
  tiktok: String(raw.tiktok ?? ""),
  youtube: String(raw.youtube ?? ""),
  spotify: String(raw.spotify ?? ""),
  epk: String(raw.epk ?? ""),
  profilePhotoLink: String(raw.profilePhotoLink ?? ""),
  publicContactPreference: String(raw.publicContactPreference ?? ""),
});

export function publicRosterToCard(entry: PublicRosterProfile): ArtistProfileCardData {
  const data = asProfile(entry.profile);
  const photoLink = data.profilePhotoLink.trim();
  const image =
    photoLink && /^https?:\/\//i.test(photoLink) ? photoLink : rosterPlaceholder;
  return buildRosterProfilePreview(data, image);
}
