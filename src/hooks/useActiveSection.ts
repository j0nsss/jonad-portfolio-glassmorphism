import { useEffect, useState } from "react";
import { SECTION_IDS } from "@/lib/constants";

export function useActiveSection(): string {
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect, {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        });
        observer.observe(el);
        observers.push(observer);
      }
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  return activeId;
}
