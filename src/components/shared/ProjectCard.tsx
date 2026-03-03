import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { motion } from "framer-motion";
import { TagBadge } from "@/components/shared/TagBadge";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="py-3 border-b border-border/30 last:border-0"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-baseline gap-2 mb-0.5">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-accent-pink transition-colors"
          >
            {project.name} <span className="text-muted-foreground">-&gt;</span>
          </a>
        ) : (
          <span className="font-medium text-foreground">{project.name}</span>
        )}
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
      <p className="text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>
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
