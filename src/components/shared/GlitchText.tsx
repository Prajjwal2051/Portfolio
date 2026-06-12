import { useEffect, useRef, useState } from "react";

const NOISE = "#@$%&?^~<>[]{}|!アイウエオ";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const [display, setDisplay] = useState(text);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const TOTAL = text.length + 10;
    const RESOLVE_AT = 8;
    let frame = 0;

    function tick() {
      frame++;
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            frame > RESOLVE_AT + i
              ? char
              : NOISE[Math.floor(Math.random() * NOISE.length)],
          )
          .join(""),
      );
      if (frame < TOTAL) {
        timerRef.current = setTimeout(tick, 35);
      } else {
        setDisplay(text);
        timerRef.current = null;
      }
    }

    timerRef.current = setTimeout(tick, 150);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text]);

  return <span className={className}>{display}</span>;
}
