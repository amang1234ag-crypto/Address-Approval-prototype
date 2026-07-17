import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddressApprovalDashboard from "@/pages/AddressApprovalDashboard";
import { initAnalytics } from "@/lib/analytics";
import usePageTracking from "@/hooks/usePageTracking";

// Rendered inside BrowserRouter so it can read the current route and
// send a GA4 page_view on first load and on every route change.
function AnalyticsPageTracker() {
  usePageTracking();
  return null;
}

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AnalyticsPageTracker />
        <Routes>
          <Route path="/" element={<AddressApprovalDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
