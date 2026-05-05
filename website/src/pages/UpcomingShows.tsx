import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Upcoming Shows
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Stay in the loop with live events and performances connected with 801 Family Studios.
              </p>
            </motion.div>

            <div className="space-y-12 max-w-4xl mx-auto">
              {[
                {
                  title: "The Bellerose Band with Unseen Corners and The Beer Pressure",
                  link: "https://fb.me/e/7PnCoqubx",
                },
                {
                  title: "Vana Liya at Soundwell",
                  link: "https://fb.me/e/5OADAGbMw",
                },
                {
                  title: "NYAHMIDI Live at Redemption Bar & Grill",
                  link: "https://www.facebook.com/share/15cqDxRBmWw/",
                },
              ].map((event, index) => (
                <motion.div
                  key={event.link}
                  className="max-w-3xl mx-auto"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index * 0.1 + 0.1}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                    <div className="p-8 md:p-10">
                      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 leading-tight">
                        {event.title}
                      </h2>
                      <div className="flex justify-center pt-2">
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-[#3f51b5] via-[#5c6bc0] to-[#7e8ce0] text-white text-sm font-semibold tracking-wide border border-white/30 shadow-lg shadow-indigo-900/40 hover:shadow-xl hover:shadow-indigo-700/50 hover:scale-105 hover:from-[#4b60d4] hover:to-[#8c99f0] transition-all duration-300"
                        >
                          <span className="uppercase">View Facebook Event</span>
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default UpcomingShows;
