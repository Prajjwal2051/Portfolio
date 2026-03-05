import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { portfolioData } from "@/data/portfolio";
import { TypewriterText } from "@/components/shared/TypewriterText";
import { MagneticButton } from "@/components/shared/MagneticButton";

const ROLES = [
  "full-stack developer",
  "open-source contributor",
  "linux enthusiast",
  "backend engineer",
];

function fireConfetti() {
  confetti({
    particleCount: 160,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#e8a0b0", "#d4a843", "#7fb5c5", "#a0e8b0"],
  });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
    });
  }, 200);
}

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

      {/* Typewriter role cycling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="mt-4 text-sm text-muted-foreground"
      >
        currently:{" "}
        <TypewriterText
          words={ROLES}
          className="text-foreground font-medium"
        />
      </motion.div>

      {/* Hire Me button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mt-7"
      >
        <MagneticButton
          onClick={fireConfetti}
          className="group inline-flex items-center gap-2 border border-border/60 hover:border-foreground/40 px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/30"
        >
          <span>hire me</span>
          <motion.span
            className="text-base"
            animate={{ rotate: [0, 15, -10, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            🎉
          </motion.span>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
