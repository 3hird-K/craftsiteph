"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export function AOSInit() {
  useEffect(() => {
    document.body.setAttribute("data-aos-duration", "700");
    document.body.setAttribute("data-aos-easing", "ease-out-cubic");

    const observed = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("aos-animate", entry.isIntersecting);
          entry.target.classList.add("aos-init");
        }
      },
      { threshold: 0 }
    );

    const scan = () => {
      document.querySelectorAll("[data-aos]").forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };

    scan();

    const deferred = window.setTimeout(scan, 500);

    const mutationObserver = new MutationObserver((mutations) => {
      const touchedAos = mutations.some(
        (m) =>
          m.type === "attributes"
            ? (m.target as Element).getAttribute("data-aos") !== null
            : (m.target as Element).matches?.("[data-aos]") ||
              (m.target as Element).querySelector?.("[data-aos]")
      );
      if (touchedAos) scan();
    });

    mutationObserver.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-aos"],
    });

    return () => {
      window.clearTimeout(deferred);
      mutationObserver.disconnect();
      observer.disconnect();
      observed.clear();
      document.body.removeAttribute("data-aos-duration");
      document.body.removeAttribute("data-aos-easing");
    };
  }, []);

  return null;
}
