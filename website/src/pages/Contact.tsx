import { useEffect, useState } from "react";
import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

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
                <Card className="shadow-lg border-gray-200 dark:border-gray-800">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="What's this about?"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Your message"
                            className="min-h-[150px]"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="lg:col-span-4 space-y-6"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.6}
              >
                <Card className="shadow-lg border-gray-200 dark:border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Email</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          info@studiomanagement.com
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Location</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          1836 E Tramway Dr
                          <br />
                          Sandy, UT
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Hours</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Monday - Friday: 9am - 6pm PST
                          <br />
                          Saturday: By appointment
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Contact;
