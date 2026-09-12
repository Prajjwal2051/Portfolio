import { useEffect, useRef, useState, useCallback } from "react";
import { Github, ExternalLink } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Project } from "@/types";

const PANEL_COLORS: Record<string, [string, string]> = {
  "next.js 16": ["#e8907a", "#151515"],
  "next.js": ["#e8907a", "#151515"],
  react: ["#5aa0c8", "#151515"],
  python: ["#c8a540", "#151515"],
  arduino: ["#6ee7b7", "#151515"],
  "node.js": ["#6ee7b7", "#151515"],
};

function panelColors(tags: string[]): [string, string] {
  for (const tag of tags) {
    const pair = PANEL_COLORS[tag.toLowerCase()];
    if (pair) return pair;
  }
  return ["#151515", "#f2f2f2"];
}

interface PanelInnerProps {
  project: Project;
  index: number;
  onSelect: () => void;
  titleRef?: (el: HTMLHeadingElement | null) => void;
}

function PanelInner({ project, index, onSelect, titleRef }: PanelInnerProps) {
  return (
    <>
      <div className="self-end text-left max-w-[420px]">
        <span
          className="block uppercase tracking-[0.14em] text-xs font-mono mb-2"
          style={{ opacity: 0.65 }}
        >
          {String(index + 1).padStart(2, "0")}/ {project.lastUpdated ?? project.tags[0]}
        </span>
        <p className="text-sm sm:text-base leading-relaxed font-medium mb-4">
          {project.description}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onSelect}
            className="text-xs underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
          >
            view details
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="View source on GitHub"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit live site"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <h2
        ref={titleRef}
        className="font-black leading-[0.85] tracking-tight"
        style={{
          fontSize: "clamp(2.5rem, 9vw, 6.5rem)",
          transformOrigin: "left bottom",
          willChange: "transform",
        }}
      >
        {project.icon} {project.name}
      </h2>
    </>
  );
}

function PinnedTimeline({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const n = projects.length;

    const applyAt = (scaled: number) => {
      const idx = Math.min(n - 2, Math.floor(scaled));
      const t = scaled - idx;

      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const title = titleRefs.current[i];

        if (i < idx) {
          panel.style.clipPath = "inset(0 0 0 100%)";
          if (title) title.style.transform = "rotate(-90deg)";
        } else if (i === idx) {
          panel.style.clipPath = `inset(0 ${t * 100}% 0 0)`;
          if (title) title.style.transform = `rotate(${-90 * t}deg)`;
        } else if (i === idx + 1) {
          panel.style.clipPath = `inset(0 0 0 ${(1 - t) * 100}%)`;
          if (title) title.style.transform = "rotate(0deg)";
        } else {
          panel.style.clipPath = "inset(0 0 0 100%)";
          if (title) title.style.transform = "rotate(0deg)";
        }
        panel.style.zIndex = String(i);
      });
    };

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      let raw = total > 0 ? -rect.top / total : 0;
      raw = Math.min(1, Math.max(0, raw));
      applyAt(raw * (n - 1));
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [projects.length]);

  return (
    <div
      ref={wrapRef}
      className="relative -mx-5 sm:-mx-8 lg:-mx-6 xl:-mx-8 lg:mr-[calc((56rem-100vw)/2)]"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky overflow-hidden rounded-[2.5rem]" style={{ top: 16, height: "calc(100vh - 32px)" }}>
        {projects.map((project, i) => {
          const [bg, fg] = panelColors(project.tags);
          return (
            <div
              key={project.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-between"
              style={{
                background: bg,
                color: fg,
                clipPath: i === 0 ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
                padding: "clamp(24px, 5vw, 48px)",
              }}
            >
              <PanelInner
                project={project}
                index={i}
                onSelect={() => onSelect(project)}
                titleRef={(el) => {
                  titleRefs.current[i] = el;
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StaticTimeline({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  return (
    <div className="space-y-6 -mx-5 sm:-mx-8 lg:-mx-6 xl:-mx-8 lg:mr-[calc((56rem-100vw)/2)]">
      {projects.map((project, i) => {
        const [bg, fg] = panelColors(project.tags);
        return (
          <div
            key={project.id}
            className="rounded-[2.5rem] flex flex-col justify-between gap-8 min-h-[320px]"
            style={{ background: bg, color: fg, padding: "clamp(24px, 5vw, 48px)" }}
          >
            <PanelInner project={project} index={i} onSelect={() => onSelect(project)} />
          </div>
        );
      })}
    </div>
  );
}

export function ProjectsScrollTimeline() {
  const shouldReduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const projects = portfolioData.projects;

  return (
    <>
      {shouldReduce || !isDesktop ? (
        <StaticTimeline projects={projects} onSelect={setSelected} />
      ) : (
        <PinnedTimeline projects={projects} onSelect={setSelected} />
      )}

      <ProjectModal project={selected} onClose={close} />
    </>
  );
}
