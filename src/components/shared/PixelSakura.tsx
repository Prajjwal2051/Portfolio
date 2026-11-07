import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

// 48x48 Pixel Matrix representing the Sakura Tree
const TREE_PIXELS = [
  "................................................",
  "....................111222......................",
  ".................11223333322....................",
  "..............11223333333333222.................",
  "............11233334444433333322...11222........",
  "..........11233344445554443333322.1233332.......",
  ".........123344455556655544433332123344332......",
  "........1234455566666665554433333334455432......",
  ".......12345566666666665544333223344555432......",
  "......123456666666666655443321123445565432......",
  "..112.1245666666666655443321...12345665432..112.",
  ".1232234556666666655443321......1235665432.12332",
  "123333455566666655443321.........124565432123443",
  "12344445555666554443321...........12345433345543",
  "123455555445544433321..............1234433456543",
  ".123455443334433321.................123434566543",
  "..123443321..3321...dD...............12345565432",
  "...1233321...121...dbBd...............123455432.",
  ".....121..........dbBBd................1233321..",
  ".................dbBBBD......dD..........121....",
  "................dbBBBBd.....dbBd................",
  "...............dbBBBBBD.....dbBd................",
  "..............dbBBBBBBD....dbBBD................",
  "..............dbBBBBBd....dbBBD.................",
  "...............dbBBBd....dbBBD..................",
  "................dbBBdd..dbBBD...................",
  ".................dbBBBBBBBBD....................",
  ".................dbBBBBBBBD.....................",
  "................dbBBBBBBBD......................",
  "...............dbBBBBBBBBD......................",
  "..............dbBBBBBBBBBD......................",
  ".............dbBBBBBBBBBBBD.....................",
  "............dbBBBBBBBBBBBBBD....................",
  "...........dbBBBBBBBBBBBBBBBD...................",
  "..........dbBBBBBBd..dBBBBBBBD..................",
  ".........dbBBBBd.......dBBBBBBBD.....k.k........",
  "........dbBBBBD.........dBBBBBBBD...keke........",
  ".......dbBBBD............dBBBBBBBD..kkkk........",
  "......dbBBBD..............dBBBBBBBD..k.k........",
  ".....dbBBD.................dBBBBBBBD.k.k........",
  "....GmmmmGG..............GGmmmmmmmmGG...........",
  "...GgGGGGmmGG..........GGmmGGGGggggGG...........",
  "..GgggGGGGmmGGGGGGGGGGGGmmGGGGggggggGG..........",
  "..GggggggGGGGmmmmmmmmmmmmGGGGggggggggG..........",
  "...22.GggggggGGGGGGGGGGGGggggggggG..22..........",
  ".....232...22.232...22...232...22...232.........",
  "................................................",
  "................................................",
];

// Spring Daytime Sakura Palette
const PALETTE_LIGHT: Record<string, string> = {
  "1": "#fff5f8", // glistening white-pink bloom
  "2": "#fedbe5", // delicate sakura pink
  "3": "#f7a5b8", // core spring sakura pink
  "4": "#e8738e", // rich petal midtone
  "5": "#c24765", // blossom shadow
  "6": "#8f2842", // deep canopy core
  b: "#a86840", // sunlit bark highlight
  B: "#784224", // warm cedar bark
  d: "#4a2412", // deep bark shadow
  D: "#241006", // bark outline
  g: "#7fa668", // sunlit moss
  G: "#557844", // lush moss
  m: "#334c26", // deep turf shadow
  k: "#f0f7ee", // kodama pale spirit body
  e: "#1c291a", // kodama eyes
};

// Yozakura (Night Cherry Blossom) Palette
const PALETTE_DARK: Record<string, string> = {
  "1": "#fff0f7", // moonlit petal gleam
  "2": "#fbb8ce", // radiant night pink
  "3": "#e97da0", // glowing blossom
  "4": "#c24970", // twilight rose
  "5": "#8a2749", // deep evening shadow
  "6": "#4d1028", // midnight canopy shadow
  b: "#7c4a30", // dim lantern wood
  B: "#522b17", // dark trunk
  d: "#32160a", // deep night bark
  D: "#150803", // silhouette line
  g: "#415f36", // moonlit moss
  G: "#294021", // deep moss
  m: "#152410", // night ground
  k: "#e2fae6", // glowing spirit body
  e: "#0d1f11", // spirit eyes
};

// Pre-computed run-length encoded rects
interface PixelRect {
  x: number;
  y: number;
  width: number;
  height: number;
  colorKey: string;
}

function computeRunLengthRects(): PixelRect[] {
  const result: PixelRect[] = [];
  for (let y = 0; y < TREE_PIXELS.length; y++) {
    const row = TREE_PIXELS[y]!;
    let x = 0;
    while (x < row.length) {
      const char = row[x]!;
      if (char === ".") {
        x++;
        continue;
      }
      const startX = x;
      while (x < row.length && row[x] === char) {
        x++;
      }
      result.push({
        x: startX,
        y,
        width: x - startX,
        height: 1,
        colorKey: char,
      });
    }
  }
  return result;
}

