import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PauseCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MusicianRosterUnavailable = () => (
  <AnimatedPageTransition>
    <PageSEO
      title="Musician Roster — Temporarily Unavailable"
      description="The 801 Musician Roster is paused while we improve the experience. Contact 801 Family Studios for questions."
      path="/musician-roster"
      keywords={["801 musician roster"]}
    />
    <div className="page-container">
      <div className="page-content">
        <motion.div className="container-inner max-w-xl mx-auto text-center py-16 md:py-24">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-950/50 border border-amber-500/30 mb-8">
            <PauseCircle className="h-9 w-9 text-amber-300" aria-hidden />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Musician Roster is on pause
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            We are taking a short break from new roster signups and public listings while we
            finish improvements. Thanks for your patience — we will be back soon.
          </p>
          <p className="text-sm text-gray-400 mb-10">
            Questions about an existing membership or listing? Reach out and we will help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white"
            >
              <Link to="/contact">Contact us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10"
            >
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatedPageTransition>
);

export default MusicianRosterUnavailable;
