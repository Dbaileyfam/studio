import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import MusicianProfileForm from "@/components/MusicianProfileForm";
import PageSEO from "@/components/PageSEO";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MusicianProfileFormPage = () => {
  return (
    <AnimatedPageTransition>
      <PageSEO
        title="Musician Roster Profile"
        description="Complete your 801 Musician Roster profile after subscribing. Profiles are reviewed before being added to the public roster."
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
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 text-balance">
                Musician roster profile
              </h1>
              <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Thanks for joining the 801 Musician Roster. Your subscription is
                active. Please complete your musician profile below. Profiles are
                reviewed before being added to the public roster.
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
