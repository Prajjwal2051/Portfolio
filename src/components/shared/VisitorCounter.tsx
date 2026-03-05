import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

function getOrInitCount(): number {
    // Each new browser session = new visit
    const SESSION_KEY = "pf_visited_session";
    const COUNT_KEY = "pf_visitor_count";

    const alreadyVisited = sessionStorage.getItem(SESSION_KEY);
    const raw = localStorage.getItem(COUNT_KEY);
    // Seed with a realistic base so it doesn't start at 0 for first user
    const base = 843;
    let count = raw ? parseInt(raw, 10) : base;

    if (!alreadyVisited) {
        count += 1;
        sessionStorage.setItem(SESSION_KEY, "1");
        localStorage.setItem(COUNT_KEY, String(count));
    }
    return count;
}

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        setCount(getOrInitCount());
    }, []);

    if (count === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground/60"
        >
            <Eye className="h-3 w-3" />
            <span>
                <motion.span
                    key={count}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-bold text-muted-foreground"
                >
                    {count.toLocaleString()}
                </motion.span>
                {" "}visitors
            </span>
        </motion.div>
    );
}
