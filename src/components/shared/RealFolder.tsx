import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import type { Project } from "@/types";

export interface FolderCardData {
  title?: string;
  tag?: string;
  image?: { src?: string; srcSet?: string; alt?: string };
  link?: string;
  linkNewTab?: boolean;
  project?: Project;
}

export interface FolderCollectionData {
  name: string;
  color: string;
  card1?: FolderCardData;
  card2?: FolderCardData;
  card3?: FolderCardData;
  // Framer compatibility props
  image1?: { src?: string; srcSet?: string; alt?: string };
  link1?: string;
  link1NewTab?: boolean;
  image2?: { src?: string; srcSet?: string; alt?: string };
  link2?: string;
  link2NewTab?: boolean;
  image3?: { src?: string; srcSet?: string; alt?: string };
  link3?: string;
  link3NewTab?: boolean;
}

export interface RealFolderProps {
  forms?: Partial<FolderCollectionData>;
  spaces?: Partial<FolderCollectionData>;
  fragments?: Partial<FolderCollectionData>;
  collections?: FolderCollectionData[];
  background?: string;
  startOpen?: boolean;
  enableTilt?: boolean;
  speed?: number;
  style?: React.CSSProperties;
  className?: string;
  onCardClick?: (card: FolderCardData, index: number) => void;
  onCardHover?: (card: FolderCardData | null, index: number | null) => void;
  onActiveCollectionChange?: (index: number) => void;
}

const defaults: FolderCollectionData[] = [
  { name: "Web Platforms", color: "#CB5037" },
  { name: "Systems & Security", color: "#4568A7" },
  { name: "IoT & Hardware", color: "#386451" },
];

const titles = [
  ["Counterbalance", "Soft geometry", "In good company"],
  ["An open door", "Another dimension", "A quieter place"],
  ["Cut from nature", "A little rhythm", "Pieces of a whole"],
];

const css = `
.real-folder, .real-folder * { box-sizing: border-box; }
.real-folder button, .real-folder a { -webkit-tap-highlight-color: transparent; touch-action: manipulation; appearance: none; }
.real-folder button:focus-visible, .real-folder a:focus-visible { outline: 2px solid #252A26; outline-offset: 5px; }
.real-folder .real-folder-tab:focus-visible { outline-color: #fff; outline-offset: -3px; }
@media (prefers-reduced-motion: reduce) {
  .real-folder * { transition: none !important; scroll-behavior: auto !important; }
}
`;

