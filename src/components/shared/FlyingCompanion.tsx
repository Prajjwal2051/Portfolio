import { motion, useReducedMotion } from "framer-motion";
import { SpotifyNowPlaying } from "./SpotifyNowPlaying";

export function FlyingCompanion() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-6 z-40 hidden lg:flex flex-col items-end gap-2.5 select-none pointer-events-none">
      {/* Flying Companion hovering above */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85, y: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: prefersReduced ? 0 : [0, -10, 0],
          x: prefersReduced ? 0 : [0, 4, 0],
          rotate: prefersReduced ? 0 : [0, 1.5, -1, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.5 },
          scale: { duration: 0.6, delay: 0.5 },
          y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative pointer-events-auto cursor-pointer"
        whileHover={prefersReduced ? {} : { scale: 1.06, y: -14 }}
        whileTap={{ scale: 0.94 }}
      >
        <img
          src="/flying.png"
          alt="Flying companion"
          width={180}
          height={106}
          draggable={false}
          className="w-36 xl:w-44 h-auto drop-shadow-md object-contain"
        />
      </motion.div>

      {/* Spotify Now Playing Widget directly below */}
      <div className="pointer-events-auto">
        <SpotifyNowPlaying />
      </div>
    </div>
  );
}

export default FlyingCompanion;
