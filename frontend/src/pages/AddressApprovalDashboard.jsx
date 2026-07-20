import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  BarChart3,
  X as XIcon,
  ClipboardCheck,
  FileText,
  Rocket,
  Info,
} from "lucide-react";
import { requests, summaryMetrics } from "../data/mockData";
import MetricCard from "../components/dashboard/MetricCard";
import RequestsTable from "../components/dashboard/RequestsTable";
import FactCheckPopover from "../components/dashboard/FactCheckPopover";
import DownstreamImpactPopover from "../components/dashboard/DownstreamImpactPopover";
import TrackRecordPopover from "../components/dashboard/TrackRecordPopover";
import AddressDetailsPanel from "../components/dashboard/AddressDetailsPanel";
import { trackEvent } from "@/lib/analytics";
import WelcomeModal from "../components/welcome/WelcomeModal";
import useWelcomeModal from "@/hooks/useWelcomeModal";

export default function AddressApprovalDashboard() {
  const welcome = useWelcomeModal();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [factOpen, setFactOpen] = useState(false);
  const [downstreamOpen, setDownstreamOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);

  const factRef = useRef(null);
  const downstreamRef = useRef(null);
  const trackRef = useRef(null);

  const [factRect, setFactRect] = useState(null);
  const [downstreamRect, setDownstreamRect] = useState(null);
  const [trackRect, setTrackRect] = useState(null);

  const closeAllPopovers = (source = "outside_click") => {
    if (factOpen) trackEvent("popup_close", { popup_name: "fact_check", source });
    if (downstreamOpen)
      trackEvent("popup_close", { popup_name: "downstream_impact", source });
    if (trackOpen) trackEvent("popup_close", { popup_name: "track_record", source });
    setFactOpen(false);
    setDownstreamOpen(false);
    setTrackOpen(false);
  };

  const openFact = () => {
    closeAllPopovers("switch_popup");
    if (factRef.current) setFactRect(factRef.current.getBoundingClientRect());
    setFactOpen(true);
    trackEvent("card_click", { card_name: "fact_check" });
    trackEvent("popup_open", { popup_name: "fact_check" });
  };
  const openDownstream = () => {
    closeAllPopovers("switch_popup");
    if (downstreamRef.current)
      setDownstreamRect(downstreamRef.current.getBoundingClientRect());
    setDownstreamOpen(true);
    trackEvent("card_click", { card_name: "downstream_impact" });
    trackEvent("popup_open", { popup_name: "downstream_impact" });
  };
  const openTrack = () => {
    closeAllPopovers("switch_popup");
    if (trackRef.current) setTrackRect(trackRef.current.getBoundingClientRect());
    setTrackOpen(true);
    trackEvent("card_click", { card_name: "track_record" });
    trackEvent("popup_open", { popup_name: "track_record" });
  };

  const handleView = (r) => {
    trackEvent("view_button_click", { request_id: r?.id });
    setSelectedRequest(r);
    setDetailsOpen(true);
    trackEvent("side_panel_open", { panel_name: "address_details", request_id: r?.id });
  };

  const handleCloseDetails = () => {
    trackEvent("side_panel_close", {
      panel_name: "address_details",
      request_id: selectedRequest?.id,
    });
    setDetailsOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-white text-slate-900"
      style={{ fontFamily: '"Lato", ui-sans-serif, system-ui, sans-serif' }}
      data-testid="dashboard-root"
      onClick={(e) => {
        // Close popovers when clicking outside their anchor cards
        const targetIsCard = e.target.closest?.("[data-metric-card]");
        if (!targetIsCard) closeAllPopovers();
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10 pt-8 pb-14">
        {/* Header */}
        <header className="flex items-start justify-between">
          <div>
            <h1
              className="text-[38px] leading-tight font-extrabold tracking-tight text-[#0f2a4a]"
              data-testid="page-title"
            >
              Address Approval Dashboard
            </h1>
            <div className="mt-1 flex items-center gap-1.5 text-[14px] text-slate-500">
              Review and validate address change requests
              <Info size={14} className="text-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-slate-500 mt-2">
            <span>Last updated: Today, 9:15 AM</span>
            <button
              className="p-1 rounded-md hover:bg-slate-200/60 text-slate-500 transition"
              aria-label="Refresh"
              data-testid="refresh-btn"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </header>

        {/* Caught-up banner */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-2.5 flex items-center gap-2"
          data-testid="caught-up-banner"
        >
          <Rocket size={16} className="text-emerald-600" />
          <span className="text-[14px] text-slate-800">
            <strong className="font-semibold text-emerald-800">
              You're all caught up.
            </strong>{" "}
            Every request today reached a confident decision. Come back only if
            something unusual happens.
          </span>
        </motion.div>

        {/* Metric groups */}
        <div className="mt-6 grid grid-cols-[1.05fr_1.2fr_0.75fr] gap-0 divide-x divide-slate-200 items-stretch">
          {/* Throughput */}
          <div className="pr-5 flex flex-col">
            <div className="text-[11px] tracking-[0.14em] font-semibold text-slate-500 mb-2">
              THROUGHPUT:
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              <MetricCard
                icon={BarChart3}
                iconColor="text-sky-500"
                label="Requests Handled Today"
                value={summaryMetrics.requestsHandled}
                testId="metric-requests-handled"
                className="h-full"
              />
              <MetricCard
                icon={XIcon}
                iconColor="text-rose-500"
                label="Reject Rate"
                value={summaryMetrics.rejectRate}
                testId="metric-reject-rate"
                className="h-full"
              />
            </div>
          </div>

          {/* Accuracy */}
          <div className="px-5 flex flex-col">
            <div className="text-[11px] tracking-[0.14em] font-semibold text-slate-500 mb-2">
              ACCURACY:
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div ref={factRef} data-metric-card className="relative z-[35]">
                <MetricCard
                  icon={ClipboardCheck}
                  iconColor="text-amber-500"
                  label="Fact Check"
                  value={summaryMetrics.factCheckAccuracy}
                  variant="clickable"
                  active={factOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    openFact();
                  }}
                  testId="metric-fact-check"
                  className="h-full"
                />
              </div>
              <div ref={downstreamRef} data-metric-card className="relative z-[35]">
                <MetricCard
                  icon={FileText}
                  iconColor="text-emerald-500"
                  label="Downstream Impact"
                  value={summaryMetrics.downstreamImpact}
                  variant="clickable"
                  active={downstreamOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    openDownstream();
                  }}
                  testId="metric-downstream-impact"
                  className="h-full"
                />
              </div>
            </div>
          </div>

          {/* Track Record */}
          <div className="pl-5 flex flex-col">
            <div className="text-[11px] tracking-[0.14em] font-semibold text-slate-500 mb-2">
              TRACK RECORD
            </div>
            <div ref={trackRef} data-metric-card className="relative z-[35] flex-1">
              <MetricCard
                icon={ClipboardCheck}
                iconColor="text-amber-500"
                label={summaryMetrics.trackRecordSummary}
                variant="clickable"
                active={trackOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  openTrack();
                }}
                testId="metric-track-record"
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <RequestsTable rows={requests} onView={handleView} />
        </div>
      </div>

      {/* Popovers */}
      <FactCheckPopover
        open={factOpen}
        onClose={() => {
          trackEvent("popup_close", { popup_name: "fact_check", source: "close_button" });
          setFactOpen(false);
        }}
        anchorRect={factRect}
      />
      <DownstreamImpactPopover
        open={downstreamOpen}
        onClose={() => {
          trackEvent("popup_close", {
            popup_name: "downstream_impact",
            source: "close_button",
          });
          setDownstreamOpen(false);
        }}
        anchorRect={downstreamRect}
      />
      <TrackRecordPopover
        open={trackOpen}
        onClose={() => {
          trackEvent("popup_close", { popup_name: "track_record", source: "close_button" });
          setTrackOpen(false);
        }}
        anchorRect={trackRect}
      />

      {/* Side panel */}
      <AddressDetailsPanel
        open={detailsOpen}
        onClose={handleCloseDetails}
        request={selectedRequest}
      />

      {/* First-time Welcome Modal (also re-openable via any future CTA
          calling welcome.openModal()) */}
      <WelcomeModal open={welcome.open} onOpenChange={welcome.setOpen} />
    </div>
  );
}
