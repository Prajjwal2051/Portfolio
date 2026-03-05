import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TagBadge } from "@/components/shared/TagBadge";
import { Separator } from "@/components/ui/separator";

export function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.3], [40, 0]), { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section
      id="experience"
      className="py-8"
      aria-label="Experience"
      ref={ref}
      style={{ opacity, y }}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>experience</SectionHeading>

      <motion.div
        className="space-y-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {portfolioData.experience.map((exp) => (
          <motion.div
            key={exp.id}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className="cursor-default"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
              <h3 className="text-sm font-medium">
                {exp.role}
                {exp.company && (
                  <span className="text-muted-foreground font-normal"> — {exp.company}</span>
                )}
              </h3>
              <span className="text-xs text-muted-foreground shrink-0">{exp.period}</span>
            </div>
            {exp.location && (
              <p className="text-xs text-muted-foreground/60 mb-1">{exp.location}</p>
            )}
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              {exp.description}
            </p>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mb-2 space-y-0.5">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="shrink-0 mt-0.5">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                view project <span>-&gt;</span>
              </a>
            )}
            <div className="flex flex-wrap gap-1">
              {exp.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
