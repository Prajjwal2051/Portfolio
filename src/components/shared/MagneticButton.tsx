import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export function MagneticButton({
    children,
    className = "",
    strength = 0.35,
    onClick,
    type = "button",
    disabled,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setPos({
            x: (e.clientX - cx) * strength,
            y: (e.clientY - cy) * strength,
        });
    };

    const handleMouseLeave = () => setPos({ x: 0, y: 0 });

    return (
        <motion.button
            ref={ref}
            type={type}
            disabled={disabled}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.button>
    );
}
