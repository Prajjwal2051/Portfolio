import { useTheme as useNextTheme } from "next-themes";

export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  return { theme, setTheme, isDark, toggleTheme };
}
