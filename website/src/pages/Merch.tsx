import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shirt, Music } from "lucide-react";

const Merch = () => {
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
                Merch
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Rep 801 Family Studios with official gear. More drops coming soon.
              </p>
            </motion.div>

            {/* Placeholder / Coming soon card */}
            <motion.div
              className="max-w-2xl mx-auto"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0.2}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden shadow-2xl p-12 md:p-16 text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3f51b5] to-[#5c6bc0] mb-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Shirt className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  More merch on the way
                </h2>
                <p className="text-lg text-gray-200 mb-8 max-w-md mx-auto">
                  We're putting together tees, hoodies, and more. Want to be first to know when we drop? Get in touch.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>

            {/* Optional tagline */}
            <motion.div
              className="text-center mt-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0.3}
            >
              <p className="text-gray-400 flex items-center justify-center gap-2">
                <Music className="w-5 h-5" />
                Where Artists Feel At Home
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Merch;
