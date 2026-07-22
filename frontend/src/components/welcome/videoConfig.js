/**
 * Walkthrough video source configuration.
 *
 * Change this single object to swap between the YouTube embed and a
 * locally hosted MP4 (e.g. /walkthrough.mp4) without touching the
 * modal or player UI.
 *
 * Examples:
 *   { type: "youtube", url: "https://youtu.be/EDb37y_MhRw" }
 *   { type: "mp4",     url: "/walkthrough.mp4" }
 */
export const WALKTHROUGH_VIDEO_SOURCE = {
  type: "mp4",
  url: "/assets/videos/dashboard-walkthrough.mp4",
  poster: "/assets/images/dashboard-walkthrough-poster.png",
};
