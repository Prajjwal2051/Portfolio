import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CardShowcase, type CardShowcaseItem } from "@/components/shared/CardShowcase";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { Separator } from "@/components/ui/separator";
import { portfolioData } from "@/data/portfolio";
import type { Project } from "@/types";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldReduce = prefersReducedMotion || !isDesktop;

  const showcaseCards: CardShowcaseItem[] = portfolioData.projects.map((project, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: project.name,
    description: project.description,
    tag: project.tags[0],
    image: project.image ? { src: project.image, alt: project.name } : undefined,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    project,
  }));

  return (
    <motion.section
      id="projects"
      className="py-8"
      aria-label="Projects"
      {...(!shouldReduce && {
        initial:     { clipPath: "inset(0 0 100% 0)" },
        whileInView: { clipPath: "inset(0 0 0% 0)" },
        viewport:    { once: true, margin: "-60px" },
        transition:  { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>projects</SectionHeading>

      <CardShowcase
        cards={showcaseCards}
        animationSpeed={6}
        progressColor="var(--accent-pink)"
        onSelectProject={setSelectedProject}
        className="max-lg:-mx-5 max-lg:w-[calc(100%+2.5rem)] max-lg:px-5 sm:max-lg:-mx-8 sm:max-lg:w-[calc(100%+4rem)] sm:max-lg:px-8 lg:w-[calc(56rem-200px-24px+(100vw-56rem)/2)] lg:pr-10 xl:w-[calc(56rem-220px-32px+(100vw-56rem)/2)] xl:pr-14"
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}
