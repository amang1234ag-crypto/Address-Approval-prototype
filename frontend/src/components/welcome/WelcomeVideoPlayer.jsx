import React from "react";

/**
 * WelcomeVideoPlayer
 *
 * Modular walkthrough video player. Renders either a YouTube embed (native
 * player + controls, native fullscreen) or a locally hosted MP4 (HTML5
 * <video> with native controls + fullscreen), based on `source.type`.
 *
 * Switching to a local MP4 later is a one-line change at the call site:
 *   <WelcomeVideoPlayer source={{ type: "mp4", url: "/walkthrough.mp4" }} />
 *
 * The player is wrapped in a 16:9 responsive container so it scales with
 * the modal width regardless of source.
 *
 * Props:
 *   source: { type: "youtube", url: string } | { type: "mp4", url: string }
 *   title?: string   // used for iframe title / a11y
 */
const extractYouTubeId = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2];
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2];
    }
  } catch {
    // Not a valid URL - fall through
  }
  return null;
};

export const WelcomeVideoPlayer = ({
  source,
  title = "Product walkthrough",
}) => {
  if (!source || !source.url) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-slate-100"
      style={{ aspectRatio: "16 / 9" }}
      data-testid="welcome-video-player"
    >
      {source.type === "youtube" ? (
        (() => {
          const id = extractYouTubeId(source.url);
          if (!id) return null;
          const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
          return (
            <iframe
              data-testid="welcome-video-iframe"
              src={src}
              title={title}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerated-2d-canvas; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          );
        })()
      ) : source.type === "mp4" ? (
        <video
          data-testid="welcome-video-mp4"
          className="absolute inset-0 h-full w-full bg-black"
          src={source.url}
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
        />
      ) : null}
    </div>
  );
};

export default WelcomeVideoPlayer;
