import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Separator } from "@/components/ui/separator";

export function Projects() {
  return (
    <section id="projects" className="py-8" aria-label="Projects">
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>projects</SectionHeading>

      <div className="space-y-0">
        {portfolioData.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
