import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";
import { About } from "@/sections/About";
import { GitHub } from "@/sections/GitHub";
import { Contact } from "@/sections/Contact";
import { Blog } from "@/sections/Blog";
import { CatCursor } from "@/components/shared/CatCursor";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";

function App() {
  const [showLoading] = useState(() => !sessionStorage.getItem("portfolio_loaded"));

  if (showLoading) {
    sessionStorage.setItem("portfolio_loaded", "1");
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        {showLoading && <LoadingScreen />}
        <NoiseOverlay />
        <ScrollProgressBar />
        <CatCursor />
        <Layout>
          <Hero />
          <Projects />
          <Experience />
          <Education />
          <About />
          <GitHub />
          <Blog />
          <Contact />
        </Layout>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
