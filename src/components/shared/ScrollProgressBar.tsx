import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.5 });

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-foreground origin-left z-[9998]"
        />
    );
}
