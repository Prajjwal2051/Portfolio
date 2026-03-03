import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";

export function Education() {
  return (
    <section id="education" className="py-8" aria-label="Education">
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>education</SectionHeading>

      <div className="space-y-6">
        {portfolioData.education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-0.5">
              <h3 className="text-sm font-medium">{edu.institution}</h3>
              <span className="text-xs text-muted-foreground shrink-0">{edu.period}</span>
            </div>
            <p className="text-sm text-muted-foreground">{edu.degree}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">{edu.location}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
