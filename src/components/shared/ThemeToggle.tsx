import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { ShareButton } from "@/components/animate-ui/components/community/share-button";
import { useThemeToggle } from "@/hooks/useTheme";

gsap.registerPlugin(CustomEase);

const REVEAL_EASE = CustomEase.create(
  "reveal",
  "M0,0 C0.12,0 0.22,0.82 0.42,0.92 0.62,1.02 0.8,1 1,1",
);

const LIGHT_BG      = "hsl(90, 38%, 96%)";
const DARK_BG       = "hsl(150, 24%, 10%)";
const ACCENT_COLORS = ["#e8907a", "#c8a540", "#5aa0c8"];

const SITE_URL   = typeof window !== "undefined" ? window.location.origin : "";
const SHARE_TEXT = "Check out Prajjwal's portfolio!";

function handleSharePlatform(platform: "github" | "x" | "facebook") {
  const enc = encodeURIComponent;
  const urls = {
    github:   "https://github.com/Prajjwal2051",
    x:        `https://twitter.com/intent/tweet?url=${enc(SITE_URL)}&text=${enc(SHARE_TEXT)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(SITE_URL)}`,
  };
  window.open(urls[platform], "_blank", "noopener,noreferrer");
}

function burstParticles(container: HTMLDivElement, cx: number, cy: number) {
  const COUNT = 16;
  const els: HTMLDivElement[] = [];

  for (let i = 0; i < COUNT; i++) {
    const size  = 3 + Math.random() * 5;
    const color = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
    const el    = document.createElement("div");
    el.style.cssText = `
      position:fixed;
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${color};
      left:${cx}px;
      top:${cy}px;
      transform:translate(-50%,-50%);
      pointer-events:none;
      will-change:transform,opacity;
    `;
    container.appendChild(el);
    els.push(el);
  }

  gsap.to(els, {
    x: () => (Math.random() - 0.5) * 200,
    y: () => (Math.random() - 0.5) * 200,
    scale: 0,
    opacity: 0,
    duration: () => 0.5 + Math.random() * 0.4,
    stagger: 0.018,
    ease: "power3.out",
    onComplete() { els.forEach((el) => el.remove()); },
  });
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();
  const [isAnimating, setIsAnimating] = useState(false);

  const overlayRef    = useRef<HTMLDivElement>(null);
  const particleRef   = useRef<HTMLDivElement>(null);
  const switchWrapRef = useRef<HTMLDivElement>(null);
  const toggleRef     = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    const rect = toggleRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width  / 2 : window.innerWidth  - 28;
    const cy = rect ? rect.top  + rect.height / 2 : 28;
    const r  = Math.hypot(
      Math.max(cx, window.innerWidth  - cx),
      Math.max(cy, window.innerHeight - cy),
    ) + 50;

    const overlay    = overlayRef.current;
    const pContainer = particleRef.current;
    if (!overlay || !pContainer) return;

    setIsAnimating(true);

    burstParticles(pContainer, cx, cy);

    // icon spring
    gsap.fromTo(
      switchWrapRef.current,
      { scale: 0.82 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" },
    );

    overlay.style.background = isDark ? LIGHT_BG : DARK_BG;
    overlay.style.display    = "block";
    gsap.set(overlay, { opacity: 1, clipPath: `circle(0px at ${cx}px ${cy}px)` });

    gsap.to(overlay, {
      clipPath: `circle(${r}px at ${cx}px ${cy}px)`,
      duration: 0.72,
      ease: REVEAL_EASE,
      onComplete() {
        toggleTheme();
        gsap.to(overlay, {
          opacity:  0,
          duration: 0.32,
          ease: "power2.out",
          onComplete() {
            overlay.style.display = "none";
            gsap.set(overlay, { opacity: 1 });
            setIsAnimating(false);
          },
        });
      },
    });
  }, [isAnimating, isDark, toggleTheme]);

  return (
    <>
      {/* Always-mounted overlay — shown/hidden imperatively by GSAP */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{ display: "none", zIndex: 9998 }}
      />
      {/* Particle container */}
      <div
        ref={particleRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />

      <motion.div
        ref={toggleRef}
        className="fixed top-4 right-4 z-[10000]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <div ref={switchWrapRef}>
          <Switch
            checked={isDark}
            onCheckedChange={handleToggle}
            thumbIcon={isDark ? <Moon /> : <Sun />}
            className="h-6 w-11 cursor-pointer"
            pressedWidth={22}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          />
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-4 left-4 z-50"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <ShareButton
          size="sm"
          icon="prefix"
          className="min-w-[90px] h-7 text-xs px-3 rounded-full font-mono"
          whileHover={{ minWidth: "148px", transition: { duration: 0.2, ease: "easeOut" } }}
          onIconClick={handleSharePlatform}
        >
          share
        </ShareButton>
      </motion.div>
    </>
  );
}
