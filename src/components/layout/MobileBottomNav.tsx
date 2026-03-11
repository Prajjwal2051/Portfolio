import { motion } from "framer-motion";
import { Home, Code2, Briefcase, GraduationCap, User, PenLine, Mail } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

const navItems: { id: SectionId; label: string; Icon: React.ElementType }[] = [
    { id: "hero", label: "home", Icon: Home },
    { id: "projects", label: "work", Icon: Code2 },
    { id: "experience", label: "exp", Icon: Briefcase },
    { id: "education", label: "edu", Icon: GraduationCap },
    { id: "about", label: "about", Icon: User },
    { id: "blog", label: "blog", Icon: PenLine },
    { id: "contact", label: "contact", Icon: Mail },
];

const sectionIds: SectionId[] = [
    "hero",
    "projects",
    "experience",
    "education",
    "about",
    "blog",
    "contact",
];

export function MobileBottomNav() {
    const { activeSection, scrollToSection } = useActiveSection(sectionIds);

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            className="lg:hidden fixed bottom-4 inset-x-3 z-50"
            aria-label="Mobile navigation"
        >
            <div className="flex items-center w-full px-1 py-2 rounded-2xl bg-background/85 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/25">
                {navItems.map(({ id, label, Icon }) => {
                    const isActive = activeSection === id;
                    return (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            aria-label={label}
                            aria-current={isActive ? "true" : undefined}
                            className="relative flex flex-col items-center gap-[3px] flex-1 py-1.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-pill"
                                    className="absolute inset-0 rounded-xl bg-foreground"
                                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                />
                            )}
                            <Icon
                                className={cn(
                                    "relative z-10 h-[15px] w-[15px] transition-colors duration-150",
                                    isActive ? "text-background" : "text-muted-foreground",
                                )}
                            />
                            <span
                                className={cn(
                                    "relative z-10 text-[9px] font-semibold leading-none tracking-wide transition-colors duration-150",
                                    isActive ? "text-background" : "text-muted-foreground",
                                )}
                            >
                                {label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </motion.nav>
    );
}
