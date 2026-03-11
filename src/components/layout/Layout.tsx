import { Sidebar } from "./Sidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { CoverHeader } from "@/components/shared/CoverHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Desktop: 2-column layout */}
      <div className="hidden lg:flex justify-center min-h-screen">
        <div className="flex w-full max-w-4xl">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <CoverHeader />
            <div className="px-6 xl:px-8 py-8 lg:py-10">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile layout */}
      <main className="lg:hidden">
        <MobileBottomNav />
        <CoverHeader />
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-8 pb-28">{children}</div>
      </main>

      <ThemeToggle />
    </div>
  );
}
