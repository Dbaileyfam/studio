import type { StoreProductId } from "@/lib/storeProducts";
import { STORE_PRODUCTS } from "@/lib/storeProducts";

export type WebsiteBriefFormData = {
  bandName: string;
  genre: string;
  location: string;
  contactName: string;
  email: string;
  phone: string;
  shortBio: string;
  mediumBio: string;
  fullBio: string;
  photoLinks: string;
  musicLinks: string;
  videoLinks: string;
  socialLinks: string;
  bookingInfo: string;
  stageTech: string;
  pressCredits: string;
  shows: string;
  websitePages: string;
  mainGoal: string;
  domainHosting: string;
  designIdeas: string;
  merchInfo: string;
  extraNotes: string;
};

export const EMPTY_WEBSITE_BRIEF: WebsiteBriefFormData = {
  bandName: "",
  genre: "",
  location: "",
  contactName: "",
  email: "",
  phone: "",
  shortBio: "",
  mediumBio: "",
  fullBio: "",
  photoLinks: "",
  musicLinks: "",
  videoLinks: "",
  socialLinks: "",
  bookingInfo: "",
  stageTech: "",
  pressCredits: "",
  shows: "",
  websitePages: "",
  mainGoal: "",
  domainHosting: "",
  designIdeas: "",
  merchInfo: "",
  extraNotes: "",
};

export type WebsiteBriefField = {
  key: keyof WebsiteBriefFormData;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "textarea" | "dropOrLink";
  rows?: number;
  hint?: string;
  /** For dropOrLink fields: file input accept attribute */
  accept?: string;
  dropLabel?: string;
};

export type WebsiteBriefSection = {
  title: string;
  description?: string;
  fields: WebsiteBriefField[];
};

export const WEBSITE_BRIEF_SECTIONS: WebsiteBriefSection[] = [
  {
    title: "Artist basics",
    fields: [
      {
        key: "bandName",
        label: "Band / artist name",
        required: true,
        placeholder: "Your band or stage name",
      },
      {
        key: "genre",
        label: "Genre",
        required: true,
        placeholder: "e.g. Indie rock, reggae, country",
      },
      {
        key: "location",
        label: "Location",
        required: true,
        placeholder: "City, state",
      },
      {
        key: "contactName",
        label: "Contact name",
        required: true,
        placeholder: "Who should we reply to?",
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "you@email.com",
      },
      {
        key: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "(801) 555-0100",
      },
    ],
  },
  {
    title: "Bios",
    description: "Share what you have — short is enough to start; longer bios help press and booking.",
    fields: [
      {
        key: "shortBio",
        label: "Short bio",
        type: "textarea",
        rows: 3,
        required: true,
        placeholder: "1–2 sentences",
      },
      {
        key: "mediumBio",
        label: "Medium bio",
        type: "textarea",
        rows: 4,
        placeholder: "One paragraph",
      },
      {
        key: "fullBio",
        label: "Full bio",
        type: "textarea",
        rows: 6,
        placeholder: "Longer story if you have one",
      },
    ],
  },
  {
    title: "Photos & artwork",
    fields: [
      {
        key: "photoLinks",
        label: "Photos / logo / artwork",
        type: "dropOrLink",
        rows: 3,
        required: true,
        accept: "image/*,.pdf",
        dropLabel: "Drop images here or browse",
        hint: "Upload files and/or paste Google Drive or direct image links.",
        placeholder: "https://… (Google Drive or direct image links)",
      },
    ],
  },
  {
    title: "Music, video & social",
    fields: [
      {
        key: "musicLinks",
        label: "Music",
        type: "dropOrLink",
        rows: 3,
        required: true,
        accept: "audio/*,.mp3,.wav,.m4a,.flac,.aiff,.aif",
        dropLabel: "Drop audio files here or browse",
        hint: "Upload tracks and/or paste Spotify, Apple Music, Bandcamp, SoundCloud, or Google Drive links.",
        placeholder: "https://… (streaming or Google Drive links)",
      },
      {
        key: "videoLinks",
        label: "Best live / music video links",
        type: "textarea",
        rows: 3,
        placeholder: "YouTube or other video links",
      },
      {
        key: "socialLinks",
        label: "Social media links",
        type: "textarea",
        rows: 3,
        required: true,
        placeholder: "Instagram, Facebook, TikTok, YouTube, etc.",
      },
    ],
  },
  {
    title: "Booking & stage",
    fields: [
      {
        key: "bookingInfo",
        label: "Booking information",
        type: "textarea",
        rows: 4,
        placeholder:
          "Booking email/phone, set lengths, travel area, event types you play",
      },
      {
        key: "stageTech",
        label: "Stage plot / input list / tech rider",
        type: "textarea",
        rows: 3,
        placeholder: "Paste details or a link to your rider",
      },
    ],
  },
  {
    title: "Press, shows & goals",
    fields: [
      {
        key: "pressCredits",
        label: "Press quotes, festivals, venues, awards, openers",
        type: "textarea",
        rows: 4,
      },
      {
        key: "shows",
        label: "Upcoming & important past shows",
        type: "textarea",
        rows: 3,
      },
      {
        key: "websitePages",
        label: "Website pages wanted",
        type: "textarea",
        rows: 2,
        placeholder: "Home, About, Music, Shows, EPK, Contact, Store, Press, Merch…",
      },
      {
        key: "mainGoal",
        label: "Main goal for the website or EPK",
        type: "textarea",
        rows: 2,
        placeholder:
          "Booking shows, streaming, tickets, merch, social growth, management contact…",
      },
    ],
  },
  {
    title: "Domain, design & merch",
    fields: [
      {
        key: "domainHosting",
        label: "Domain / existing website / hosting",
        type: "textarea",
        rows: 2,
        placeholder: "Do you already own a domain or site?",
      },
      {
        key: "designIdeas",
        label: "Design ideas",
        type: "textarea",
        rows: 4,
        placeholder: "Colors, vibe, sites you like, sites you don't like",
      },
      {
        key: "merchInfo",
        label: "Merch / store info",
        type: "textarea",
        rows: 2,
        placeholder: "Optional — products or store links to include",
      },
      {
        key: "extraNotes",
        label: "Anything else we should know?",
        type: "textarea",
        rows: 3,
      },
    ],
  },
];

