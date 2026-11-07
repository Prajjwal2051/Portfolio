import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

export interface SpotifyTrack {
  title: string;
  artist: string;
  artworkUrl?: string;
  albumImageUrl?: string;
  trackUrl: string;
  songUrl?: string;
  isPlaying: boolean;
  durationMs?: number;
  progressMs?: number;
}

export interface SpotifyNowPlayingProps {
  apiEndpointUrl?: string;
  refreshIntervalSeconds?: number;
  showProgressBar?: boolean;
  idleText?: string;
  linkToTrack?: boolean;
  defaultMinimized?: boolean;
  className?: string;
}

// User-specified Spotify album: Alfaaz - Single by Hamza Malik
const FALLBACK_TRACK: SpotifyTrack = {
  title: "Alfaaz",
  artist: "Hamza Malik",
  artworkUrl: "/alfaaz.jpg",
  trackUrl:
    "https://open.spotify.com/album/41jcM2Nk286Rghi16VGTax?si=NHhzWUa4STqC_v-JIpz9Tg",
  isPlaying: true,
  durationMs: 214000, // 3m 34s
  progressMs: 74000, // starts partway through for a lively feel
};

function formatTime(ms?: number): string {
  if (!ms || isNaN(ms)) return "0:00";
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

export function SpotifyNowPlaying({
  apiEndpointUrl = (import.meta.env.VITE_SPOTIFY_API_URL as string) || "",
  refreshIntervalSeconds = 15,
  showProgressBar = true,
  linkToTrack = true,
  defaultMinimized = false,
  className = "",
}: SpotifyNowPlayingProps) {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);
  const [viewState, setViewState] = useState<"loading" | "playing" | "idle" | "error">("playing");
  const [track, setTrack] = useState<SpotifyTrack>(FALLBACK_TRACK);
  const [liveProgressMs, setLiveProgressMs] = useState<number>(FALLBACK_TRACK.progressMs ?? 0);

  const hasEndpoint = Boolean(apiEndpointUrl);

  const fetchNowPlaying = useCallback(async (): Promise<SpotifyTrack | null> => {
    if (!hasEndpoint) return null;
    try {
      const response = await fetch(apiEndpointUrl, {
        headers: { Accept: "application/json" },
      });
      if (response.status === 204 || response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch playing status");
      }
      const data = await response.json();
      if (!data) return null;

      const title = data.title ?? data.item?.name;
      if (!title) return null;

      const artist =
        data.artist ??
        data.item?.artists?.map((a: { name: string }) => a.name).join(", ") ??
        "Unknown Artist";

      const artworkUrl =
        data.artworkUrl ??
        data.albumImageUrl ??
        data.item?.album?.images?.[0]?.url ??
        "/alfaaz.jpg";

      const trackUrl =
        data.trackUrl ??
        data.songUrl ??
        data.item?.external_urls?.spotify ??
        FALLBACK_TRACK.trackUrl;

      const isPlaying = Boolean(data.isPlaying ?? data.is_playing ?? true);
      const durationMs =
        typeof data.durationMs === "number"
          ? data.durationMs
          : typeof data.item?.duration_ms === "number"
          ? data.item.duration_ms
          : FALLBACK_TRACK.durationMs;

      const progressMs =
        typeof data.progressMs === "number"
          ? data.progressMs
          : typeof data.progress_ms === "number"
          ? data.progress_ms
          : 0;

      return {
        title,
        artist,
        artworkUrl,
        trackUrl,
        isPlaying,
        durationMs,
        progressMs,
      };
    } catch {
      return null;
    }
  }, [apiEndpointUrl, hasEndpoint]);

  const refreshPlayback = useCallback(async () => {
    if (!hasEndpoint) {
      setTrack(FALLBACK_TRACK);
      setViewState("playing");
      return;
    }

    const nextTrack = await fetchNowPlaying();
    if (nextTrack) {
      setTrack(nextTrack);
      if (typeof nextTrack.progressMs === "number") {
        setLiveProgressMs(nextTrack.progressMs);
      }
      setViewState(nextTrack.isPlaying ? "playing" : "idle");
    } else {
      // Fallback to the user's requested Alfaaz album if no live song
      setTrack(FALLBACK_TRACK);
      setViewState("playing");
    }
  }, [fetchNowPlaying, hasEndpoint]);

  // Initial fetch and interval poll
  useEffect(() => {
    refreshPlayback();
    if (!hasEndpoint) return;

    const intervalMs = Math.max(5, refreshIntervalSeconds) * 1000;
    const timer = window.setInterval(refreshPlayback, intervalMs);
    return () => clearInterval(timer);
  }, [refreshPlayback, refreshIntervalSeconds, hasEndpoint]);

  // Advance progress smoothly every second when playing
  useEffect(() => {
    if (viewState !== "playing" || !track.durationMs) return;

    const interval = window.setInterval(() => {
      setLiveProgressMs((prev) => {
        const next = prev + 1000;
        if (track.durationMs && next >= track.durationMs) {
          return 0; // loop track playback
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [viewState, track.durationMs]);

  const progressRatio = useMemo(() => {
    const cur = liveProgressMs;
    const dur = track.durationMs;
    if (!cur || !dur || dur <= 0) return 0;
    return Math.max(0, Math.min(1, cur / dur));
  }, [liveProgressMs, track.durationMs]);

  const targetUrl = track.trackUrl || FALLBACK_TRACK.trackUrl;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (linkToTrack) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const isPlaying = viewState === "playing" && track.isPlaying;
  const currentArtwork = track.artworkUrl || track.albumImageUrl || "/alfaaz.jpg";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleCardClick}
      role={linkToTrack ? "link" : "status"}
      tabIndex={linkToTrack ? 0 : undefined}
      aria-label={`Open ${track.title} by ${track.artist} on Spotify`}
      className={`relative group font-mono select-none overflow-hidden rounded-2xl border-2 border-[#b0c4a4]/60 dark:border-[#2f4a38]/80 bg-gradient-to-br from-[#fcfbf7]/95 via-[#f8f5ec]/95 to-[#edf4e8]/95 dark:from-[#131f17]/95 dark:via-[#101a13]/95 dark:to-[#0d1510]/95 text-[#1e3024] dark:text-[#e2eee4] shadow-[0_8px_30px_rgba(40,65,35,0.14)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_12px_36px_rgba(40,65,35,0.22)] dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.7)] hover:border-[#8ea882] dark:hover:border-[#426b50] ${
        linkToTrack ? "cursor-pointer" : "default"
      } ${className}`}
    >
      {/* Decorative subtle corner vine glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-emerald-500/15 via-[#c8a540]/10 to-transparent rounded-full blur-xl pointer-events-none" />

      <div
        className={`flex items-center gap-3 transition-all duration-200 ${
          isMinimized ? "p-2.5" : "p-3"
        }`}
      >
        {/* Album Artwork Frame with Ghibli organic border */}
        <div
          className={`relative shrink-0 overflow-hidden rounded-xl border border-[#98b08d]/50 dark:border-[#385640]/70 shadow-sm transition-all duration-200 bg-neutral-900 ${
            isMinimized ? "w-8 h-8" : "w-14 h-14"
          }`}
        >
          <img
            src={currentArtwork}
            alt={`${track.title} album artwork`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // fallback if image fails
              (e.currentTarget as HTMLImageElement).src =
                "https://i.scdn.co/image/ab67616d0000b2736e9e64025043feb3999aa13b";
            }}
          />

          {isPlaying && !isMinimized && (
            <div className="absolute inset-0 bg-emerald-950/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
              <span className="text-[9px] text-[#fbf9f2] font-semibold bg-emerald-800/80 px-1.5 py-0.5 rounded-full shadow-xs">
                open ↗
              </span>
            </div>
          )}
        </div>

        {/* Track Details & Ghibli Equalizer */}
        <div
          className={`min-w-0 flex-1 flex flex-col justify-center ${
            isMinimized ? "pr-6 max-w-[155px]" : "pr-6 max-w-[205px]"
          }`}
        >
          {/* Header Row: Ghibli Sprout + Equalizer */}
          {!isMinimized && (
            <div className="flex items-center justify-between gap-1.5 mb-1">
              <div className="flex items-center gap-1">
                {/* Ghibli leaf sprout icon */}
                <svg
                  className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4-.1-.6-.2-1.3-.2-2 0-4.4 3.6-8 8-8 1.4 0 2.7.4 3.8 1C17.5 6.3 15 2 12 2zm6.9 7.6C18.3 9.2 17.2 9 16 9c-3.3 0-6 2.7-6 6 0 1.2.4 2.3 1 3.2 3.6-.5 6.6-2.9 7.9-6.6z" />
                </svg>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-800/80 dark:text-emerald-300/80 whitespace-nowrap">
                  ghibli radio
                </span>
              </div>

              {/* Animated Forest Equalizer */}
              {isPlaying && (
                <div
                  className="flex items-end gap-[2px] h-2.5 shrink-0"
                  aria-hidden="true"
                >
                  {[0, 1, 2, 3].map((bar) => (
                    <motion.span
                      key={bar}
                      className="w-[2.5px] rounded-full bg-gradient-to-t from-emerald-600 to-[#c8a540] dark:from-emerald-400 dark:to-[#e0be5a]"
                      animate={{
                        height: [3, 10, 5, 11, 3],
                      }}
                      transition={{
                        duration: 0.8 + bar * 0.14,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Song Title */}
          <div
            className={`font-semibold tracking-tight truncate leading-tight text-[#16271c] dark:text-[#f0f6f1] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors ${
              isMinimized ? "text-xs" : "text-sm"
            }`}
          >
            {track.title}
          </div>

          {/* Artist */}
          {!isMinimized && (
            <div className="text-[11px] text-[#4b6752] dark:text-[#97b59f] truncate mt-0.5">
              {track.artist}
            </div>
          )}

          {/* Progress Bar & Timestamps */}
          {!isMinimized && showProgressBar && (
            <div className="mt-1.5 w-full">
              <div
                className="w-full h-1.5 rounded-full bg-[#dbe5d4]/70 dark:bg-[#1f3325] overflow-hidden"
                aria-hidden="true"
              >
                <motion.div
                  style={{ width: `${progressRatio * 100}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-[#72ad69] to-[#c8a540] dark:from-emerald-400 dark:via-[#6fa966] dark:to-[#e0be5a]"
                />
              </div>

              <div className="flex justify-between items-center text-[9px] text-[#58735f] dark:text-[#88a58f] mt-1 font-mono">
                <span>{formatTime(liveProgressMs)}</span>
                <span className="flex items-center gap-1">
                  <span>{formatTime(track.durationMs)}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">♪</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Minimize / Expand Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMinimized((prev) => !prev);
          }}
          aria-label={isMinimized ? "Maximize Ghibli player" : "Minimize Ghibli player"}
          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#e3eedc] dark:bg-[#1e3024] hover:bg-[#d2e3ca] dark:hover:bg-[#2b4433] active:scale-95 text-[#3d5945] dark:text-[#a0c2a8] border border-[#a4bd98]/40 dark:border-[#385440]/60 flex items-center justify-center transition-all z-10"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMinimized ? (
              <path d="M2 7l4-4 4 4" />
            ) : (
              <path d="M2 5l4 4 4-4" />
            )}
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default SpotifyNowPlaying;
