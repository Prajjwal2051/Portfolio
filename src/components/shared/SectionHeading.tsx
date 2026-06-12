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
    <motion.h2
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("text-lg font-bold text-foreground mb-5", className)}
      onMouseEnter={text ? trigger : undefined}
    >
      {text ? display : children}
    </motion.h2>
  );
}
