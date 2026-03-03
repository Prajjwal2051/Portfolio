import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-sm font-medium text-muted-foreground tracking-wide mb-5 lowercase",
        className,
      )}
    >
      {children}
    </h2>
  );
}
