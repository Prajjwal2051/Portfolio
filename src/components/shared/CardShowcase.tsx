// CardShowcase — Framer component (https://framer.com/m/CardShowcase-3qxj.js@1dwe9Z9NXC9obVzYe7mU)
// A row of columns. The active one expands while a thin progress mark fills, then the next takes over.
// Type, color, and spacing follow the rest of the site. Desktop animates; smaller screens stack.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export interface CardShowcaseItem {
  number: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  tag?: string;
  githubUrl?: string;
  liveUrl?: string;
  project?: Project;
  onSelect?: () => void;
}

export interface CardShowcaseProps {
  cards: CardShowcaseItem[];
  progressColor?: string;
  animationSpeed?: number;
  loop?: boolean;
  textColor?: string;
  numberColor?: string;
  tagColor?: string;
  titleFont?: CSSProperties;
  descriptionFont?: CSSProperties;
  numberFont?: CSSProperties;
  tagFont?: CSSProperties;
  imageRadius?: number;
  padding?: number;
  contentImageGap?: number;
  className?: string;
  onSelectProject?: (project: Project) => void;
}

function openProject(card: CardShowcaseItem, onSelectProject?: (project: Project) => void) {
  if (card.onSelect) card.onSelect();
  else if (card.project && onSelectProject) onSelectProject(card.project);
}

function Meta({
  card,
  tagColor,
  tagStyle,
  onSelectProject,
}: {
  card: CardShowcaseItem;
  tagColor?: string;
  tagStyle: CSSProperties;
  onSelectProject?: (project: Project) => void;
}) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      {card.tag && (
        <span style={{ ...tagStyle, color: tagColor ?? "var(--accent-pink)" }} className="truncate">
          {card.tag}
        </span>
      )}
      <span className="ml-auto flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openProject(card, onSelectProject);
          }}
          className="hover:text-foreground transition-colors"
        >
          details →
        </button>
        {card.githubUrl && (
          <a
            href={card.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="hover:text-foreground transition-colors"
          >
            github →
          </a>
        )}
        {card.liveUrl && (
          <a
            href={card.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="hover:text-foreground transition-colors"
          >
            live →
          </a>
        )}
      </span>
    </div>
  );
}

export function CardShowcase({
  cards,
  progressColor = "var(--accent-pink)",
  animationSpeed = 6,
  loop = true,
  textColor,
  numberColor,
  tagColor,
  titleFont,
  descriptionFont,
  numberFont,
  tagFont,
  padding = 0,
  contentImageGap = 16,
  className,
  onSelectProject,
}: CardShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = Boolean(prefersReducedMotion);

  const titleStyle: CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    lineHeight: 1.25,
    color: textColor,
    ...titleFont,
  };
  const descriptionStyle: CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.5,
    color: textColor,
    ...descriptionFont,
  };
  const numberStyle: CSSProperties = {
    fontSize: "1.75rem",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    color: numberColor,
    ...numberFont,
  };
  const tagStyle: CSSProperties = {
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.01em",
    lineHeight: 1,
    ...tagFont,
  };

  const select = (index: number) => {
    elapsedRef.current = 0;
    if (barRef.current) barRef.current.style.height = "0%";
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!isDesktop || reduce || paused || cards.length <= 1) return;

    let frame = 0;
    const duration = animationSpeed * 1000;
    const origin = performance.now() - elapsedRef.current;

    const tick = (now: number) => {
      const elapsed = now - origin;
      elapsedRef.current = elapsed;
      const amount = Math.min(1, elapsed / duration);
      if (barRef.current) barRef.current.style.height = `${amount * 100}%`;
      if (amount >= 1) {
        elapsedRef.current = 0;
        setActiveIndex((current) => {
          const next = current + 1;
          if (next >= cards.length) return loop ? 0 : current;
          return next;
        });
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, animationSpeed, cards.length, isDesktop, loop, paused, reduce]);

  if (!isDesktop) {
    return (
      <div className={cn("flex flex-col", className)} style={{ padding }}>
        {cards.map((card, index) => (
          <article
            key={card.number + card.title}
            className="border-t border-border/40 py-5 first:border-t-0 first:pt-0 last:pb-0"
            style={{ display: "flex", flexDirection: "column", gap: contentImageGap }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 style={titleStyle}>{card.title}</h3>
              <span className="text-muted-foreground/60" style={numberStyle}>
                {card.number}
              </span>
            </div>
            <p className="text-muted-foreground" style={descriptionStyle}>
              {card.description}
            </p>
            <Meta
              card={card}
              tagColor={tagColor}
              tagStyle={tagStyle}
              onSelectProject={onSelectProject}
            />
          </article>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("w-full", className)}
      style={{ padding }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex w-full items-stretch gap-8">
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={card.number + card.title}
              role="button"
              tabIndex={0}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  select(index);
                }
              }}
              aria-expanded={isActive}
              className="relative flex min-w-0 cursor-pointer flex-col items-stretch text-left outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground/40"
              style={{ padding: "4px 0 4px 18px", gap: contentImageGap }}
              animate={{ flex: isActive ? 2 : 1 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute bottom-0 left-0 top-0 w-0.5 bg-border/50" aria-hidden="true">
                {isActive && !reduce && (
                  <span
                    ref={barRef}
                    className="absolute bottom-0 left-0 w-full"
                    style={{ height: 0, backgroundColor: progressColor }}
                  />
                )}
                {isActive && reduce && (
                  <span
                    className="absolute bottom-0 left-0 h-full w-full"
                    style={{ backgroundColor: progressColor }}
                  />
                )}
              </span>

              <span className="flex min-w-0 flex-col items-start gap-1.5">
                <span
                  className={cn("text-muted-foreground/55", isActive && "text-muted-foreground")}
                  style={numberStyle}
                >
                  {card.number}
                </span>
                <span
                  className={cn("w-full", !isActive && "text-muted-foreground")}
                  style={titleStyle}
                >
                  {card.title}
                </span>
              </span>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="body"
                    className="flex min-h-0 flex-col"
                    style={{ gap: contentImageGap }}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-muted-foreground" style={descriptionStyle}>
                      {card.description}
                    </span>
                    <Meta
                      card={card}
                      tagColor={tagColor}
                      tagStyle={tagStyle}
                      onSelectProject={onSelectProject}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default CardShowcase;
