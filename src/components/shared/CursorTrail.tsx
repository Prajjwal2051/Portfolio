import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 8;
const TRAIL_COLORS = [
  "#e8907a",
  "#c8a540",
  "#5aa0c8",
  "#6ee7b7",
  "#e8907a",
  "#c8a540",
  "#5aa0c8",
  "#6ee7b7",
];

export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;
    const dots = Array.from(container.children) as HTMLElement[];
    const positions: Array<{ x: number; y: number }> = Array.from(
      { length: TRAIL_LENGTH },
      () => ({ x: -100, y: -100 }),
    );

    function onMouseMove(e: MouseEvent) {
      positions.unshift({ x: e.clientX, y: e.clientY });
      positions.splice(TRAIL_LENGTH);

      dots.forEach((dot, i) => {
        const pos = positions[i];
        if (pos) {
          const size = 8 - i;
          dot.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`;
        }
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true">
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${8 - i}px`,
            height: `${8 - i}px`,
            borderRadius: "50%",
            background: TRAIL_COLORS[i],
            opacity: (8 - i) / 10,
            pointerEvents: "none",
            zIndex: 9998,
            transition: `transform ${(i + 1) * 50}ms linear`,
            willChange: "transform",
            transform: "translate(-100px, -100px)",
          }}
        />
      ))}
    </div>
  );
}
