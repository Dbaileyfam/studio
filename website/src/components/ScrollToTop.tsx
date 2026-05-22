import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to top on route change; honor in-page hash links (e.g. /#our-services). */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    if (hash) {
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          scrollToTop();
        }
      });
      return;
    }

    scrollToTop();
    requestAnimationFrame(scrollToTop);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
