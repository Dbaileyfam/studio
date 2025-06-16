import { useEffect, useState } from "react";
import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from Google Forms
      if (event.data && typeof event.data === 'string' && event.data.includes('formSubmitted')) {
        toast({
          title: "Message sent!",
          description: "We've received your message and will get back to you soon.",
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [toast]);

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
              <p className="text-lg text-white mb-8 text-pretty">
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
                <div className="relative p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-800">
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                      <div className="h-8 w-8 rounded-full border-2 border-primary border-r-transparent animate-spin" />
                    </div>
                  )}
                  
                  <div className="w-full overflow-hidden" style={{ minHeight: "500px" }}>
                    <iframe 
                      src="https://docs.google.com/forms/d/e/1FAIpQLSeIYE9qbS0N7ni-7Lf1WL50p7gxSvwCXrUzG30HvmFpy0itEQ/viewform?embedded=true&usp=pp_url" 
                      title="Contact Form"
                      width="100%" 
                      height="1000" 
                      frameBorder="0" 
                      marginHeight={0}
                      marginWidth={0}
                      onLoad={() => setIframeLoaded(true)}
                      className="w-full -mt-8 -ml-2"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="lg:col-span-4 space-y-6"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.6}
              >
                <div className="p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-white">
                        info@801familystudios.com
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-white">
                        1836 E Tramway Dr
                        <br />
                        Sandy, UT
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-white">
                        8019186782
                      </p>
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
