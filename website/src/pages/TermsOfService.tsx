import AnimatedPageTransition from "@/components/AnimatedPageTransition";
import PageSEO from "@/components/PageSEO";
import { motion } from "framer-motion";

const sectionClass = "space-y-3 text-gray-300 leading-relaxed";

const TermsOfService = () => {
  return (
    <AnimatedPageTransition>
      <PageSEO
        title="Terms of Service"
        description="Terms of Service for 801 Family Studios website, services, and Musician Roster."
        path="/terms"
      />
      <div className="page-container">
        <motion.div className="page-content">
          <article className="container-inner max-w-3xl mx-auto prose prose-invert prose-sm md:prose-base">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Terms of Service
            </h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: May 23, 2026</p>

            <p className="text-gray-300 text-sm border border-amber-500/30 bg-amber-950/20 rounded-lg px-4 py-3 mb-8">
              This page is provided for general business purposes and is not legal advice. Have a
              licensed attorney review these terms for your specific situation.
            </p>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">1. Who we are</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your use of the website and
                services operated by 801 Family Studios (&quot;we,&quot; &quot;us,&quot;
                &quot;our&quot;), including studio services, booking and management offerings, and
                the Musician Roster. By using our site or services, you agree to these Terms.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">2. Musician Roster</h2>
              <p>
                The Musician Roster is a <strong>paid listing and connection service</strong> only.
                It helps musicians appear in a public directory and helps bookers discover
                musicians. We do <strong>not</strong> guarantee gigs, bookings, income, or any
                particular result from membership.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  We are not the employer of roster musicians and do not control when, where, or
                  whether they perform.
                </li>
                <li>
                  We are not a party to agreements between musicians, venues, bookers, or clients
                  unless we enter a separate written agreement with you.
                </li>
                <li>
                  We are <strong>not responsible</strong> for the conduct, safety, reliability,
                  legality, or performance of any musician, venue, booker, client, or other third
                  party. You interact with others at your own risk.
                </li>
                <li>
                  Roster membership fees are for visibility and listing only. Unless stated in a
                  separate signed agreement, we do not take commission on gigs booked solely
                  through roster listings.
                </li>
                <li>
                  Separate booking and artist management services may include commission or other
                  fees as outlined in those service agreements.
                </li>
                <li>Applicable taxes and fees may apply to membership and related charges.</li>
              </ul>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">3. Subscriptions &amp; payments</h2>
              <p>
                Musician Roster subscriptions are billed through Stripe (currently $9/month plus
                applicable taxes and fees, subject to change with notice). You manage billing and
                cancellation through Stripe or by contacting us. Fees are generally non-refundable
                except where required by law.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">4. Your profile &amp; content</h2>
              <p>
                You are responsible for information in your roster profile (including photos,
                links, and descriptions). You represent that you have the right to post that content
                and that it is accurate and lawful. You grant us a license to display and use your
                profile content to operate the roster. We may remove listings that violate these
                Terms or that we reasonably believe are harmful, misleading, or inappropriate.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">5. Other services</h2>
              <p>
                Studio, booking, management, and other services may be governed by separate quotes,
                contracts, or agreements. If there is a conflict between those agreements and these
                Terms, the separate agreement controls for that service.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">6. Disclaimers</h2>
              <p>
                THE SITE AND ROSTER ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO
                THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
                INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">7. Limitation of liability</h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, 801 FAMILY STUDIOS AND ITS OWNERS,
                EMPLOYEES, AND AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, LOST GIGS, OR
                PERSONAL INJURY ARISING FROM USE OF THE SITE, ROSTER, OR THIRD-PARTY INTERACTIONS.
                OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE ROSTER OR SITE WILL NOT EXCEED
                THE AMOUNT YOU PAID US FOR ROSTER MEMBERSHIP IN THE TWELVE (12) MONTHS BEFORE THE
                CLAIM.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">8. Indemnity</h2>
              <p>
                You agree to indemnify and hold harmless 801 Family Studios from claims arising
                from your profile content, your conduct, or your arrangements with third parties,
                except to the extent caused by our gross negligence or willful misconduct.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">9. Governing law</h2>
              <p>
                These Terms are governed by the laws of the State of Utah, without regard to
                conflict-of-law rules. Disputes will be brought in state or federal courts located
                in Salt Lake County, Utah, unless otherwise required by law.
              </p>
            </section>

            <section className={sectionClass}>
              <h2 className="text-xl font-bold text-white mt-8 mb-2">10. Changes &amp; contact</h2>
              <p>
                We may update these Terms from time to time by posting a new version on this page.
                Continued use after changes means you accept the updated Terms.
              </p>
              <p>
                Questions:{" "}
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

export default TermsOfService;
