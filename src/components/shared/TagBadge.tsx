import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

const GREEN_HOVER_TAGS = new Set([
  "next.js 16",
  "typescript",
  "monaco editor",
  "operational transformation",
  "docker",
  "socket.io",
  "prisma",
  "nextauth v5",
  "github api",
]);

export function TagBadge({ tag, className }: TagBadgeProps) {
  const normalizedTag = tag.trim().toLowerCase();
  const isGreenHoverTag = GREEN_HOVER_TAGS.has(normalizedTag);

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-normal lowercase tracking-wide transition-colors",
        isGreenHoverTag &&
        "hover:text-emerald-700 hover:border-emerald-500/70 dark:hover:text-emerald-300 dark:hover:border-emerald-400/70",
        className,
      )}
    >
      {tag}
    </Badge>
  );
}
