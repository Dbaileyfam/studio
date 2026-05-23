import RosterMusicianCard from "@/components/RosterMusicianCard";
import { buildRosterMusicianCard } from "@/lib/rosterCardData";
import type { RosterMusicianCardData } from "@/lib/rosterCardData";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  buildMusicianProfileEmailFields,
  type MusicianProfileFormData,
} from "@/lib/buildMusicianProfileEmail";
import { resolveRosterProfileImage } from "@/lib/rosterProfilePreview";
import {
  AVAILABILITY_OPTIONS,
  AVAILABLE_FOR_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  GENRE_OPTIONS,
  ROSTER_STRIPE_URL,
  TRAVEL_OPTIONS,
} from "@/lib/musicianRoster";
import {
  getTerritoryOptionsForState,
  isOtherTerritory,
  ROSTER_STATE_OPTIONS,
} from "@/lib/rosterLocation";
import {
  createRosterCheckout,
  isRosterApiConfigured,
  updateRosterProfile,
  uploadRosterProfilePhoto,
} from "@/lib/rosterApi";
import { ROSTER_BROWSE_PATH, ROSTER_PROFILE_FORM_PATH, ROSTER_TAXES_FEES_NOTE } from "@/lib/musicianRoster";
import { Link } from "react-router-dom";
import { submitMusicianProfileEmail } from "@/lib/submitMusicianProfileEmail";

const fieldClass =
  "bg-[var(--bg-elevated)] border-white/20 text-white placeholder:text-gray-500";

const sectionClass = "space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8";

const CheckboxGroup = ({
  options,
  selected,
  onChange,
}: {
  options: readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {options.map((option) => {
      const checked = selected.includes(option);
      return (
        <label
          key={option}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 cursor-pointer hover:border-white/25 transition-colors"
        >
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => {
              if (value) onChange([...selected, option]);
              else onChange(selected.filter((item) => item !== option));
            }}
            className="mt-0.5 border-white/40 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
          />
          <span className="text-sm text-gray-200 leading-snug">{option}</span>
        </label>
      );
    })}
  </div>
);

export type MusicianProfileFormProps = {
  mode?: "create" | "edit";
  editToken?: string;
  initialData?: MusicianProfileFormData;
};

