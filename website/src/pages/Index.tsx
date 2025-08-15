import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/locologo.png";

const Index = () => {
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
            {/* Hero Section */}
            <section className="w-full pt-0 pb-2 md:pb-4 flex flex-col items-center">
              <motion.div
                className="text-center max-w-3xl mx-auto px-4"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <motion.div
                  className="text-center mb-4 relative"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={0}
                >
                </motion.div>
                <motion.div
                  className="w-96 md:w-[32rem] h-96 md:h-[32rem] mx-auto mb-4 bg-[#3f51b5] rounded-2xl flex items-center justify-center"
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={0.2}
                >
                  <img
                    src={logo}
                    alt="801 Family Studios Logo"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance">
                  Your home for all your music management needs
                </h1>
                <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto text-pretty">
                  Professional music management services to help you organize, produce, and succeed in your musical journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="outline" className="rounded-full">
                    <Link to="/featured-artists">Featured Artists</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="w-full mt-16 md:mt-24 aspect-[16/9] max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={1}
              >
                <img
                  src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Live Band Performance"
                  className="w-full h-full object-cover transition-image"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
              </motion.div>
            </section>

            {/* Services Section */}
            <section className="w-full py-24">
              <motion.div
                className="text-center mb-16"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <span className="inline-block py-2 px-6 mb-4 text-lg font-bold bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
                  Our Services
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-balance">
                  Recording and management services in one convenient location
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    title: "Recording Services",
                    description:
                      "Affordable and professional studio recording with dedicated sound engineers to help bring your music to life.",
                  },
                  {
                    title: "Booking Services",
                    description:
                      "We'll help you find the perfect local venues and events for your music. Our team manages all the details, from negotiations to logistics, so you can focus on performing.",
                  },
                  {
                    title: "Marketing Services",
                    description:
                      "Build your brand and grow your audience with strategic social media management, content creation, and digital marketing campaigns.",
                  },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={index * 0.2 + 1}
                    className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all group"
                  >
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-pretty">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Index;
