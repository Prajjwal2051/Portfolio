import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";

export function Education() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.3], [40, 0]), { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section
      id="education"
      className="py-8"
      aria-label="Education"
      ref={ref}
      style={{ opacity, y }}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>education</SectionHeading>

      <motion.div
        className="space-y-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        {portfolioData.education.map((edu, index) => (
          <motion.div
            key={edu.id}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className="cursor-default"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-0.5">
              <h3 className="text-sm font-medium">{edu.institution}</h3>
              <span className="text-xs text-muted-foreground shrink-0">{edu.period}</span>
            </div>
            <p className="text-sm text-muted-foreground">{edu.degree}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">{edu.location}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
