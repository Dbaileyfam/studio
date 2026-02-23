import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";

const UpcomingShows = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Upcoming Shows
              </h1>
            </motion.div>

            {/* NYAHMIDI - May 9 */}
            <motion.div
              className="max-w-3xl mx-auto"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0.2}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                <div className="p-8 md:p-10 border-b border-white/20">
                  <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 leading-tight">
                    🔥 NYAHMIDI Live at Redemption Bar & Grill
                  </h2>
                  <p className="text-lg text-gray-200 text-center leading-relaxed mb-4">
                    Feel the rhythm. Feed the soul. 🔥
                  </p>
                  <p className="text-lg text-gray-200 text-center leading-relaxed mb-4">
                    Get ready for a night of powerful roots, reggae vibes, and high-energy grooves as <span className="font-semibold text-white">NYAHMIDI</span> takes over Redemption Bar & Grill! 🌿🦁
                  </p>
                  <p className="text-lg text-gray-200 text-center leading-relaxed">
                    Expect deep basslines, conscious lyrics, and nonstop movement from start to finish. Whether you're coming to skank, sway, or just soak in the atmosphere, this is the reggae night you don't want to miss.
                  </p>
                </div>
                <div className="p-8 md:p-10 space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3f51b5] to-[#5c6bc0] flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 uppercase tracking-wider">Date</p>
                        <p className="text-xl font-bold text-white">Saturday, May 9</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                      <p className="text-lg text-gray-200">Redemption Bar & Grill</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-6 sm:gap-10 justify-center pt-2 border-t border-white/20">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <p className="text-gray-200"><span className="font-semibold text-white">9 PM</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <p className="text-gray-200"><span className="font-semibold text-white">$10</span> Tickets 🎟</p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-center text-lg pt-2">
                    Come early, grab a drink, and lock in your spot — it's going to be a lion-hearted celebration of music and unity.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default UpcomingShows;
