import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import MerchProductGrid from "@/components/MerchProductGrid";
import StoreOrderForm from "@/components/StoreOrderForm";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { STORE_PRODUCTS, WEB_PORTFOLIO_URL } from "@/lib/storeProducts";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Store = () => {
  return (
    <AnimatedPageTransition>
      <div className="page-container">
        <div className="page-content">
          <motion.div className="container-inner max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12 md:mb-14"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-balance">
                Websites, EPKs & Merch
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Order a custom band Website or press kit below, or shop studio apparel on
                Shopify.
              </p>
              <a
                href={WEB_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-teal-300 hover:text-teal-200 text-sm font-medium"
              >
                View our web portfolio
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              className="mb-12"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={1}
            >
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {STORE_PRODUCTS.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`relative rounded-3xl border ${item.borderColor} bg-white/10 backdrop-blur-sm p-6 md:p-8 overflow-hidden`}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-50 pointer-events-none`}
                    />
                    <motion.div className="relative">
                      <span className="text-4xl">{item.icon}</span>
                      <h3 className="text-2xl font-bold text-white mt-4">{item.name}</h3>
                      <p className="text-3xl font-bold text-teal-300 mt-2">${item.price}</p>
                      <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <ul className="mt-5 space-y-2 text-sm text-gray-200">
                        {item.includes.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span className="text-teal-400">✓</span>
                            {line}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/store?product=${item.id}#order-form`}
                        className="mt-6 inline-flex text-sm font-semibold text-teal-300 hover:text-teal-200 underline-offset-4 hover:underline"
                      >
                        Start order →
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <StoreOrderForm />

            <MerchProductGrid />

            <motion.p
              className="text-center text-sm text-gray-400 mt-10"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={2}
            >
              Questions before ordering?{" "}
              <Link to="/contact" className="text-teal-300 hover:underline">
                Contact us
              </Link>{" "}
              — we&apos;re happy to help.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Store;
