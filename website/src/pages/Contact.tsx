import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@801familystudios.com",
      link: "mailto:info@801familystudios.com",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Utah, USA",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "(801) 918-6782",
      link: "tel:8019186782",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <div className="container-inner">
            {/* Header Section */}
            <motion.div
              className="text-center mb-20"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <span className="inline-block py-3 px-8 mb-6 text-lg font-bold bg-gradient-to-r from-white/20 to-white/10 text-white rounded-full border border-white/20 backdrop-blur-sm">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Let's Make Music Together
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Ready to take your music to the next level? We're here to help you succeed. 
                Get in touch and let's discuss how we can support your musical journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact Information */}
              <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={1}
              >
                <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      className="flex items-start space-x-4 group"
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <info.icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-200 hover:text-white transition-colors duration-300 text-lg"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-200 text-lg">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Info */}
                <motion.div
                  className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start space-x-3">
                    <MessageCircle size={24} className="text-blue-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Quick Response</h3>
                      <p className="text-gray-200">
                        We typically respond to all inquiries within 24 hours. 
                        For urgent matters, please call us directly.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={2}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
                  <p className="text-gray-200 mb-8">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  
                  {/* Google Forms Embed */}
                  <div className="relative">
                    <iframe
                      src="https://docs.google.com/forms/d/e/1FAIpQLSeIYE9qbS0N7ni-7Lf1WL50p7gxSvwCXrUzG30HvmFpy0itEQ/viewform?embedded=true&usp=pp_url"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      marginHeight={0}
                      marginWidth={0}
                      className="rounded-2xl border border-white/20"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      onLoad={() => {
                        // Simulate form submission success
                        window.addEventListener('message', (event) => {
                          if (event.data.type === 'form-submit') {
                            // Handle form submission success
                          }
                        });
                      }}
                    />
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
