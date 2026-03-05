import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";

export function About() {
  const { likesAndDislikes } = portfolioData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.3], [40, 0]), { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section
      id="about"
      className="py-8"
      aria-label="About"
      ref={ref}
      style={{ opacity, y }}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>about</SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-sm leading-relaxed text-muted-foreground space-y-4">
          <p>
            hey there! i'm prajjwal — a dynamic web developer based in{" "}
            <span className="text-foreground font-medium">
              bengaluru, india
            </span>
            . i have experience at OWASP, where i created an online CLI resource
            for students and organized educational events to enhance Git and
            open-source knowledge.
          </p>
          <p>
            proficient in Linux command line and skilled in full-stack
            development, i'm dedicated to fostering learning and innovation in
            tech environments. when i'm not coding, you'll find me exploring new
            technologies or contributing to open-source projects.
          </p>
        </div>

        {likesAndDislikes && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              fuel my social anxiety — vote on whether you agree with my
              opinions:
            </p>
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
                    <p className="text-xs text-muted-foreground/50">a / d</p>
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
                    <p className="text-xs text-muted-foreground/50">a / d</p>
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
