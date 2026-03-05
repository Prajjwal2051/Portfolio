import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CatCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.8 });
    const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.8 });

    const prevX = useRef(0);
    const [facing, setFacing] = useState<"left" | "right">("right");
    const [blinking, setBlinking] = useState(false);
    const [tailWag, setTailWag] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            const x = e.clientX - 24;
            const y = e.clientY - 48;
            mouseX.set(x);
            mouseY.set(y);
            if (e.clientX < prevX.current) setFacing("left");
            else if (e.clientX > prevX.current) setFacing("right");
            prevX.current = e.clientX;
            setTailWag(true);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [mouseX, mouseY]);

    // Tail stops wagging after idle
    useEffect(() => {
        if (!tailWag) return;
        const t = setTimeout(() => setTailWag(false), 800);
        return () => clearTimeout(t);
    }, [tailWag]);

    // Random blink
    useEffect(() => {
        const blink = () => {
            setBlinking(true);
            setTimeout(() => setBlinking(false), 150);
            setTimeout(blink, 2500 + Math.random() * 3000);
        };
        const t = setTimeout(blink, 1500);
        return () => clearTimeout(t);
    }, []);

    const flip = facing === "left";

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
        >
            <motion.div
                animate={{ scaleX: flip ? -1 : 1 }}
                transition={{ duration: 0.15 }}
                style={{ originX: 0.5 }}
            >
                <svg
                    width="48"
                    height="56"
                    viewBox="0 0 48 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-md"
                >
                    {/* Tail */}
                    <motion.path
                        d="M10 48 Q2 44 4 38 Q6 32 12 36"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        className="text-foreground"
                        animate={tailWag ? {
                            d: [
                                "M10 48 Q2 44 4 38 Q6 32 12 36",
                                "M10 48 Q0 46 2 40 Q4 34 12 36",
                                "M10 48 Q2 44 4 38 Q6 32 12 36",
                                "M10 48 Q4 42 6 36 Q8 30 12 36",
                                "M10 48 Q2 44 4 38 Q6 32 12 36",
                            ]
                        } : {}}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />

                    {/* Body */}
                    <ellipse cx="24" cy="42" rx="14" ry="11" className="fill-foreground" />

                    {/* Head */}
                    <circle cx="24" cy="22" r="14" className="fill-foreground" />

                    {/* Left ear */}
                    <polygon points="12,12 8,2 18,10" className="fill-foreground" />
                    {/* Left ear inner */}
                    <polygon points="12.5,11 9.5,4 16.5,10" fill="currentColor" className="text-accent-pink" />

                    {/* Right ear */}
                    <polygon points="36,12 40,2 30,10" className="fill-foreground" />
                    {/* Right ear inner */}
                    <polygon points="35.5,11 38.5,4 31.5,10" fill="currentColor" className="text-accent-pink" />

                    {/* Eyes */}
                    {blinking ? (
                        <>
                            <line x1="18" y1="21" x2="22" y2="21" stroke="hsl(var(--background))" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="26" y1="21" x2="30" y2="21" stroke="hsl(var(--background))" strokeWidth="2.5" strokeLinecap="round" />
                        </>
                    ) : (
                        <>
                            <circle cx="20" cy="21" r="3.5" fill="hsl(var(--background))" />
                            <circle cx="28" cy="21" r="3.5" fill="hsl(var(--background))" />
                            <circle cx="21" cy="21" r="1.8" fill="hsl(var(--foreground))" />
                            <circle cx="29" cy="21" r="1.8" fill="hsl(var(--foreground))" />
                            {/* Eye shine */}
                            <circle cx="22" cy="20" r="0.7" fill="white" />
                            <circle cx="30" cy="20" r="0.7" fill="white" />
                        </>
                    )}

                    {/* Nose */}
                    <ellipse cx="24" cy="26" rx="1.5" ry="1" fill="currentColor" className="text-accent-pink" />

                    {/* Mouth */}
                    <path d="M22 27.5 Q24 29.5 26 27.5" stroke="hsl(var(--background))" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />

                    {/* Whiskers left */}
                    <line x1="10" y1="25" x2="20" y2="26" stroke="hsl(var(--background))" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                    <line x1="10" y1="27.5" x2="20" y2="27.5" stroke="hsl(var(--background))" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

                    {/* Whiskers right */}
                    <line x1="38" y1="25" x2="28" y2="26" stroke="hsl(var(--background))" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                    <line x1="38" y1="27.5" x2="28" y2="27.5" stroke="hsl(var(--background))" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

                    {/* Front paws */}
                    <ellipse cx="17" cy="51" rx="4.5" ry="3" className="fill-foreground" />
                    <ellipse cx="31" cy="51" rx="4.5" ry="3" className="fill-foreground" />
                </svg>
            </motion.div>
        </motion.div>
    );
}
