import { useEffect } from "react";
import { SITE_NAME, SITE_URL, sitePath } from "@/lib/site";

type PageSEOProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

const setMeta = (
  attribute: "name" | "property",
  key: string,
  content: string
) => {
  const selector = `meta[${attribute}="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

const PageSEO = ({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: PageSEOProps) => {
  useEffect(() => {
    const fullTitle =
      title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const url = sitePath(path);
    const keywordContent = [
      SITE_NAME,
      "Salt Lake City recording studio",
      "Utah music studio",
      ...keywords,
    ].join(", ");

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywordContent);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", `${SITE_URL}/share-logo.png`);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", `${SITE_URL}/share-logo.png`);

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description, path, keywords, type]);

  return null;
};

export default PageSEO;
