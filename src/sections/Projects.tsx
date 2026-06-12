import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Separator } from "@/components/ui/separator";

const item = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
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
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        style={{ perspective: "800px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={index === 0 ? "sm:col-span-2" : ""}
            variants={item}
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
