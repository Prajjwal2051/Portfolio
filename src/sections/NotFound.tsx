import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { InteractiveGhost } from "@/components/shared/InteractiveGhost";

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
          <InteractiveGhost />
        </motion.div>

        <div className="space-y-1">
          <h1 className="text-7xl font-bold tracking-tighter">404</h1>
          <p className="text-muted-foreground text-sm">
            this page has vanished into thin air
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
