import { useState } from "react";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { portfolioData } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

const sectionIds: SectionId[] = [
  "hero",
  "projects",
  "experience",
  "education",
  "about",
  "contact",
];

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const { activeSection, scrollToSection } = useActiveSection(sectionIds);
  const { isScrolled } = useScroll();

  const handleNavClick = (sectionId: SectionId) => {
    setOpen(false);
    setTimeout(() => scrollToSection(sectionId), 300);
  };

  return (
    <header
      className={cn(
        "lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-lg font-bold tracking-tighter"
          aria-label="Go to top"
        >
          {portfolioData.initials.split("").join(".")}
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] pt-12">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="mb-2">
                  <h2 className="text-4xl font-bold tracking-tighter">
                    {portfolioData.initials.split("").join(".")}
                  </h2>
                  <p className="text-sm font-medium mt-3">
                    {portfolioData.name}
                  </p>
                  <p className="text-sm text-muted-foreground lowercase">
                    {portfolioData.role}
                  </p>
                </div>
                <Separator className="my-6 opacity-30" />
                <nav aria-label="Mobile navigation">
                  <ul className="space-y-1">
                    {portfolioData.navItems.map((item) => {
                      const sectionId = item.href.replace("#", "") as SectionId;
                      const isActive = activeSection === sectionId;
                      return (
                        <li key={item.label}>
                          <button
                            onClick={() => handleNavClick(sectionId)}
                            className={cn(
                              "flex items-center gap-2 py-2 text-sm w-full text-left transition-colors",
                              isActive
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <span className="text-muted-foreground text-xs">
                              ◦
                            </span>
                            <span>{item.label}</span>
                            <ArrowRight className="h-3 w-3 ml-auto opacity-50" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
              <div className="text-xs text-muted-foreground/60 pb-4">
                <p>
                  © {new Date().getFullYear()}{" "}
                  {portfolioData.name.toLowerCase()}
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
