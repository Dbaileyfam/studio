import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import StoreOrderForm from "@/components/StoreOrderForm";
import { motion } from "framer-motion";
import { ExternalLink, Shirt } from "lucide-react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { MERCH_SHOP_URL } from "@/lib/siteNav";
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
  const [searchParams] = useSearchParams();
  if (searchParams.get("product") === "business") {
    return <Navigate to="/small-business-websites#order-brief" replace />;
  }

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
              <a
                href={WEB_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                See 801 Family Websites
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mt-6">
                801 Family Websites for bands start at $500 with a $250 deposit. EPKs start at $200
                with a $100 deposit. Both are $650 with a $325 deposit. Small business
                sites start at $2,000, and that deposit is invoiced — it starts at
                $1,000.
              </p>
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
                      <p className="text-sm uppercase tracking-wide text-gray-400 mt-2">
                        Starting at
                      </p>
                      <p className="text-3xl font-bold text-teal-300">${item.price.toLocaleString()}</p>
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
                        to={`/store?product=${item.id}#order-brief`}
                        className="mt-6 inline-flex text-sm font-semibold text-teal-300 hover:text-teal-200 underline-offset-4 hover:underline"
                      >
                        Start order →
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
                <motion.div className="relative rounded-3xl border border-sky-400/30 bg-white/10 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-teal-500/20 opacity-50 pointer-events-none" />
                  <motion.div className="relative">
                    <span className="text-4xl">🏢</span>
                    <h3 className="text-2xl font-bold text-white mt-4">801 Family Website for Business</h3>
                    <p className="text-sm uppercase tracking-wide text-gray-400 mt-2">
                      Starting at
                    </p>
                    <p className="text-3xl font-bold text-teal-300">$2,000</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Deposit invoiced: from $1,000
                    </p>
                    <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                      A separate brief for shops and service businesses. We email an
                      invoice for half the quoted price. Larger sites cost more.
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-gray-200">
                      <li className="flex gap-2">
                        <span className="text-teal-400">✓</span>
                        Services, hours, photos, and contact
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-400">✓</span>
                        Your own brief, emailed to the studio
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-400">✓</span>
                        50% deposit invoiced after we review it
                      </li>
                    </ul>
                    <Link
                      to="/small-business-websites#order-brief"
                      className="mt-6 inline-flex text-sm font-semibold text-teal-300 hover:text-teal-200 underline-offset-4 hover:underline"
                    >
                      Fill out the small business brief →
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <StoreOrderForm />

            <p className="text-center text-sm text-gray-300 mt-8 max-w-xl mx-auto leading-relaxed">
              801 Family Websites for businesses start at $2,000 for shops and service
              businesses.{" "}
              <Link
                to="/small-business-websites#order-brief"
                className="text-teal-300 hover:underline"
              >
                Fill out the small business brief
              </Link>
              . It emails us, and we invoice a 50% deposit that starts at $1,000.
            </p>

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
