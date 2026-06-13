import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TagBadge } from "@/components/shared/TagBadge";
import { Separator } from "@/components/ui/separator";

export function Experience() {
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });

  return (
    <motion.section
      id="experience"
      className="py-8"
      aria-label="Experience"
      ref={sectionRef}
      {...(!shouldReduce && {
        initial:     { clipPath: "inset(0 0 100% 0)" },
        whileInView: { clipPath: "inset(0 0 0% 0)" },
        viewport:    { once: true, margin: "-60px" },
        transition:  { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>experience</SectionHeading>

      <div className="relative">
        {/* Static guide rail */}
        <div
          className="absolute left-[5px] top-2 bottom-2 w-px bg-border/40"
          aria-hidden="true"
        />
        {/* Scroll-driven fill line */}
        {!shouldReduce && (
          <motion.div
            className="absolute left-[5px] top-2 w-px bg-foreground/50 origin-top"
            style={{ scaleY: lineScale, height: "calc(100% - 1rem)" }}
            aria-hidden="true"
          />
        )}

        <div className="pl-5 space-y-6">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative cursor-default"
              initial={shouldReduce ? false : { opacity: 0 }}
              whileInView={shouldReduce ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute -left-[21px] top-[5px] w-3 h-3 rounded-full border-2 border-foreground/40 bg-background"
                initial={shouldReduce ? false : { scale: 0 }}
                whileInView={shouldReduce ? {} : { scale: [0, 1.4, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 + 0.1 }}
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                <h3 className="text-sm font-medium">
                  {exp.role}
                  {exp.company && (
                    <span className="text-muted-foreground font-normal">
                      {" "}— {exp.company}
                    </span>
                  )}
                </h3>
                <span className="text-xs text-muted-foreground shrink-0">
                  {exp.period}
                </span>
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
                  view project <span>→</span>
                </a>
              )}
              <div className="flex flex-wrap gap-1">
                {exp.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
