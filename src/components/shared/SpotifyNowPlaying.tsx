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
  backgroundColor?: string;
  textColor?: string;
  secondaryTextColor?: string;
  accentColor?: string;
  cornerRadius?: number;
  padding?: number;
  artworkSize?: number;
  linkToTrack?: boolean;
  defaultMinimized?: boolean;
  className?: string;
}

const DEFAULT_SPOTIFY_URL =
  "https://open.spotify.com/?flow_ctx=4e73bc39-5590-48b4-8a7e-3eb9ab41cb0e%3A1773266976";

export function SpotifyNowPlaying({
  apiEndpointUrl = (import.meta.env.VITE_SPOTIFY_API_URL as string) || "",
  refreshIntervalSeconds = 15,
  showProgressBar = true,
  idleText = "Not playing",
  backgroundColor = "#121212",
  textColor = "#F5F5F5",
  secondaryTextColor = "#A3A3A3",
  accentColor = "#1DB954",
  cornerRadius = 16,
  padding = 12,
  artworkSize = 52,
  linkToTrack = true,
  defaultMinimized = false,
  className = "",
}: SpotifyNowPlayingProps) {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);
  const [viewState, setViewState] = useState<"loading" | "playing" | "idle" | "error">("loading");
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [liveProgressMs, setLiveProgressMs] = useState<number | undefined>(undefined);

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
        "";

      const trackUrl =
        data.trackUrl ??
        data.songUrl ??
        data.item?.external_urls?.spotify ??
        DEFAULT_SPOTIFY_URL;

      const isPlaying = Boolean(data.isPlaying ?? data.is_playing);
      const durationMs =
        typeof data.durationMs === "number"
          ? data.durationMs
          : typeof data.item?.duration_ms === "number"
          ? data.item.duration_ms
          : undefined;

      const progressMs =
        typeof data.progressMs === "number"
          ? data.progressMs
          : typeof data.progress_ms === "number"
          ? data.progress_ms
          : undefined;

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
      throw new Error("Unable to connect to Spotify.");
    }
  }, [apiEndpointUrl, hasEndpoint]);

  const refreshPlayback = useCallback(async () => {
    if (!hasEndpoint) {
      setViewState("idle");
      setTrack(null);
      setErrorMessage("");
      return;
    }

    try {
      const nextTrack = await fetchNowPlaying();
      if (nextTrack) {
        setTrack(nextTrack);
        setLiveProgressMs(nextTrack.progressMs);
        setViewState(nextTrack.isPlaying ? "playing" : "idle");
        setErrorMessage("");
      } else {
        setViewState("idle");
        setTrack(null);
        setLiveProgressMs(undefined);
        setErrorMessage("");
      }
    } catch (err: unknown) {
      setViewState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Unable to load data."
      );
    }
  }, [fetchNowPlaying, hasEndpoint]);

  // Initial fetch and interval poll
  useEffect(() => {
    let timer: number | null = null;
    refreshPlayback();

    const intervalMs = Math.max(5, refreshIntervalSeconds) * 1000;
    timer = window.setInterval(refreshPlayback, intervalMs);

    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [refreshPlayback, refreshIntervalSeconds]);

  // Interpolate progress smoothly every second when playing
  useEffect(() => {
    if (viewState !== "playing" || !track?.durationMs) return;

    const interval = window.setInterval(() => {
      setLiveProgressMs((prev) => {
        if (typeof prev !== "number" || !track.durationMs) return prev;
        const next = prev + 1000;
        return next > track.durationMs ? track.durationMs : next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [viewState, track?.durationMs]);

  const progressRatio = useMemo(() => {
    const cur = liveProgressMs ?? track?.progressMs;
    const dur = track?.durationMs;
    if (!cur || !dur || dur <= 0) return 0;
    return Math.max(0, Math.min(1, cur / dur));
  }, [liveProgressMs, track?.progressMs, track?.durationMs]);

  const showTrackLink = linkToTrack && Boolean(track?.trackUrl || DEFAULT_SPOTIFY_URL);
  const targetUrl = track?.trackUrl || DEFAULT_SPOTIFY_URL;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (showTrackLink) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const isPlaying = viewState === "playing" && Boolean(track?.isPlaying);
  const currentArtwork = track?.artworkUrl || track?.albumImageUrl;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleCardClick}
      role={showTrackLink ? "link" : "status"}
      tabIndex={showTrackLink ? 0 : undefined}
      aria-label={
        showTrackLink && track
          ? `Open ${track.title} on Spotify`
          : "Spotify Now Playing"
      }
      style={{
        backgroundColor,
        borderRadius: cornerRadius,
        color: textColor,
      }}
      className={`relative group font-mono select-none overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] ${
        showTrackLink ? "cursor-pointer" : "default"
      } ${className}`}
    >
      <div
        style={{
          padding: isMinimized ? Math.max(6, padding * 0.6) : padding,
        }}
        className="flex items-center gap-3 transition-all duration-200"
      >
        {/* Album Artwork or Spotify Icon */}
        <div
          style={{
            width: isMinimized ? 32 : artworkSize,
            height: isMinimized ? 32 : artworkSize,
            borderRadius: Math.max(6, cornerRadius * 0.35),
          }}
          className="relative shrink-0 overflow-hidden bg-neutral-900 border border-white/10 flex items-center justify-center transition-all duration-200"
        >
          {currentArtwork ? (
            <img
              src={currentArtwork}
              alt={track?.title ? `${track.title} artwork` : "Album artwork"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-black">
              <svg
                className={isMinimized ? "h-4 w-4" : "h-6 w-6"}
                style={{ color: accentColor }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.31c-.218.358-.684.471-1.042.253-2.857-1.745-6.453-2.14-10.688-1.172-.41.094-.82-.16-.913-.57-.094-.41.16-.82.57-.914 4.634-1.059 8.608-.616 11.82 1.36.358.219.47.684.253 1.043zm1.468-3.265c-.275.447-.862.592-1.309.317-3.27-2.01-8.254-2.592-12.122-1.417-.502.152-1.033-.134-1.186-.636-.152-.502.134-1.033.636-1.186 4.417-1.341 9.91-.692 13.664 1.613.447.275.592.862.317 1.309zm.126-3.41c-3.921-2.328-10.382-2.542-14.12-1.406-.601.182-1.242-.162-1.424-.763-.182-.601.162-1.242.763-1.424 4.298-1.305 11.434-1.054 15.945 1.623.54.321.716 1.02.395 1.56-.32.54-1.02.716-1.56.395z" />
              </svg>
            </div>
          )}

          {isPlaying && !isMinimized && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-white font-medium bg-black/60 px-1.5 py-0.5 rounded">
                open ↗
              </span>
            </div>
          )}
        </div>

        {/* Info Column */}
        <div
          className={`min-w-0 flex-1 flex flex-col justify-center ${
            isMinimized ? "pr-6 max-w-[150px]" : "pr-6 max-w-[190px]"
          }`}
        >
          {/* Header Row: Label + Equalizer */}
          {!isMinimized && (
            <div className="flex items-center gap-2 mb-0.5">
              <span
                style={{ color: secondaryTextColor }}
                className="text-[9px] uppercase tracking-wider font-semibold whitespace-nowrap"
              >
                {viewState === "playing"
                  ? "Now playing"
                  : viewState === "loading"
                  ? "Connecting"
                  : "Spotify"}
              </span>

              {/* Animated Equalizer Bars */}
              {isPlaying && (
                <div
                  className="flex items-end gap-[2px] h-2.5"
                  aria-hidden="true"
                >
                  {[0, 1, 2].map((bar) => (
                    <motion.span
                      key={bar}
                      style={{
                        width: 2.5,
                        backgroundColor: accentColor,
                        borderRadius: 1,
                      }}
                      animate={{
                        height: [3, 10, 5, 9, 3],
                      }}
                      transition={{
                        duration: 0.85 + bar * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <div
            className={`font-semibold text-neutral-100 truncate leading-snug group-hover:text-white ${
              isMinimized ? "text-xs" : "text-sm"
            }`}
          >
            {viewState === "error"
              ? "Spotify unavailable"
              : track?.title || idleText}
          </div>

          {/* Artist (when expanded) */}
          {!isMinimized && (
            <div
              style={{ color: secondaryTextColor }}
              className="text-[11px] truncate leading-tight mt-0.5"
            >
              {viewState === "error"
                ? errorMessage
                : track?.artist || "open on spotify"}
            </div>
          )}

          {/* Progress Bar */}
          {!isMinimized && showProgressBar && (track?.durationMs || isPlaying) && (
            <div
              className="w-full h-1 rounded-full bg-white/10 overflow-hidden mt-1.5"
              aria-hidden="true"
            >
              <motion.div
                style={{
                  width: `${progressRatio * 100}%`,
                  backgroundColor: accentColor,
                }}
                className="h-full rounded-full"
                animate={isPlaying ? { opacity: [0.85, 1, 0.85] } : { opacity: 0.7 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
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
          aria-label={isMinimized ? "Maximize player" : "Minimize player"}
          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-neutral-300 hover:text-white flex items-center justify-center transition-all z-10"
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
