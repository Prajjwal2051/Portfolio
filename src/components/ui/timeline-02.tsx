import * as React from "react";
import { Bot, Bug, Building2, Calendar, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TimelineExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
  location?: string;
  highlights?: string[];
  link?: string;
}

const defaultExperiences: TimelineExperienceItem[] = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2023 - Present",
    description:
      "Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    icon: Bot,
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Inc",
    period: "2021 - 2023",
    description:
      "Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
    technologies: ["React", "Express.js", "PostgreSQL", "Docker", "Redis"],
    icon: Database,
  },
  {
    title: "Frontend Developer",
    company: "WebTech Studios",
    period: "2018 - 2021",
    description:
      "Created responsive and interactive user interfaces, collaborated with designers, and optimized application performance.",
    technologies: ["React", "JavaScript", "SASS", "Webpack", "Jest"],
    icon: Bug,
  },
];

export interface TimelineProps {
  experiences?: TimelineExperienceItem[];
  className?: string;
}

export default function Timeline({
  experiences = defaultExperiences,
  className,
}: TimelineProps) {
  return (
    <div className={cn("mx-auto max-w-screen-sm px-2 sm:px-6 py-6 md:py-10", className)}>
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute inset-y-0 left-0 border-l-2 border-border/60" />

        {experiences.map(
          (
            {
              company,
              description,
              period,
              technologies,
              title,
              icon: Icon,
              location,
              highlights,
              link,
            },
            index,
          ) => (
            <div className="relative pb-12 pl-10 last:pb-0" key={index}>
              {/* Timeline Icon */}
              <div className="absolute left-px flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-background border border-border/80 shadow-xs">
                <Icon className="h-5 w-5 text-foreground" />
              </div>

              {/* Content */}
              <div className="space-y-3 font-mono">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-sm sm:text-base text-foreground font-mono">{company}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg tracking-tight text-foreground font-mono">
                    {title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-mono flex-wrap">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>{period}</span>
                    {location && (
                      <span className="text-muted-foreground/70">· {location}</span>
                    )}
                  </div>
                </div>
                <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>

                {highlights && highlights.length > 0 && (
                  <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground/90 pl-1 pt-1 font-mono">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent-pink shrink-0 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {link && (
                  <div className="pt-0.5">
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                    >
                      view project handbook →
                    </a>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  {technologies.map((tech) => (
                    <Badge
                      className="rounded-full font-mono text-xs font-normal"
                      key={tech}
                      variant="secondary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export { Timeline };
