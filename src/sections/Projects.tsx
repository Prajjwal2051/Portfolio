import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CardShowcase, CardShowcaseItem } from "@/components/shared/CardShowcase";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { Separator } from "@/components/ui/separator";
import { portfolioData } from "@/data/portfolio";
import type { Project } from "@/types";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldReduce = prefersReducedMotion || !isDesktop;

  const defaultImages = [
    { src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "orbit code" },
    { src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg", alt: "viewly" },
    { src: "https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg", alt: "chat-connect" },
    { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", alt: "key-logger" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", alt: "smart-dustbin" },
  ];

  const showcaseCards: CardShowcaseItem[] = portfolioData.projects.map((project, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: project.name,
    description: project.description,
    tag: project.tags[0],
    image: project.image ? { src: project.image, alt: project.name } : defaultImages[index % defaultImages.length],
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    project,
    onSelect: () => setSelectedProject(project),
  }));

  return (
    <motion.section
      id="projects"
      className="py-8 relative -mx-5 sm:-mx-8 lg:-mx-6 xl:-mx-8 lg:mr-[calc((56rem-100vw)/2)]"
      aria-label="Projects"
      {...(!shouldReduce && {
        initial:     { clipPath: "inset(0 0 100% 0)" },
        whileInView: { clipPath: "inset(0 0 0% 0)" },
        viewport:    { once: true, margin: "-60px" },
        transition:  { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <motion.div
        className="px-5 sm:px-8 lg:px-6 xl:px-8"
        {...(!shouldReduce && {
          initial:     { scaleX: 0, originX: 0 },
          whileInView: { scaleX: 1 },
          viewport:    { once: true },
          transition:  { duration: 0.5, ease: "easeOut" },
        })}
      >
        <Separator className="mb-8 opacity-30" />
      </motion.div>

      <div className="px-5 sm:px-8 lg:px-6 xl:px-8">
        <SectionHeading>projects</SectionHeading>
      </div>

      <div className="w-full px-5 sm:px-8 lg:pl-6 xl:pl-8 lg:pr-8 xl:pr-12">
        <CardShowcase
          cards={showcaseCards}
          animationSpeed={5}
          progressColor="var(--accent-pink)"
          onSelectProject={(project) => setSelectedProject(project)}
        />
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}
