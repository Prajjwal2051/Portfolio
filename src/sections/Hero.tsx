import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function Hero() {
  const colorClassMap = {
    pink: "text-accent-pink",
    yellow: "text-accent-yellow",
    blue: "text-accent-blue",
  } as const;

  return (
    <section
      id="hero"
      className="flex flex-col justify-center pb-8"
      aria-label="Introduction"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4 font-cursive">
          hello!
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-lg leading-relaxed max-w-lg font-bold"
      >
        <p className="mb-2">
          <span className="text-muted-foreground">*</span> my name is{" "}
          <span className="font-semibold">
            {portfolioData.name.toLowerCase()}
          </span>
          .
        </p>
        <p className="mb-2">
          i'm a dynamic web developer who builds{" "}
          {portfolioData.bioHighlights.map((highlight, index) => (
            <span key={highlight.text}>
              <span
                className={`font-semibold ${colorClassMap[highlight.color]}`}
              >
                {highlight.text}
              </span>
              {index < portfolioData.bioHighlights.length - 1 && (
                <span>
                  {index === portfolioData.bioHighlights.length - 2
                    ? " and "
                    : ", "}
                </span>
              )}
            </span>
          ))}{" "}
          applications.
        </p>
        <p>
          dedicated to fostering learning and innovation in tech, from{" "}
          <span className="font-semibold text-accent-pink">open-source</span>{" "}
          contributions to building full-stack platforms.{" "}
          <span className="text-muted-foreground">*</span>
        </p>
      </motion.div>
    </section>
  );
}
