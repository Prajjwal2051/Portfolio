import { motion } from "framer-motion";
import { getLenis } from "@/lib/lenis";
import { useEyeTarget } from "@/hooks/useEyeTarget";

function Eye() {
  const { ref, x, y } = useEyeTarget();

  return (
    <div
      ref={ref}
      className="relative h-6 w-6 rounded-full bg-foreground/10 border border-foreground/15 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ x, y }}
        className="h-2 w-2 rounded-full bg-foreground"
      />
    </div>
  );
}

export function EyeFollowButton() {
  const handleClick = () => {
    getLenis()?.scrollTo(0, { duration: 1 });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className="hidden lg:flex fixed top-5 left-5 z-50 items-center gap-1.5"
    >
      <Eye />
      <Eye />
    </motion.button>
  );
}
