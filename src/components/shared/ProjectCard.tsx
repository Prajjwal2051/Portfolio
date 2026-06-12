import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github, Clock } from "lucide-react";
import type { Project } from "@/types";
import { TagBadge } from "@/components/shared/TagBadge";

interface ProjectCardProps {
  project: Project;
  index: number;
}

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
    if (pair) return `linear-gradient(135deg, ${pair[0]}33 0%, ${pair[1]}22 100%)`;
  }
  return `linear-gradient(135deg, #e8907a33 0%, #c8a54022 100%)`;
}

const isFinePointer =
  typeof window !== "undefined"
    ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
    : false;

export function ProjectCard({ project, index }: ProjectCardProps) {
  const featured = index === 0;
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rotateY.set(dx * 8);
    rotateX.set(-dy * 8);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const href = project.liveUrl ?? project.githubUrl ?? project.link;

  return (
    <motion.div
      className="relative rounded-xl border border-border/40 bg-card/50 overflow-hidden h-full group/card"
      initial="rest"
      whileHover="hovering"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Image / gradient area */}
      <div
        className={`relative overflow-hidden ${featured ? "h-44" : "h-28"}`}
        style={{ background: getGradient(project.tags) }}
      >
        {/* Icon watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl opacity-25 select-none"
          aria-hidden="true"
        >
          {project.icon}
        </div>
        {/* Screenshot reveals from bottom on hover */}
        {project.image && (
          <motion.img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            variants={{
              rest:     { clipPath: "inset(0 0 100% 0)", filter: "blur(4px)" },
              hovering: { clipPath: "inset(0 0 0% 0)",   filter: "blur(0px)" },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-baseline gap-2 mb-1">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-accent-pink transition-colors"
            >
              {project.name} <span className="text-muted-foreground">→</span>
            </a>
          ) : (
            <span className="font-medium text-foreground">{project.name}</span>
          )}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            {project.lastUpdated && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                <Clock className="h-2.5 w-2.5" />
                {project.lastUpdated}
              </span>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View source on GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Visit live site"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          {project.description}
        </p>

        {/* Featured card shows first 2 highlights */}
        {featured && project.highlights && project.highlights.length > 0 && (
          <ul className="mb-2 space-y-0.5">
            {project.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="shrink-0 mt-0.5">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
