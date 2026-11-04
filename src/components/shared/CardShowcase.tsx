// Interactive card showcase component based on Framer CardShowcase (https://framer.com/m/CardShowcase-3qxj.js@1dwe9Z9NXC9obVzYe7mU)
// Cards expand based on vertical progress bar, auto-advance to next card
// Desktop: horizontal layout with animations, Mobile: vertical stack without animations
import { useState, useEffect, useRef, startTransition, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
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

export function CardShowcase({
  cards,
  progressColor = "var(--accent-pink)",
  animationSpeed = 5,
  loop = true,
  textColor,
  numberColor,
  tagColor,
  titleFont,
  descriptionFont,
  numberFont,
  tagFont,
  imageRadius = 12,
  padding = 0,
  contentImageGap = 16,
  className = "",
  onSelectProject,
}: CardShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      startTransition(() => {
        setIsMobile(window.innerWidth < 768);
      });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const interval = 16;
    const increment = (100 / (animationSpeed * 1000)) * interval;
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          const nextIndex = activeIndex + 1;
          if (nextIndex >= cards.length) {
            if (loop) {
              startTransition(() => {
                setActiveIndex(0);
              });
              return 0;
            } else {
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
              }
              return 100;
            }
          } else {
            startTransition(() => {
              setActiveIndex(nextIndex);
            });
            return 0;
          }
        }
        return newProgress;
      });
    }, interval);
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeIndex, animationSpeed, cards.length, loop, isMobile]);

  const handleCardClick = (index: number) => {
    if (isMobile) return;
    startTransition(() => {
      setActiveIndex(index);
      setProgress(0);
    });
  };

  const defaultTitleFont: CSSProperties = {
    fontSize: "1.375rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: "1.2",
    ...titleFont,
  };

  const defaultDescriptionFont: CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: "1.45",
    ...descriptionFont,
  };

  const defaultNumberFont: CSSProperties = {
    fontSize: "2.25rem",
    fontWeight: 800,
    fontFamily: "var(--font-mono, monospace)",
    letterSpacing: "-0.04em",
    lineHeight: "1",
    ...numberFont,
  };

  const defaultTagFont: CSSProperties = {
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    ...tagFont,
  };

  // Mobile layout: vertical stack without layout animations
  if (isMobile) {
    return (
      <div
        className={`w-full flex flex-col ${className}`}
        style={{ padding: `${padding}px` }}
      >
        <div className="flex flex-col gap-6 w-full">
          {cards.map((card, index) => {
            const cardImage = card.image || {
              src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
              alt: card.title || "Project image",
            };

            return (
              <div
                key={index}
                className="rounded-2xl border border-border/50 bg-card/40 p-5 shadow-sm flex flex-col"
                style={{ gap: `${contentImageGap}px` }}
              >
                <div className="flex items-center justify-between">
                  <div
                    style={{
                      ...defaultNumberFont,
                      color: numberColor ?? "hsl(var(--muted-foreground) / 0.6)",
                    }}
                  >
                    {card.number}
                  </div>
                  {card.tag && (
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-border/60 bg-muted/40"
                      style={{
                        ...defaultTagFont,
                        color: tagColor ?? "var(--accent-pink)",
                      }}
                    >
                      {card.tag}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    ...defaultTitleFont,
                    color: textColor ?? "hsl(var(--foreground))",
                  }}
                >
                  {card.title}
                </div>

                <div
                  className="opacity-80 leading-relaxed"
                  style={{
                    ...defaultDescriptionFont,
                    color: textColor ?? "hsl(var(--foreground))",
                  }}
                >
                  {card.description}
                </div>

                <div
                  className="w-full h-48 overflow-hidden rounded-xl border border-border/40 relative group"
                  style={{ borderRadius: `${imageRadius}px` }}
                >
                  <img
                    src={cardImage.src}
                    alt={cardImage.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() => {
                      if (card.onSelect) card.onSelect();
                      else if (card.project && onSelectProject) onSelectProject(card.project);
                    }}
                    className="text-xs font-medium underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1"
                  >
                    view details <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    {card.githubUrl && (
                      <a
                        href={card.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View source on GitHub"
                        className="opacity-70 hover:opacity-100 transition-opacity p-1"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {card.liveUrl && (
                      <a
                        href={card.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Visit live site"
                        className="opacity-70 hover:opacity-100 transition-opacity p-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop layout: horizontal layout with progress-based expansion
  return (
    <div
      className={`w-full overflow-hidden flex flex-col items-center justify-center ${className}`}
      style={{ padding: `${padding}px` }}
    >
      <div className="flex gap-4 w-full min-h-[490px] items-stretch">
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          const cardImage = card.image || {
            src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
            alt: card.title || "Project image",
          };

          return (
            <motion.div
              key={index}
              onClick={() => handleCardClick(index)}
              className="rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 transition-colors shadow-sm relative overflow-hidden flex flex-col cursor-pointer select-none"
              style={{
                padding: "24px 20px 24px 24px",
                gap: `${contentImageGap}px`,
                minHeight: 0,
              }}
              animate={{ flex: isActive ? 2.4 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Vertical Progress Bar along left edge */}
              <div className="absolute bottom-0 left-0 w-[3px] h-full bg-border/30">
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full rounded-r"
                    style={{ backgroundColor: progressColor }}
                    animate={{ height: `${progress}%` }}
                    transition={{ duration: 0 }}
                  />
                )}
              </div>

              {/* Number and Title Header */}
              <div className="flex flex-col items-flex-start gap-2 min-w-0">
                <div
                  style={{
                    ...defaultNumberFont,
                    color: numberColor ?? "hsl(var(--muted-foreground))",
                    opacity: isActive ? 1 : 0.45,
                  }}
                  className="transition-opacity duration-300"
                >
                  {card.number}
                </div>
                <div
                  style={{
                    ...defaultTitleFont,
                    color: textColor ?? "hsl(var(--foreground))",
                    opacity: isActive ? 1 : 0.7,
                  }}
                  className="transition-opacity duration-300 truncate w-full"
                >
                  {card.title}
                </div>
              </div>

              {/* Collapsed view tag indicator */}
              {!isActive && card.tag && (
                <div
                  className="mt-auto pt-4 text-xs font-mono font-medium truncate"
                  style={{
                    ...defaultTagFont,
                    color: tagColor ?? "var(--accent-pink)",
                    opacity: 0.7,
                  }}
                >
                  {card.tag}
                </div>
              )}

              {/* Expanded Card Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col flex-1 justify-between min-h-0 w-full"
                    style={{ gap: `${contentImageGap}px` }}
                  >
                    <div
                      className="opacity-80 line-clamp-3 leading-relaxed"
                      style={{
                        ...defaultDescriptionFont,
                        color: textColor ?? "hsl(var(--foreground))",
                      }}
                    >
                      {card.description}
                    </div>

                    <div className="flex-1 flex items-center justify-center min-h-[180px] max-h-[220px] overflow-hidden rounded-xl border border-border/40 relative">
                      <img
                        src={cardImage.src}
                        alt={cardImage.alt}
                        style={{
                          borderRadius: `${imageRadius}px`,
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-border/40">
                      {card.tag ? (
                        <div
                          className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border border-border/60 bg-muted/40"
                          style={{
                            ...defaultTagFont,
                            color: tagColor ?? "var(--accent-pink)",
                          }}
                        >
                          {card.tag}
                        </div>
                      ) : <div />}

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (card.onSelect) card.onSelect();
                            else if (card.project && onSelectProject) onSelectProject(card.project);
                          }}
                          className="text-xs font-medium underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1"
                        >
                          view details <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                        {card.githubUrl && (
                          <a
                            href={card.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="View source on GitHub"
                            onClick={(e) => e.stopPropagation()}
                            className="opacity-70 hover:opacity-100 transition-opacity p-1"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {card.liveUrl && (
                          <a
                            href={card.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Visit live site"
                            onClick={(e) => e.stopPropagation()}
                            className="opacity-70 hover:opacity-100 transition-opacity p-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
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
