export type MusicianProfileFormData = {
  fullName: string;
  stageName: string;
  email: string;
  phone: string;
  phoneVisibility: string;
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
  youtube: string;
  spotify: string;
  epk: string;
  profilePhotoLink: string;
  publicContactPreference: string;
};

export function buildMusicianProfileEmailFields(
  data: MusicianProfileFormData
): Record<string, string> {
  const city =
    data.cityArea === "Other Utah" && data.cityAreaOther.trim()
      ? data.cityAreaOther.trim()
      : data.cityArea;

  return {
    _subject: "801 Musician Roster — New Profile Submission",
    "Full name": data.fullName.trim(),
    "Stage / band name": data.stageName.trim() || "—",
    "Checkout email": data.email.trim(),
    Phone: data.phone.trim() || "—",
    "Phone on roster": data.phoneVisibility,
    "City / area": city,
    "Instruments / vocals": data.instruments.trim(),
    Genres: data.genres.join(", ") || "—",
    "Available for": data.availableFor.join(", ") || "—",
    "Travel distance": data.travelDistance,
    "Minimum gig rate": data.minimumGigRate.trim() || "—",
    Availability: data.availability.join(", ") || "—",
    Bio: data.bio.trim(),
    Website: data.website.trim() || "—",
    Instagram: data.instagram.trim() || "—",
    YouTube: data.youtube.trim() || "—",
    Spotify: data.spotify.trim() || "—",
    EPK: data.epk.trim() || "—",
    "Profile photo link": data.profilePhotoLink.trim() || "—",
    "Public contact preference": data.publicContactPreference,
  };
}
