import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import MusicianProfileForm from "@/components/MusicianProfileForm";
import PageSEO from "@/components/PageSEO";
import { ROSTER_NO_COMMISSION, ROSTER_COMMISSION_DISCLAIMER } from "@/lib/musicianRoster";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MusicianProfileFormPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("cancelled") === "1") {
      toast.message("Checkout cancelled — your profile is saved. Subscribe when you're ready.");
    }
  }, [searchParams]);

  return (
    <AnimatedPageTransition>
      <PageSEO
        title="Musician Roster Profile"
        description="Create your 801 Musician Roster profile, then subscribe to appear on the public roster automatically."
        path="/musician-profile-form"
        keywords={["musician roster profile", "801 musician roster"]}
      />
      <div className="page-container">
        <div className="page-content">
          <motion.div className="container-inner max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-10 md:mb-12"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <p className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-200 mb-4">
                Step 1 of 2 — build your profile
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-balance">
                Musician roster profile
              </h1>
              <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Fill out your profile first. After you submit, subscribe for $9/month on
                Stripe — everyone who pays is added to the public musician roster
                automatically.
              </p>
              <p className="mt-4 text-sm text-teal-200/90 max-w-xl mx-auto">
                {ROSTER_NO_COMMISSION}
              </p>
              <p className="mt-2 text-xs text-gray-400 max-w-xl mx-auto">
                {ROSTER_COMMISSION_DISCLAIMER}
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={1}
            >
              <MusicianProfileForm />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default MusicianProfileFormPage;
