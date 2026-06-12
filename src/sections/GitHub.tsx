import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GitHubContributions } from "@/components/shared/GitHubContributions";
import { Separator } from "@/components/ui/separator";

export function GitHub() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      id="github"
      className="py-8"
      aria-label="GitHub Contributions"
      {...(!shouldReduce && {
        initial:     { clipPath: "inset(0 0 100% 0)" },
        whileInView: { clipPath: "inset(0 0 0% 0)" },
        viewport:    { once: true, margin: "-60px" },
        transition:  { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>github</SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <GitHubContributions username="Prajjwal2051" />
      </motion.div>
    </motion.section>
  );
}
