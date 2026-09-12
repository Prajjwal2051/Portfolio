import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useEyeTarget(travel = 5, maxDistMultiplier = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.3 });

  useEffect(() => {
    const maxDist = travel * maxDistMultiplier;
    const handleMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(dist, maxDist) / maxDist;
      x.set((dx / dist) * travel * pull);
      y.set((dy / dist) * travel * pull);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [travel, maxDistMultiplier, x, y]);

  return { ref, x: springX, y: springY };
}
