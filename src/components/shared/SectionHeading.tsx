import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "text-lg font-bold text-foreground tracking-wide mb-5 uppercase",
        className,
      )}
    >
      {children}
    </motion.h2>
  );
}
