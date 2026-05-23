import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import MusicianProfileForm from "@/components/MusicianProfileForm";
import PageSEO from "@/components/PageSEO";
import RosterRequestEditLink from "@/components/RosterRequestEditLink";
import { Button } from "@/components/ui/button";
import type { MusicianProfileFormData } from "@/lib/buildMusicianProfileEmail";
import { fetchRosterProfileForEdit, isRosterApiConfigured } from "@/lib/rosterApi";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const MusicianRosterEditPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<MusicianProfileFormData | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    if (!isRosterApiConfigured()) {
      setError("Profile editing is not available on this site build yet.");
      setLoading(false);
      return;
    }

    fetchRosterProfileForEdit(token)
      .then((result) => {
        setProfileData(result.profile);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Could not load your profile");
        setLoading(false);
      });
  }, [token]);

  const showRequestLink = !token;

  return (
    <AnimatedPageTransition>
      <PageSEO
        title="Edit Musician Roster Profile"
        description="Update your 801 Musician Roster listing."
        path="/musician-roster/edit"
        keywords={["edit musician roster profile"]}
      />
      <div className="page-container">
        <div className="page-content">
          <motion.div className="container-inner max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="inline-block rounded-full border border-teal-500/40 bg-teal-950/40 px-4 py-1.5 text-sm font-medium text-teal-200 mb-4">
                {showRequestLink ? "Update your listing" : "Edit mode"}
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Edit your roster profile
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                {showRequestLink
                  ? "Use the email from your subscription to get a private edit link, or open the link we sent you after signup."
                  : "Changes save instantly to the public browse page. Bookmark this page — it is your private edit link."}
              </p>
            </div>

            {showRequestLink && (
              <div className="mb-10">
                <RosterRequestEditLink />
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center py-16 text-gray-300">
                <Loader2 className="h-10 w-10 animate-spin text-teal-400 mb-4" />
                <p>Loading your profile…</p>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-8 text-center max-w-lg mx-auto">
                <p className="text-gray-200 mb-6">{error}</p>
                {!showRequestLink && (
                  <p className="text-sm text-gray-400 mb-4">
                    Lost your link? Request a new one below.
                  </p>
                )}
                {showRequestLink ? null : (
                  <div className="mb-6">
                    <RosterRequestEditLink />
                  </div>
                )}
                <Button asChild variant="outline" className="border-white/25 text-white">
                  <Link to="/contact">Contact 801 Family Studios</Link>
                </Button>
              </div>
            )}

            {!loading && !error && profileData && token && (
              <MusicianProfileForm
                mode="edit"
                editToken={token}
                initialData={profileData}
              />
            )}
          </motion.div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default MusicianRosterEditPage;
