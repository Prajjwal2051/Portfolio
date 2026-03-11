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
      const element = document.getElementById(sectionId);
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
    const element = document.getElementById(id);
    if (!element) return;
    // Traverse offsetParent chain — works correctly regardless of CSS zoom
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
