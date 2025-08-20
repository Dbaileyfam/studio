import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EventBooking = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const pricingOptions = [
    { type: "Solo Artist", price: "$800", description: "Perfect for intimate gatherings and smaller events" },
    { type: "DJ", price: "$1,000", description: "Professional DJ services with extensive music library" },
    { type: "Duo", price: "$1,500", description: "Two musicians creating beautiful harmonies together" },
    { type: "Trio", price: "$1,800", description: "Three-piece ensemble for fuller sound" },
    { type: "Quartet", price: "$2,000", description: "Four musicians for rich, layered performances" },
    { type: "Additional Musician", price: "$500", description: "Per musician beyond quartet" },
    { type: "Sound Engineer", price: "$500", description: "Professional audio engineering for perfect sound" },
    { type: "Sound Equipment", price: "$500", description: "High-quality audio equipment rental" }
  ];

  const additionalServices = [
    { service: "Stage", description: "Professional staging for your event" },
    { service: "Lighting", description: "Atmospheric lighting to set the mood" },
    { service: "Dance Floor", description: "Dedicated dance area for your guests" },
    { service: "MC", description: "Master of Ceremonies to keep your event flowing" },
    { service: "Video and Photography", description: "Gearly Beloved Productions - Professional event coverage" },
    { service: "Food Truck", description: "Sol Food - Delicious catering options" }
  ];

  const additionalFactors = [
    "Travel (beyond 50 miles)",
    "Room and board (beyond 100 miles)",
    "Amount and type of material",
    "Quantity and Quality of sound equipment needed",
    "Outdoor weather preparation"
  ];

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner">
            {/* Hero Section */}
            <section className="w-full pt-8 pb-16 text-center">
              <motion.div
                className="max-w-4xl mx-auto px-4"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Event Booking
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                  801 Family Studios Wedding, Private and Corporate Event Entertainment
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto rounded-full"></div>
              </motion.div>
            </section>

            {/* Booking Options */}
            <section className="w-full py-16">
              <motion.div
                className="max-w-6xl mx-auto px-4"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                  How It Works
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={0.2}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-5xl mb-4">🎵</div>
                    <h3 className="text-xl font-bold text-white mb-4">Hire Existing Bands</h3>
                    <p className="text-gray-200">
                      Each band or artist can be hired individually for your event
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={0.4}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-5xl mb-4">🎭</div>
                    <h3 className="text-xl font-bold text-white mb-4">Custom Band Creation</h3>
                    <p className="text-gray-200">
                      We can piece together a band based on your musical desires
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={0.6}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-5xl mb-4">🎪</div>
                    <h3 className="text-xl font-bold text-white mb-4">Build Your Own Band</h3>
                    <p className="text-gray-200">
                      You can even pick the musicians you want with our "build your own band" feature!
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* Pricing Section */}
            <section className="w-full py-16">
              <motion.div
                className="max-w-6xl mx-auto px-4"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                  Pricing
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {pricingOptions.map((option, index) => (
                    <motion.div
                      key={option.type}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                      variants={fadeIn}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      custom={index * 0.1}
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-3xl font-bold text-white mb-2">{option.price}</div>
                      <h3 className="text-lg font-semibold text-white mb-3">{option.type}</h3>
                      <p className="text-gray-200 text-sm">{option.description}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 text-center"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={0.8}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">Additional Services Available</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {additionalServices.map((service, index) => (
                      <div key={service.service} className="flex items-start space-x-3">
                        <div className="text-yellow-400 text-lg">•</div>
                        <div>
                          <div className="font-semibold text-white">{service.service}</div>
                          <div className="text-gray-200 text-sm">{service.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </section>

            {/* Additional Factors */}
            <section className="w-full py-16">
              <motion.div
                className="max-w-4xl mx-auto px-4"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/30">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Important Notes
                  </h3>
                  <p className="text-white mb-6 text-center">
                    *Prices are baseline/minimums. Other factors include:
                  </p>
                  <div className="space-y-3">
                    {additionalFactors.map((factor, index) => (
                      <motion.div
                        key={factor}
                        className="flex items-center space-x-3"
                        variants={fadeIn}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={index * 0.1}
                      >
                        <div className="text-blue-400 text-lg">•</div>
                        <div className="text-gray-200">{factor}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-16">
              <motion.div
                className="max-w-4xl mx-auto px-4 text-center"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Book Your Event?
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Contact us to discuss your specific needs and get a customized quote
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-block bg-white text-[#3f51b5] hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    Contact Us Today
                  </Link>
                </motion.div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default EventBooking;
