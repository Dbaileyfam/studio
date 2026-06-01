import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to top on route change; honor in-page hash links (e.g. /#our-services). */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
