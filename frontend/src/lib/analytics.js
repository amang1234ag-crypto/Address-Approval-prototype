/**
 * Centralized Google Analytics 4 helper.
 *
 * Uses the react-ga4 library so the GA4 tag is loaded and configured from
 * JavaScript instead of being pasted directly into public/index.html.
 * This keeps the Measurement ID in one place, keeps analytics out of the
 * static HTML shell, and makes it easy to no-op analytics in local/dev
 * environments where the env var is not set.
 *
 * The Measurement ID is read from the REACT_APP_GA_MEASUREMENT_ID env var
 * (see frontend/.env), which is the standard way Create React App exposes
 * build time configuration to client code.
 */
import ReactGA from "react-ga4";

const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

let isInitialized = false;

/**
 * Initializes GA4. Safe to call multiple times, only initializes once.
 * No-ops silently if no Measurement ID is configured, so local dev
 * without a .env file does not throw or send test traffic.
 */
export function initAnalytics() {
  if (isInitialized || !MEASUREMENT_ID) return;
  ReactGA.initialize(MEASUREMENT_ID);
  isInitialized = true;
}

/**
 * Tracks a page view. Call on initial load and on every route change.
 * @param {string} path - path (and optional search) being viewed
 * @param {string} [title] - optional page title
 */
export function trackPageView(path, title) {
  if (!isInitialized) return;
  ReactGA.send({ hitType: "pageview", page: path, title });
}

/**
 * Tracks a custom interaction event.
 * @param {string} name - event name, snake_case, GA4 style
 * @param {Record<string, any>} [params] - event parameters
 */
export function trackEvent(name, params = {}) {
  if (!isInitialized) return;
  ReactGA.event(name, params);
}
