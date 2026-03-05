import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setVisible(false), 300);
                    return 100;
                }
                return p + Math.random() * 18 + 8;
            });
        }, 80);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Animated initials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-7xl font-bold tracking-tighter select-none mb-8"
                    >
                        {["P", ".", "S"].map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12, duration: 0.4 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-32 h-[2px] bg-border rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-foreground rounded-full"
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ ease: "easeOut", duration: 0.15 }}
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 text-xs text-muted-foreground"
                    >
                        loading...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
