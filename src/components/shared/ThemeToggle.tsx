import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { ShareButton } from "@/components/animate-ui/components/community/share-button";
import { useThemeToggle } from "@/hooks/useTheme";

const LIGHT_BG = "hsl(90, 38%, 96%)";
const DARK_BG  = "hsl(150, 24%, 10%)";

const SITE_URL   = typeof window !== "undefined" ? window.location.origin : "";
const SHARE_TEXT = "Check out Prajjwal's portfolio!";

type Phase = "idle" | "expand" | "fade";

function handleSharePlatform(platform: "github" | "x" | "facebook") {
  const enc = encodeURIComponent;
  const urls = {
    github:   "https://github.com/Prajjwal2051",
    x:        `https://twitter.com/intent/tweet?url=${enc(SITE_URL)}&text=${enc(SHARE_TEXT)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(SITE_URL)}`,
  };
  window.open(urls[platform], "_blank", "noopener,noreferrer");
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();

  const [phase, setPhase]               = useState<Phase>("idle");
  const [origin, setOrigin]             = useState({ x: 0, y: 0 });
  const [maxRadius, setMaxRadius]       = useState(2000);
  const [overlayColor, setOverlayColor] = useState(LIGHT_BG);

  const toggleRef = useRef<HTMLDivElement>(null);

  const handleCheckedChange = useCallback(() => {
    if (phase !== "idle") return;

    const rect = toggleRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width  / 2 : window.innerWidth  - 28;
    const y = rect ? rect.top  + rect.height / 2 : 28;
    const r = Math.hypot(
      Math.max(x, window.innerWidth  - x),
      Math.max(y, window.innerHeight - y),
    ) + 50;

    setOrigin({ x, y });
    setMaxRadius(r);
    setOverlayColor(isDark ? LIGHT_BG : DARK_BG);
    setPhase("expand");
  }, [phase, isDark]);

  const handleAnimationComplete = useCallback(() => {
    if (phase === "expand") {
      toggleTheme();
      setPhase("fade");
    } else if (phase === "fade") {
      setPhase("idle");
    }
  }, [phase, toggleTheme]);

  return (
    <>
      {phase !== "idle" && (
        <motion.div
          key="theme-reveal"
          className="fixed inset-0 pointer-events-none"
          style={{
            background: overlayColor,
            zIndex: 9998,
            clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
          }}
          animate={
            phase === "expand"
              ? { clipPath: `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)` }
              : { opacity: 0 }
          }
          transition={
            phase === "expand"
              ? { duration: 0.72, ease: [0.4, 0, 0.2, 1] }
              : { duration: 0.35, ease: "easeOut" }
          }
          onAnimationComplete={handleAnimationComplete}
        />
      )}

      <motion.div
        ref={toggleRef}
        className="fixed top-4 right-4 z-[9999]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <Switch
          checked={isDark}
          onCheckedChange={handleCheckedChange}
          thumbIcon={isDark ? <Moon /> : <Sun />}
          className="h-6 w-11 cursor-pointer"
          pressedWidth={22}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        />
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
