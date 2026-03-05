import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { motion } from "framer-motion";
import { TagBadge } from "@/components/shared/TagBadge";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="py-3 border-b border-border/30 last:border-0 group/card"
      variants={item}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-baseline gap-2 mb-0.5">
        {(() => {
          const href = project.liveUrl ?? project.githubUrl ?? project.link;
          return href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-accent-pink transition-colors"
            >
              {project.name} <span className="text-muted-foreground">-&gt;</span>
            </a>
          ) : (
            <span className="font-medium text-foreground">{project.name}</span>
          );
        })()}
        <div className="flex items-center gap-1.5 ml-auto">
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
      <p className="text-xs text-muted-foreground leading-relaxed">
        {project.description}
      </p>
      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-2 space-y-0.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="shrink-0 mt-0.5">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
