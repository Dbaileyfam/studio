import { useEffect, useState } from "react";
import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <span className="inline-block py-1 px-3 mb-4 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
                Get In Touch
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-balance">
                Contact Us
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-pretty">
                Have questions or want to learn more about our services? Fill out
                the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <motion.div
                className="lg:col-span-8"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.4}
              >
                <Card className="shadow-lg border-gray-200 dark:border-gray-800 overflow-hidden">
                  <CardContent className="p-0">
                    {isLoading ? (
                      <div className="h-[600px] flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-gray-800 animate-spin"></div>
                          <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Loading contact form...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-[600px] h-full">
                        <iframe
                          src="https://docs.google.com/forms/d/e/1FAIpQLSeyUUGrW2-WD69I6EMBfp0OIkOG6W2KZxnmSc3NICNRJr_eqw/viewform?embedded=true"
                          width="100%"
                          height="700"
                          frameBorder="0"
                          marginHeight={0}
                          marginWidth={0}
                          title="Contact Form"
                          className="w-full h-full"
                          onLoad={() => {
                            toast({
                              title: "Contact form loaded",
                              description: "You can now send us your message.",
                            });
                          }}
                        >
                          Loading contact form...
                        </iframe>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="lg:col-span-4"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.6}
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-400">
                      <p>
                        <span className="font-semibold block">Email:</span>
                        <a
                          href="mailto:info@801familystudios.com"
                          className="hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          info@801familystudios.com
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold block">Phone:</span>
                        <a
                          href="tel:+18019185690"
                          className="hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          (801) 918-5690
                        </a>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4">Studio Location</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      1836 E Tramway Drive
                      <br />
                      Sandy, UT 84092
                    </p>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.7990261294387!2d-111.84137548459513!3d40.57637957934631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875262d0e9c2f0c9%3A0x7f3a08c3a5f5b8e0!2s1836%20E%20Tramway%20Dr%2C%20Sandy%2C%20UT%2084092!5e0!3m2!1sen!2sus!4v1629308000000!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Google Maps"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Contact;