// Nine original vector compositions; Bauhaus/constructivist artwork.
function Artwork({ collection, index }: { collection: number; index: number }) {
  const cream = "#F2EFDF";
  const red = "#E86042";
  const ink = "#262B29";
  const blue = "#456BBD";
  const powder = "#ADC9DB";
  const forest = "#315F50";
  const citron = "#D9E6A5";

  let art: React.ReactNode;
  switch (((collection % 3) * 3 + (index % 3) + 9) % 9) {
    case 0:
      art = (
        <>
          <rect width="300" height="360" fill={cream} />
          <circle cx="150" cy="155" r="109" fill={red} />
          <circle cx="150" cy="155" r="62" fill={cream} />
          <path
            d="M41 155a109 109 0 0 0 218 0"
            fill="none"
            stroke={ink}
            strokeWidth="28"
          />
          <rect x="122" y="142" width="56" height="164" rx="28" fill={red} />
          <circle cx="150" cy="302" r="28" fill={ink} />
          <path d="M22 326h57m-57 7h35" stroke={ink} strokeWidth="2" />
        </>
      );
      break;
    case 1:
      art = (
        <>
          <rect width="300" height="360" fill={red} />
          <circle cx="246" cy="45" r="80" fill={ink} />
          <circle cx="246" cy="45" r="31" fill={red} />
          {[38, 52, 66, 80, 94, 108, 122, 136].map((r) => (
            <path
              key={r}
              d={`M${146 - r} 253a${r} ${r} 0 0 1 ${r * 2} 0v107`}
              fill="none"
              stroke={cream}
              strokeWidth="6"
            />
          ))}
          <rect x="129" y="231" width="34" height="129" rx="17" fill={ink} />
          <circle cx="35" cy="39" r="9" fill={cream} />
        </>
      );
      break;
    case 2:
      art = (
        <>
          <rect width="300" height="360" fill={cream} />
          <path d="M33 30h102v102H33z" fill={ink} />
          <path d="M33 132a102 102 0 0 0 102 102V132Z" fill={red} />
          <path d="M165 30a102 102 0 0 1 102 102H165Z" fill={red} />
          <path d="M165 162h102v102H165z" fill={ink} />
          <circle cx="216" cy="213" r="29" fill={cream} />
          <path d="M33 265h102v63H33z" fill={red} />
          {[276, 287, 298, 309, 320].map((y) => (
            <path key={y} d={`M33 ${y}h102`} stroke={cream} strokeWidth="3" />
          ))}
          <circle cx="216" cy="311" r="18" fill={ink} />
        </>
      );
      break;
    case 3:
      art = (
        <>
          <rect width="300" height="360" fill={powder} />
          <circle cx="239" cy="54" r="28" fill={cream} />
          <path d="M29 360V151a110 110 0 0 1 220 0v209Z" fill={cream} />
          <path d="M61 360V155a78 78 0 0 1 156 0v205Z" fill={blue} />
          <path d="M97 360V163a42 42 0 0 1 84 0v197Z" fill="#284980" />
          <path d="m139 212 78 72v76H61v-76Z" fill={powder} />
          {[237, 256, 280, 309, 344].map((y, i) => (
            <path
              key={y}
              d={`M${139 - (y - 212) * 0.55} ${y}H${139 + (y - 212) * 0.55}`}
              stroke={cream}
              strokeWidth={2 + i * 0.2}
            />
          ))}
          <path d="M29 360h220" stroke={cream} strokeWidth="16" />
        </>
      );
      break;
    case 4:
      art = (
        <>
          <rect width="300" height="360" fill={blue} />
          <path d="m33 322 90-230 144-49-90 230Z" fill={cream} />
          <path d="m177 273 90-230v106l-90 211Z" fill={powder} />
          <path d="m88 283 54-142c15-39 64-32 49 7l-46 116Z" fill={blue} />
          <path d="m108 275 45-120c7-19 26-18 18 3l-42 111Z" fill="#294A80" />
          <path d="M33 322h36v-12h36v-12h36v-12h36v74H33Z" fill={powder} />
          <path
            d="M33 340h36m0-12h36m0-12h36m0-12h36"
            stroke={blue}
            strokeWidth="2"
          />
          <circle cx="47" cy="53" r="18" fill={powder} />
        </>
      );
      break;
    case 5:
      art = (
        <>
          <rect width="300" height="360" fill={cream} />
          <circle cx="228" cy="84" r="103" fill={powder} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${25 + i * 38} 320V${83 + i * 16}l20-20v237Z`}
              fill={blue}
            />
          ))}
          <path
            d="M0 360v-29h48v-22h48v-22h48v-22h48v-22h48v-22h60v139Z"
            fill={cream}
          />
          <path
            d="M0 331h48v-22h48v-22h48v-22h48v-22h48v-22h60"
            fill="none"
            stroke={blue}
            strokeWidth="2"
          />
          <circle cx="39" cy="41" r="7" fill={blue} />
        </>
      );
      break;
    case 6:
      art = (
        <>
          <rect width="300" height="360" fill={forest} />
          <circle cx="51" cy="64" r="28" fill={cream} />
          <path d="M144 325V92" stroke={citron} strokeWidth="7" />
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <path
                d={`M145 ${143 + i * 65}q-88 4-88-62 78-3 88 62Z`}
                fill={i === 1 ? cream : citron}
              />
              <path
                d={`M145 ${177 + i * 65}q91 1 91-63-77-1-91 63Z`}
                fill={i === 1 ? citron : cream}
              />
            </React.Fragment>
          ))}
          <path d="M116 332h57" stroke={citron} strokeWidth="3" />
        </>
      );
      break;
    case 7:
      art = (
        <>
          <rect width="300" height="360" fill={cream} />
          <path d="M24 177c0-85 54-148 153-148v148Z" fill={forest} />
          <path d="M177 29v148h99c0-82-29-148-99-148Z" fill={citron} />
          <path d="M24 199h111v130c-79 0-111-50-111-130Z" fill={citron} />
          <path d="M157 199h119c0 78-40 130-119 130Z" fill={forest} />
          <ellipse
            cx="153"
            cy="177"
            rx="39"
            ry="71"
            transform="rotate(35 153 177)"
            fill={cream}
          />
          <path d="m125 218 56-82" stroke={forest} strokeWidth="3" />
          <circle cx="265" cy="31" r="7" fill={forest} />
        </>
      );
      break;
    default:
      art = (
        <>
          <rect width="300" height="360" fill={citron} />
          <path
            d="M-26 63c89-59 170-25 204 50-61 43-151 39-204-50Z"
            fill={forest}
          />
          <path
            d="M119 166c12-86 100-121 204-65-24 70-117 99-204 65Z"
            fill={cream}
          />
          <path
            d="M-19 252c15-89 102-124 209-71-20 75-118 100-209 71Z"
            fill={forest}
          />
          <path
            d="M120 292c4-87 100-129 203-81-17 83-123 112-203 81Z"
            fill={forest}
          />
          <path d="m39 332 215-281" stroke={citron} strokeWidth="7" />
          <circle cx="246" cy="300" r="22" fill={cream} />
        </>
      );
  }
  return (
    <svg
      viewBox="0 0 300 360"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {art}
    </svg>
  );
}

// C2-continuous geometry: one reversible spring drives the entire flight.
function smoothUnit(value: number): number {
  const t = Math.max(0, Math.min(1, value));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function paperFlight(
  value: number,
  index: number,
  compact: boolean,
  peekAmount: number
) {
  const p = Math.max(0, Math.min(1, value));
  const side = index - 1;
  const u = smoothUnit(p);
  const delays = [0.09, 0, 0.15];
  const delay = delays[index] ?? 0;
  const spread = smoothUnit((p - delay) / (1 - delay));
  const arc = 64 * Math.pow(p, 3) * Math.pow(1 - p, 3);
  const restingXs = compact ? [-99, 0, 100] : [-174, 8, 178];
  const restingX = restingXs[index] ?? 0;
  const restingYs = compact ? [248, 203, 265] : [215, 166, 236];
  const restingY = restingYs[index] ?? 200;
  const closedY = 310 + Math.abs(side) * 7;
  const peek = peekAmount * (1 - u);
  const arcYFactors = [24, 29, 24];
  const arcY = arcYFactors[index] ?? 24;
  const zFactors = [34, 52, 42];
  const zVal = zFactors[index] ?? 40;
  const rotAngles = [-9, 2, 8];
  const rot = rotAngles[index] ?? 0;

  return {
    x: side * 20 + (restingX - side * 20) * spread + side * 6 * peek,
    y:
      closedY -
      121 +
      (restingY - closedY) * u -
      arcY * (compact ? 0.8 : 1) * arc -
      23 * peek,
    z: zVal * (compact ? 0.7 : 1) * arc,
    rotate:
      side * 7 -
      3 +
      (rot - (side * 7 - 3)) * u +
      side * 1.7 * arc,
    rotateX: -13 * arc + 5 * peek,
    rotateY: (side === 0 ? -7 : -side * 20) * arc + side * 9 * peek,
    scale: 0.89 + ((compact ? 0.86 : 1) - 0.89) * u,
    light: arc * 0.55,
  };
}

function resolveHref(
  value: string | { url?: string; href?: string; path?: string } | undefined
): string | undefined {
  if (!value) return undefined;
  const candidate =
    typeof value === "string"
      ? value
      : value?.url ?? value?.href ?? value?.path;
  const href = typeof candidate === "string" ? candidate.trim() : "";
  return href || undefined;
}

interface PaperCardInternalProps {
  index: number;
  open: boolean;
  peek: boolean;
  compact: boolean;
  still: boolean;
  tilt: boolean;
  speed: number;
  href?: string;
  label?: string;
  newTab?: boolean;
  title?: string;
  onClick?: () => void;
  onHoverChange?: (hovered: boolean) => void;
  children: React.ReactNode;
}

function PaperCard({
  index,
  open,
  peek,
  compact,
  still,
  tilt,
  speed,
  href,
  label,
  newTab,
  title,
  onClick,
  onHoverChange,
  children,
}: PaperCardInternalProps) {
  const resolvedHref = resolveHref(href);
  const centerX = compact ? 230 : 380;
  const restingAngles = [-9, 2, 8];
  const restingAngle = restingAngles[index] ?? 0;

  // Updating a spring target preserves its current velocity on reversals.
  const progress = useSpring(open ? 1 : 0, {
    stiffness: 90 * speed ** 2,
    damping: 23 * speed,
    mass: 1,
    restDelta: 2e-4,
    restSpeed: 0.002,
  });
  const peekProgress = useSpring(0, { stiffness: 130, damping: 25 });

  const flightPose = (values: number[]) => {
    const p = values[0] ?? 0;
    const k = values[1] ?? 0;
    return paperFlight(still ? (open ? 1 : 0) : p, index, compact, still ? 0 : k);
  };

  const x = useTransform([progress, peekProgress], (values) => flightPose(values as number[]).x);
  const y = useTransform([progress, peekProgress], (values) => flightPose(values as number[]).y);
  const z = useTransform([progress, peekProgress], (values) => flightPose(values as number[]).z);
  const rotate = useTransform([progress, peekProgress], (values) => flightPose(values as number[]).rotate);
  const rotateX = useTransform([progress, peekProgress], (values) => flightPose(values as number[]).rotateX);
  const rotateY = useTransform([progress, peekProgress], (values) => flightPose(values as number[]).rotateY);
  const cardScale = useTransform([progress, peekProgress], (values) => flightPose(values as number[]).scale);
  const flightLight = useTransform([progress, peekProgress], (values) => flightPose(values as number[]).light);

  const surface = React.useRef<HTMLDivElement>(null);
  const [pointerOver, setPointerOver] = React.useState(false);
  const hover = open && !still && pointerOver;
  const pitch = useMotionValue(0);
  const yaw = useMotionValue(0);
  const light = useMotionValue(0);
  const smoothPitch = useSpring(pitch, { stiffness: 140, damping: 26 });
  const smoothYaw = useSpring(yaw, { stiffness: 140, damping: 26 });
  const smoothLight = useSpring(light, { stiffness: 110, damping: 25 });
  const settle = still
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 150 * speed ** 2, damping: 26 * speed };

  React.useEffect(() => {
    if (still) progress.jump(open ? 1 : 0);
    else progress.set(open ? 1 : 0);
  }, [open, still, progress]);

  React.useEffect(() => {
    if (still) peekProgress.jump(0);
    else peekProgress.set(!open && peek ? 1 : 0);
  }, [open, peek, still, peekProgress]);

  const resetSurface = React.useCallback(() => {
    pitch.set(0);
    yaw.set(0);
    light.set(0);
  }, [pitch, yaw, light]);

  React.useEffect(() => {
    if (!open || still || !tilt) resetSurface();
    if (!open) {
      setPointerOver(false);
      onHoverChange?.(false);
    }
  }, [open, still, tilt, resetSurface, onHoverChange]);

  function onMove(event: React.PointerEvent<HTMLElement>) {
    if (!open || still || !tilt || event.pointerType !== "mouse" || !surface.current)
      return;
    const rect = surface.current.getBoundingClientRect();
    const px = Math.max(
      -0.5,
      Math.min(0.5, (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5)
    );
    const py = Math.max(
      -0.5,
      Math.min(0.5, (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5)
    );
    pitch.set(-py * 9);
    yaw.set(px * 12);
    light.set(px * 58);
  }

  const isClickable = Boolean(resolvedHref || onClick);

  return (
    <motion.a
      data-paper={index}
      data-card={index}
      href={resolvedHref}
      target={resolvedHref && newTab ? "_blank" : undefined}
      rel={resolvedHref && newTab ? "noopener noreferrer" : undefined}
      role={resolvedHref ? undefined : isClickable ? "button" : "img"}
      aria-label={label}
      aria-hidden={!open}
      tabIndex={open && isClickable ? 0 : -1}
      draggable={false}
      onClick={(e) => {
        if (onClick) {
          if (!resolvedHref) {
            e.preventDefault();
          }
          onClick();
        }
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && open) {
          setPointerOver(true);
          onHoverChange?.(true);
        }
      }}
      onPointerLeave={() => {
        setPointerOver(false);
        resetSurface();
        onHoverChange?.(false);
      }}
      onPointerMove={onMove}
      style={{
        position: "absolute",
        display: "block",
        left: centerX - 100,
        top: -10,
        width: 200,
        height: 252,
        x,
        y,
        z,
        rotate,
        rotateX,
        rotateY,
        scale: cardScale,
        transformOrigin: "50% 167px",
        transformStyle: "preserve-3d",
        borderRadius: 8,
        zIndex: hover ? 5 : index === 1 ? 4 : 3,
        pointerEvents: open ? "auto" : "none",
        cursor: isClickable ? "pointer" : "default",
        textDecoration: "none",
        color: "inherit",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <motion.div
        ref={surface}
        data-paper-surface={index}
        aria-hidden="true"
        initial={false}
        animate={{
          y: hover ? -9 : 0,
          rotate: hover ? -restingAngle * 0.17 : 0,
          boxShadow: hover
            ? "0 4px 7px -3px rgba(42,39,30,.12), 0 22px 34px -15px rgba(42,39,30,.29)"
            : "0 2px 3px rgba(42,39,30,.07), 0 12px 24px -8px rgba(42,39,30,.2)",
        }}
        transition={settle}
        style={{
          position: "absolute",
          display: "block",
          left: 0,
          top: 10,
          width: "100%",
          height: 242,
          borderRadius: 8,
          rotateX: still ? 0 : smoothPitch,
          rotateY: still ? 0 : smoothYaw,
          transformOrigin: "50% 65%",
          transformStyle: "preserve-3d",
          pointerEvents: "none",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            background: "#D8D3C5",
            border: "1px solid #C9C4B7",
            transform: "translateZ(-1.6px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "block",
            width: "100%",
            height: "100%",
            padding: 7,
            background: "#FCFBF7",
            border: "1px solid #DEDCD4",
            borderRadius: 8,
            overflow: "hidden",
            transform: "translateZ(.2px)",
            backfaceVisibility: "hidden",
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{ opacity: still ? 1 : 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: still ? 0 : 0.28 }}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: 3,
              position: "relative",
            }}
          >
            {children}
            {title && (
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  right: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    padding: "2px 7px",
                    borderRadius: 9999,
                    fontSize: 10,
                    fontFamily: "monospace",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    backgroundColor: "rgba(38, 43, 41, 0.85)",
                    color: "#FCFBF7",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                    maxWidth: "80%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {title}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "rgba(38, 43, 41, 0.8)",
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                    padding: "1px 5px",
                    borderRadius: 4,
                  }}
                >
                  0{index + 1}
                </span>
              </div>
            )}
          </motion.div>
          <motion.span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: flightLight,
              background:
                "linear-gradient(120deg,rgba(255,255,255,.32),transparent 55%,rgba(39,35,28,.055))",
            }}
          />
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ opacity: hover ? 1 : 0 }}
            transition={still ? { duration: 0 } : { duration: 0.45 }}
            style={{
              position: "absolute",
              inset: "-30% -45%",
              x: still ? 0 : smoothLight,
              pointerEvents: "none",
              background:
                "linear-gradient(115deg,transparent 34%,rgba(255,255,255,.025) 42%,rgba(255,255,255,.17) 50%,rgba(255,255,255,.025) 58%,transparent 66%)",
            }}
          />
        </div>
      </motion.div>
    </motion.a>
  );
}

/**
 * Real Folder — text-free, link-ready paper choreography.
 * Designed by Matthias Ölschlegel.
 */
export function RealFolder({
  forms,
  spaces,
  fragments,
  collections: customCollections,
  background = "rgba(0,0,0,0)",
  startOpen = true,
  enableTilt = true,
  speed = 1,
  style,
  className,
  onCardClick,
  onCardHover,
  onActiveCollectionChange,
}: RealFolderProps) {
  const collections: FolderCollectionData[] = customCollections
    ? customCollections.map((item, i) => {
        const fallback = defaults[i % defaults.length]!;
        return {
          ...fallback,
          ...item,
          name: item.name || fallback.name,
          color: item.color || fallback.color,
        };
      })
    : [forms, spaces, fragments].map((item, i) => {
        const fallback = defaults[i % defaults.length]!;
        return {
          ...fallback,
          ...(item || {}),
          name: item?.name || fallback.name,
          color: item?.color || fallback.color,
        };
      });

  const [active, setActive] = React.useState(0);
  const [opened, setOpened] = React.useState(startOpen);
  const [peek, setPeek] = React.useState(false);
  const [size, setSize] = React.useState({ width: 800, height: 652 });
  const root = React.useRef<HTMLDivElement>(null);
  const trigger = React.useRef<HTMLButtonElement>(null);
  const isStatic = false;
  const reduced = !!useReducedMotion();
  const still = isStatic || reduced;
  const uid = React.useId();
  const panelId = `real-folder-cards-${uid}`;
  const compact = size.width < 600;
  const sceneW = compact ? 460 : 760;
  const sceneH = compact ? 640 : 620;
  const scale = Math.max(
    0.01,
    Math.min(size.width / sceneW, size.height / sceneH, 1.15)
  );
  const centerX = sceneW / 2;
  const fan = opened || isStatic;
  const collection: FolderCollectionData = collections[active] ?? defaults[0]!;
  const actualSpeed = Math.max(0.5, Math.min(1.8, speed));
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rx = useSpring(tiltX, { stiffness: 110, damping: 23 });
  const ry = useSpring(tiltY, { stiffness: 110, damping: 23 });
  const spring = still
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 110 * actualSpeed ** 2,
        damping: 23 * actualSpeed,
      };
  const folderY = fan ? (compact ? 441 : 431) : 354;
  const folderScale = compact ? 0.9 : 1;

  React.useEffect(() => {
    const node = root.current;
    if (!node || typeof window === "undefined") return;
    const update = () => {
      const next = { width: node.clientWidth, height: node.clientHeight };
      setSize((previous) =>
        previous.width === next.width && previous.height === next.height
          ? previous
          : next
      );
    };
    update();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    setOpened(startOpen);
  }, [startOpen]);

  React.useEffect(() => {
    if (!enableTilt || still) {
      tiltX.set(0);
      tiltY.set(0);
    }
  }, [enableTilt, still, tiltX, tiltY]);

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (still || !enableTilt || fan || event.pointerType !== "mouse" || !root.current)
      return;
    const r = root.current.getBoundingClientRect();
    tiltX.set(
      Math.max(
        -2,
        Math.min(
          2,
          (-(event.clientY - r.top - r.height / 2) / Math.max(1, r.height)) * 4
        )
      )
    );
    tiltY.set(
      Math.max(
        -3,
        Math.min(
          3,
          ((event.clientX - r.left - r.width / 2) / Math.max(1, r.width)) * 6
        )
      )
    );
  }

  function toggleFolder(keyboard = false) {
    resetTilt();
    setPeek(false);
    setOpened(!fan);
    if (!fan && keyboard && typeof window !== "undefined") {
      window.requestAnimationFrame(() =>
        root.current?.querySelector<HTMLElement>("[data-card][href]")?.focus({
          preventScroll: true,
        })
      );
    }
  }

  function changeCollection(index: number) {
    setActive(index);
    resetTilt();
    onActiveCollectionChange?.(index);
  }

  function onKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !fan) return;
    event.preventDefault();
    event.stopPropagation();
    setOpened(false);
    setPeek(false);
    trigger.current?.focus({ preventScroll: true });
  }

  function getCardData(index: number): FolderCardData {
    const customCard = [collection.card1, collection.card2, collection.card3][index];
    const image = [collection.image1, collection.image2, collection.image3][index];
    const link = [collection.link1, collection.link2, collection.link3][index];
    const linkNewTab = [collection.link1NewTab, collection.link2NewTab, collection.link3NewTab][index];

    return {
      title: customCard?.title,
      tag: customCard?.tag,
      image: customCard?.image || image,
      link: customCard?.link || link,
      linkNewTab: customCard?.linkNewTab ?? linkNewTab,
      project: customCard?.project,
    };
  }

  function print(index: number, card: FolderCardData) {
    const image = card.image;
    return image?.src ? (
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={`${Math.ceil(210 * scale)}px`}
        alt={card.title || image.alt || ""}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    ) : (
      <Artwork collection={active} index={index} />
    );
  }

  return (
    <div
      ref={root}
      className={`real-folder ${className || ""}`}
      role="group"
      aria-label="Real Folder"
      onKeyDown={onKey}
      onPointerMove={onMove}
      onPointerLeave={() => {
        resetTilt();
        setPeek(false);
      }}
      style={{
        width: "100%",
        aspectRatio: compact ? "460 / 640" : "760 / 620",
        background,
        ...style,
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <style>{css}</style>
      <div
        style={{
          width: sceneW,
          height: sceneH,
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: -sceneW / 2,
          marginTop: -sceneH / 2,
          transform: `scale(${scale})`,
          transformOrigin: "center",
          perspective: 1400,
        }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            rotateX: still ? 0 : rx,
            rotateY: still ? 0 : ry,
          }}
        >
          {/* Floor shadow */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{
              y: fan ? 76 : 0,
              scaleX: fan ? 1.1 : 1,
              opacity: fan ? 0.12 : 0.15,
            }}
            transition={spring}
            style={{
              position: "absolute",
              left: centerX - 174,
              top: 465,
              width: 348,
              height: 20,
              borderRadius: "50%",
              background: "#24291F",
              filter: "blur(15px)",
              pointerEvents: "none",
            }}
          />

          {/* Folder Back */}
          <motion.div
            initial={false}
            animate={{
              y: folderY - 100,
              scale: folderScale,
              rotate: fan ? -2 : -4,
            }}
            transition={spring}
            style={{
              position: "absolute",
              left: centerX - 174,
              top: 0,
              width: 348,
              height: 206,
              zIndex: 1,
            }}
          >
            <motion.div
              data-folder-back="body"
              aria-hidden="true"
              initial={false}
              animate={{ backgroundColor: collection.color }}
              transition={spring}
              style={{
                position: "absolute",
                inset: "0 7px 0",
                borderRadius: 13,
                backgroundColor: collection.color,
                filter: "brightness(.82)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,.25)",
              }}
            />
            <motion.div
              data-folder-back="tab"
              aria-hidden="true"
              initial={false}
              animate={{ backgroundColor: collection.color }}
              transition={spring}
              style={{
                position: "absolute",
                left: 7,
                top: -25,
                width: 140,
                height: 42,
                borderRadius: "11px 16px 0 0",
                backgroundColor: collection.color,
                filter: "brightness(.82)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.2)",
                display: "flex",
                alignItems: "flex-start",
                paddingTop: 5,
                paddingLeft: 10,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 120,
                }}
              >
                {collection.name}
              </span>
            </motion.div>
          </motion.div>

          {/* Paper Cards flight zone */}
          <div
            id={panelId}
            role="group"
            aria-label={`${collection.name} prints`}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              perspective: 1100,
              perspectiveOrigin: "50% 47%",
              transformStyle: "flat",
              pointerEvents: "none",
            }}
          >
            {[0, 1, 2].map((index) => {
              const card = getCardData(index);
              const defaultTitle = titles[active]?.[index] || `Card ${index + 1}`;
              const label = card.title || card.image?.alt || defaultTitle;

              return (
                <PaperCard
                  key={`${active}-${index}`}
                  index={index}
                  open={fan}
                  peek={peek}
                  compact={compact}
                  still={still}
                  tilt={enableTilt}
                  speed={actualSpeed}
                  href={card.link}
                  newTab={card.linkNewTab}
                  label={label}
                  title={card.title}
                  onClick={() => onCardClick?.(card, index)}
                  onHoverChange={(hovered) =>
                    onCardHover?.(hovered ? card : null, hovered ? index : null)
                  }
                >
                  {print(index, card)}
                </PaperCard>
              );
            })}
          </div>

          {/* Folder Front Flap */}
          <motion.div
            initial={false}
            animate={{
              y: folderY - 100,
              scale: folderScale,
              rotate: fan ? -2 : -4,
            }}
            transition={spring}
            style={{
              position: "absolute",
              left: centerX - 174,
              top: 0,
              width: 348,
              height: 206,
              perspective: 1000,
              zIndex: 6,
              pointerEvents: "none",
            }}
          >
            <motion.div
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setPeek(true);
              }}
              onPointerLeave={() => setPeek(false)}
              initial={false}
              animate={{
                rotateX: fan ? -29 : peek && !still ? -12 : 0,
                backgroundColor: collection.color,
              }}
              transition={spring}
              style={{
                position: "absolute",
                left: 0,
                top: 30,
                width: 348,
                height: 176,
                transformOrigin: "50% 100%",
                border: "1px solid rgba(255,255,255,.2)",
                borderRadius: "11px 11px 15px 15px",
                padding: 0,
                pointerEvents: "auto",
                backgroundImage:
                  "linear-gradient(165deg,rgba(255,255,255,.055),rgba(0,0,0,.09))",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,.2), inset 0 -2px 2px rgba(0,0,0,.045), 0 8px 12px -8px rgba(30,30,24,.22)",
              }}
            >
              {/* Folder toggle button */}
              <button
                ref={trigger}
                type="button"
                aria-label={`${fan ? "Close" : "Open"} ${collection.name} folder`}
                aria-expanded={fan}
                aria-controls={panelId}
                onClick={(event) => toggleFolder(event.detail === 0)}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible")) setPeek(true);
                }}
                onBlur={() => setPeek(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  border: 0,
                  borderRadius: "inherit",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {/* Pull handle bar */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 15,
                    left: "50%",
                    marginLeft: -14,
                    width: 28,
                    height: 3,
                    borderRadius: 4,
                    background: "rgba(75,29,16,.14)",
                    boxShadow: "0 1px 0 rgba(255,255,255,.18)",
                  }}
                />
              </button>

              {/* Collection selector dots */}
              <div
                role="group"
                aria-label="Choose a collection"
                style={{
                  position: "absolute",
                  left: 13,
                  bottom: 8,
                  display: "flex",
                  pointerEvents: "auto",
                }}
              >
                {collections.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="real-folder-tab"
                    aria-label={`Choose ${item.name} collection`}
                    aria-pressed={active === index}
                    onClick={() => changeCollection(index)}
                    style={{
                      width: 48,
                      height: 48,
                      border: 0,
                      borderRadius: 8,
                      background: "transparent",
                      cursor: "pointer",
                      padding: 16,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        scale: active === index ? 1 : 0.72,
                        opacity: active === index ? 1 : 0.65,
                        backgroundColor: item.color,
                      }}
                      transition={spring}
                      style={{
                        display: "block",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,.4)",
                        boxShadow:
                          active === index
                            ? "0 0 0 3px rgba(255,255,255,.15)"
                            : "0 1px 1px rgba(0,0,0,.1)",
                      }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

RealFolder.displayName = "RealFolder";
export default RealFolder;
