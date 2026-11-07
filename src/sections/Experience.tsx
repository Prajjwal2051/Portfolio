import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";
import Timeline, { type TimelineExperienceItem } from "@/components/ui/timeline-02";
import { ShieldCheck, Code2, Terminal, Briefcase } from "lucide-react";

export function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldReduce = prefersReducedMotion || !isDesktop;

  const timelineExperiences: TimelineExperienceItem[] =
    portfolioData.experience.map((exp) => {
      let icon = Briefcase;
      if (exp.id === "owasp-lead") {
        icon = ShieldCheck;
      } else if (exp.id === "incazing") {
        icon = Code2;
      } else if (exp.id === "owasp") {
        icon = Terminal;
      }

      return {
        title: exp.role,
        company: exp.company || "Independent",
        period: exp.period,
        description: exp.description,
        technologies: exp.tags,
        icon,
        location: exp.location,
        highlights: exp.highlights,
        link: exp.link,
      };
    });

  return (
    <motion.section
      id="experience"
      className="py-8"
      aria-label="Experience"
      {...(!shouldReduce && {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>experience</SectionHeading>

      <div className="w-full">
        <Timeline experiences={timelineExperiences} className="px-0 py-4 max-w-full" />
      </div>
    </motion.section>
  );
}

export default Experience;
