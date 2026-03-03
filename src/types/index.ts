import type { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  icon?: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company?: string;
  location?: string;
  period: string;
  description: string;
  highlights?: string[];
  tags: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  category: string;
}

export interface Social {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  name: string;
  initials: string;
  role: string;
  location: string;
  phone: string;
  bio: string;
  bioHighlights: BioHighlight[];
  email: string;
  coverImage?: string;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  socials: Social[];
  navItems: NavItem[];
  likesAndDislikes?: {
    likes: string[];
    dislikes: string[];
  };
}

export interface BioHighlight {
  text: string;
  color: "pink" | "yellow" | "blue";
}

export type SectionId =
  | "hero"
  | "projects"
  | "experience"
  | "education"
  | "about"
  | "contact";
