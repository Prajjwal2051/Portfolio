import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectsScrollTimeline } from "@/components/shared/ProjectsScrollTimeline";
import { Separator } from "@/components/ui/separator";

export function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldReduce = prefersReducedMotion || !isDesktop;

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
        {...(!shouldReduce && {
          initial:     { scaleX: 0, originX: 0 },
          whileInView: { scaleX: 1 },
          viewport:    { once: true },
          transition:  { duration: 0.5, ease: "easeOut" },
        })}
      >
        <Separator className="mb-8 opacity-30" />
      </motion.div>
      <SectionHeading>projects</SectionHeading>

      <ProjectsScrollTimeline />
    </motion.section>
  );
}
