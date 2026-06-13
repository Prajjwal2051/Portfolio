import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";
import { LogoLoop } from "@/components/shared/LogoLoop";
import { portfolioData } from "@/data/portfolio";
import { useTheme } from "next-themes";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  languages: {
    bg: "rgba(232, 144, 122, 0.12)",
    text: "#e8907a",
    border: "rgba(232, 144, 122, 0.3)",
  },
  frontend: {
    bg: "rgba(90, 160, 200, 0.12)",
    text: "#5aa0c8",
    border: "rgba(90, 160, 200, 0.3)",
  },
  backend: {
    bg: "rgba(200, 165, 64, 0.12)",
    text: "#c8a540",
    border: "rgba(200, 165, 64, 0.3)",
  },
  tools: {
    bg: "rgba(120, 180, 120, 0.12)",
    text: "#6aaa6a",
    border: "rgba(120, 180, 120, 0.3)",
  },
};

function SkillBadge({ name, category }: { name: string; category: string }) {
  const colors = categoryColors[category] ?? {
    bg: "rgba(150, 150, 150, 0.1)",
    text: "currentColor",
    border: "rgba(150, 150, 150, 0.2)",
  };

  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        borderRadius: "6px",
        padding: "4px 12px",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {name}
    </span>
  );
}

export function Skills() {
  const shouldReduce = useReducedMotion();
  const { resolvedTheme } = useTheme();

  const fadeColor =
    resolvedTheme === "dark"
      ? "hsl(150 24% 10%)"
      : "hsl(90 38% 96%)";

  const skills = portfolioData.skills;

  const row1 = skills.filter((_, i) => i % 2 === 0);
  const row2 = skills.filter((_, i) => i % 2 === 1);

  const toLogos = (items: typeof skills) =>
    items.map((s) => ({
      node: <SkillBadge name={s.name} category={s.category} />,
      title: s.name,
    }));

  return (
    <motion.section
      id="skills"
      className="py-8"
      aria-label="Skills"
      {...(!shouldReduce && {
        initial: { clipPath: "inset(0 0 100% 0)" },
        whileInView: { clipPath: "inset(0 0 0% 0)" },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <Separator className="mb-8 opacity-30" />
      <SectionHeading>skills</SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-3 overflow-hidden"
      >
        <div style={{ height: 44, position: "relative", overflow: "hidden" }}>
          <LogoLoop
            logos={toLogos(row1)}
            speed={60}
            direction="left"
            logoHeight={36}
            gap={12}
            hoverSpeed={0}
            fadeOut
            fadeOutColor={fadeColor}
            ariaLabel="Skills row 1"
          />
        </div>

        <div style={{ height: 44, position: "relative", overflow: "hidden" }}>
          <LogoLoop
            logos={toLogos(row2)}
            speed={60}
            direction="right"
            logoHeight={36}
            gap={12}
            hoverSpeed={0}
            fadeOut
            fadeOutColor={fadeColor}
            ariaLabel="Skills row 2"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
