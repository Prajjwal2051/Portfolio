import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  RealFolder,
  type FolderCardData,
  type FolderCollectionData,
} from "@/components/shared/RealFolder";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { Separator } from "@/components/ui/separator";
import { portfolioData } from "@/data/portfolio";
import type { Project } from "@/types";
import { ExternalLink, Github, FolderOpen } from "lucide-react";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredCard, setHoveredCard] = useState<FolderCardData | null>(null);
  const [activeCollectionIdx, setActiveCollectionIdx] = useState<number>(0);

  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldReduce = prefersReducedMotion || !isDesktop;

  const projects = portfolioData.projects;
  const orbitCode =
    projects.find((p) => p.id === "builditup-orbit-code") || projects[0];
  const viewly = projects.find((p) => p.id === "viewly") || projects[1];
  const chatConnect =
    projects.find((p) => p.id === "chat-connect") || projects[2];
  const keyLogger = projects.find((p) => p.id === "key-logger") || projects[3];
  const smartDustbin =
    projects.find((p) => p.id === "smart-dustbin") || projects[4];

  const collections: FolderCollectionData[] = useMemo(
    () => [
      {
        name: "Web Platforms",
        color: "#CB5037",
        card1: {
          title: orbitCode?.name || "orbit code",
          tag: "next.js 16 · collab ide",
          link: orbitCode?.liveUrl || orbitCode?.githubUrl,
          linkNewTab: true,
          project: orbitCode,
        },
        card2: {
          title: viewly?.name || "viewly",
          tag: "video streaming platform",
          link: viewly?.liveUrl || viewly?.githubUrl,
          linkNewTab: true,
          project: viewly,
        },
        card3: {
          title: "collab engine",
          tag: "docker · ot · ai chat",
          link: orbitCode?.githubUrl,
          linkNewTab: true,
          project: orbitCode,
        },
      },
      {
        name: "Systems & Security",
        color: "#4568A7",
        card1: {
          title: chatConnect?.name || "chat-connect",
          tag: "python sockets · cli",
          link: chatConnect?.githubUrl,
          linkNewTab: true,
          project: chatConnect,
        },
        card2: {
          title: keyLogger?.name || "key-logger",
          tag: "keystroke capture · smtp",
          link: keyLogger?.githubUrl,
          linkNewTab: true,
          project: keyLogger,
        },
        card3: {
          title: "network server",
          tag: "multithreading · sockets",
          link: chatConnect?.githubUrl,
          linkNewTab: true,
          project: chatConnect,
        },
      },
      {
        name: "IoT & Hardware",
        color: "#386451",
        card1: {
          title: smartDustbin?.name || "smart-dustbin",
          tag: "arduino · ultrasonic",
          link: smartDustbin?.githubUrl,
          linkNewTab: true,
          project: smartDustbin,
        },
        card2: {
          title: "iot dashboard",
          tag: "typescript web dashboard",
          link: smartDustbin?.githubUrl,
          linkNewTab: true,
          project: smartDustbin,
        },
        card3: {
          title: "servo automation",
          tag: "c++ · sensor telemetry",
          link: smartDustbin?.githubUrl,
          linkNewTab: true,
          project: smartDustbin,
        },
      },
    ],
    [orbitCode, viewly, chatConnect, keyLogger, smartDustbin]
  );

  // Current project for summary display (either hovered or default for active folder)
  const currentProject =
    hoveredCard?.project ||
    collections[activeCollectionIdx]?.card1?.project ||
    orbitCode;

  return (
    <motion.section
      id="projects"
      className="py-8 relative w-full"
      aria-label="Projects"
      {...(!shouldReduce && {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      <div>
        <Separator className="mb-8 opacity-30" />
        <div className="mb-4">
          <SectionHeading>projects</SectionHeading>
        </div>
      </div>

      {/* 3D RealFolder component */}
      <div className="w-full flex justify-center items-center py-2">
        <div className="w-full max-w-[760px]">
          <RealFolder
            collections={collections}
            startOpen={true}
            enableTilt={true}
            speed={1}
            onCardClick={(card) => {
              if (card.project) {
                setSelectedProject(card.project);
              }
            }}
            onCardHover={(card) => setHoveredCard(card)}
            onActiveCollectionChange={(idx) => setActiveCollectionIdx(idx)}
          />
        </div>
      </div>

      {/* Interactive Project Summary card below the folder */}
      {currentProject && (
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md p-4 sm:p-5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-base font-semibold tracking-tight text-foreground">
                  {currentProject.name}
                </span>
                {currentProject.lastUpdated && (
                  <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                    {currentProject.lastUpdated}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                {currentProject.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProject(currentProject)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs cursor-pointer active:scale-95"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                details
              </button>

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border/80 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  github
                </a>
              )}

              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border/80 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  live
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          {currentProject.tags && currentProject.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mt-3 pt-3 border-t border-border/40">
              {currentProject.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-[11px] font-mono text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {currentProject.tags.length > 6 && (
                <span className="text-[10px] font-mono text-muted-foreground/70">
                  +{currentProject.tags.length - 6} more
                </span>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Help caption */}
      <div className="mt-3 text-center text-[11px] text-muted-foreground/70 font-mono">
        click folder flap to open/close · switch tabs with color dots · hover cards to tilt · click cards for full specs
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}

export default Projects;
