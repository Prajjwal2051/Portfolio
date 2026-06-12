import { useTheme } from "next-themes";

const HUES = ["gold", "coral", "green"] as const;
const COUNT = 16;

function rand(min: number, max: number) {
  return (Math.random() * (max - min) + min).toFixed(1);
}
function randInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export function Fireflies() {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme !== "dark") return null;

  return (
    <div className="fireflies-container" aria-hidden="true">
      {Array.from({ length: COUNT }, (_, i) => (
        <div
          key={i}
          className={`firefly firefly-${HUES[i % 3]}`}
          style={{
            left: `${rand(2, 96)}vw`,
            top: `${rand(5, 92)}vh`,
            "--ff-dur": `${rand(5, 11)}s`,
            "--ff-delay": `${rand(0, 7)}s`,
            "--ff-dx": `${randInt(-38, 38)}px`,
            "--ff-dy": `${randInt(-30, 30)}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