const FIELD_LABELS = Object.fromEntries(
  WEBSITE_BRIEF_SECTIONS.flatMap((section) =>
    section.fields.map((field) => [field.key, field.label])
  )
) as Record<keyof WebsiteBriefFormData, string>;

export function packageLabel(productId: StoreProductId): string {
  return STORE_PRODUCTS.find((p) => p.id === productId)?.name ?? productId;
}

export type WebsiteBriefFiles = Partial<
  Record<keyof WebsiteBriefFormData, File[]>
>;

export function formatWebsiteBriefEmailBody(
  productId: StoreProductId,
  data: WebsiteBriefFormData,
  files?: WebsiteBriefFiles
): string {
  const lines: string[] = [
    `Package: ${packageLabel(productId)}`,
    "",
    "— Website / EPK brief —",
    "",
  ];

  for (const section of WEBSITE_BRIEF_SECTIONS) {
    lines.push(section.title.toUpperCase());
    for (const field of section.fields) {
      const value = data[field.key].trim();
      const attached = files?.[field.key] ?? [];
      lines.push(`${FIELD_LABELS[field.key]}:`);
      if (value) lines.push(value);
      if (attached.length) {
        lines.push(
          `Attached files (${attached.length}): ${attached.map((f) => f.name).join(", ")}`
        );
      }
      if (!value && !attached.length) lines.push("(not provided)");
      lines.push("");
    }
  }

  return lines.join("\n").trim();
}

export function websiteBriefMailtoHref(
  toEmail: string,
  productId: StoreProductId,
  data: WebsiteBriefFormData,
  files?: WebsiteBriefFiles
): string {
  const subject = `${packageLabel(productId)} brief — ${data.bandName.trim() || "new order"}`;
  const body = formatWebsiteBriefEmailBody(productId, data, files);
  return `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function validateWebsiteBrief(
  data: WebsiteBriefFormData,
  files?: WebsiteBriefFiles
): string | null {
  for (const section of WEBSITE_BRIEF_SECTIONS) {
    for (const field of section.fields) {
      if (!field.required) continue;
      const hasText = Boolean(data[field.key].trim());
      const hasFiles = (files?.[field.key]?.length ?? 0) > 0;
      if (field.type === "dropOrLink") {
        if (!hasText && !hasFiles) {
          return `Please add a link or upload files for: ${field.label}`;
        }
        continue;
      }
      if (!hasText) {
        return `Please fill in: ${field.label}`;
      }
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    return "Please enter a valid email address";
  }
  return null;
}
