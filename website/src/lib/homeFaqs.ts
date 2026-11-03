export type HomeFaq = {
  question: string;
  answer: string;
  link?: { to: string; label: string };
};

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "Do you build websites for musicians and bands?",
    answer:
      "Yes. 801 Family Websites for musicians and bands include bio, music, photos, show listings, contact forms, and social links — built for how artists actually use the web, not a generic template.",
    link: { to: "/websites-for-musicians", label: "801 Family Websites" },
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
      "Yes. An 801 Family Website + EPK includes both deliverables from one project brief and saves $50 compared with ordering them separately.",
    link: { to: "/store?product=bundle#order-brief", label: "801 Family Website + EPK" },
  },
  {
    question: "Do you work with small businesses outside of music?",
    answer:
      "Yes. 801 Family Websites for small businesses start at $2,000. Fill out the brief on that page and it emails us. We reply with an invoice for a 50% deposit. Larger sites cost more. Simple edits are included free. Complex changes are $25/hr.",
    link: { to: "/small-business-websites", label: "801 Family Websites for business" },
  },
  {
    question: "How do I start a project with 801 Family Studios?",
    answer:
      "Pick a service from the menu or the section above, then review pricing on that page. 801 Family Websites start at $500 ($250 deposit) and EPKs at $200 ($100 deposit), paid from the 801 Family Websites page. Small business sites start at $2,000, and that deposit is invoiced — it starts at $1,000.",
    link: { to: "/contact", label: "Contact us" },
  },
];
