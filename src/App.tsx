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
import { CatCursor } from "@/components/shared/CatCursor";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <CatCursor />
        <Layout>
          <Hero />
          <Projects />
          <Experience />
          <Education />
          <About />
          <GitHub />
          <Contact />
        </Layout>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
