import { useState, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const NOISE = "#@$%&?^~<>[]{}|!アイウエオ";
const FRAME_MS = 35;

export function useScramble(originalText: string) {
  const [display, setDisplay] = useState(originalText);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduce = useReducedMotion();

  const trigger = useCallback(() => {
    if (shouldReduce) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    const totalFrames = originalText.length + 10;
    let frame = 0;

    function tick() {
      frame++;
      setDisplay(
        originalText
          .split("")
          .map((char, i) =>
            frame > 8 + i
              ? char
              : NOISE[Math.floor(Math.random() * NOISE.length)],
          )
          .join(""),
      );
      if (frame < totalFrames) {
        timerRef.current = setTimeout(tick, FRAME_MS);
      } else {
        setDisplay(originalText);
        timerRef.current = null;
      }
    }

    tick();
  }, [originalText, shouldReduce]);

  return { display, trigger };
}
