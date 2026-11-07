import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { getLenis } from "@/lib/lenis";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
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

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Minimalist Modal Card */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-[9991] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="pointer-events-auto w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card/95 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
              onWheelCapture={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-border/50">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-mono font-semibold text-foreground tracking-tight">
                      {project.name}
                    </h2>
                    {project.lastUpdated && (
                      <span className="text-[11px] font-mono text-muted-foreground/80 bg-muted/70 px-2 py-0.5 rounded">
                        {project.lastUpdated}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Action links */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex items-center gap-2 flex-wrap">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
                      aria-label="Visit live site"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      live demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-border bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors"
                      aria-label="View source code"
                    >
                      <Github className="h-3.5 w-3.5" />
                      source code ↗
                    </a>
                  )}
                </div>
              )}

              {/* Architecture & Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    architecture & highlights
                  </p>
                  <motion.ul
                    className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {project.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        variants={itemVariants}
                        className="flex items-start gap-2.5"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                        <span>{h}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              )}

              {/* Tech Stack */}
              {project.tags.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-border/40">
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-muted-foreground bg-secondary/80 px-2.5 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default ProjectModal;
