import { formatRosterLocation } from "@/lib/rosterLocation";

export type MusicianProfileFormData = {
  fullName: string;
  stageName: string;
  email: string;
  phone: string;
  homeState: string;
  cityArea: string;
  cityAreaOther: string;
  instruments: string;
  genres: string[];
  availableFor: string[];
  travelDistance: string;
  minimumGigRate: string;
  availability: string[];
  bio: string;
  website: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  spotify: string;
  epk: string;
  profilePhotoLink: string;
  publicContactPreference: string;
};

export function buildMusicianProfileEmailFields(
  data: MusicianProfileFormData,
  stripeCheckoutSessionId?: string | null
): Record<string, string> {
  const location = formatRosterLocation(data);

  return {
    _subject: "801 Musician Roster — New Profile Submission",
    "Full name": data.fullName.trim(),
    "Stage / band name": data.stageName.trim() || "—",
    "Checkout email": data.email.trim(),
    "Stripe checkout session (verify in Dashboard)":
      stripeCheckoutSessionId?.trim() || "— missing — verify subscription manually",
    Phone: data.phone.trim() || "—",
    State: data.homeState.trim() || "—",
    Territory: location || "—",
    "Instruments / vocals": data.instruments.trim(),
    Genres: data.genres.join(", ") || "—",
    "Available for": data.availableFor.join(", ") || "—",
    "Travel distance": data.travelDistance,
    "Minimum gig rate": data.minimumGigRate.trim() || "—",
    Availability: data.availability.join(", ") || "—",
    Bio: data.bio.trim(),
    Website: data.website.trim() || "—",
    Instagram: data.instagram.trim() || "—",
    Facebook: data.facebook.trim() || "—",
    TikTok: data.tiktok.trim() || "—",
    YouTube: data.youtube.trim() || "—",
    Spotify: data.spotify.trim() || "—",
    EPK: data.epk.trim() || "—",
    "Profile photo link": data.profilePhotoLink.trim() || "—",
    "Public contact preference": data.publicContactPreference,
  };
}
