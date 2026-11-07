import { useState, lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/sections/Hero";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { SootSprites } from "@/components/shared/SootSprites";
import { Fireflies } from "@/components/shared/Fireflies";
import { CursorTrail } from "@/components/shared/CursorTrail";
import { SeasonalAmbient } from "@/components/shared/SeasonalAmbient";
import { FlyingCompanion } from "@/components/shared/FlyingCompanion";
import { Analytics } from "@vercel/analytics/react";

const Projects = lazy(() =>
  import("@/sections/Projects").then((m) => ({ default: m.Projects }))
);
const Experience = lazy(() =>
  import("@/sections/Experience").then((m) => ({ default: m.Experience }))
);
const Education = lazy(() =>
  import("@/sections/Education").then((m) => ({ default: m.Education }))
);
const About = lazy(() =>
  import("@/sections/About").then((m) => ({ default: m.About }))
);
const GitHub = lazy(() =>
  import("@/sections/GitHub").then((m) => ({ default: m.GitHub }))
);
const Skills = lazy(() =>
  import("@/sections/Skills").then((m) => ({ default: m.Skills }))
);
const Contact = lazy(() =>
  import("@/sections/Contact").then((m) => ({ default: m.Contact }))
);

const Agentation = import.meta.env.DEV
  ? lazy(() =>
    import("agentation").then((m) => ({ default: m.Agentation }))
  )
  : null;

function App() {
  const [showLoading] = useState(
    () => !sessionStorage.getItem("portfolio_loaded")
  );

  if (showLoading) {
    sessionStorage.setItem("portfolio_loaded", "1");
  }

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          {showLoading && <LoadingScreen />}
          <NoiseOverlay />
          <SeasonalAmbient />
          <SootSprites />
          <Fireflies />
          <ScrollProgressBar />
          <CursorTrail />
          <FlyingCompanion />
          <Layout>
            <Hero />
            <Suspense fallback={null}>
              <Skills />
              <Experience />
              <Projects />
              <Education />
              <About />
              <GitHub />
              <Contact />
            </Suspense>
          </Layout>
        </TooltipProvider>
      </ThemeProvider>
      {import.meta.env.DEV && Agentation && (
        <Suspense fallback={null}>
          <Agentation />
        </Suspense>
      )}
      <Analytics />
    </>
  );
}

export default App;
