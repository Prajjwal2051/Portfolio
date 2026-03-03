import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useThemeToggle } from "@/hooks/useTheme";

interface LastCommit {
    sha: string;
    repo: string;
    message: string;
}

function useLastCommit(username: string) {
    const [commit, setCommit] = useState<LastCommit | null>(null);

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}/events?per_page=30`)
            .then((r) => r.json())
            .then((events: any[]) => {
                const push = events.find((e) => e.type === "PushEvent");
                if (push) {
                    const latestCommit = push.payload.commits?.at(-1);
                    setCommit({
                        sha: push.payload.head?.slice(0, 7) ?? latestCommit?.sha?.slice(0, 7) ?? "unknown",
                        repo: push.repo?.name?.split("/")[1] ?? "",
                        message: latestCommit?.message?.split("\n")[0] ?? "",
                    });
                }
            })
            .catch(() => null);
    }, [username]);

    return commit;
}

interface GitHubContributionsProps {
    username: string;
}

export function GitHubContributions({ username }: GitHubContributionsProps) {
    const { isDark } = useThemeToggle();
    const lastCommit = useLastCommit(username);
    return (
        <div className="space-y-3 w-full">
            {/* Contributions calendar */}
            <div className="w-full overflow-x-auto">
                <GitHubCalendar
                    username={username}
                    colorScheme={isDark ? "dark" : "light"}
                    fontSize={11}
                    blockSize={12}
                    blockMargin={3}
                    blockRadius={2}
                    showColorLegend={false}
                    showMonthLabels={true}
                    showTotalCount={true}
                    showWeekdayLabels={true}
                    theme={{
                        light: ["#ede9e2", "#d4a843", "#c9963a", "#b8832e", "#a06e22"],
                        dark: ["#2c2f33", "#4a3728", "#6b4f35", "#8c6642", "#d4a843"],
                    }}
                    style={{ width: "100%" }}
                    labels={{
                        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        totalCount: "{{count}} contributions in {{year}}",
                        legend: { less: "Less", more: "More" },
                    }}
                />
            </div>

            {/* Last commit badge */}
            {lastCommit && (
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                    <span className="font-mono bg-muted/60 px-2 py-0.5 rounded text-[10px] tracking-wider">
                        → {lastCommit.sha}
                    </span>
                    <span className="truncate" title={lastCommit.message}>
                        {lastCommit.repo} — {lastCommit.message}
                    </span>
                </div>
            )}
        </div>
    );
}
