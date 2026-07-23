import { WEB_PORTFOLIO_URL } from "@/lib/storeProducts";

export type ServiceSlug =
  | "recording-studio-sandy-utah"
  | "mixing-mastering-services"
  | "websites-for-musicians"
  | "epk-design-for-musicians"
  | "graphic-design-for-bands"
  | "booking-management"
  | "studio-rental"
  | "drum-lessons-sandy-utah"
  | "social-media";

export type ServiceExample = {
  label: string;
  description: string;
  to?: string;
  href?: string;
  external?: boolean;
};

export type ServicePricing = {
  label: string;
  price: string;
  note?: string;
  /** When set, shows an Add to cart control that opens this link (usually mailto). */
  cartHref?: string;
  /** Optional pricing group for split sections (e.g. Single designs vs Packages). */
  group?: "singles" | "packages";
};

export type ServiceHeroExtraCta = {
  label: string;
  /** In-page hash (e.g. #packages) or internal path */
  to: string;
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
  /** Shown in the page hero (e.g. "Starting at $60/hr"). */
  startingPrice: string;
  intro: string;
  examples?: ServiceExample[];
  sections: ServiceSection[];
  pricing: ServicePricing[];
  faqs: ServiceFAQ[];
  primaryCta: { label: string; to: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
  /** Extra hero buttons shown next to the primary CTA and Contact us. */
  heroExtraCtas?: ServiceHeroExtraCta[];
  /** Cross-promotion shown at the bottom of the service page. */
  relatedPrompt?: { text: string; to: string; linkLabel: string };
  /** When false, hidden from the homepage, services hub, and sitemap. */
  published?: boolean;
};

const ALL_SERVICES: Service[] = [
  {
    slug: "recording-studio-sandy-utah",
    cardTitle: "Recording",
    navLabel: "Recording",
    title: "Recording Studio Sandy Utah",
    metaDescription:
      "Recording studio in Sandy, Utah for bands, vocals, podcasts, and demos. Hourly, half-day, and full-day rates at 801 Family Studios near Salt Lake City.",
    keywords: [
      "recording studio Sandy Utah",
      "recording studio Salt Lake City",
      "band recording Utah",
      "vocal recording studio Sandy",
    ],
    icon: "🎙️",
    gradient: "from-teal-500/20 to-slate-500/20",
    borderColor: "border-teal-400/30",
    cardDescription:
      "$60/hr. Half Day (4 hrs): $200. Full Day (8 hrs): $400. Vocal, instrument, podcast, overdub, demo, or full band sessions.",
    homeTeaser:
      "Vocal, instrument, podcast, overdub, demo, or full band sessions in a focused, comfortable studio.",
    heroSubtitle: "Capture your sound with room, gear, and engineers who care about the performance.",
    startingPrice: "Starting at $60/hr · Half day $200 · Full day $400",
    intro:
      "Our recording sessions are built for artists who want a focused, comfortable environment — whether you are tracking a single vocal, a full band, a podcast, or layered overdubs. We help you get takes that feel right, not just levels that look right on a meter.",
    examples: [
      {
        label: "Featured artists",
        description: "Hear bands and artists who have recorded and released work with our studio.",
        to: "/featured-artists",
      },
      {
        label: "Upcoming shows",
        description: "See who is playing out from the 801 Family Studios community.",
        to: "/upcoming-shows",
      },
    ],
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
    primaryCta: { label: "Book a recording session", to: "/contact" },
    relatedPrompt: {
      text: "Need mixing/mastering after recording?",
      to: "/mixing-mastering-services",
      linkLabel: "Mixing & mastering services",
    },
  },
  {
    slug: "mixing-mastering-services",
    cardTitle: "Mixing & Mastering",
    navLabel: "Mix & Master",
    title: "Mixing and Mastering Services",
    metaDescription:
      "Mixing and mastering services in Utah — $150/song mix, $50/song master, or $175 combined with two revisions included at 801 Family Studios in Sandy.",
    keywords: [
      "mixing and mastering services",
      "mixing and mastering Utah",
      "song mixing Salt Lake City",
      "audio mastering Sandy Utah",
    ],
    icon: "🎚️",
    gradient: "from-green-500/20 to-teal-500/20",
    borderColor: "border-green-400/30",
    cardDescription:
      "All services include 2 revisions. Mix: $150/song. Mastering: $50/song. Mix + Master: $175/song.",
    homeTeaser:
      "Professional mixing and mastering with included revisions so your music translates on every speaker.",
    heroSubtitle: "Polish your tracks with clarity, punch, and balance that translate on every speaker.",
    startingPrice: "Mix $150/song · Master $50/song · Bundle $175/song",
    intro:
      "Great mixes give your music space to breathe. Our mixing and mastering services help your songs sound intentional — whether you recorded with us or at home. Every package includes two revisions so you can refine the final result with confidence.",
    examples: [
      {
        label: "Recorded at our studio",
        description: "Many mix projects start with sessions tracked in our Sandy recording room.",
        to: "/recording-studio-sandy-utah",
      },
      {
        label: "Featured artists",
        description: "Explore artists in our community with released music.",
        to: "/featured-artists",
      },
    ],
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
      to: "/recording-studio-sandy-utah",
      linkLabel: "Recording studio Sandy Utah",
    },
  },
  {
    slug: "websites-for-musicians",
    cardTitle: "Website Services",
    navLabel: "Websites",
    title: "Websites for Musicians",
    metaDescription:
      "Websites for musicians and bands in Utah — custom bio, music, photos, shows, and booking pages from $300. Mobile-first sites by 801 Family Studios.",
    keywords: [
      "websites for musicians",
      "band website design Utah",
      "musician website Sandy",
      "custom artist website Salt Lake City",
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
    startingPrice: "Band website $300 · Website + EPK bundle $400",
    intro:
      "We build custom websites for musicians, bands, creatives, and small businesses who need more than a basic template. Your site becomes your professional home base — a place to show your work, tell your story, collect inquiries, share music or media, and turn visitors into customers, fans, or bookings.",
    examples: [
      {
        label: "Web portfolio",
        description: "Browse sample band and artist websites we have built.",
        href: WEB_PORTFOLIO_URL,
        external: true,
      },
      {
        label: "How to order",
        description: "Email your completed brief and send a 50% deposit via PayPal or Venmo.",
        to: "/websites-and-epks?product=website#order-form",
      },
    ],
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
          "Simple content edits included; complex changes $25/hr",
        ],
      },
      {
        heading: "Why a custom site matters",
        body:
          "Streaming links and social profiles are great for discovery, but your website is where you own the experience. You decide the layout, the story, and the call to action — whether that is booking a show, joining a mailing list, or buying merch.",
      },
    ],
    pricing: [
      {
        label: "Band Website",
        price: "$300",
        note: "50% deposit ($150) to start — simple edits free",
      },
      {
        label: "Website + EPK Bundle",
        price: "$400",
        note: "50% deposit ($200) to start — save $50 vs ordering separately",
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
          "After your 50% deposit and completed brief, allow 7–14 days for delivery by email.",
      },
      {
        question: "How do I pay?",
        answer:
          "Email your completed brief to websites@801familystudios.com and send a 50% deposit through PayPal or Venmo. The balance is due when your site is ready.",
      },
      {
        question: "Can you help with a domain name?",
        answer:
          "Yes. Tell us whether you already own a domain or need help choosing one in your project brief.",
      },
    ],
    primaryCta: { label: "Order a band website", to: "/websites-and-epks?product=website#order-form" },
    secondaryCta: {
      label: "View website portfolio",
      href: WEB_PORTFOLIO_URL,
      external: true,
    },
    relatedPrompt: {
      text: "Need an EPK too?",
      to: "/epk-design-for-musicians",
      linkLabel: "EPK design for musicians",
    },
  },
  {
    slug: "epk-design-for-musicians",
    cardTitle: "EPK Services",
    navLabel: "EPK",
    title: "EPK Design for Musicians",
    metaDescription:
      "EPK design for musicians and bands in Utah — press-ready bio, photos, music, video, and booking info from $150 at 801 Family Studios.",
    keywords: [
      "EPK design for musicians",
      "band EPK Utah",
      "electronic press kit design",
      "artist press kit Sandy Utah",
    ],
    icon: "📄",
    gradient: "from-amber-500/15 to-teal-500/20",
    borderColor: "border-amber-400/30",
    cardDescription:
      "Band EPK: $150 — press-ready electronic press kit with bio, photos, music/video, and booking info.",
    homeTeaser:
      "Press-ready electronic press kits with bio, photos, music, video, and booking info in one shareable link.",
    heroSubtitle: "One professional link for venues, press, playlists, and industry contacts.",
    startingPrice: "Band EPK $150 · Website + EPK bundle $400",
    intro:
      "An electronic press kit (EPK) is how bookers, bloggers, and promoters evaluate you quickly. We build press-ready EPKs that present your story, sound, visuals, and contact details in a format industry contacts expect — so you look prepared before the first email reply.",
    examples: [
      {
        label: "EPK & website samples",
        description: "See press kits and band sites from our portfolio.",
        href: WEB_PORTFOLIO_URL,
        external: true,
      },
      {
        label: "How to order",
        description: "Email your completed brief and send a 50% deposit via PayPal or Venmo.",
        to: "/websites-and-epks?product=epk#order-form",
      },
    ],
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
      {
        label: "Band EPK",
        price: "$150",
        note: "50% deposit ($75) to start — simple edits included free",
      },
      {
        label: "Website + EPK Bundle",
        price: "$400",
        note: "50% deposit ($200) to start — best value for new bands",
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
      {
        question: "How do I order and pay?",
        answer:
          "Fill out our brief form, email it to websites@801familystudios.com, and send a 50% deposit through PayPal or Venmo. The balance is due when your EPK is ready.",
      },
    ],
    primaryCta: { label: "Order a band EPK", to: "/websites-and-epks?product=epk#order-form" },
    secondaryCta: {
      label: "View EPK & website samples",
      href: WEB_PORTFOLIO_URL,
      external: true,
    },
    relatedPrompt: {
      text: "Need a full website too?",
      to: "/websites-for-musicians",
      linkLabel: "Websites for musicians",
    },
  },
  {
    slug: "graphic-design-for-bands",
    cardTitle: "Graphic Design",
    navLabel: "Graphic Design",
    title: "Graphic Design for Bands",
    metaDescription:
      "Graphic design for bands in Utah — show flyers $50, logos $100, album covers, merch art, and branding packages from $100 at 801 Family Studios.",
    keywords: [
      "graphic design for bands",
      "band flyer design Utah",
      "album cover design Salt Lake City",
      "band logo design Utah",
      "show poster design",
    ],
    icon: "🎨",
    gradient: "from-amber-500/20 to-rose-500/20",
    borderColor: "border-amber-400/30",
    cardDescription:
      "Show flyers $50, logos $100, album covers, merch art, and branding packages from $100. Cohesive graphics that match your sound.",
    homeTeaser:
      "Professional, cohesive graphics for shows, socials, streaming, merch, and your full visual identity.",
    heroSubtitle:
      "Polished designs that match your band’s sound, personality, and image — ready for social, streaming, merch, and promo.",
    startingPrice: "Single designs $30–$100 · Packages from $100",
    intro:
      "Professional, cohesive graphics designed to match your band’s sound, personality, and image. Whether you need artwork for one upcoming show or a complete visual identity, we’ll create polished designs you can use across social media, streaming platforms, merchandise, and promotional materials.",
    examples: [
      {
        label: "Design portfolio",
        description: "Browse show posters, flyers, and graphic design work from our portfolio.",
        href: `${WEB_PORTFOLIO_URL}#posters`,
        external: true,
      },
      {
        label: "Upcoming shows",
        description: "See flyers and posters from shows connected with our studio community.",
        to: "/upcoming-shows",
      },
      {
        label: "Websites & EPKs",
        description: "Pair your new graphics with a band website or press kit.",
        to: "/websites-and-epks",
      },
    ],
    sections: [
      {
        heading: "Who this is for",
        body: "From a single show poster to a full rebrand, we design for working bands and solo artists who need visuals that look intentional everywhere they show up.",
        bullets: [
          "Bands promoting upcoming shows or tours",
          "Artists releasing singles or albums",
          "New bands building a first visual identity",
          "Acts refreshing logos, merch, and social presence",
        ],
      },
      {
        heading: "Band Launch Package — $225",
        body: "A coordinated visual package for a new band, release, or rebrand.",
        bullets: [
          "Band logo or wordmark",
          "Album or single cover",
          "Social media profile image",
          "Social media banner",
          "Two promotional graphics",
          "Two revision rounds",
        ],
      },
      {
        heading: "Show Promotion Package — $100",
        body: "Everything needed to promote an upcoming performance.",
        bullets: [
          "Main show flyer",
          "Square Instagram/Facebook version",
          "Story-sized version",
          "Event cover image",
          "One revision round",
        ],
      },
      {
        heading: "Complete Artist Branding Package — $350",
        body: "A full visual identity for your website, EPK, social media, and merchandise.",
        bullets: [
          "Primary logo",
          "Alternate logo or simplified mark",
          "Color palette",
          "Font recommendations",
          "Social media profile image and banner",
          "Three reusable promotional graphics",
          "Basic brand guide",
          "Two revision rounds",
        ],
      },
    ],
    pricing: [
      {
        label: "Show flyer or event poster",
        price: "$50",
        group: "singles",
      },
      {
        label: "Social media graphic",
        price: "$30",
        group: "singles",
      },
      {
        label: "Album or single cover",
        price: "$75",
        group: "singles",
      },
      {
        label: "Band logo or wordmark",
        price: "$100",
        group: "singles",
      },
      {
        label: "Tour poster",
        price: "$75",
        group: "singles",
      },
      {
        label: "Merch or T-shirt design",
        price: "$75",
        group: "singles",
      },
      {
        label: "Social media banner/header",
        price: "$40",
        group: "singles",
      },
      {
        label: "EPK or one-sheet layout",
        price: "$75",
        group: "singles",
      },
      {
        label: "Band Launch Package",
        price: "$225",
        group: "packages",
        note: "Logo, cover, social profile + banner, two promo graphics, two revision rounds",
      },
      {
        label: "Show Promotion Package",
        price: "$100",
        group: "packages",
        note: "Main flyer, square + story versions, event cover, one revision round",
      },
      {
        label: "Complete Artist Branding Package",
        price: "$350",
        group: "packages",
        note: "Primary + alternate logos, palette, fonts, social assets, three promo graphics, brand guide, two revision rounds",
      },
    ],
    faqs: [
      {
        question: "Can I order a single graphic, or do I need a package?",
        answer:
          "Either works. Single designs are $30–$100 depending on the deliverable. Packages are the best value when you need several coordinated assets for a launch, show, or rebrand.",
      },
      {
        question: "What do I need to provide?",
        answer:
          "Share your band name, show or release details, any existing logos or photos, preferred colors or reference art, and where the design will be used (print, Instagram, Spotify, merch, etc.).",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Show Promotion includes one revision round. Band Launch and Complete Artist Branding include two. Extra revisions can be quoted if you need more rounds.",
      },
      {
        question: "How do I get started?",
        answer:
          "Contact us with the project type (flyer, logo, package, etc.), your deadline, and any reference images. We’ll confirm scope, pricing, and a start date.",
      },
    ],
    primaryCta: { label: "Request graphic design", to: "/contact" },
    secondaryCta: {
      label: "View design portfolio",
      href: `${WEB_PORTFOLIO_URL}#posters`,
      external: true,
    },
    heroExtraCtas: [
      { label: "Packages", to: "#packages" },
      { label: "Single designs", to: "#single-designs" },
    ],
    relatedPrompt: {
      text: "Need a website or EPK to match your new look?",
      to: "/websites-for-musicians",
      linkLabel: "Websites for musicians",
    },
  },
  {
    slug: "booking-management",
    cardTitle: "Booking & Management",
    navLabel: "Booking",
    title: "Music Booking & Management Utah",
    metaDescription:
      "Music booking services in Utah — gig booking and artist management with transparent commissions. In-person consultation at 801 Family Studios.",
    keywords: [
      "music booking services Utah",
      "artist management Utah",
      "music booking agent Salt Lake City",
      "band management Sandy Utah",
    ],
    icon: "🎵",
    gradient: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-400/30",
    cardDescription:
      "Booking: 10% of gig income. Management: 20% of total artist revenue. Requires exclusivity agreement + in-person consultation.",
    homeTeaser:
      "Booking and management support for artists ready to grow — with clear terms and an in-person consultation.",
    heroSubtitle: "Strategic support for gigs, growth, and long-term career direction.",
    startingPrice: "Booking 10% of gig income · Management 20% of revenue",
    intro:
      "Booking and management services are for artists ready to treat their career with a business mindset. We help you pursue the right opportunities, communicate professionally, and build momentum — with clear terms and an in-person consultation before any agreement.",
    examples: [
      {
        label: "Upcoming shows",
        description: "See artists currently playing out from our community.",
        to: "/upcoming-shows",
      },
      {
        label: "Featured artists",
        description: "Meet bands and artists we work with in Utah.",
        to: "/featured-artists",
      },
    ],
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
      to: "/websites-and-epks?product=bundle#order-form",
      linkLabel: "Website + EPK bundle",
    },
  },
  {
    slug: "studio-rental",
    cardTitle: "Studio Rental & Rehearsal",
    navLabel: "Studio Rental",
    title: "Studio Rental Sandy Utah",
    metaDescription:
      "Studio rental in Sandy, Utah — rehearsal space from $25/hr with 3-hour minimum, setup help, and optional soundboard recording at 801 Family Studios.",
    keywords: [
      "studio rental Sandy Utah",
      "rehearsal space Salt Lake City",
      "studio rental Utah",
      "band rehearsal room Sandy",
    ],
    icon: "🎛️",
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-400/30",
    cardDescription:
      "$25/hr (3-hour minimum). Rehearsal space, basic setup help, and basic rehearsal mix support. Add-ons: sound tech $25/hr, rehearsal soundboard recording $20/hr.",
    homeTeaser:
      "Rehearsal space with basic setup help and mix support — optional sound tech and soundboard recording add-ons.",
    heroSubtitle: "A comfortable room to rehearse, experiment, and tighten your set.",
    startingPrice: "Rehearsal $25/hr (3-hr min) · Soundboard recording add-on $20/hr",
    intro:
      "Need a dedicated space to practice without volume limits or living-room logistics? Our studio rental and rehearsal packages give bands and artists a ready room with basic setup support — plus optional add-ons when you want tech help or rehearsal soundboard recording.",
    examples: [
      {
        label: "Full recording sessions",
        description: "Ready to track demos or releases? Book our recording studio.",
        to: "/recording-studio-sandy-utah",
      },
    ],
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
      to: "/recording-studio-sandy-utah",
      linkLabel: "Recording studio Sandy Utah",
    },
  },
  {
    slug: "drum-lessons-sandy-utah",
    cardTitle: "Drum Lessons",
    navLabel: "Drum Lessons",
    title: "Drum Lessons Sandy Utah",
    metaDescription:
      "Drum lessons in Sandy, Utah — $120/month for two 1-hour private lessons. Technique, timing, and confidence at 801 Family Studios.",
    keywords: [
      "drum lessons Sandy Utah",
      "drum teacher Sandy UT",
      "private drum lessons Salt Lake City",
      "beginner drum lessons Utah",
    ],
    icon: "🥁",
    gradient: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-400/30",
    cardDescription: "$120/month. Two 1-hour lessons per month.",
    homeTeaser:
      "Private drum lessons for beginners through advancing players — technique, timing, and musical confidence.",
    heroSubtitle: "Build technique, confidence, and musical feel behind the kit.",
    startingPrice: "$120/month — two 1-hour lessons",
    intro:
      "Our drum lessons are designed for students who want steady progress — whether you are picking up sticks for the first time or tightening skills you already have. Lessons take place at the studio in a focused, encouraging environment.",
    examples: [
      {
        label: "Studio rental",
        description: "Bands can rehearse in our room between lessons and shows.",
        to: "/studio-rental",
      },
    ],
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
      to: "/recording-studio-sandy-utah",
      linkLabel: "Recording studio Sandy Utah",
    },
  },
  {
    slug: "social-media",
    cardTitle: "Social Media",
    navLabel: "Social Media",
    title: "Social Media Management & Promotion",
    metaDescription:
      "Social media management for bands, artists, and local businesses in Utah — monthly packages from $125/mo with finished posts, reels, captions, and scheduling at 801 Family Studios.",
    keywords: [
      "social media management Utah",
      "social media for bands",
      "Instagram management Sandy Utah",
      "local business social media Salt Lake City",
      "music marketing Utah",
    ],
    icon: "📣",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400/30",
    cardDescription:
      "Monthly packages from $125/mo. Finished posts, reels, captions, scheduling, and strategy for bands, artists, and local businesses.",
    homeTeaser:
      "Consistent, professional content that keeps your page active, polished, and easy to book or buy from.",
    heroSubtitle:
      "Consistent, professional content that keeps your page active, polished, and easy to book or buy from.",
    startingPrice: "From $125/month · Full-service from $1,200/month",
    intro:
      "Social media packages for bands, solo artists, and local businesses who want a consistent online presence without spending hours each week on captions, graphics, and scheduling. You provide the raw content and details — we turn it into polished, ready-to-publish posts.",
    examples: [
      {
        label: "Featured artists",
        description: "See bands and businesses in our community keeping active online.",
        to: "/featured-artists",
      },
      {
        label: "Websites for musicians",
        description: "Pair social media with a professional website or link-in-bio hub.",
        to: "/websites-for-musicians",
      },
    ],
    sections: [
      {
        heading: "Who this is for",
        body: "Whether you need a simple consistent presence or full campaign support, there is a package built for your goals.",
        bullets: [
          "Bands and solo artists promoting shows, releases, and booking",
          "Venues, studios, and service businesses with regular events or offerings",
          "Clients who create their own content but want direction and scheduling support",
          "Businesses ready for growth with reels, engagement, and analytics",
        ],
      },
      {
        heading: "What \"finished posts\" means",
        body: "We create each post using your photos, videos, event info, announcements, music links, reviews, services, prices, logos, or updates.",
        bullets: [
          "Caption, simple graphic or layout, hashtags, and location tags",
          "Account tagging and scheduled or live posting",
          "Client provides raw content; we deliver polished, ready-to-publish posts",
        ],
      },
      {
        heading: "What you provide vs. what we handle",
        body: "Clear roles keep your feed active without overwhelming your schedule.",
        bullets: [
          "You provide: photos, videos, event dates, service details, logos, links, prices, promotions, and timely approvals",
          "We provide: content planning, captions, simple design, scheduling/posting, hashtags, tags, local positioning, and monthly performance notes",
        ],
      },
      {
        heading: "Example content for bands",
        body: "Posts we create to keep your band visible and bookable.",
        bullets: [
          "Upcoming show announcement, reminder, and after-show recap",
          "Live or rehearsal clip and band member spotlight",
          "Song, album, or EPK promo and booking call-to-action",
          "Behind-the-scenes studio content",
        ],
      },
      {
        heading: "Example content for businesses",
        body: "Posts that build trust and drive inquiries for local businesses.",
        bullets: [
          "Service spotlight, customer testimonial, and before/after post",
          "Behind-the-scenes post, promo or special, and educational tip",
          "Staff or owner spotlight and call-to-action post",
        ],
      },
    ],
    pricing: [
      {
        label: "Content Direction Only",
        price: "$125/month",
        note: "8 post ideas, caption drafts, suggested schedule, hashtags, and content prompts — you create and post",
      },
      {
        label: "Social Starter",
        price: "$250/month",
        note: "8 finished posts/month — Facebook + Instagram, captions, simple graphics, hashtags, scheduling, basic monthly summary",
      },
      {
        label: "Consistent Presence",
        price: "$450/month",
        note: "12–16 finished posts/month, 4 reels/short videos from your footage, content calendar, light comment/message monitoring, monthly performance notes",
      },
      {
        label: "Business / Band Builder",
        price: "$650/month",
        note: "16 finished posts/month, 6 reels/short videos, testimonials, service/show promos, call-to-action posts, light engagement, monthly report",
      },
      {
        label: "Growth Package",
        price: "$750/month",
        note: "20 finished posts/month, 8 reels/short videos, Facebook + Instagram + one extra platform, strategy call, community engagement, analytics report",
      },
      {
        label: "Full-Service Local Promo",
        price: "From $1,200/month",
        note: "25–30 posts/month, 10–12 reels/short videos, weekly check-in, campaign planning, website/link-in-bio updates, basic ad management — ad spend not included",
      },
      {
        label: "Single flyer or social graphic",
        price: "$25–$50",
        note: "One-time add-on",
      },
      {
        label: "Reel edit from provided footage",
        price: "$40–$75",
        note: "One-time add-on",
      },
      {
        label: "Event promo campaign",
        price: "$100–$250",
        note: "One-time add-on",
      },
      {
        label: "EPK refresh",
        price: "$100–$250",
        note: "One-time add-on",
      },
      {
        label: "Website update tied to campaign",
        price: "$50–$150",
        note: "One-time add-on",
      },
      {
        label: "Content shoot (1–2 hours)",
        price: "$150–$300",
        note: "One-time add-on",
      },
      {
        label: "Paid ad setup",
        price: "$100–$250",
        note: "One-time add-on — ad spend not included",
      },
      {
        label: "Extra platform",
        price: "+$75–$150/month",
        note: "Add-on to any monthly package",
      },
      {
        label: "Extra reel or video",
        price: "+$40–$75 each",
        note: "Add-on to any monthly package",
      },
    ],
    faqs: [
      {
        question: "What content do I need to provide and when?",
        answer:
          "Submit client-provided content at least 7 days before the scheduled post date. Rush posts requested with less than 48 hours notice may be billed separately.",
      },
      {
        question: "Are revisions included?",
        answer:
          "One revision round is included per post before publishing when approval is required.",
      },
      {
        question: "Is paid ad spend included?",
        answer:
          "No. Paid ad setup is available as an add-on, but ad spend is not included in any package.",
      },
      {
        question: "Do packages guarantee followers, bookings, or sales?",
        answer:
          "No. Packages do not guarantee followers, bookings, sales, or viral posts — but consistent, professional content gives you a stronger foundation to grow from.",
      },
      {
        question: "Do unused posts roll over?",
        answer: "Unused posts do not roll over unless agreed in writing.",
      },
      {
        question: "Can I cancel my monthly package?",
        answer: "Monthly packages may be cancelled with 14 days notice.",
      },
      {
        question: "Need a custom plan?",
        answer:
          "We can build a package around your show schedule, launch, business goals, or content volume. Contact us to discuss a custom plan.",
      },
    ],
    primaryCta: { label: "Talk about social media", to: "/contact" },
    relatedPrompt: {
      text: "Need a website or EPK to pair with your social presence?",
      to: "/websites-for-musicians",
      linkLabel: "Websites for musicians",
    },
  },
];

/** Live on the site. */
export const SERVICES = ALL_SERVICES.filter((service) => service.published !== false);

export const getServiceBySlug = (slug: string): Service | undefined =>
  SERVICES.find((service) => service.slug === slug);

export const getServicePath = (slug: ServiceSlug) => `/${slug}`;

/** Slug from a service page pathname (e.g. /websites → websites). */
export const getServiceSlugFromPathname = (pathname: string): string =>
  pathname.replace(/^\//, "").split("/")[0];
