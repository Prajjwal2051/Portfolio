import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // whileInView never resolves on the mobile-rendered copy of this section
  // (a confirmed IntersectionObserver quirk with the dual desktop/mobile DOM
  // trees) so skip the scroll-triggered reveal there and show it immediately.
  const shouldReduce = prefersReducedMotion || !isDesktop;
  const { likesAndDislikes } = portfolioData;

  return (
    <motion.section
      id="about"
      className="py-8"
      aria-label="About"
      {...(!shouldReduce && {
        initial:     { clipPath: "inset(0 0 100% 0)" },
        whileInView: { clipPath: "inset(0 0 0% 0)" },
        viewport:    { once: true, margin: "-60px" },
        transition:  { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>about</SectionHeading>

      <motion.div
        {...(!shouldReduce && {
          initial:     { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport:    { once: true },
          transition:  { duration: 0.5 },
        })}
        className="space-y-6"
      >
        <div className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <p>
            based in{" "}
            <span className="text-foreground font-medium">
              bengaluru, india
            </span>
            , i lead technical initiatives and build developer tools at OWASP NIE.
            my work centers on full-stack systems, linux environments, and
            open-source tooling designed to empower students and builders.
          </p>
          <p>
            i focus on crafting responsive, accessible interfaces paired with resilient backends.
            when i'm not writing code or architecting systems, you'll find me exploring emerging
            web standards, mentoring peers, and contributing to community projects.
          </p>
        </div>

        {likesAndDislikes && (
          <motion.div
            {...(!shouldReduce && {
              initial:     { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport:    { once: true },
              transition:  { duration: 0.4, delay: 0.2 },
            })}
          >
            <div className="grid grid-cols-2 gap-x-12 gap-y-1">
              <div>
                <p className="text-xs text-muted-foreground mb-3 font-medium">
                  things i like
                </p>
                {likesAndDislikes.likes.map((item) => (
                  <div
                    key={item}
                    className="py-1.5 border-b border-border/30 last:border-0"
                  >
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-3 font-medium">
                  things i don't like
                </p>
                {likesAndDislikes.dislikes.map((item) => (
                  <div
                    key={item}
                    className="py-1.5 border-b border-border/30 last:border-0"
                  >
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}
