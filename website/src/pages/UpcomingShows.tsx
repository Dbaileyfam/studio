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

            {/* Event Card */}
            <motion.div
              className="max-w-3xl mx-auto"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0.2}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                {/* Event Title */}
                <div className="p-8 md:p-10 border-b border-white/20">
                  <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 leading-tight">
                    JOIN RHETT, BRADSHAW, MIKE & STEVE FOR A TWO-NIGHT EVENT! 😮
                  </h2>
                  <p className="text-lg text-gray-200 text-center leading-relaxed mb-4">
                    Let's celebrate Bradley's birthday with <span className="font-semibold text-white">Dublime</span>, Dubnectar's tribute to Sublime.
                  </p>
                  <p className="text-lg text-gray-200 text-center leading-relaxed">
                    🙌🏼 Plus, special guest <span className="font-semibold text-white">Ashlie Longo</span> will light up the stage with some No Doubt covers you won't want to miss.
                  </p>
                </div>

                {/* Dates & Venues */}
                <div className="p-8 md:p-10 space-y-8">
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3f51b5] to-[#5c6bc0] flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 uppercase tracking-wider">Night 1</p>
                        <p className="text-xl font-bold text-white">February 20th</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                      <p className="text-lg text-gray-200">A Bar Named Sue – State St.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3f51b5] to-[#5c6bc0] flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 uppercase tracking-wider">Night 2</p>
                        <p className="text-xl font-bold text-white">February 21st</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                      <p className="text-lg text-gray-200">A Bar Named Sue – Highland Dr.</p>
                    </div>
                  </div>

                  {/* Door time & price */}
                  <div className="flex flex-wrap gap-6 sm:gap-10 justify-center pt-4 border-t border-white/20">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <p className="text-gray-200">Doors open at <span className="font-semibold text-white">9:30 PM</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <p className="text-gray-200"><span className="font-semibold text-white">$5</span> at the door 🎵</p>
                    </div>
                  </div>
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
