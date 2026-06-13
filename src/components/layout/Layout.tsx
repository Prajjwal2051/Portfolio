import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { Sidebar } from "./Sidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { CoverHeader } from "@/components/shared/CoverHeader";
import { setLenis } from "@/lib/lenis";

interface LayoutProps {
  children: React.ReactNode;
}

const MAX_SKEW = 2.5;

export function Layout({ children }: LayoutProps) {
  const desktopMainRef = useRef<HTMLElement>(null);
  const mobileMainRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenis);

    if (!prefersReduced) {
      lenis.on("scroll", ({ velocity }: { velocity: number }) => {
        const skew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, velocity * 0.08));
        const targets = [desktopMainRef.current, mobileMainRef.current].filter(
          Boolean,
        );
        gsap.to(targets, {
          skewY: skew,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        });
      });
    }

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Desktop: 2-column layout */}
      <div className="hidden lg:flex justify-center min-h-screen">
        <div className="flex w-full max-w-4xl">
          <Sidebar />
          <main ref={desktopMainRef} className="flex-1 min-w-0">
            <CoverHeader />
            <div className="px-6 xl:px-8 py-8 lg:py-10">{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile layout */}
      <main ref={mobileMainRef} className="lg:hidden">
        <CoverHeader />
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-8 pb-28">
          {children}
        </div>
      </main>

      <MobileBottomNav />
      <ThemeToggle />
    </div>
  );
}
