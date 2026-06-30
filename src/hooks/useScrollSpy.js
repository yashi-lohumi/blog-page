import { useState, useEffect } from "react";

export function useScrollSpy(selectors, options = {}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = selectors.map(selector => document.querySelector(selector)).filter(Boolean);
    
    if (elements.length === 0) return;

    const observerOptions = {
      rootMargin: options.rootMargin || "0px 0px -60% 0px",
      threshold: options.threshold || 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [selectors, options.rootMargin, options.threshold]);

  return activeId;
}
