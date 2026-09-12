import { motion } from "framer-motion";
import { useEyeTarget } from "@/hooks/useEyeTarget";

export function InteractiveGhost() {
  const { ref, x, y } = useEyeTarget(3, 10);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
      transition={{ duration: 0.4 }}
      className="inline-block cursor-default drop-shadow-md"
    >
      <svg
        width="86"
        height="96"
        viewBox="0 0 86 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <path
          d="M43 6C21.5 6 10 23 10 43V80c0 3.6 4.3 5.5 7 3l6.5-6 6.5 6c2.4 2.3 6.1 2.3 8.5 0l4.5-4.3 4.5 4.3c2.4 2.3 6.1 2.3 8.5 0l6.5-6 6.5 6c2.7 2.5 7-.4 7-3V43C76 23 64.5 6 43 6Z"
          className="fill-foreground"
        />
        {/* Eye sockets */}
        <circle cx="30" cy="40" r="7.5" fill="hsl(var(--background))" />
        <circle cx="56" cy="40" r="7.5" fill="hsl(var(--background))" />
        {/* Pupils — track the cursor */}
        <motion.circle cx="30" cy="40" r="3.3" className="fill-foreground" style={{ x, y }} />
        <motion.circle cx="56" cy="40" r="3.3" className="fill-foreground" style={{ x, y }} />
        {/* Mouth */}
        <motion.ellipse
          cx="43"
          cy="56"
          rx="4.5"
          ry="5.5"
          fill="hsl(var(--background))"
          animate={{ ry: [5.5, 3.5, 5.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blush */}
        <circle cx="18" cy="50" r="3" fill="currentColor" className="text-accent-pink" opacity="0.5" />
        <circle cx="68" cy="50" r="3" fill="currentColor" className="text-accent-pink" opacity="0.5" />
      </svg>
    </motion.div>
  );
}
