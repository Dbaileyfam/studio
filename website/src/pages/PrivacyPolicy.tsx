import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { motion } from "framer-motion";

const sectionClass = "space-y-3 text-gray-300 leading-relaxed";

const PrivacyPolicy = () => {
  return (
    <AnimatedPageTransition>
      <PageSEO
        title="Privacy Policy"
        description="Privacy Policy for 801 Family Studios website and Musician Roster."
        path="/privacy"
      />
      <div className="page-container">
        <motion.div className="page-content">
          <article className="container-inner max-w-3xl mx-auto prose prose-invert prose-sm md:prose-base">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: May 23, 2026</p>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">1. Overview</h2>
              <p>
                801 Family Studios (&quot;we,&quot; &quot;us&quot;) respects your privacy. This
                policy describes how we collect, use, and share information when you use{" "}
                <a href="https://www.801familystudios.com" className="text-teal-300 underline">
                  www.801familystudios.com
                </a>{" "}
                and related services, including the Musician Roster.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">2. Information we collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contact &amp; profile information</strong> — name, email, phone, location,
                  bio, instruments, links, photos, and preferences you submit in forms or roster
                  profiles.
                </li>
                <li>
                  <strong>Payment information</strong> — processed by Stripe. We do not store full
                  card numbers on our servers.
                </li>
                <li>
                  <strong>Usage data</strong> — basic logs from our hosting providers (e.g., IP
                  address, browser type, pages visited) for security and performance.
                </li>
                <li>
                  <strong>Communications</strong> — emails or messages you send to us.
                </li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">3. How we use information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Operate the website and Musician Roster (including public listings).</li>
                <li>Process subscriptions and respond to inquiries.</li>
                <li>Send service-related messages (e.g., edit links, roster updates).</li>
                <li>Improve our services and protect against fraud or abuse.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">4. Sharing</h2>
              <p>We may share information with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Service providers</strong> — e.g., Stripe (payments), Supabase (data
                  storage), Vercel (hosting), email providers, and similar vendors who process data
                  on our behalf.
                </li>
                <li>
                  <strong>Public roster</strong> — profile fields you choose to publish on the
                  browse page are visible to site visitors.
                </li>
                <li>
                  <strong>Legal requirements</strong> — when required by law or to protect rights
                  and safety.
                </li>
              </ul>
              <p>We do not sell your personal information.</p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">5. Retention &amp; security</h2>
              <p>
                We keep information as long as needed to provide services and meet legal
                obligations. We use reasonable technical and organizational measures to protect
                data, but no system is completely secure.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">6. Your choices</h2>
              <p>
                You may request access, correction, or deletion of your information by emailing{" "}
                <a href="mailto:info@801familystudios.com" className="text-teal-300 underline">
                  info@801familystudios.com
                </a>
                . Roster members can update profiles via the edit link. You may cancel Stripe
                subscription billing through Stripe or by contacting us.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">7. Children</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect
                information from children under 13.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">8. Changes &amp; contact</h2>
              <p>
                We may update this policy by posting a new version on this page. Contact:{" "}
                <a href="mailto:info@801familystudios.com" className="text-teal-300 underline">
                  info@801familystudios.com
                </a>
                , Sandy, UT.
              </p>
            </section>
          </article>
        </motion.div>
      </div>
    </AnimatedPageTransition>
  );
};

export default PrivacyPolicy;
