import { useThemeToggle } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 z-50 text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors select-none"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
