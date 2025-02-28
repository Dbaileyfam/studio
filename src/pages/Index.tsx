
import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
            <section className="w-full py-20 md:py-32 flex flex-col items-center">
              <motion.div
                className="text-center max-w-3xl mx-auto px-4"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <span className="inline-block py-1 px-3 mb-6 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
                  Welcome to 801 Family Studios
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance">
                  Capturing your family's most precious moments
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-pretty">
                  Professional photography and videography services specializing in
                  family portraits, weddings, and special events.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="rounded-full">
                    <Link to="/appointments">Book an Appointment</Link>
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
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Family Photography Session"
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
                <span className="inline-block py-1 px-3 mb-4 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
                  Our Services
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-balance">
                  Professional photography services for every occasion
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    title: "Family Portraits",
                    description:
                      "Capture beautiful family moments in stunning indoor or outdoor settings.",
                  },
                  {
                    title: "Wedding Photography",
                    description:
                      "Preserve the magic of your special day with our professional wedding photography services.",
                  },
                  {
                    title: "Special Events",
                    description:
                      "From birthdays to anniversaries, we document all your important life events.",
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

              <motion.div
                className="mt-16 text-center"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={2}
              >
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/appointments">Book a Session</Link>
                </Button>
              </motion.div>
            </section>

            {/* About Section */}
            <section className="w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0}
              >
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Professional camera equipment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.4}
              >
                <span className="inline-block py-1 px-3 mb-4 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
                  About Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                  Professional photographers with a passion for capturing moments
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-pretty">
                  At 801 Family Studios, we believe that every moment tells a story
                  worth preserving. Our team of dedicated photographers and
                  videographers are committed to capturing your most precious
                  memories with unmatched quality and attention to detail.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-pretty">
                  With years of experience and state-of-the-art equipment, we
                  specialize in creating stunning visuals that you'll treasure for
                  generations to come.
                </p>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/contact">Get In Touch</Link>
                </Button>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Index;
