import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TagBadge } from "@/components/shared/TagBadge";
import { Separator } from "@/components/ui/separator";

export function Experience() {
  return (
    <section id="experience" className="py-8" aria-label="Experience">
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>experience</SectionHeading>

      <div className="space-y-6">
        {portfolioData.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
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
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {exp.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
