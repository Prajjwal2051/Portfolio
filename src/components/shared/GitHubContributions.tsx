import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useThemeToggle } from "@/hooks/useTheme";
import { Star, GitFork, ExternalLink } from "lucide-react";

interface LastCommit {
    sha: string;
    repo: string;
    message: string;
}

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
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

function useTopRepos(username: string, count = 6) {
    const [repos, setRepos] = useState<Repo[]>([]);

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`)
            .then((r) => r.json())
            .then((data: Repo[]) => {
                if (!Array.isArray(data)) return;
                const sorted = data
                    .filter((r) => !r.name.toLowerCase().includes(username.toLowerCase()) || data.length <= count)
                    .sort((a, b) => b.stargazers_count - a.stargazers_count);
                setRepos(sorted.slice(0, count));
            })
            .catch(() => null);
    }, [username, count]);

    return repos;
}

interface GitHubContributionsProps {
    username: string;
}

export function GitHubContributions({ username }: GitHubContributionsProps) {
    const { isDark } = useThemeToggle();
    const lastCommit = useLastCommit(username);
    const topRepos = useTopRepos(username);

    return (
        <div className="space-y-3 w-full">
            {/* Contributions calendar */}
            <div className="w-full overflow-hidden">
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
                        → {lastCommit.sha}
                    </span>
                    <span className="truncate" title={lastCommit.message}>
                        {lastCommit.repo} — {lastCommit.message}
                    </span>
                </div>
            )}

            {/* Top repos */}
            {topRepos.length > 0 && (
                <div className="pt-2">
                    <p className="text-[11px] text-muted-foreground/60 uppercase tracking-widest mb-2">top repos</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {topRepos.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="group border border-border/30 rounded-md px-3 py-2 hover:border-border/70 transition-colors"
                            >
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <span className="text-xs font-medium text-foreground group-hover:text-accent-pink transition-colors truncate">
                                        {repo.name} <span className="text-muted-foreground">-&gt;</span>
                                    </span>
                                    <ExternalLink className="h-2.5 w-2.5 text-muted-foreground/40 shrink-0" />
                                </div>
                                {repo.description && (
                                    <p className="text-[11px] text-muted-foreground/70 line-clamp-1 mb-1">
                                        {repo.description}
                                    </p>
                                )}
                                <div className="flex items-center gap-3 text-[10px] text-muted-foreground/50">
                                    {repo.language && <span>{repo.language}</span>}
                                    <span className="flex items-center gap-0.5">
                                        <Star className="h-2.5 w-2.5" />
                                        {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-0.5">
                                        <GitFork className="h-2.5 w-2.5" />
                                        {repo.forks_count}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

