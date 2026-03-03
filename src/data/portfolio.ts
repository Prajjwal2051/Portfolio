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
        "Architected and developed a full stack video streaming platform supporting video uploads, streaming, photo posts, playlists, watch history, and creator channels",
        "Designed and implemented 40+ RESTful APIs across 11 controllers to manage users, content, engagement, analytics, and subscriptions",
        "Modeled scalable backend architecture using 9 interconnected MongoDB schemas with aggregation pipelines for complex nested queries",
        "Integrated Cloudinary CDN for optimized media storage and delivery, enabling efficient video and image handling",
        "Implemented secure authentication using JWT with token rotation, bcrypt password hashing, and HTTP-only cookies to mitigate XSS risks",
        "Built advanced search functionality using MongoDB aggregation pipelines to improve content discoverability",
        "Developed a creator analytics dashboard displaying channel statistics and engagement insights",
        "Engineered real time engagement features including likes, comments, subscriptions, and notifications",
        "Designed 22 responsive React pages with centralized state management using Redux Toolkit and dark themed UI",
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
    {
      id: "key-logger",
      name: "key-logger",
      description: "Python keylogger with real-time keystroke capture and automatic email reporting",
      link: "https://github.com/Prajjwal2051/Key-Logger",
      githubUrl: "https://github.com/Prajjwal2051/Key-Logger",
      tags: ["python", "pynput", "smtp", "tkinter", "cybersecurity"],
      icon: "⌨️",
      highlights: [
        "Built a real-time keystroke capture tool using pynput.keyboard.Listener with timestamp logging across Windows, macOS, and Linux",
        "Implemented automatic email reporting via SMTP with multi-provider support (Gmail, Outlook, Yahoo) using TLS encryption",
        "Added interactive email configuration setup with App Password authentication to avoid hardcoding credentials",
        "Developed a Tkinter GUI for managing and viewing captured logs without touching the terminal",
        "Designed for educational and authorized penetration testing use with ethical guidelines documented",
      ],
    },
    {
      id: "smart-dustbin",
      name: "smart-dustbin",
      description: "contactless smart dustbin using Arduino, ultrasonic sensor, and servo motor with a web dashboard",
      link: "https://github.com/Prajjwal2051/SmartDustbinUsingArduino",
      githubUrl: "https://github.com/Prajjwal2051/SmartDustbinUsingArduino",
      tags: ["arduino", "c++", "typescript", "iot", "ultrasonic sensor", "servo motor"],
      icon: "🗑️",
      highlights: [
        "Built an IoT-based smart dustbin using Arduino Uno, HC-SR04 ultrasonic sensor, and SG90 servo motor for hands-free lid control",
        "Programmed the Arduino to detect objects within a configurable range (2–30 cm) and trigger the servo to open the lid automatically",
        "Implemented auto-close after a preset delay, eliminating physical contact and improving hygiene",
        "Developed a TypeScript web dashboard (88.7% TypeScript) with a backend and styled frontend to monitor and control the dustbin remotely",
        "Designed customizable detection range and lid open duration via code parameters for flexible deployment",
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
      link: "https://github.com/Prajjwal2051/CLIHandbookOWASP",
      description:
        "building tools and hosting events to teach students Git, open-source, and Linux fundamentals.",
      highlights: [
        "Developed the Linux CLI Handbook — a full documentation website for learning Linux CLI built with Next.js 16, TypeScript, and shadcn/ui, deployed on Vercel",
        "Implemented advanced search with relevance scoring, fuzzy matching, keyboard navigation (⌘K), and localStorage-based recent searches",
        "Structured 24+ documentation pages across 7 sections covering Introduction, Core Concepts, Commands, Advanced Topics, Reference, Troubleshooting, and FAQ",
        "Built auto-generated table of contents, reading progress indicator, and cyclic prev/next navigation for a smooth reading experience",
        "Hosted Git-Gud educational event to teach students Git workflows and open-source contribution practices",
        "Designed and developed club main website to improve OWASP NIE's online presence",
      ],
      tags: ["next.js", "typescript", "shadcn/ui", "tailwind css", "linux", "open-source", "git", "events"],
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
