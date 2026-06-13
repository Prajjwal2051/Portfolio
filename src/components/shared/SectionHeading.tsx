import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScramble } from "@/hooks/useScramble";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  const text = typeof children === "string" ? children : "";
  const { display, trigger } = useScramble(text);

  return (
    <div className={cn("mb-5", className)}>
      <motion.h2
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-lg font-bold text-foreground"
        onMouseEnter={text ? trigger : undefined}
      >
        {text ? display : children}
      </motion.h2>
      <svg
        width="76"
        height="7"
        viewBox="0 0 76 7"
        fill="none"
        className="mt-[3px] block"
        aria-hidden="true"
      >
        <motion.path
          d="M1 5.2 C8 2.5 18 6.5 28 4.2 C38 1.8 48 6.2 58 4 C65 2.5 70 5 74.5 4.2"
          stroke="var(--accent-pink)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.55 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
