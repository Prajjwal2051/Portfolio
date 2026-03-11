import { useState, useEffect, useCallback } from "react";
import type { SectionId } from "@/types";

export function useActiveSection(sectionIds: SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(
    sectionIds[0] ?? "hero",
  );

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sectionId = sectionIds[i];
      if (!sectionId) continue;
      // Pick the visible element (offsetParent !== null), not the hidden desktop duplicate
      const all = Array.from(document.querySelectorAll(`#${sectionId}`)) as HTMLElement[];
      const element = all.find((el) => el.offsetParent !== null) ?? all[0];
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(sectionId);
        return;
      }
    }
  }, [sectionIds]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((id: SectionId) => {
    // There may be two elements with the same id (desktop hidden + mobile visible).
    // Pick the one whose offsetParent is not null (i.e. actually rendered/visible).
    const all = Array.from(document.querySelectorAll(`#${id}`)) as HTMLElement[];
    const element = all.find((el) => el.offsetParent !== null) ?? all[0];
    if (!element) return;
    let top = 0;
    let el: HTMLElement | null = element;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent as HTMLElement | null;
    }
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return { activeSection, scrollToSection };
}
