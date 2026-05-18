import { useEffect, useRef } from "react";

const SCRIPT_ID = "instagram-embed-script";
const SCRIPT_SRC = "https://www.instagram.com/embed.js";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

type InstagramReelEmbedProps = {
  permalink: string;
  className?: string;
};

const InstagramReelEmbed = ({ permalink, className = "" }: InstagramReelEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processEmbeds = () => {
      window.instgrm?.Embeds?.process();
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      processEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.instgrm?.Embeds?.process();
    }, 100);
    return () => window.clearTimeout(timer);
  }, [permalink]);

  const embedUrl = permalink.includes("?")
    ? permalink
    : `${permalink}?utm_source=ig_embed&utm_campaign=loading`;

  return (
    <div
      ref={containerRef}
      className={`flex w-full justify-center ${className}`}
    >
      <blockquote
        className="instagram-media !m-0 !max-w-full"
        data-instgrm-captioned
        data-instgrm-permalink={embedUrl}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "12px",
          boxShadow:
            "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: 0,
          maxWidth: "540px",
          minWidth: "min(100%, 326px)",
          padding: 0,
          width: "100%",
        }}
      />
    </div>
  );
};

export default InstagramReelEmbed;
