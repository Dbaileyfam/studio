type InstagramReelEmbedProps = {
  permalink: string;
  className?: string;
};

const getReelId = (permalink: string) => {
  const match = permalink.match(/\/reel\/([^/?#]+)/i);
  return match?.[1] ?? null;
};

const InstagramReelEmbed = ({ permalink, className = "" }: InstagramReelEmbedProps) => {
  const reelId = getReelId(permalink);

  if (!reelId) {
    return (
      <p className="text-center text-gray-400 text-sm">
        Unable to load reel.{" "}
        <a href={permalink} target="_blank" rel="noopener noreferrer" className="text-teal-300 underline">
          Open on Instagram
        </a>
      </p>
    );
  }

  const embedSrc = `https://www.instagram.com/reel/${reelId}/embed`;

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <iframe
        src={embedSrc}
        title="801 Family Studios — Instagram reel"
        className="w-full max-w-[540px] rounded-xl border-0 bg-black"
        style={{ minHeight: "680px", height: "min(85vh, 720px)" }}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default InstagramReelEmbed;
