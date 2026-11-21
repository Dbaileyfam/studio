import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import StoreOrderForm from "@/components/StoreOrderForm";
import { motion } from "framer-motion";
import { ExternalLink, Mail, Shirt } from "lucide-react";
import { Link } from "react-router-dom";
import { MERCH_SHOP_URL } from "@/lib/siteNav";
import {
  SMALL_BUSINESS_INQUIRY_MAILTO,
  SMALL_BUSINESS_WEBSITE,
  STORE_FORM_EMAIL,
  STORE_PRODUCTS,
  WEB_PORTFOLIO_URL,
} from "@/lib/storeProducts";
import { STORE_PATH } from "@/lib/siteNav";

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
                801 Family Websites
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Band websites start at $500 with a $250 deposit. EPKs start at $200 with
                a $100 deposit. Both together are $650 with a $325 deposit. Small
                business sites start at $2,000, and that deposit is invoiced — it starts
                at $1,000. Email{" "}
                <a
                  href={SMALL_BUSINESS_INQUIRY_MAILTO}
                  className="text-teal-300 hover:text-teal-200 underline-offset-4 hover:underline"
                >
                  {STORE_FORM_EMAIL}
                </a>{" "}
                to get started.
              </p>
              <a
                href={WEB_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-teal-300 hover:text-teal-200 text-sm font-medium"
              >
                See 801 Family Websites
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
                      <p className="text-3xl font-bold text-teal-300 mt-2">
                        ${item.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        50% deposit: ${Math.round(item.price / 2).toLocaleString()}
                      </p>
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
                        to={`${STORE_PATH}?product=${item.id}#order-form`}
                        className="mt-6 inline-flex text-sm font-semibold text-teal-300 hover:text-teal-200 underline-offset-4 hover:underline"
                      >
                        Start order →
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
                <motion.div
                  id="small-business"
                  className={`relative scroll-mt-24 rounded-3xl border ${SMALL_BUSINESS_WEBSITE.borderColor} bg-white/10 backdrop-blur-sm p-6 md:p-8 overflow-hidden`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${SMALL_BUSINESS_WEBSITE.accent} opacity-50 pointer-events-none`}
                  />
                  <motion.div className="relative">
                    <span className="text-4xl">{SMALL_BUSINESS_WEBSITE.icon}</span>
                    <h3 className="text-2xl font-bold text-white mt-4">
                      {SMALL_BUSINESS_WEBSITE.name}
                    </h3>
                    <p className="text-3xl font-bold text-teal-300 mt-2">
                      Starting at ${SMALL_BUSINESS_WEBSITE.startingPrice.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Deposit invoiced: from $
                      {SMALL_BUSINESS_WEBSITE.depositFrom.toLocaleString()}
                    </p>
                    <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                      {SMALL_BUSINESS_WEBSITE.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-gray-200">
                      {SMALL_BUSINESS_WEBSITE.includes.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="text-teal-400">✓</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={SMALL_BUSINESS_INQUIRY_MAILTO}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent-warm)] text-[var(--bg-base)] hover:bg-amber-400 px-4 py-2.5 text-sm font-semibold transition-colors"
                    >
                      <Mail className="h-4 w-4" aria-hidden />
                      Email {STORE_FORM_EMAIL}
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <StoreOrderForm />

            <motion.div
              className="mt-14 rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-center max-w-xl mx-auto"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={2}
            >
              <p className="text-gray-200 text-sm leading-relaxed flex flex-wrap items-center justify-center gap-2">
                <Shirt className="h-4 w-4 text-teal-300 shrink-0" aria-hidden />
                <span>Looking for studio apparel?</span>
                <a
                  href={MERCH_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 font-medium"
                >
                  Shop merch on Shopify
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </p>
            </motion.div>

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
              </Link>
              . Small business websites: email{" "}
              <a
                href={SMALL_BUSINESS_INQUIRY_MAILTO}
                className="text-teal-300 hover:underline"
              >
                {STORE_FORM_EMAIL}
              </a>
              .
            </motion.p>
          </motion.div>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default Store;
