import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Hash, BookOpen, MessageSquare } from "lucide-react";
import type { SectionId } from "@/types";

const socials = [
  { label: "GitHub", href: "https://www.github.com/Prajjwal2051", Icon: Github },
  { label: "Twitter", href: "https://www.x.com/prajjwal2051__", Icon: Twitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prajjwal-sahu-498620221", Icon: Linkedin },
  { label: "Hashnode", href: "https://prajjwalsahuu.hashnode.dev", Icon: Hash },
  { label: "Medium", href: "http://www.medium.com/prajjwal2051", Icon: BookOpen },
  { label: "Discord", href: "https://discord.com/users/prajjwal4966", Icon: MessageSquare },
];

const sectionIds: SectionId[] = [
  "hero",
  "projects",
  "experience",
  "education",
  "about",
  "contact",
];

export function Sidebar() {
  const { activeSection, scrollToSection } = useActiveSection(sectionIds);

  return (
    <aside className="flex flex-col justify-between sticky top-0 h-screen w-[200px] xl:w-[220px] shrink-0 p-5 xl:p-6 z-40 overflow-y-auto">
      {/* Top: Identity */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => scrollToSection("hero")}
            className="block text-left"
            aria-label="Go to top"
          >
            <h1 className="text-5xl xl:text-6xl font-bold tracking-tighter leading-none select-none">
              {portfolioData.initials.split("").join(".")}
            </h1>
          </button>
          <div className="mt-3 space-y-0.5">
            <p className="text-xs font-bold">{portfolioData.name}</p>
            <p className="text-xs text-muted-foreground lowercase">
              {portfolioData.role}
            </p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="mt-6" aria-label="Main navigation">
          <ul className="space-y-0.5">
            {portfolioData.navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "") as SectionId;
              const isActive = activeSection === sectionId;
              return (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                >
                  <button
                    onClick={() => scrollToSection(sectionId)}
                    className={cn(
                      "flex items-center gap-2 py-0.5 text-xs transition-colors duration-150 w-full text-left group",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="text-xs">{isActive ? "•" : "◦"}</span>
                    <span>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs ml-0.5">-&gt;</span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom: Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-2"
      >
        <a
          href={`mailto:${portfolioData.email}`}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          stay in the loop <span className="text-xs">-&gt;</span>
        </a>
        {/* Social icons */}
        <div className="flex items-center gap-3 flex-wrap">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
        <Separator className="opacity-30" />
        <div className="text-xs text-muted-foreground/60 space-y-0.5">
          <p>© {new Date().getFullYear()} {portfolioData.name.toLowerCase()}</p>
          <p>• all rights reserved</p>
        </div>
      </motion.div>
    </aside>
  );
}