const RUN_LENGTH_RECTS = computeRunLengthRects();

// Persistent ambient floating petals
const AMBIENT_PETALS = [
  { id: 1, startX: 18, startY: 10, driftX: -65, delay: 0, duration: 4.8 },
  { id: 2, startX: 28, startY: 8, driftX: -85, delay: 1.4, duration: 5.6 },
  { id: 3, startX: 12, startY: 14, driftX: -55, delay: 2.7, duration: 4.5 },
  { id: 4, startX: 34, startY: 12, driftX: -100, delay: 3.9, duration: 6.2 },
  { id: 5, startX: 22, startY: 16, driftX: -70, delay: 5.2, duration: 5.1 },
  { id: 6, startX: 15, startY: 8, driftX: -60, delay: 6.6, duration: 4.9 },
];

interface BurstPetal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  size: number;
  color: string;
}

export function PixelSakura() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const palette = isDark ? PALETTE_DARK : PALETTE_LIGHT;
  const prefersReduced = useReducedMotion();

  const [bursts, setBursts] = useState<BurstPetal[]>([]);
  const [isWobbling, setIsWobbling] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = useCallback(() => {
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 700);

    // Spawn 14 playful burst petals
    const newPetals: BurstPetal[] = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: 15 + Math.random() * 20,
      y: 8 + Math.random() * 16,
      vx: -(40 + Math.random() * 90),
      vy: 30 + Math.random() * 70,
      rot: (Math.random() - 0.5) * 360,
      size: Math.random() > 0.4 ? 3 : 2,
      color:
        i % 3 === 0
          ? palette["1"] || "#fff"
          : i % 2 === 0
          ? palette["2"] || "#fbc"
          : palette["3"] || "#f8a",
    }));

    setBursts((prev) => [...prev.slice(-10), ...newPetals]);
  }, [palette]);

  // Clean up old burst petals after animation
  const handleBurstComplete = useCallback((id: number) => {
    setBursts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div
      className="fixed bottom-20 right-2 sm:right-3 lg:bottom-0 lg:right-6 z-40 select-none pointer-events-auto"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Playful tooltip on hover */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-7 right-2 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-mono bg-background/90 text-foreground/80 border border-border/60 backdrop-blur-md shadow-xs pointer-events-none"
          >
            sakura breeze 🌸
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pixel Tree Container */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        whileTap={{ scale: 0.96 }}
        animate={
          isWobbling
            ? {
                rotate: [0, -2.5, 3, -1.8, 1, 0],
                transition: { duration: 0.65, ease: "easeOut" },
              }
            : prefersReduced
            ? {}
            : {
                rotate: [-0.6, 0.6, -0.6],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
        style={{ transformOrigin: "50% 95%" }}
      >
        {/* Soft Ambient Ground Glow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(233,125,160,0.18) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(247,165,184,0.25) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />

        {/* 48x48 Pixel SVG Tree */}
        <svg
          viewBox="0 0 48 48"
          className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 block drop-shadow-sm"
          style={{
            shapeRendering: "crispEdges",
            imageRendering: "pixelated",
          }}
          aria-label="Pixel art Sakura tree"
          role="img"
        >
          {RUN_LENGTH_RECTS.map((r, i) => (
            <rect
              key={i}
              x={r.x}
              y={r.y}
              width={r.width}
              height={r.height}
              fill={palette[r.colorKey] || "#f7a5b8"}
            />
          ))}
        </svg>

        {/* Persistent Floating Hanabira (Petals) */}
        {!prefersReduced &&
          AMBIENT_PETALS.map((petal) => (
            <motion.span
              key={petal.id}
              className="absolute pointer-events-none rounded-xs block"
              style={{
                width: 3,
                height: 2.5,
                backgroundColor: isDark ? "#fbb8ce" : "#fedbe5",
                boxShadow: isDark ? "0 0 3px #fbb8ce99" : "none",
                left: `${(petal.startX / 48) * 100}%`,
                top: `${(petal.startY / 48) * 100}%`,
              }}
              animate={{
                x: [0, petal.driftX * 0.4, petal.driftX * 0.7, petal.driftX],
                y: [0, 25, 60, 105],
                rotate: [0, 45, 120, 240],
                opacity: [0, 0.9, 0.8, 0],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Click Burst Petals */}
        <AnimatePresence>
          {bursts.map((b) => (
            <motion.span
              key={b.id}
              className="absolute pointer-events-none rounded-xs block"
              style={{
                width: b.size,
                height: b.size,
                backgroundColor: b.color,
                left: `${(b.x / 48) * 100}%`,
                top: `${(b.y / 48) * 100}%`,
                boxShadow: isDark ? `0 0 4px ${b.color}aa` : "none",
              }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: [0, 1.2, 0.9],
                x: b.vx,
                y: b.vy,
                rotate: b.rot,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => handleBurstComplete(b.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default PixelSakura;
