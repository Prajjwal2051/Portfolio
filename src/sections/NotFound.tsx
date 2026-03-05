import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ConfusedCat() {
    return (
        <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Tail */}
            <motion.path
                d="M18 78 Q6 72 8 62 Q10 52 20 58"
                stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ originX: "18px", originY: "78px" }}
            />
            {/* Body */}
            <ellipse cx="40" cy="68" rx="22" ry="17" className="fill-foreground" />
            {/* Head */}
            <circle cx="40" cy="36" r="22" className="fill-foreground" />
            {/* Left ear */}
            <polygon points="20,20 14,4 28,16" className="fill-foreground" />
            <polygon points="20.5,19 15.5,6 26.5,16" fill="currentColor" className="text-accent-pink" />
            {/* Right ear */}
            <polygon points="60,20 66,4 52,16" className="fill-foreground" />
            <polygon points="59.5,19 64.5,6 53.5,16" fill="currentColor" className="text-accent-pink" />
            {/* Eyes — one squinting confused */}
            <circle cx="32" cy="33" r="5.5" fill="hsl(var(--background))" />
            <circle cx="48" cy="33" r="5.5" fill="hsl(var(--background))" />
            {/* Confused x eye */}
            <line x1="29.5" y1="30.5" x2="34.5" y2="35.5" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
            <line x1="34.5" y1="30.5" x2="29.5" y2="35.5" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
            {/* Normal eye */}
            <circle cx="48" cy="33" r="3" fill="hsl(var(--foreground))" />
            <circle cx="49" cy="32" r="1" fill="white" />
            {/* Question mark above head */}
            <motion.text
                x="55" y="14" fontSize="16" fontWeight="bold" fill="currentColor" className="text-accent-yellow"
                animate={{ y: [14, 10, 14], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >?</motion.text>
            {/* Nose */}
            <ellipse cx="40" cy="40" rx="2.5" ry="1.5" fill="currentColor" className="text-accent-pink" />
            {/* Mouth — wavy confused */}
            <path d="M36 43 Q38 41 40 43 Q42 45 44 43" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
            {/* Whiskers */}
            <line x1="16" y1="39" x2="32" y2="40" stroke="hsl(var(--background))" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="16" y1="42" x2="32" y2="42" stroke="hsl(var(--background))" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="64" y1="39" x2="48" y2="40" stroke="hsl(var(--background))" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="64" y1="42" x2="48" y2="42" stroke="hsl(var(--background))" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            {/* Paws */}
            <ellipse cx="28" cy="82" rx="7" ry="4.5" className="fill-foreground" />
            <ellipse cx="52" cy="82" rx="7" ry="4.5" className="fill-foreground" />
        </svg>
    );
}

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6"
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ConfusedCat />
                </motion.div>

                <div className="space-y-1">
                    <h1 className="text-7xl font-bold tracking-tighter">404</h1>
                    <p className="text-muted-foreground text-sm">
                        the cat couldn't find this page either
                    </p>
                </div>

                <motion.button
                    onClick={() => navigate("/")}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                    ← go back home
                </motion.button>
            </motion.div>
        </div>
    );
}
