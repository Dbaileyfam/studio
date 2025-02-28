
import { useEffect, useState } from "react";
import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const Appointments = () => {
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
    
    // Add Square Appointments script
    const script = document.createElement("script");
    script.src = "https://square.site/appointments/buyer/widget/8q4rhmw1bnvchj/L3QG4BB7F9DBZ.js";
    script.async = true;
    script.onload = () => {
      toast({
        title: "Appointment system loaded",
        description: "You can now book your session with us.",
      });
    };
    script.onerror = () => {
      toast({
        title: "Unable to load appointment system",
        description: "Please refresh the page or try again later.",
        variant: "destructive",
      });
    };
    
    document.body.appendChild(script);
    
    return () => {
      clearTimeout(timer);
      document.body.removeChild(script);
    };
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
              <span className="inline-block py-1 px-3 mb-4 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
                Schedule a Session
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-balance">
                Book Your Appointment
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-pretty">
                Use our online scheduling system to book your photography session.
                Choose the service, date, and time that works best for you.
              </p>
            </motion.div>

            <motion.div
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
                          Loading appointment system...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[600px]">
                      {/* Square Appointments Widget */}
                      <div id="square-appointments-js"></div>
                      
                      {/* Fallback in case script doesn't load */}
                      <noscript>
                        <div className="p-8 text-center">
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            To book an appointment, please enable JavaScript or
                            contact us directly.
                          </p>
                          <a
                            href="tel:+18015555555"
                            className="text-blue-600 dark:text-blue-400 underline"
                          >
                            (801) 555-5555
                          </a>
                        </div>
                      </noscript>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="mt-16 max-w-3xl mx-auto"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0.6}
            >
              <h2 className="text-2xl font-bold mb-6">Appointment Information</h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <p className="text-pretty">
                  Please arrive 10-15 minutes before your scheduled appointment
                  time. This allows us to prepare and make the most of our session
                  time together.
                </p>
                <p className="text-pretty">
                  If you need to reschedule or cancel your appointment, please do
                  so at least 24 hours in advance.
                </p>
                <p className="text-pretty">
                  For any questions regarding your appointment, please contact us
                  at (801) 555-5555 or email us at info@801familystudios.com.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Appointments;
