import studio01 from "@/assets/studio-gallery/studio-01.png";
import studio02 from "@/assets/studio-gallery/studio-02.png";
import studio03 from "@/assets/studio-gallery/studio-03.png";
import studio04 from "@/assets/studio-gallery/studio-04.png";
import studio05 from "@/assets/studio-gallery/studio-05.png";
import studio06 from "@/assets/studio-gallery/studio-06.png";
import studio07 from "@/assets/studio-gallery/studio-07.png";
import studio08 from "@/assets/studio-gallery/studio-08.png";
import studio09 from "@/assets/studio-gallery/studio-09.png";
import type { ServiceSlug } from "@/lib/services";

export type StudioGalleryImage = {
  src: string;
  alt: string;
};

export const STUDIO_GALLERY_IMAGES: StudioGalleryImage[] = [
  { src: studio01, alt: "Blue sparkle drum kit in the main studio room with neon signs" },
  { src: studio02, alt: "Drum kit and mixing board with purple and blue studio lighting" },
  { src: studio03, alt: "Wide view of the studio with drum kit, amps, and wall decor" },
  { src: studio04, alt: "Studio room with cymbals, amps, and Salt Rock City signage" },
  { src: studio05, alt: "Drum recording area with teal LED lights and acoustic treatment" },
  { src: studio06, alt: "Control room desk with studio monitors and hexagonal acoustic panels" },
  { src: studio07, alt: "Production workstation with mixing console and recording booth" },
  { src: studio08, alt: "Mixing console view toward the drum kit and vocal booth" },
  { src: studio09, alt: "Lounge seating area with music-themed decor in the studio" },
];

export const STUDIO_GALLERY_SERVICE_SLUGS: ServiceSlug[] = [
  "recording-studio-sandy-utah",
  "studio-rental",
];

export const serviceHasStudioGallery = (slug: ServiceSlug) =>
  STUDIO_GALLERY_SERVICE_SLUGS.includes(slug);
