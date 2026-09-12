import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GitHubContributions } from "@/components/shared/GitHubContributions";
import { LeetCodeStats } from "@/components/shared/LeetCodeStats";
import { Separator } from "@/components/ui/separator";

export function GitHub() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // whileInView never resolves on the mobile-rendered copy of this section
  // (a confirmed IntersectionObserver quirk with the dual desktop/mobile DOM
  // trees) so skip the scroll-triggered reveal there and show it immediately.
  const shouldReduce = prefersReducedMotion || !isDesktop;

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
        {...(!shouldReduce && {
          initial:     { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport:    { once: true },
          transition:  { duration: 0.5 },
        })}
      >
        <GitHubContributions username="Prajjwal2051" />
      </motion.div>

      <motion.div
        {...(!shouldReduce && {
          initial:     { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport:    { once: true },
          transition:  { duration: 0.5, delay: 0.1 },
        })}
        className="mt-6"
      >
        <SectionHeading className="mb-3">leetcode</SectionHeading>
        <LeetCodeStats
          username="prajjwal25"
          profileUrl="https://leetcode.com/u/prajjwal25/"
        />
      </motion.div>
    </motion.section>
  );
}
