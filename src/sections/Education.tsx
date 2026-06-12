import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";

export function Education() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      id="education"
      className="py-8"
      aria-label="Education"
      {...(!shouldReduce && {
        initial:     { clipPath: "inset(0 0 100% 0)" },
        whileInView: { clipPath: "inset(0 0 0% 0)" },
        viewport:    { once: true, margin: "-60px" },
        transition:  { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>education</SectionHeading>

      <motion.div
        className="space-y-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {portfolioData.education.map((edu) => (
          <motion.div
            key={edu.id}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
            }}
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
