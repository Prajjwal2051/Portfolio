import { Github, Linkedin, Mail, Phone } from "lucide-react";
import type { PortfolioData } from "@/types";

export const portfolioData: PortfolioData = {
  name: "Prajjwal Sahu",
  initials: "P.S",
  role: "full-stack web developer",
  location: "Bengaluru, India",
  phone: "7697403332",
  bio: "",
  bioHighlights: [
    { text: "elegant", color: "pink" },
    { text: "performant", color: "yellow" },
    { text: "scalable", color: "blue" },
  ],
  email: "prajjwal2051@gmail.com",
  coverImage: "/banner.gif",

  navItems: [
    { label: "projects", href: "#projects" },
    { label: "experience", href: "#experience" },
    { label: "education", href: "#education" },
    { label: "about", href: "#about" },
    { label: "contact", href: "#contact" },
  ],

  projects: [
    {
      id: "viewly",
      name: "viewly",
      description: "full stack video streaming and social media platform",
      link: "https://github.com/Prajjwal2051/Viewly",
      githubUrl: "https://github.com/Prajjwal2051/Viewly",
      liveUrl: "https://viewly-aa2e.vercel.app/",
      tags: [
        "node.js",
        "express.js",
        "mongodb",
        "react",
        "redux toolkit",
        "tailwind css",
        "cloudinary",
        "jwt",
      ],
      icon: "🎬",
      highlights: [
        "Architected a full stack video streaming platform supporting video uploads, streaming, photo posts, playlists, watch history, and creator channels",
        "Designed and implemented 40+ RESTful APIs across 11 controllers to manage users, content, engagement, analytics, and subscriptions",
        "Modeled scalable backend architecture using 9 interconnected MongoDB schemas with aggregation pipelines for complex nested queries",
        "Integrated Cloudinary CDN for optimized media storage and delivery, enabling efficient video and image handling",
        "Implemented secure authentication using JWT with token rotation, bcrypt password hashing, and HTTP-only cookies to mitigate XSS risks",
        "Built advanced search functionality using MongoDB aggregation pipelines to improve content discoverability",
        "Developed a creator analytics dashboard displaying channel statistics and engagement insights",
        "Engineered real-time engagement features including likes, comments, subscriptions, and notifications",
        "Designed 22 responsive React pages with centralized state management using Redux Toolkit and dark-themed UI",
      ],
    },
    {
      id: "chat-connect",
      name: "chat-connect",
      description: "real-time multi-user terminal chat application using Python sockets",
      link: "https://github.com/Prajjwal2051/Chat-Connect",
      githubUrl: "https://github.com/Prajjwal2051/Chat-Connect",
      tags: ["python", "sockets", "multithreading", "networking", "cli"],
      icon: "💬",
      highlights: [
        "Built a real-time multi-user chat server using Python's socket module with concurrent client handling via multithreading",
        "Implemented username validation and broadcast messaging to all connected clients from a single server instance",
        "Designed a command-line client that sends and receives messages simultaneously using separate threads",
        "Created a utility script to automatically detect and suggest free ports on the host machine",
        "Documented server-client communication sequence with visual diagrams for clarity",
      ],
    },
  ],

  experience: [
    {
      id: "owasp",
      role: "tech core",
      company: "OWASP",
      location: "Mysore, IN",
      period: "september 2025 — present",
      description:
        "building tools and hosting events to teach students Git, open-source, and Linux fundamentals.",
      highlights: [
        "Hosted educational events including Git-Gud to teach students Git and open-source technologies",
        "Developed online CLI resource for quick access to Linux commands",
        "Designed and developed club main website to improve online presence",
      ],
      tags: ["git", "linux", "open-source", "web dev", "events"],
    },
  ],

  education: [
    {
      id: "nie",
      institution: "The National Institute of Engineering, Mysore",
      degree: "Bachelor of Engineering (BE) — Computer Science",
      location: "Mysore, India",
      period: "expected december 2028",
      highlights: [
        "Second-year BE student focused on advancing software development skills",
        "Deepening expertise in Data Structures and Algorithms (DSA)",
        "Developing knowledge in AI, ML, and Data Science",
        "Exploring web and Android development",
      ],
    },
    {
      id: "dps",
      institution: "Delhi Public School (DPS), Korba",
      degree: "High School Diploma — Science",
      location: "Korba, Chhattisgarh",
      period: "december 2023",
      highlights: [
        "Developed problem-solving and teamwork skills through group projects",
        "Fostered a growth mindset with curiosity in the Science field",
      ],
    },
  ],

  skills: [
    { name: "React", category: "frontend" },
    { name: "JavaScript", category: "languages" },
    { name: "TypeScript", category: "languages" },
    { name: "ES6+", category: "languages" },
    { name: "Python", category: "languages" },
    { name: "C++", category: "languages" },
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "Git", category: "tools" },
    { name: "Linux CLI", category: "tools" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Redux Toolkit", category: "frontend" },
    { name: "REST APIs", category: "backend" },
  ],

  socials: [
    {
      label: "github",
      href: "https://github.com/Prajjwal2051",
      icon: Github,
    },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/prajjwal-sahu-498620221/",
      icon: Linkedin,
    },
    {
      label: "email",
      href: "mailto:prajjwal2051@gmail.com",
      icon: Mail,
    },
    {
      label: "phone",
      href: "tel:+917697403332",
      icon: Phone,
    },
  ],

  likesAndDislikes: {
    likes: ["clean code", "dark mode", "open source", "linux"],
    dislikes: ["spaghetti code", "slow wifi", "light mode", "meetings"],
  },
};