const MusicianProfileForm = ({
  mode = "create",
  editToken = "",
  initialData,
}: MusicianProfileFormProps) => {
  const isEdit = mode === "edit";
  const [searchParams] = useSearchParams();
  const submittedFromRedirect = searchParams.get("submitted") === "1";

  const [fullName, setFullName] = useState("");
  const [stageName, setStageName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [homeState, setHomeState] = useState("");
  const [cityArea, setCityArea] = useState("");
  const [cityAreaOther, setCityAreaOther] = useState("");
  const territoryOptions = homeState ? getTerritoryOptionsForState(homeState) : [];
  const [instruments, setInstruments] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [availableFor, setAvailableFor] = useState<string[]>([]);
  const [travelDistance, setTravelDistance] = useState("");
  const [minimumGigRate, setMinimumGigRate] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [spotify, setSpotify] = useState("");
  const [epk, setEpk] = useState("");
  const [profilePhotoLink, setProfilePhotoLink] = useState("");
  const [publicContactPreference, setPublicContactPreference] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(submittedFromRedirect);
  const [previewCard, setPreviewCard] = useState<RosterMusicianCardData | null>(null);
  const [editSaved, setEditSaved] = useState(false);
  const [editBlocked, setEditBlocked] = useState<string | null>(null);
  const [previewImageRevoke, setPreviewImageRevoke] = useState<string | undefined>();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [usedLegacySubmit, setUsedLegacySubmit] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewImageRevoke) URL.revokeObjectURL(previewImageRevoke);
    };
  }, [previewImageRevoke]);

  useEffect(() => {
    if (!initialData) return;
    setFullName(initialData.fullName);
    setStageName(initialData.stageName);
    setEmail(initialData.email);
    setPhone(initialData.phone);
    setHomeState(initialData.homeState);
    setCityArea(initialData.cityArea);
    setCityAreaOther(initialData.cityAreaOther);
    setInstruments(initialData.instruments);
    setGenres(initialData.genres);
    setAvailableFor(initialData.availableFor);
    setTravelDistance(initialData.travelDistance);
    setMinimumGigRate(initialData.minimumGigRate);
    setAvailability(initialData.availability);
    setBio(initialData.bio);
    setWebsite(initialData.website);
    setInstagram(initialData.instagram);
    setFacebook(initialData.facebook);
    setTiktok(initialData.tiktok);
    setYoutube(initialData.youtube);
    setSpotify(initialData.spotify);
    setEpk(initialData.epk);
    setProfilePhotoLink(initialData.profilePhotoLink);
    setPublicContactPreference(initialData.publicContactPreference);
  }, [initialData]);

  const getFormSnapshot = (): MusicianProfileFormData => ({
    fullName,
    stageName,
    email,
    phone,
    homeState,
    cityArea,
    cityAreaOther,
    instruments,
    genres,
    availableFor,
    travelDistance,
    minimumGigRate,
    availability,
    bio,
    website,
    instagram,
    facebook,
    tiktok,
    youtube,
    spotify,
    epk,
    profilePhotoLink,
    publicContactPreference,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter the email you used at checkout.");
      return;
    }
    if (!homeState) {
      toast.error("Please select your state or territory.");
      return;
    }
    if (!cityArea) {
      toast.error("Please select your territory / metro area.");
      return;
    }
    if (isOtherTerritory(cityArea) && !cityAreaOther.trim()) {
      toast.error("Please specify your territory / metro area.");
      return;
    }
    if (!instruments.trim()) {
      toast.error("Please list your instruments or vocals.");
      return;
    }
    if (genres.length === 0) {
      toast.error("Please select at least one genre.");
      return;
    }
    if (availableFor.length === 0) {
      toast.error("Please select what you are available for.");
      return;
    }
    if (!travelDistance) {
      toast.error("Please select your travel distance.");
      return;
    }
    if (availability.length === 0) {
      toast.error("Please select your general availability.");
      return;
    }
    if (!bio.trim()) {
      toast.error("Please add a short public bio.");
      return;
    }
    if (!publicContactPreference) {
      toast.error("Please choose a public contact preference.");
      return;
    }

    setSubmitting(true);
    let snapshot = getFormSnapshot();
    const photoFile = profilePhoto ?? fileInputRef.current?.files?.[0] ?? null;

    if (isEdit && editToken && photoFile) {
      try {
        setEditBlocked(null);
        const uploadedUrl = await uploadRosterProfilePhoto(editToken, photoFile);
        snapshot = { ...snapshot, profilePhotoLink: uploadedUrl };
        setProfilePhotoLink(uploadedUrl);
        setProfilePhoto(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (err) {
        const message = err instanceof Error ? err.message : "Could not upload photo";
        toast.error(message);
        setSubmitting(false);
        return;
      }
    }

    const { url: imageUrl, revoke } = resolveRosterProfileImage(
      photoFile,
      snapshot.profilePhotoLink
    );

    if (previewImageRevoke) URL.revokeObjectURL(previewImageRevoke);
    if (revoke) setPreviewImageRevoke(revoke);

    setPreviewCard(buildRosterMusicianCard(snapshot, imageUrl));

    if (isEdit && editToken) {
      try {
        setEditBlocked(null);
        await updateRosterProfile(editToken, snapshot);
        setEditSaved(true);
        toast.success("Your public listing has been updated.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Could not save changes";
        if (/subscription is not active|hidden from the public/i.test(message)) {
          setEditBlocked(message);
        }
        toast.error(message);
      }
      setSubmitting(false);
      return;
    }

    try {
      if (!isRosterApiConfigured()) {
        throw new Error("Roster API is not configured on this site build.");
      }

      const { checkoutUrl } = await createRosterCheckout(snapshot);
      if (!checkoutUrl?.includes("stripe.com")) {
        throw new Error("Invalid checkout URL from server");
      }
      toast.success("Profile saved — redirecting to secure checkout…");
      window.location.assign(checkoutUrl);
      return;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not save your profile online";

      if (!isRosterApiConfigured()) {
        const fields = buildMusicianProfileEmailFields(snapshot, null);
        submitMusicianProfileEmail(fields, photoFile);
        setCheckoutUrl(ROSTER_STRIPE_URL);
        setUsedLegacySubmit(true);
        setSubmitted(true);
        toast.message(
          "Profile emailed to 801 — use the button below to subscribe on Stripe."
        );
      } else {
        toast.error(
          `${message} Your profile was not saved to the roster database. Please try again or contact 801 Family Studios.`
        );
      }
      setSubmitting(false);
      return;
    }
  };

  if (editSaved) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 text-center max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-white">Profile updated</h2>
        <p className="text-gray-200 leading-relaxed">
          Your changes are live on the public musician roster.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-teal-600 hover:bg-teal-500 text-white">
            <Link to={ROSTER_BROWSE_PATH}>View browse page</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-white/25 text-white"
            onClick={() => setEditSaved(false)}
          >
            Edit again
          </Button>
        </div>
      </motion.div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10"
      >
        <div className="text-center max-w-2xl mx-auto">
          <p className="inline-block rounded-full border border-teal-500/40 bg-teal-950/40 px-4 py-1.5 text-sm font-medium text-teal-200 mb-4">
            {usedLegacySubmit ? "Step 2 — subscribe on Stripe" : "Step 2 — activate your listing"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Profile saved
          </h2>
          <p className="text-gray-200 leading-relaxed">
            {usedLegacySubmit
              ? "Your profile was sent to 801 Family Studios. Subscribe below to join the roster."
              : "Subscribe for $9/month to go live on the public roster. Everyone who completes payment is added automatically."}
          </p>
          <p className="mt-2 text-xs text-gray-400">{ROSTER_TAXES_FEES_NOTE}</p>
        </div>

        {checkoutUrl && (
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold px-10 py-6 text-lg shadow-lg"
            >
              <a href={checkoutUrl}>
                Subscribe $9/month — publish my listing
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        )}

        {previewCard ? (
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-400">
              Preview — how your listing may appear on the roster
            </p>
            <div className="max-w-md mx-auto">
              <RosterMusicianCard musician={previewCard} index={0} />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm">
            Complete the form above if you have not submitted your profile yet.
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <form
      id="roster-profile-form"
      onSubmit={handleSubmit}
      className="space-y-8 scroll-mt-28"
    >
      {editBlocked && (
        <div className="rounded-2xl border border-amber-500/35 bg-amber-950/25 p-6 space-y-4">
          <p className="text-gray-200 text-sm leading-relaxed">{editBlocked}</p>
          <Button
            asChild
            className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white"
          >
            <Link to={ROSTER_PROFILE_FORM_PATH}>Resubscribe to restore your listing</Link>
          </Button>
        </div>
      )}
      <section className={sectionClass}>
        <h3 className="text-lg font-bold text-white">Basic info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name *</Label>
            <Input
              id="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={fieldClass}
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stageName">Stage name / band name</Label>
            <Input
              id="stageName"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass}
              autoComplete="tel"
            />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className="text-lg font-bold text-white">Location & availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>State / territory *</Label>
            <Select
              value={homeState}
              onValueChange={(value) => {
                setHomeState(value);
                setCityArea("");
                setCityAreaOther("");
              }}
            >
              <SelectTrigger className={fieldClass}>
                <SelectValue placeholder="Select state or territory" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {ROSTER_STATE_OPTIONS.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Territory / metro area *</Label>
            <Select
              value={cityArea}
              onValueChange={setCityArea}
              disabled={!homeState}
            >
              <SelectTrigger className={fieldClass}>
                <SelectValue
                  placeholder={
                    homeState ? "Select territory" : "Select state first"
                  }
                />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {territoryOptions.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isOtherTerritory(cityArea) && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="cityAreaOther">Specify territory / metro area *</Label>
              <Input
                id="cityAreaOther"
                placeholder="City, metro, or region"
                value={cityAreaOther}
                onChange={(e) => setCityAreaOther(e.target.value)}
                className={fieldClass}
              />
            </div>
          )}
          <div className="space-y-2 md:col-span-2">
            <Label>Travel distance *</Label>
            <Select value={travelDistance} onValueChange={setTravelDistance}>
              <SelectTrigger className={fieldClass}>
                <SelectValue placeholder="How far will you travel?" />
              </SelectTrigger>
              <SelectContent>
                {TRAVEL_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="minimumGigRate">Minimum gig rate (optional)</Label>
            <Input
              id="minimumGigRate"
              placeholder="e.g. $150 per show, $75/hr session"
              value={minimumGigRate}
              onChange={(e) => setMinimumGigRate(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <Label>General availability *</Label>
          <CheckboxGroup
            options={AVAILABILITY_OPTIONS}
            selected={availability}
            onChange={setAvailability}
          />
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className="text-lg font-bold text-white">Musical profile</h3>
        <div className="space-y-2">
          <Label htmlFor="instruments">Instruments / vocals *</Label>
          <Input
            id="instruments"
            placeholder="e.g. drums, lead vocals, acoustic guitar"
            value={instruments}
            onChange={(e) => setInstruments(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="space-y-2 pt-2">
          <Label>Genres *</Label>
          <CheckboxGroup options={GENRE_OPTIONS} selected={genres} onChange={setGenres} />
        </div>
        <div className="space-y-2 pt-2">
          <Label>Available for *</Label>
          <CheckboxGroup
            options={AVAILABLE_FOR_OPTIONS}
            selected={availableFor}
            onChange={setAvailableFor}
          />
        </div>
        <div className="space-y-2 pt-2">
          <Label htmlFor="bio">Short public bio *</Label>
          <Textarea
            id="bio"
            rows={4}
            placeholder="A few sentences about your experience, style, and what you bring to a gig."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={fieldClass}
          />
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className="text-lg font-bold text-white">Links & photo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              placeholder="@handle or full URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              placeholder="@page or full URL"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              placeholder="@handle or full URL"
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube</Label>
            <Input
              id="youtube"
              type="url"
              placeholder="https://"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spotify">Spotify</Label>
            <Input
              id="spotify"
              type="url"
              placeholder="https://"
              value={spotify}
              onChange={(e) => setSpotify(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="epk">EPK link</Label>
            <Input
              id="epk"
              type="url"
              placeholder="https://"
              value={epk}
              onChange={(e) => setEpk(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="profilePhotoLink">Profile photo link (optional)</Label>
            <Input
              id="profilePhotoLink"
              type="url"
              placeholder="Google Drive, Dropbox, or direct image URL"
              value={profilePhotoLink}
              onChange={(e) => setProfilePhotoLink(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="profilePhoto">Profile photo upload (strongly recommended)</Label>
            <Input
              id="profilePhoto"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={`${fieldClass} file:mr-4 file:rounded-lg file:border-0 file:bg-teal-700 file:px-4 file:py-2 file:text-sm file:text-white`}
              onChange={(e) => setProfilePhoto(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-gray-400">
              JPG or PNG, max 5 MB. Uploads save when you click &quot;Save changes.&quot; Or paste a
              direct image URL above.
            </p>
            {isEdit && profilePhotoLink && !profilePhoto && (
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3">
                <img
                  src={profilePhotoLink}
                  alt="Current profile"
                  className="h-16 w-16 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <p className="text-xs text-gray-400">Current photo on your listing</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className="text-lg font-bold text-white">Public contact</h3>
        <div className="space-y-2">
          <Label>How should bookers reach you on the roster? *</Label>
          <Select
            value={publicContactPreference}
            onValueChange={setPublicContactPreference}
          >
            <SelectTrigger className={fieldClass}>
              <SelectValue placeholder="Select contact preference" />
            </SelectTrigger>
            <SelectContent>
              {CONTACT_PREFERENCE_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold px-10"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting…
          </>
        ) : isEdit ? (
          "Save changes to my listing"
        ) : (
          "Submit musician profile"
        )}
      </Button>
    </form>
  );
};

export default MusicianProfileForm;
