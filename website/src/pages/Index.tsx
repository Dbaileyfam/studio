import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import RevealWords from "@/components/RevealWords";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import logo from "@/assets/locologo.png";
import studioImage from "@/assets/studio2.jpg";

const WEB_PORTFOLIO_URL = "https://dbaileyfam.github.io/801familywebsiteportfolio/";
const HEADLINE = "Where Artists Feel At Home";
const HEADLINE_STAGGER = 0.07;
const HEADLINE_REVEAL_END =
  HEADLINE.split(/\s+/).length * HEADLINE_STAGGER + 0.35;

const Index = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const logoScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.78]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const logoY = useTransform(scrollYProgress, [0, 0.65], [0, -48]);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.55]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.5], [0, -20]);
  const videoY = useTransform(scrollYProgress, [0, 1], [32, -96]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner flex flex-col items-center">
            {/* Hero Section — scroll-driven stage depth */}
            <section
              ref={heroRef}
              className="w-full pt-0 pb-2 md:pb-4 flex flex-col items-center relative"
            >
              {/* Decorative blurs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
                <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-amber-400/20 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-500/15 blur-[120px]" />
              </div>
              <motion.div
                className="text-center max-w-3xl mx-auto px-4 relative z-10"
              >
                <motion.div
                  className="w-96 md:w-[32rem] h-96 md:h-[32rem] mx-auto mb-8 origin-center"
                  style={
                    reduceMotion
                      ? undefined
                      : {
                          scale: logoScale,
                          opacity: logoOpacity,
                          y: logoY,
                        }
                  }
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.02,
                          boxShadow:
                            "0 25px 50px -12px rgba(0,0,0,0.3), 0 0 40px -10px rgba(255,255,255,0.15)",
                        }
                  }
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-full h-full surface-glass rounded-3xl flex items-center justify-center shadow-2xl ring-2 ring-teal-400/30 ring-offset-4 ring-offset-[var(--bg-base)]"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={logo}
                      alt="801 Family Studios Logo"
                      className="w-4/5 h-4/5 object-contain drop-shadow-lg"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  style={
                    reduceMotion
                      ? undefined
                      : { opacity: heroCopyOpacity, y: heroCopyY }
                  }
                >
                  <RevealWords
                    text={HEADLINE}
                    as="h1"
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 text-balance drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    wordClassName="bg-gradient-to-r from-white via-gray-100 to-amber-100/90 bg-clip-text text-transparent"
                    stagger={HEADLINE_STAGGER}
                  />
                  <motion.div
                    className="mx-auto mb-10 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[var(--accent-warm)] to-transparent origin-center"
                    initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{
                      delay: HEADLINE_REVEAL_END,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                  <motion.p
                    className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed"
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: HEADLINE_REVEAL_END + 0.12,
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    Professional music management services in Salt Lake City, Utah, helping independent artists organize, produce, and succeed.
                  </motion.p>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: HEADLINE_REVEAL_END + 0.22,
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                  <Button 
                    asChild 
                    size="lg" 
                    className="rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/15"
                  >
                    <Link to="/featured-artists">Featured Artists</Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    className="rounded-full bg-[var(--accent-warm)] text-[#1f2937] hover:bg-amber-400 border-0 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--accent-warm-soft)]"
                  >
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="w-full mt-16 md:mt-24 aspect-[16/9] max-w-5xl mx-auto overflow-visible rounded-3xl relative will-change-transform"
                style={
                  reduceMotion
                    ? undefined
                    : { y: videoY, scale: videoScale }
                }
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: HEADLINE_REVEAL_END + 0.35,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div className="w-full h-full aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl relative group ring-2 ring-white/10 ring-offset-4 ring-offset-transparent">
                {/* Studio Reel Video */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black">
                  <video
                    className="w-full h-full object-contain"
                    src="/studio.MOV"
                    poster={studioImage}
                    playsInline
                    muted
                    loop
                    autoPlay
                    controls
                    aria-label="801 Family Studios studio reel"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  {/* Floating Content Overlay */}
                  <motion.div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">801 Family Studios</h3>
                    <p className="text-lg opacity-90 drop-shadow-lg">Experience the energy and passion of live music</p>
                  </motion.div>
                </div>
                </motion.div>
              </motion.div>
            </section>

            {/* Section divider */}
            <div className="w-full max-w-2xl mx-auto py-8" aria-hidden>
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Services Section */}
            <section className="w-full py-16 md:py-24">
              <motion.div
                className="text-center mb-16 md:mb-20"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <span className="inline-block py-3 px-8 mb-6 text-lg font-bold bg-white/15 text-white rounded-full border border-white/25 backdrop-blur-sm shadow-lg shadow-black/10 ring-1 ring-[var(--accent-warm)]/30">
                  Our Services
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance text-white mb-6">
                  Recording and management services in one convenient location
                </h2>
                <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                  Comprehensive music services designed to elevate your sound and career
                </p>
                <p className="text-sm md:text-base text-gray-300 mt-4">
                  Click a service card to view pricing
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {(() => {
                  const services = [
                    {
                      title: "Recording",
                      description: "$60/hr. Half Day (4 hrs): $200. Full Day (8 hrs): $400. Vocal, instrument, podcast, overdub, demo, or full band sessions.",
                      icon: "🎙️",
                      gradient: "from-teal-500/20 to-slate-500/20",
                      borderColor: "border-teal-400/30"
                    },
                    {
                      title: "Mixing & Mastering",
                      description: "All services include 2 revisions. Mix: $150/song. Mastering: $50/song. Mix + Master: $175/song.",
                      icon: "🎚️",
                      gradient: "from-green-500/20 to-teal-500/20",
                      borderColor: "border-green-400/30"
                    },
                    {
                      title: "Website Services",
                      description:
                        "Band Website: $300 — one complete site with everything your band needs (bio, music, photos, shows, contact, and links). Simple edits are included free. More complex changes are $20 per edit.",
                      portfolioUrl: WEB_PORTFOLIO_URL,
                      portfolioLabel: "View website portfolio",
                      icon: "💻",
                      gradient: "from-orange-500/20 to-red-500/20",
                      borderColor: "border-orange-400/30"
                    },
                    {
                      title: "EPK Services",
                      description:
                        "Band EPK: $150 — press-ready electronic press kit with bio, photos, music/video, and booking info. Simple edits are included free. More complex changes are $20 per edit.",
                      portfolioUrl: WEB_PORTFOLIO_URL,
                      portfolioLabel: "View EPK & website samples",
                      icon: "📄",
                      gradient: "from-amber-500/15 to-teal-500/20",
                      borderColor: "border-amber-400/30"
                    },
                    {
                      title: "Booking & Management",
                      description: "Booking: 10% of gig income. Management: 20% of total artist revenue. Requires exclusivity agreement + in-person consultation.",
                      icon: "🎵",
                      gradient: "from-yellow-500/20 to-orange-500/20",
                      borderColor: "border-yellow-400/30"
                    },
                    {
                      title: "Studio Rental & Rehearsal",
                      description: "$25/hr (3-hour minimum). Includes rehearsal space, basic setup help, and basic rehearsal mix support. Add-ons: Sound Tech Support $25/hr, Rehearsal Recording $50/hr.",
                      icon: "🎛️",
                      gradient: "from-cyan-500/20 to-blue-500/20",
                      borderColor: "border-cyan-400/30"
                    },
                    {
                      title: "Drum Lessons",
                      description: "$120/month. Two 1-hour lessons per month.",
                      icon: "🥁",
                      gradient: "from-pink-500/20 to-rose-500/20",
                      borderColor: "border-pink-400/30"
                    },
                    {
                      title: "Social Media & Promotion",
                      description: "Monthly Content Push Support: $150/month (you make the content, we market it). Artist Growth Package: $500/month (12 posts from your media, content support and push, FB + Instagram engagement).",
                      icon: "📣",
                      gradient: "from-emerald-500/20 to-teal-500/20",
                      borderColor: "border-emerald-400/30"
                    }
                  ];
                  return services;
                })().map((service, index) => (
                  <motion.div
                    key={service.title}
                    onClick={() =>
                      setExpandedService((current) =>
                        current === service.title ? null : service.title
                      )
                    }
                    className="block h-full text-left cursor-pointer rounded-3xl"
                  >
                    <motion.div
                      className="group relative h-full"
                      variants={fadeIn}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      custom={index * 0.2}
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Card Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Card Content */}
                      <div className={`relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border ${service.borderColor} hover:border-white/40 hover:shadow-xl hover:shadow-black/15 transition-all duration-500 h-full flex flex-col cursor-pointer overflow-hidden`}>
                        {/* Top shine */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        {/* Icon */}
                        <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-gray-100 transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        {expandedService === service.title ? (
                          <>
                            <p className="text-gray-200 leading-relaxed text-center flex-grow group-hover:text-gray-100 transition-colors duration-300">
                              {service.description}
                            </p>
                            <div
                              className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
                              onClick={(event) => event.stopPropagation()}
                              onKeyDown={(event) => event.stopPropagation()}
                            >
                              {"portfolioUrl" in service && service.portfolioUrl && (
                                <a
                                  href={service.portfolioUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                                >
                                  {service.portfolioLabel ?? "View portfolio"}
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                              <Link
                                to="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-[var(--accent-warm)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)] hover:bg-amber-400 transition-colors"
                              >
                                Contact Us to Book
                              </Link>
                            </div>
                          </>
                        ) : <div className="flex-grow" />}
                        
                        {/* Hover Effect Line */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-300 max-w-4xl mx-auto text-center mt-12 leading-relaxed">
                Policies: Deposits may be required for booking. Cancellations may incur fees. Custom projects available upon consultation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Index;
