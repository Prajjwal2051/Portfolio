import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Separator } from "@/components/ui/separator";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Projects() {
  const shouldReduce = useReducedMotion();

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
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Separator className="mb-8 opacity-30" />
      </motion.div>
      <SectionHeading>projects</SectionHeading>

      <motion.div
        className="space-y-0"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {portfolioData.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}
