import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ToastProps {
    message: string;
    visible: boolean;
    onHide: () => void;
}

export function Toast({ message, visible, onHide }: ToastProps) {
    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(onHide, 2200);
        return () => clearTimeout(t);
    }, [visible, onHide]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-xs font-medium shadow-xl pointer-events-none"
                >
                    <Check className="h-3.5 w-3.5 text-accent-pink" strokeWidth={3} />
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
