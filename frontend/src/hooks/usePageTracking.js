import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Sends a GA4 page_view whenever the route changes.
 * Must be used inside a <BrowserRouter>.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);
}

export default usePageTracking;
