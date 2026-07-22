export type HomeFaq = {
  question: string;
  answer: string;
  link?: { to: string; label: string };
};

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "Do you build websites for musicians and bands?",
    answer:
      "Yes. We design custom websites for musicians and bands with bio, music, photos, show listings, contact forms, and social links — built for how artists actually use the web, not a generic template.",
    link: { to: "/websites-for-musicians", label: "Websites for musicians" },
  },
  {
    question: "What is an EPK and why does a musician need one?",
    answer:
      "An EPK (electronic press kit) is a press-ready page with your bio, photos, music, video, and booking details. Venues, promoters, and media use it to decide whether to book or cover you — one professional link instead of scattered files.",
    link: { to: "/epk-design-for-musicians", label: "EPK design for musicians" },
  },
  {
    question: "Do you offer recording in Sandy, Utah?",
    answer:
      "Yes. Our studio is in Sandy, Utah. We offer hourly, half-day, and full-day sessions for vocals, full bands, podcasts, demos, and overdubs.",
    link: { to: "/recording-studio-sandy-utah", label: "Recording studio in Sandy" },
  },
  {
    question: "Can you help with both a website and an EPK?",
    answer:
      "Yes. Our Website + EPK bundle includes both deliverables from one project brief and saves $50 compared with ordering them separately.",
    link: { to: "/websites-and-epks?product=bundle#order-form", label: "Website + EPK bundle" },
  },
  {
    question: "Do you work with small businesses outside of music?",
    answer:
      "Yes. We build custom websites for creatives and small businesses that need a clear, professional online presence — not only bands and solo artists.",
    link: { to: "/websites-for-musicians", label: "Learn about our websites" },
  },
  {
    question: "How do I start a project with 801 Family Studios?",
    answer:
      "Pick a service from the menu or the section above, review pricing on that page, then contact us. For websites and EPKs, email your completed brief and send a 50% deposit via PayPal or Venmo from the Websites & EPKs page.",
    link: { to: "/contact", label: "Contact us" },
  },
];
