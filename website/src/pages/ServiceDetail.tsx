import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import {
  getServiceBySlug,
  getServicePath,
  getServiceSlugFromPathname,
} from "@/lib/services";
import { SITE_NAME, SITE_URL, sitePath } from "@/lib/site";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ServiceDetail = () => {
  const { pathname } = useLocation();
  const slug = getServiceSlugFromPathname(pathname);
  const service = getServiceBySlug(slug);

  useEffect(() => {
    if (!service) return;

    const scriptId = "service-jsonld";
    const existing = document.getElementById(scriptId);
    existing?.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.metaDescription,
      provider: {
        "@type": "MusicGroup",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Salt Lake City",
        containedInPlace: { "@type": "State", name: "Utah" },
      },
      url: sitePath(getServicePath(service.slug)),
      offers: service.pricing.map((tier) => ({
        "@type": "Offer",
        name: tier.label,
        price: tier.price,
        priceCurrency: "USD",
        description: tier.note,
      })),
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => document.getElementById(scriptId)?.remove();
  }, [service]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const path = getServicePath(service.slug);

  return (
    <AnimatedPageTransition>
      <PageSEO
        title={service.title}
        description={service.metaDescription}
        path={path}
        keywords={service.keywords}
      />
      <div className="page-container">
        <div className="page-content">
          <article className="container-inner max-w-4xl mx-auto">
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              custom={0}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
            </motion.div>

            <motion.header
              className={`relative rounded-3xl border ${service.borderColor} bg-white/10 backdrop-blur-sm p-8 md:p-12 overflow-hidden mb-10`}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              custom={1}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 pointer-events-none`}
                aria-hidden
              />
              <div className="relative">
                <span className="text-5xl" aria-hidden>
                  {service.icon}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mt-6 text-balance">
                  {service.title}
                </h1>
                <p className="text-lg text-teal-200/90 mt-4 leading-relaxed">
                  {service.heroSubtitle}
                </p>
              </div>
            </motion.header>

            <motion.p
              className="text-lg text-gray-200 leading-relaxed mb-10"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              custom={2}
            >
              {service.intro}
            </motion.p>

            {service.sections.map((section, index) => (
              <motion.section
                key={section.heading}
                className="mb-10"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={index * 0.1}
              >
                <h2 className="text-2xl font-bold text-white mb-3">{section.heading}</h2>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((line) => (
                      <li key={line} className="flex gap-2 text-gray-200 text-sm md:text-base">
                        <span className="text-teal-400 shrink-0">✓</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}

            <motion.section
              className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 md:p-8 mb-10"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-5">Pricing</h2>
              <ul className="space-y-4">
                {service.pricing.map((tier) => (
                  <li
                    key={tier.label}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-white font-medium">{tier.label}</span>
                    <span className="text-teal-300 font-bold text-xl">{tier.price}</span>
                    {tier.note && (
                      <span className="text-sm text-gray-400 sm:basis-full sm:order-3">
                        {tier.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.section>

            {service.faqs.length > 0 && (
              <motion.section
                className="mb-10"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-5">Common questions</h2>
                <div className="space-y-6">
                  {service.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center pt-4"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Button
                asChild
                className="rounded-full bg-[var(--accent-warm)] text-[var(--bg-base)] hover:bg-amber-400 px-8 py-6 text-base font-semibold"
              >
                <Link to={service.primaryCta.to}>
                  {service.primaryCta.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {service.secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/30 text-white hover:bg-white/10 px-6 py-6"
                >
                  <a
                    href={service.secondaryCta.href}
                    target={service.secondaryCta.external ? "_blank" : undefined}
                    rel={
                      service.secondaryCta.external ? "noopener noreferrer" : undefined
                    }
                  >
                    {service.secondaryCta.label}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              <Link
                to="/contact"
                className="text-sm text-gray-400 hover:text-teal-300 underline-offset-4 hover:underline"
              >
                Questions? Contact us
              </Link>
            </motion.div>

            {service.relatedPrompt && (
              <motion.aside
                className="mt-12 rounded-2xl border border-teal-400/30 bg-teal-500/10 px-6 py-8 text-center"
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <p className="text-lg text-gray-100 font-medium mb-4">
                  {service.relatedPrompt.text}
                </p>
                <Link
                  to={service.relatedPrompt.to}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  {service.relatedPrompt.linkLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.aside>
            )}
          </article>
        </div>
      </div>
    </AnimatedPageTransition>
  );
};

export default ServiceDetail;
