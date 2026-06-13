import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const between = (seed: number, min: number, max: number) =>
  min + hash(seed) * (max - min);

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${between(i * 3, 2, 96)}%`,
  dur: `${between(i * 7, 5.5, 10)}s`,
  delay: `${between(i * 11, 0, 10)}s`,
  size: `${between(i * 5, 6, 11)}px`,
  drift: `${between(i * 13, -55, 55)}px`,
  spin: `${between(i * 17, 100, 380)}deg`,
  hue: between(i * 19, 338, 358),
  sat: between(i * 23, 60, 82),
  lit: between(i * 29, 80, 93),
  alpha: between(i * 31, 0.45, 0.75),
}));

const RAIN = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  x: `${between(i * 2, 0, 100)}%`,
  dur: `${between(i * 3, 0.45, 1.05)}s`,
  delay: `${between(i * 5, 0, 1.6)}s`,
  len: `${between(i * 7, 10, 24)}px`,
  opacity: between(i * 11, 0.045, 0.12),
}));

export function SeasonalAmbient() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (resolvedTheme === "dark") {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {RAIN.map((d) => (
          <div
            key={d.id}
            className="absolute top-0 w-px"
            style={{
              left: d.x,
              height: d.len,
              background:
                "linear-gradient(to bottom, transparent, hsl(90 35% 78% / 0.22))",
              opacity: d.opacity,
              animation: `rain-fall ${d.dur} linear ${d.delay} infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {PETALS.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={
            {
              left: p.x,
              width: p.size,
              height: `calc(${p.size} * 0.62)`,
              borderRadius: "50% 0 50% 0",
              background: `hsl(${p.hue} ${p.sat}% ${p.lit}% / ${p.alpha})`,
              animation: `petal-fall ${p.dur} ease-in ${p.delay} infinite`,
              "--drift": p.drift,
              "--spin": p.spin,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
