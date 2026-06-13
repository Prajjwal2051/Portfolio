import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Clock } from "lucide-react";
import type { Project } from "@/types";
import { TagBadge } from "@/components/shared/TagBadge";
import { getLenis } from "@/lib/lenis";

const TAG_GRADIENTS: Record<string, [string, string]> = {
  "next.js 16": ["#e8907a", "#c8a540"],
  "next.js":    ["#e8907a", "#c8a540"],
  react:        ["#5aa0c8", "#6ee7b7"],
  python:       ["#c8a540", "#6ee7b7"],
  arduino:      ["#6ee7b7", "#c8a540"],
  "node.js":    ["#6ee7b7", "#5aa0c8"],
};

function getGradient(tags: string[]): string {
  for (const tag of tags) {
    const pair = TAG_GRADIENTS[tag.toLowerCase()];
    if (pair) return `linear-gradient(135deg, ${pair[0]}44 0%, ${pair[1]}33 100%)`;
  }
  return `linear-gradient(135deg, #e8907a44 0%, #c8a54033 100%)`;
}

const listVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.055 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const lenis = getLenis();
    lenis?.stop();

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-[9991] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="pointer-events-auto w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl border border-border/50 bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onWheelCapture={(e) => e.stopPropagation()}
            >
              {/* Gradient header */}
              <div
                className="relative h-36 rounded-t-2xl flex items-center justify-center overflow-hidden"
                style={{ background: getGradient(project.tags) }}
              >
                <span className="text-6xl select-none" aria-hidden>
                  {project.icon ?? "🚀"}
                </span>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-background/60 hover:bg-background/90 text-foreground/70 hover:text-foreground transition-colors backdrop-blur-sm"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                {project.lastUpdated && (
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-foreground/60 bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <Clock className="h-2.5 w-2.5" />
                    {project.lastUpdated}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Name + links */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold leading-tight">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-2 shrink-0 mt-0.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border/50 hover:border-border px-2.5 py-1 rounded-full transition-colors"
                        aria-label="View source"
                      >
                        <Github className="h-3 w-3" />
                        source
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-foreground bg-foreground/10 hover:bg-foreground/20 border border-border/50 px-2.5 py-1 rounded-full transition-colors"
                        aria-label="Visit live site"
                      >
                        <ExternalLink className="h-3 w-3" />
                        live
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      highlights
                    </p>
                    <motion.ul
                      className="space-y-2"
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {project.highlights.map((h, i) => (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          className="flex gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-accent-pink/70" />
                          <span className="leading-relaxed">{h}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                )}

                {/* Tags */}
                {project.tags.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
