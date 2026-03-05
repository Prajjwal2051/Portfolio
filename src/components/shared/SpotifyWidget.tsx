import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

// Uses Novatorem's open-source Spotify Now Playing API
// Deploy your own at https://github.com/novatorem/novatorem
// or set VITE_SPOTIFY_API_URL in .env to your deployed URL
const SPOTIFY_URL = import.meta.env.VITE_SPOTIFY_API_URL as string | undefined;

interface SpotifyData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    songUrl?: string;
    albumImageUrl?: string;
}

function BarEqualizer() {
    return (
        <div className="flex items-end gap-[2px] h-3">
            {[0.6, 1, 0.75, 0.9, 0.5].map((h, i) => (
                <motion.div
                    key={i}
                    className="w-[3px] bg-accent-pink rounded-full"
                    animate={{ scaleY: [h, 1, 0.4, h] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                    style={{ originY: 1, height: "100%" }}
                />
            ))}
        </div>
    );
}

export function SpotifyWidget() {
    const [data, setData] = useState<SpotifyData | null>(null);

    useEffect(() => {
        if (!SPOTIFY_URL) return;
        const fetchNow = async () => {
            try {
                const res = await fetch(SPOTIFY_URL);
                const json = await res.json();
                setData(json);
            } catch {
                // silently fail
            }
        };
        fetchNow();
        const interval = setInterval(fetchNow, 30000);
        return () => clearInterval(interval);
    }, []);

    // If no API configured, show a static placeholder
    const isPlaying = data?.isPlaying ?? false;
    const title = data?.title ?? "not playing";
    const artist = data?.artist ?? "spotify";

    return (
        <motion.a
            href="https://open.spotify.com/user/prajjwal2051"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
        >
            {isPlaying ? (
                <BarEqualizer />
            ) : (
                <Music2 className="h-3 w-3 text-[#1DB954]" />
            )}
            <div className="flex flex-col leading-tight">
                <span className="font-medium text-foreground truncate max-w-[140px]">
                    {isPlaying ? title : "not playing"}
                </span>
                {isPlaying && artist && (
                    <span className="text-[10px] text-muted-foreground/70 truncate max-w-[140px]">
                        {artist}
                    </span>
                )}
            </div>
        </motion.a>
    );
}
