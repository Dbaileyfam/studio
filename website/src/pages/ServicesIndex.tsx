import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { SERVICES, getServicePath } from "@/lib/services";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ServicesIndex = () => {
  return (
    <AnimatedPageTransition>
      <PageSEO
        title="Music Studio Services"
        description="Recording, mixing, mastering, band websites, EPKs, booking, rehearsal space, drum lessons, and promotion — all at 801 Family Studios in Salt Lake City, Utah."
        path="/services"
        keywords={[
          "music studio services",
          "recording studio Utah",
          "band website EPK",
          "artist management booking",
        ]}
      />
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner max-w-6xl mx-auto">
            <motion.header
              className="text-center mb-12 md:mb-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-balance">
                Studio Services
              </h1>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Recording, web design, artist development, and more — explore each service
                for pricing, details, and how to get started at 801 Family Studios in{" "}
                <span className="text-white">Salt Lake City, Utah</span>.
              </p>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.slug}
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index * 0.08}
                >
                  <Link
                    to={getServicePath(service.slug)}
                    className="group block h-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    <div
                      className={`relative h-full rounded-3xl border ${service.borderColor} bg-white/10 backdrop-blur-md p-8 hover:border-white/40 transition-all duration-300 flex flex-col`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        aria-hidden
                      />
                      <div className="relative flex flex-col h-full">
                        <span className="text-5xl mb-4" aria-hidden>
                          {service.icon}
                        </span>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-teal-100 transition-colors">
                          {service.cardTitle}
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                          {service.cardDescription}
                        </p>
                        <span className="mt-6 inline-flex items-center text-sm font-semibold text-teal-300 group-hover:text-teal-200">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default ServicesIndex;
