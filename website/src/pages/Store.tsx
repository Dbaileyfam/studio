import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import MerchProductGrid from "@/components/MerchProductGrid";
import StoreOrderForm from "@/components/StoreOrderForm";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingBag } from "lucide-react";
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
              <span className="inline-flex items-center gap-2 py-3 px-6 mb-6 text-sm font-bold bg-white/15 text-white rounded-full border border-white/25 backdrop-blur-sm ring-1 ring-teal-400/30">
                <ShoppingBag className="h-4 w-4" />
                801 Family Studios Store
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-balance">
                Merch, websites & EPKs
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Shop studio apparel on Shopify, or order a custom band website or press kit
                through the form below.
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

            <MerchProductGrid />

            <motion.div
              className="border-t border-white/15 pt-14 md:pt-16 mb-12"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={1}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
                Band website & EPK
              </h2>
              <p className="text-gray-300 text-center text-sm md:text-base mb-8 max-w-xl mx-auto">
                Pick a package, send your project brief, then complete payment on the next
                screen.
              </p>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
