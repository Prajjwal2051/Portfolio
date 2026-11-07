import { useState, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { ShareButton } from "@/components/animate-ui/components/community/share-button";
import { EyeFollowButton } from "@/components/shared/EyeFollowButton";
import { useThemeToggle } from "@/hooks/useTheme";

gsap.registerPlugin(CustomEase);

// Smooth, cinematic ease-out curve (gentle momentum, no abrupt jumps)
const SMOOTH_REVEAL_EASE = CustomEase.create(
  "smoothReveal",
  "M0,0 C0.22,1 0.36,1 1,1"
);

const LIGHT_BG = "hsl(90, 38%, 96%)";
const DARK_BG = "hsl(150, 24%, 10%)";
const ACCENT_COLORS = ["#e8907a", "#c8a540", "#5aa0c8"];

const SITE_URL = typeof window !== "undefined" ? window.location.origin : "";
const SHARE_TEXT = "Check out Prajjwal's portfolio!";

function handleSharePlatform(platform: "github" | "x" | "instagram") {
  const enc = encodeURIComponent;
  const urls = {
    github: "https://github.com/Prajjwal2051",
    x: `https://twitter.com/intent/tweet?url=${enc(SITE_URL)}&text=${enc(SHARE_TEXT)}`,
    instagram: "https://www.instagram.com/prajjwalsahuu/",
  };
  window.open(urls[platform], "_blank", "noopener,noreferrer");
}

function burstParticles(container: HTMLDivElement, cx: number, cy: number) {
  const COUNT = 16;
  const els: HTMLDivElement[] = [];

  for (let i = 0; i < COUNT; i++) {
    const size = 3 + Math.random() * 4;
    const color = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
    const el = document.createElement("div");
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
      filter: blur(0.5px);
      box-shadow: 0 0 8px ${color}99;
    `;
    container.appendChild(el);
    els.push(el);
  }

  gsap.to(els, {
    x: () => (Math.random() - 0.5) * 150,
    y: () => (Math.random() - 0.5) * 150,
    scale: 0,
    opacity: 0,
    duration: () => 1.1 + Math.random() * 0.4,
    stagger: 0.02,
    ease: "power2.out",
    onComplete() {
      els.forEach((el) => el.remove());
    },
  });
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();
  const [isAnimating, setIsAnimating] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const switchWrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      toggleTheme();
      return;
    }

    const rect = toggleRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth - 28;
    const cy = rect ? rect.top + rect.height / 2 : 28;
    const r =
      Math.hypot(
        Math.max(cx, window.innerWidth - cx),
        Math.max(cy, window.innerHeight - cy)
      ) + 60;

    const pContainer = particleRef.current;
    if (pContainer) {
      burstParticles(pContainer, cx, cy);
    }

    // Gentle switch spring
    if (switchWrapRef.current) {
      gsap.fromTo(
        switchWrapRef.current,
        { scale: 0.92 },
        { scale: 1, duration: 0.7, ease: "power2.out" }
      );
    }

    // Modern View Transitions API for seamless, flicker-free circular transition
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      setIsAnimating(true);
      try {
        const doc = document as Document & {
          startViewTransition: (cb: () => void) => {
            ready: Promise<void>;
            finished: Promise<void>;
          };
        };

        const transition = doc.startViewTransition(() => {
          flushSync(() => {
            toggleTheme();
          });
        });

        transition.ready
          .then(() => {
            const animation = document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${cx}px ${cy}px)`,
                  `circle(${r}px at ${cx}px ${cy}px)`,
                ],
              },
              {
                duration: 1100,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );

            animation.onfinish = () => {
              setIsAnimating(false);
            };
            animation.oncancel = () => {
              setIsAnimating(false);
            };
          })
          .catch(() => {
            setIsAnimating(false);
          });

        return;
      } catch {
        // Fallback to GSAP if startViewTransition throws
      }
    }

    // Fallback for browsers without View Transitions API
    const overlay = overlayRef.current;
    if (!overlay) {
      toggleTheme();
      return;
    }

    setIsAnimating(true);

    overlay.style.background = isDark ? LIGHT_BG : DARK_BG;
    overlay.style.display = "block";
    gsap.set(overlay, { opacity: 1, clipPath: `circle(0px at ${cx}px ${cy}px)` });

    gsap.to(overlay, {
      clipPath: `circle(${r}px at ${cx}px ${cy}px)`,
      duration: 1.15,
      ease: SMOOTH_REVEAL_EASE,
      onComplete() {
        toggleTheme();
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
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
      {/* Always-mounted fallback overlay */}
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
        className="fixed top-4 right-4 z-[10000] flex items-center gap-2.5 sm:gap-3"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <EyeFollowButton />
        <ShareButton
          size="sm"
          icon="prefix"
          className="min-w-[85px] h-7 text-xs px-2.5 sm:px-3 rounded-full font-mono cursor-pointer"
          whileHover={{ minWidth: "148px", transition: { duration: 0.2, ease: "easeOut" } }}
          onIconClick={handleSharePlatform}
        >
          share
        </ShareButton>
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
    </>
  );
}

export default ThemeToggle;
