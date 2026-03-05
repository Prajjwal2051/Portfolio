import { useEffect, useState } from "react";

interface TypewriterTextProps {
    words: string[];
    className?: string;
    speed?: number;
    deleteSpeed?: number;
    pauseTime?: number;
}

export function TypewriterText({
    words,
    className = "",
    speed = 80,
    deleteSpeed = 45,
    pauseTime = 1800,
}: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused || words.length === 0) return;

        const current = words[wordIndex % words.length] ?? "";

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayed(current.slice(0, displayed.length + 1));
                if (displayed.length + 1 === current.length) {
                    setIsPaused(true);
                    setTimeout(() => {
                        setIsPaused(false);
                        setIsDeleting(true);
                    }, pauseTime);
                }
            } else {
                setDisplayed(current.slice(0, displayed.length - 1));
                if (displayed.length === 0) {
                    setIsDeleting(false);
                    setWordIndex((i) => (i + 1) % words.length);
                }
            }
        }, isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, isPaused, wordIndex, words, speed, deleteSpeed, pauseTime]);

    return (
        <span className={className}>
            {displayed}
            <span className="animate-pulse ml-0.5 opacity-70">|</span>
        </span>
    );
}
