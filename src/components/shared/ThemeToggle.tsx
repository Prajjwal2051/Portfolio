import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeToggle } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();
  const [flashing, setFlashing] = useState(false);

  const handleToggle = () => {
    setFlashing(true);
    toggleTheme();
    setTimeout(() => setFlashing(false), 400);
  };

  return (
    <>
      {/* Flash overlay on theme switch */}
      <AnimatePresence>
        {flashing && (
          <motion.div
            key="flash"
            className="fixed inset-0 z-[9997] pointer-events-none"
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ background: isDark ? "#ffffff" : "#000000" }}
          />
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-4 right-4 z-50 text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors select-none"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? "☀️" : "🌙"}
      </motion.button>
    </>
  );
}
