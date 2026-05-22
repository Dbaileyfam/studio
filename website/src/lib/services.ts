import { WEB_PORTFOLIO_URL } from "@/lib/storeProducts";

export type ServiceSlug =
  | "recording"
  | "mixing-mastering"
  | "websites"
  | "epk"
  | "booking-management"
  | "studio-rental"
  | "drum-lessons"
  | "social-media";

export type ServicePricing = {
  label: string;
  price: string;
  note?: string;
};

export type ServiceSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type Service = {
  slug: ServiceSlug;
  title: string;
  cardTitle: string;
  /** Shorter label for the top navigation menu. */
  navLabel: string;
  metaDescription: string;
  keywords: string[];
  icon: string;
  gradient: string;
  borderColor: string;
  cardDescription: string;
  /** Short homepage card copy without pricing — full details on the service page. */
  homeTeaser: string;
  heroSubtitle: string;
  intro: string;
  sections: ServiceSection[];
  pricing: ServicePricing[];
  faqs: ServiceFAQ[];
  primaryCta: { label: string; to: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
  /** Cross-promotion shown at the bottom of the service page. */
  relatedPrompt?: { text: string; to: string; linkLabel: string };
  /** When false, hidden from the homepage, services hub, and sitemap. */
  published?: boolean;
};

const ALL_SERVICES: Service[] = [
  {
    slug: "recording",
    cardTitle: "Recording",
    navLabel: "Recording",
    title: "Studio Recording in Salt Lake City",
    metaDescription:
      "Professional studio recording in Sandy, Utah — vocals, bands, podcasts, and demos. Half-day and full-day session rates at 801 Family Studios.",
    keywords: [
      "studio recording Salt Lake City",
      "band recording Utah",
      "vocal recording studio",
      "podcast recording Sandy UT",
    ],
    icon: "🎙️",
    gradient: "from-teal-500/20 to-slate-500/20",
    borderColor: "border-teal-400/30",
    cardDescription:
      "$60/hr. Half Day (4 hrs): $200. Full Day (8 hrs): $400. Vocal, instrument, podcast, overdub, demo, or full band sessions.",
    homeTeaser:
      "Vocal, instrument, podcast, overdub, demo, or full band sessions in a focused, comfortable studio.",
    heroSubtitle: "Capture your sound with room, gear, and engineers who care about the performance.",
    intro:
      "Our recording sessions are built for artists who want a focused, comfortable environment — whether you are tracking a single vocal, a full band, a podcast, or layered overdubs. We help you get takes that feel right, not just levels that look right on a meter.",
    sections: [
      {
        heading: "What we record",
        body: "From intimate vocal sessions to full-band live takes, we adapt the setup to your project.",
        bullets: [
          "Vocals, instruments, and full bands",
          "Podcasts and spoken-word projects",
          "Demos, overdubs, and multi-track sessions",
          "Session planning and basic arrangement support",
        ],
      },
      {
        heading: "Why record with us",
        body:
          "You get a real studio room, experienced support, and a workflow that respects your time and creative energy — without the pressure of a rushed session.",
      },
    ],
    pricing: [
      { label: "Hourly", price: "$60/hr" },
      { label: "Half day (4 hours)", price: "$200" },
      { label: "Full day (8 hours)", price: "$400" },
    ],
    faqs: [
      {
        question: "Do I need to bring my own engineer?",
        answer:
          "No. We provide studio support during your session. If you work with an outside engineer, coordinate with us when booking.",
      },
      {
        question: "Can I book a short demo session?",
        answer: "Yes. Hourly blocks work well for demos, overdubs, and quick vocal captures.",
      },
    ],
    primaryCta: { label: "Book a session", to: "/contact" },
    relatedPrompt: {
      text: "Need mixing/mastering after recording?",
      to: "/mixing-mastering",
      linkLabel: "Mixing & mastering services",
    },
  },
  {
    slug: "mixing-mastering",
    cardTitle: "Mixing & Mastering",
    navLabel: "Mix & Master",
    title: "Mixing & Mastering Services",
    metaDescription:
      "Professional mixing and mastering in Utah — $150/song mix, $50/song master, or $175 combined. Two revisions included at 801 Family Studios.",
    keywords: [
      "mixing and mastering Utah",
      "song mixing Salt Lake City",
      "audio mastering services",
      "music production Sandy UT",
    ],
    icon: "🎚️",
    gradient: "from-green-500/20 to-teal-500/20",
    borderColor: "border-green-400/30",
    cardDescription:
      "All services include 2 revisions. Mix: $150/song. Mastering: $50/song. Mix + Master: $175/song.",
    homeTeaser:
      "Professional mixing and mastering with included revisions so your music translates on every speaker.",
    heroSubtitle: "Polish your tracks with clarity, punch, and balance that translate on every speaker.",
    intro:
      "Great mixes give your music space to breathe. Our mixing and mastering services help your songs sound intentional — whether you recorded with us or at home. Every package includes two revisions so you can refine the final result with confidence.",
    sections: [
      {
        heading: "Mixing",
        body: "We balance levels, EQ, dynamics, and effects so each element sits in the mix where it belongs.",
        bullets: [
          "Vocal and instrument balance",
          "EQ, compression, and spatial effects",
          "Two included revisions per song",
        ],
      },
      {
        heading: "Mastering",
        body: "Mastering adds the final loudness, tone, and consistency your release needs for streaming and download platforms.",
        bullets: [
          "Final loudness and tonal balance",
          "Sequencing support for EPs and albums",
          "Delivery-ready exports",
        ],
      },
    ],
    pricing: [
      { label: "Mix (per song)", price: "$150", note: "2 revisions included" },
      { label: "Master (per song)", price: "$50", note: "2 revisions included" },
      { label: "Mix + Master (per song)", price: "$175", note: "2 revisions included" },
    ],
    faqs: [
      {
        question: "What files should I send?",
        answer:
          "Send organized stems or consolidated tracks with notes about references, tempo, and key. We will confirm format before starting.",
      },
      {
        question: "How long does turnaround take?",
        answer:
          "Turnaround depends on project size. Contact us with your track count and deadline for a realistic timeline.",
      },
    ],
    primaryCta: { label: "Start a mix project", to: "/contact" },
    relatedPrompt: {
      text: "Need recording first?",
      to: "/recording",
      linkLabel: "Studio recording",
    },
  },
  {
    slug: "websites",
    cardTitle: "Website Services",
    navLabel: "Websites",
    title: "Custom Band & Artist Websites",
    metaDescription:
      "Custom websites for musicians, bands, and creatives in Utah — bio, music, photos, shows, and booking. Professional band sites from $300 at 801 Family Studios.",
    keywords: [
      "band website design",
      "musician website Utah",
      "custom artist website",
      "music website Salt Lake City",
      "small business web design musicians",
    ],
    icon: "💻",
    gradient: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-400/30",
    cardDescription:
      "Band Website: $300 — one complete site with bio, music, photos, shows, contact, and links. Simple edits included free.",
    homeTeaser:
      "Custom websites for musicians and creatives — your story, music, photos, shows, and contact in one professional home base.",
    heroSubtitle:
      "More than a template — a professional home base for your music, story, and bookings.",
    intro:
      "We build custom websites for musicians, bands, creatives, and small businesses who need more than a basic template. Your site becomes your professional home base — a place to show your work, tell your story, collect inquiries, share music or media, and turn visitors into customers, fans, or bookings.",
    sections: [
      {
        heading: "Who this is for",
        body: "If you are outgrowing social-only presence or a generic builder template, a custom site gives you control and credibility.",
        bullets: [
          "Bands and solo artists launching or rebranding",
          "Creatives showcasing portfolios and media",
          "Small businesses that need a clear, trustworthy web presence",
          "Artists who want one link for press, fans, and bookers",
        ],
      },
      {
        heading: "What your site includes",
        body: "Every band website package is built around how the music industry actually uses the web.",
        bullets: [
          "Custom design aligned with your brand",
          "Bio, music players, photos, and video embeds",
          "Show dates, contact forms, and social links",
          "Mobile-first layout and fast loading",
          "Simple content edits included; complex changes $20 per edit",
        ],
      },
      {
        heading: "Why a custom site matters",
        body:
          "Streaming links and social profiles are great for discovery, but your website is where you own the experience. You decide the layout, the story, and the call to action — whether that is booking a show, joining a mailing list, or buying merch.",
      },
    ],
    pricing: [
      { label: "Band Website", price: "$300", note: "One complete site — simple edits free" },
      {
        label: "Website + EPK Bundle",
        price: "$400",
        note: "Save $50 vs ordering separately",
      },
    ],
    faqs: [
      {
        question: "Do I need to provide all content upfront?",
        answer:
          "We guide you through a project brief covering bio, links, photos, music, and design preferences. The more you share, the faster we deliver.",
      },
      {
        question: "How long does a website take?",
        answer:
          "After payment and your completed brief, allow 3–5 days for delivery by email.",
      },
      {
        question: "Can you help with a domain name?",
        answer:
          "Yes. Tell us whether you already own a domain or need help choosing one in your project brief.",
      },
    ],
    primaryCta: { label: "Order a band website", to: "/store?product=website#order-form" },
    secondaryCta: {
      label: "View website portfolio",
      href: WEB_PORTFOLIO_URL,
      external: true,
    },
    relatedPrompt: {
      text: "Need an EPK too?",
      to: "/epk",
      linkLabel: "Band EPK services",
    },
  },
  {
    slug: "epk",
    cardTitle: "EPK Services",
    navLabel: "EPK",
    title: "Electronic Press Kits (EPK) for Artists",
    metaDescription:
      "Professional band EPK design in Utah — press-ready bio, photos, music, video, and booking info. Band EPK from $150 at 801 Family Studios.",
    keywords: [
      "band EPK",
      "electronic press kit musician",
      "artist press kit Utah",
      "EPK design for bands",
    ],
    icon: "📄",
    gradient: "from-amber-500/15 to-teal-500/20",
    borderColor: "border-amber-400/30",
    cardDescription:
      "Band EPK: $150 — press-ready electronic press kit with bio, photos, music/video, and booking info.",
    homeTeaser:
      "Press-ready electronic press kits with bio, photos, music, video, and booking info in one shareable link.",
    heroSubtitle: "One professional link for venues, press, playlists, and industry contacts.",
    intro:
      "An electronic press kit (EPK) is how bookers, bloggers, and promoters evaluate you quickly. We build press-ready EPKs that present your story, sound, visuals, and contact details in a format industry contacts expect — so you look prepared before the first email reply.",
    sections: [
      {
        heading: "What goes in your EPK",
        body: "We structure your materials so decision-makers find what they need in seconds.",
        bullets: [
          "Short and long-form bios",
          "High-quality photos and visual branding",
          "Music and video embeds",
          "Booking, press, and contact information",
          "One shareable link for your entire kit",
        ],
      },
      {
        heading: "When you need an EPK",
        body:
          "If you are pitching festivals, seeking press coverage, or emailing venues, a clean EPK increases your chances of a serious response.",
        bullets: [
          "Festival and venue submissions",
          "Press and blog outreach",
          "Playlist pitching and industry networking",
          "Pair with a band website for a complete online presence",
        ],
      },
    ],
    pricing: [
      { label: "Band EPK", price: "$150", note: "Simple edits included free" },
      {
        label: "Website + EPK Bundle",
        price: "$400",
        note: "Best value for new bands",
      },
    ],
    faqs: [
      {
        question: "What is the difference between a website and an EPK?",
        answer:
          "A website is your public home base for fans and general visitors. An EPK is a focused package for industry contacts — often tighter, press-oriented, and easy to forward.",
      },
      {
        question: "What assets do I need to send?",
        answer:
          "Bio text, photos, music links, video links, and booking or press contacts. We will walk you through it in the order brief.",
      },
    ],
    primaryCta: { label: "Order a band EPK", to: "/store?product=epk#order-form" },
    secondaryCta: {
      label: "View EPK & website samples",
      href: WEB_PORTFOLIO_URL,
      external: true,
    },
    relatedPrompt: {
      text: "Need a full website too?",
      to: "/websites",
      linkLabel: "Custom band websites",
    },
  },
  {
    slug: "booking-management",
    cardTitle: "Booking & Management",
    navLabel: "Booking",
    title: "Artist Booking & Management",
    metaDescription:
      "Artist booking and music management in Utah — gig booking and career management with transparent commission structure at 801 Family Studios.",
    keywords: [
      "artist management Utah",
      "music booking agent Salt Lake City",
      "band management services",
      "music career management",
    ],
    icon: "🎵",
    gradient: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-400/30",
    cardDescription:
      "Booking: 10% of gig income. Management: 20% of total artist revenue. Requires exclusivity agreement + in-person consultation.",
    homeTeaser:
      "Booking and management support for artists ready to grow — with clear terms and an in-person consultation.",
    heroSubtitle: "Strategic support for gigs, growth, and long-term career direction.",
    intro:
      "Booking and management services are for artists ready to treat their career with a business mindset. We help you pursue the right opportunities, communicate professionally, and build momentum — with clear terms and an in-person consultation before any agreement.",
    sections: [
      {
        heading: "Booking",
        body: "We pursue and coordinate live opportunities that fit your goals, genre, and schedule.",
        bullets: [
          "Venue and promoter outreach",
          "Show coordination and communication",
          "10% commission on gig income",
        ],
      },
      {
        heading: "Management",
        body: "Management covers broader career strategy beyond a single show.",
        bullets: [
          "Release, brand, and growth planning",
          "Coordination across services and partners",
          "20% of total artist revenue",
          "Exclusivity agreement required",
        ],
      },
    ],
    pricing: [
      { label: "Booking", price: "10% of gig income" },
      { label: "Management", price: "20% of total artist revenue" },
      { label: "Consultation", price: "Required", note: "In-person before agreement" },
    ],
    faqs: [
      {
        question: "Who qualifies for management?",
        answer:
          "We work with artists who are committed to growth and can meet in person for an initial consultation. Reach out with your goals and current activity.",
      },
    ],
    primaryCta: { label: "Request a consultation", to: "/contact" },
    relatedPrompt: {
      text: "Need a website/EPK before pitching venues?",
      to: "/store?product=bundle#order-form",
      linkLabel: "Website + EPK bundle",
    },
  },
  {
    slug: "studio-rental",
    cardTitle: "Studio Rental & Rehearsal",
    navLabel: "Studio Rental",
    title: "Studio Rental & Rehearsal Space",
    metaDescription:
      "Affordable rehearsal and studio rental in Sandy, Utah — $25/hr with 3-hour minimum. Basic setup help and optional recording at 801 Family Studios.",
    keywords: [
      "rehearsal space Salt Lake City",
      "studio rental Utah",
      "band rehearsal room Sandy",
      "music rehearsal studio",
    ],
    icon: "🎛️",
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-400/30",
    cardDescription:
      "$25/hr (3-hour minimum). Rehearsal space, basic setup help, and basic rehearsal mix support. Add-ons: sound tech $25/hr, rehearsal soundboard recording $20/hr.",
    homeTeaser:
      "Rehearsal space with basic setup help and mix support — optional sound tech and soundboard recording add-ons.",
    heroSubtitle: "A comfortable room to rehearse, experiment, and tighten your set.",
    intro:
      "Need a dedicated space to practice without volume limits or living-room logistics? Our studio rental and rehearsal packages give bands and artists a ready room with basic setup support — plus optional add-ons when you want tech help or rehearsal soundboard recording.",
    sections: [
      {
        heading: "Included with rental",
        body: "Every rehearsal block includes essentials so you can focus on playing.",
        bullets: [
          "Rehearsal room access",
          "Basic setup help",
          "Basic rehearsal mix support",
        ],
      },
      {
        heading: "Optional add-ons",
        body: "Scale up when your session needs extra hands or capture.",
        bullets: [
          "Sound tech support — $25/hr",
          "Rehearsal soundboard recording — $20/hr",
        ],
      },
    ],
    pricing: [
      { label: "Rehearsal / rental", price: "$25/hr", note: "3-hour minimum" },
      { label: "Sound tech support", price: "$25/hr", note: "Add-on" },
      { label: "Rehearsal soundboard recording", price: "$20/hr", note: "Add-on" },
    ],
    faqs: [
      {
        question: "Is there a minimum booking length?",
        answer: "Yes. Rehearsal and rental sessions require a 3-hour minimum.",
      },
    ],
    primaryCta: { label: "Reserve studio time", to: "/contact" },
    relatedPrompt: {
      text: "Want to record your rehearsal or book a full session?",
      to: "/recording",
      linkLabel: "Studio recording",
    },
  },
  {
    slug: "drum-lessons",
    cardTitle: "Drum Lessons",
    navLabel: "Drum Lessons",
    title: "Drum Lessons in Sandy, Utah",
    metaDescription:
      "Private drum lessons in Sandy, UT — $120/month for two 1-hour lessons. Learn technique, timing, and musicality at 801 Family Studios.",
    keywords: [
      "drum lessons Sandy Utah",
      "drum teacher Salt Lake City",
      "private drum lessons",
      "beginner drum lessons Utah",
    ],
    icon: "🥁",
    gradient: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-400/30",
    cardDescription: "$120/month. Two 1-hour lessons per month.",
    homeTeaser:
      "Private drum lessons for beginners through advancing players — technique, timing, and musical confidence.",
    heroSubtitle: "Build technique, confidence, and musical feel behind the kit.",
    intro:
      "Our drum lessons are designed for students who want steady progress — whether you are picking up sticks for the first time or tightening skills you already have. Lessons take place at the studio in a focused, encouraging environment.",
    sections: [
      {
        heading: "What you will work on",
        body: "Lessons balance fundamentals with the music you actually want to play.",
        bullets: [
          "Technique, timing, and coordination",
          "Grooves, fills, and song structure",
          "Practice habits that stick",
          "Playing with other musicians",
        ],
      },
    ],
    pricing: [{ label: "Monthly package", price: "$120/month", note: "Two 1-hour lessons" }],
    faqs: [
      {
        question: "Do I need my own drum kit?",
        answer: "Contact us about practice setup — we can discuss what you need for lessons and home practice.",
      },
    ],
    primaryCta: { label: "Ask about lessons", to: "/contact" },
    relatedPrompt: {
      text: "Interested in recording or performance coaching?",
      to: "/recording",
      linkLabel: "Studio recording",
    },
  },
  {
    slug: "social-media",
    cardTitle: "Social Media & Promotion",
    navLabel: "Social Media",
    title: "Social Media & Artist Promotion",
    metaDescription:
      "Music marketing and social media support for Utah artists — content push from $150/mo or full artist growth package at $500/mo from 801 Family Studios.",
    keywords: [
      "music marketing Utah",
      "artist social media management",
      "music promotion services",
      "Instagram marketing for musicians",
    ],
    icon: "📣",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400/30",
    cardDescription:
      "Monthly Content Push Support: $150/month. Artist Growth Package: $500/month with posts, engagement, and content support.",
    homeTeaser:
      "Social media and promotional support so you stay visible while focusing on your music.",
    heroSubtitle: "Stay visible while you focus on writing, recording, and performing.",
    intro:
      "Consistency wins on social media, but most artists do not have hours every week to plan posts, write captions, and engage. Our promotion packages meet you where you are — whether you create your own content and need distribution help, or you want a fuller growth partner.",
    sections: [
      {
        heading: "Monthly Content Push — $150/mo",
        body: "You create the content. We help market and push it so it actually gets seen.",
        bullets: [
          "Distribution and promotional support",
          "Ideal if you already film and post",
          "Keeps your release cycle active",
        ],
      },
      {
        heading: "Artist Growth Package — $500/mo",
        body: "A fuller monthly partnership for artists ready to invest in presence.",
        bullets: [
          "Up to 12 posts from your existing media",
          "Content support and promotional push",
          "Facebook and Instagram engagement",
        ],
      },
    ],
    pricing: [
      { label: "Content Push Support", price: "$150/month" },
      { label: "Artist Growth Package", price: "$500/month" },
    ],
    faqs: [
      {
        question: "Do you create video and photo content?",
        answer:
          "The Content Push plan assumes you supply media. The Growth Package includes support shaping and scheduling posts from what you provide.",
      },
    ],
    primaryCta: { label: "Talk about promotion", to: "/contact" },
    published: false,
  },
];

/** Live on the site (social media tabled for now). */
export const SERVICES = ALL_SERVICES.filter((service) => service.published !== false);

export const getServiceBySlug = (slug: string): Service | undefined =>
  SERVICES.find((service) => service.slug === slug);

export const getServicePath = (slug: ServiceSlug) => `/${slug}`;

/** Slug from a service page pathname (e.g. /websites → websites). */
export const getServiceSlugFromPathname = (pathname: string): string =>
  pathname.replace(/^\//, "").split("/")[0];
