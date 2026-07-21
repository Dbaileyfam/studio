import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, MapPin, Ticket } from "lucide-react";

const UpcomingShows = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const events = [
    {
      id: "tribe-alleykats-june4",
      title: "Tribe of I & The Alley Kats",
      subtitle: "Hog Wallow Pub • Salt Lake City, UT",
      imageSrc: "/images/upcoming/tribe-alleykats-june4-hog-wallow.png",
      imageAlt:
        "Flyer: Tribe of I and The Alley Kats at Hog Wallow Pub on June 4, 2026 in Salt Lake City",
      date: "Thursday, June 4, 2026",
      venue: "Hog Wallow Pub",
      address: "Salt Lake City, UT",
      time: "See flyer for show time",
      note: "Live reggae night — full lineup and times on the flyer.",
      accent: "from-orange-500/30 to-teal-500/30",
    },
    {
      id: "tribe-alleykats-june5",
      title: "Tribe of I & The Alley Kats",
      subtitle: "A Bar Named Sue • Salt Lake City, UT",
      imageSrc: "/images/upcoming/tribe-alleykats-june5-bar-named-sue.png",
      imageAlt:
        "Flyer: Tribe of I and The Alley Kats at A Bar Named Sue on June 5, 2026 in Salt Lake City",
      date: "Friday, June 5, 2026",
      venue: "A Bar Named Sue",
      address: "Salt Lake City, UT",
      time: "See flyer for show time",
      note: "Second stop on the June run — details on the flyer.",
      accent: "from-rose-500/25 to-amber-500/30",
    },
    {
      id: "tribe-alleykats-june6",
      title: "Tribe of I & The Alley Kats",
      subtitle: "Redemption Bar & Grill • Salt Lake City, UT",
      imageSrc: "/images/upcoming/tribe-alleykats-june6-redemption.png",
      imageAlt:
        "Flyer: Tribe of I and The Alley Kats at Redemption Bar & Grill on June 6, 2026 in Salt Lake City",
      date: "Saturday, June 6, 2026",
      venue: "Redemption Bar & Grill",
      address: "Salt Lake City, UT",
      time: "See flyer for show time",
      note: "Closing night of the June trio — see the flyer for full info.",
      accent: "from-teal-500/30 to-orange-500/30",
    },
    {
      id: "magi-one-heart-aug22",
      title: "MAGI & the One Heart Orchestra",
      subtitle: "Fenceline Cider • Mancos, CO",
      imageSrc: "/images/upcoming/magi-one-heart-aug22-fenceline-cider.png",
      imageAlt:
        "Flyer: MAGI and the One Heart Orchestra at Fenceline Cider on August 22, 2026 in Mancos, CO",
      date: "Saturday, August 22, 2026",
      venue: "Fenceline Cider",
      address: "141 South Main Street, Mancos, CO",
      time: "6 PM – 9 PM",
      note: "Original roots reggae — live music at Fenceline Cider.",
      accent: "from-green-500/30 to-yellow-500/25",
      primaryCta: {
        label: "Band website",
        href: "https://oneheartorchestra.com",
        icon: "external" as const,
      },
    },
    {
      id: "magi-one-heart-sept26",
      title: "MAGI & the One Heart Orchestra",
      subtitle: "Stateline Bar & Grill • Dove Creek, CO",
      imageSrc: "/images/upcoming/magi-one-heart-sept26-stateline.png",
      imageAlt:
        "Flyer: MAGI and the One Heart Orchestra at Stateline Bar & Grill on September 26, 2026 in Dove Creek, CO",
      date: "Saturday, September 26, 2026",
      venue: "Stateline Bar & Grill",
      address: "69576 US-491, Dove Creek, CO 81324",
      time: "6 PM – 9 PM",
      note: "Live roots reggae — Four Corners local music. Call 970-677-2649 for venue info.",
      accent: "from-red-500/25 to-green-500/30",
      primaryCta: {
        label: "Band website",
        href: "https://oneheartorchestra.com",
        icon: "external" as const,
      },
    },
  ];

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance text-white">
                Upcoming Shows
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Stay in the loop with live events and performances connected with 801 Family Studios.
              </p>
            </motion.div>

            <div className="space-y-12 max-w-5xl mx-auto">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="max-w-3xl mx-auto"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index * 0.1 + 0.1}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.accent} opacity-40 pointer-events-none`} />

                    <div className="relative">
                      <div className="border-b border-white/15 bg-black/30">
                        <img
                          src={event.imageSrc}
                          alt={event.imageAlt}
                          className="w-full h-auto max-h-[min(78vh,920px)] object-contain bg-black/40"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-7 md:p-9 space-y-6">
                        <div className="text-center space-y-2">
                          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{event.title}</h2>
                          <p className="text-gray-200 text-sm md:text-base leading-relaxed">{event.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                              <Calendar className="w-4 h-4" />
                              <span className="uppercase tracking-wide">Date</span>
                            </div>
                            <p className="text-white font-semibold text-sm md:text-base">{event.date}</p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                              <MapPin className="w-4 h-4" />
                              <span className="uppercase tracking-wide">Venue</span>
                            </div>
                            <p className="text-white font-semibold text-sm md:text-base">{event.venue}</p>
                            <p className="text-gray-300 text-xs mt-1">{event.address}</p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="uppercase tracking-wide">Details</span>
                            </div>
                            <p className="text-white font-semibold text-sm md:text-base">{event.time}</p>
                          </div>
                        </div>

                        <p className="text-gray-100 text-center leading-relaxed">{event.note}</p>

                        {"primaryCta" in event && event.primaryCta && (
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                              href={event.primaryCta.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group btn-brand inline-flex items-center justify-center gap-2 px-7 py-3 hover:scale-105"
                            >
                              <span className="uppercase">{event.primaryCta.label}</span>
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                                {event.primaryCta.icon === "ticket" ? (
                                  <Ticket className="w-3.5 h-3.5" />
                                ) : (
                                  <ExternalLink className="w-3.5 h-3.5" />
                                )}
                              </span>
                            </a>

                            {"secondaryCta" in event && event.secondaryCta && (
                              <a
                                href={event.secondaryCta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                              >
                                <span className="uppercase">{event.secondaryCta.label}</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        )}
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
