import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Separator } from "@/components/ui/separator";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.3], [40, 0]), { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section
      id="projects"
      className="py-8"
      aria-label="Projects"
      ref={ref}
      style={{ opacity, y }}
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
