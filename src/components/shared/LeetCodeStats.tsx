import { useEffect, useState, type CSSProperties } from "react";
import { ExternalLink } from "lucide-react";

interface LeetCodeData {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  submissionCalendar: Record<string, number>;
}

function endpointsFor(username: string) {
  return [
    `https://leetcode-api-faisalshohag.vercel.app/${username}`,
    `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
  ];
}

function useLeetCodeStats(username: string) {
  const [data, setData] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (const url of endpointsFor(username)) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const json = await res.json();
          if (!cancelled && typeof json?.totalSolved === "number") {
            setData(json);
            return;
          }
        } catch {
          // try the next fallback endpoint
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return data;
}

const DAY_MS = 86_400_000;
const WEEKS = 26;

// Tailwind can only apply a `/NN` opacity modifier to colors defined via a
// color function like hsl(var(--x)) — `accent.yellow` in the config is a
// bare `var(--accent-yellow)`, so `bg-accent-yellow/30` etc. compile to no
// CSS rule at all. Apply the opacity manually via inline style instead.
function heatStyle(count: number): { className: string; style?: CSSProperties } {
  if (count === 0) return { className: "bg-muted/40" };
  const opacity = count <= 2 ? 0.3 : count <= 5 ? 0.6 : 1;
  return { className: "", style: { backgroundColor: "var(--accent-yellow)", opacity } };
}

function SubmissionHeatmap({ calendar }: { calendar: Record<string, number> }) {
  // LeetCode's submissionCalendar keys are UTC-midnight timestamps, so the
  // buckets below must be computed in UTC too — using local midnight would
  // shift every lookup by the viewer's timezone offset and miss every entry.
  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const todayUTCDay = new Date(todayUTC).getUTCDay();

  const totalDays = WEEKS * 7;
  const endUTC = todayUTC + (6 - todayUTCDay) * DAY_MS;
  const startUTC = endUTC - (totalDays - 1) * DAY_MS;

  const weeks: { date: Date; count: number }[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const week: { date: Date; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const ms = startUTC + (w * 7 + d) * DAY_MS;
      const ts = Math.floor(ms / 1000).toString();
      week.push({ date: new Date(ms), count: calendar[ts] ?? 0 });
    }
    weeks.push(week);
  }

  return (
    <div className="flex gap-[3px] overflow-x-auto">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day, di) => {
            const { className, style } = heatStyle(day.count);
            return (
              <div
                key={di}
                title={`${day.date.toLocaleDateString(undefined, { timeZone: "UTC", weekday: "short", month: "short", day: "numeric", year: "numeric" })}: ${day.count} submission${day.count === 1 ? "" : "s"}`}
                className={`h-[12px] w-[12px] rounded-[2px] ${className}`}
                style={style}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

interface LeetCodeStatsProps {
  username: string;
  profileUrl: string;
}

export function LeetCodeStats({ username, profileUrl }: LeetCodeStatsProps) {
  const data = useLeetCodeStats(username);

  if (!data) return null;

  const breakdown = [
    { label: "easy", solved: data.easySolved, color: "text-accent-blue" },
    { label: "medium", solved: data.mediumSolved, color: "text-accent-yellow" },
    { label: "hard", solved: data.hardSolved, color: "text-accent-pink" },
  ];

  return (
    <div className="space-y-3 w-full">
      <div className="w-full overflow-hidden">
        <SubmissionHeatmap calendar={data.submissionCalendar} />
      </div>

      <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70 flex-wrap">
        <span>
          <span className="text-foreground font-medium">{data.totalSolved}</span>
          /{data.totalQuestions} solved
        </span>
        {breakdown.map(({ label, solved, color }) => (
          <span key={label} className={color}>
            {solved} {label}
          </span>
        ))}
        <span>rank #{data.ranking.toLocaleString()}</span>
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          view profile <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>
    </div>
  );
}
