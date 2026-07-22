import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, CheckCircle2, XCircle, ThumbsUp, ThumbsDown, Flag } from "lucide-react";
import { ConfidenceDots } from "./ConfidenceDots";
import { buildCheckSequence } from "../../data/mockData";
import FlagVerdictModal from "./FlagVerdictModal";
import DisagreeCheckModal from "./DisagreeCheckModal";

const StatusBadge = ({ status }) => {
  const isPass = status === "PASS";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${
        isPass
          ? "bg-emerald-50 text-emerald-700"
          : "bg-rose-50 text-rose-700"
      }`}
    >
      {status}
    </span>
  );
};

// "Was this check right?" feedback control.
// Rendered inside each check's expanded content — visibility is
// therefore fully driven by the existing expand/collapse state and
// no additional interactions are wired here.
const CheckFeedback = ({ checkName, onDisagree }) => {
  const slug = (checkName || "check").replace(/\s+/g, "-").toLowerCase();
  return (
    <div
      data-testid={`check-feedback-${slug}`}
      className="flex items-center justify-between gap-3 pt-3 mt-1 border-t border-slate-100"
    >
      <span className="text-[13px] text-slate-700">Was this check right?</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Agree"
          data-testid={`check-feedback-agree-${slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E4F5E9] text-[#181F33] text-[13px] font-medium hover:brightness-95 transition"
        >
          <ThumbsUp size={14} strokeWidth={2} className="text-[#181F33]" />
          Agree
        </button>
        <button
          type="button"
          aria-label="Disagree"
          data-testid={`check-feedback-disagree-${slug}`}
          onClick={() => onDisagree && onDisagree(checkName)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FAE1EA] text-[#181F33] text-[13px] font-medium hover:brightness-95 transition"
        >
          <ThumbsDown size={14} strokeWidth={2} className="text-[#181F33]" />
          Disagree
        </button>
      </div>
    </div>
  );
};

const CheckRow = ({ check, defaultOpen = false, isFirst = false, isLast = false, onDisagreeCheck }) => {
  const [open, setOpen] = useState(defaultOpen);
  const isPass = check.status === "PASS";

  return (
    <div className="flex gap-3">
      {/* Timeline column */}
      <div className="flex flex-col items-center pt-1.5 w-[110px] shrink-0 relative">
        {/* Upper timeline segment (bridges gap from previous row) */}
        {!isFirst && (
          <span
            className="absolute left-1/2 -translate-x-1/2 -top-5 h-9 w-px bg-slate-300"
            aria-hidden="true"
          />
        )}
        {/* Lower timeline segment (extends down to next row) */}
        {!isLast && (
          <span
            className="absolute left-1/2 -translate-x-1/2 top-4 bottom-0 w-px bg-slate-300"
            aria-hidden="true"
          />
        )}
        <div
          className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center ${
            isPass ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
          }`}
        >
          {isPass ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
        </div>
        <span className="text-[11px] text-slate-500 mt-1 tabular-nums relative z-10 bg-white px-1">
          {check.time}
        </span>
      </div>

      {/* Card */}
      <div
        className={`flex-1 border rounded-lg overflow-hidden relative ${
          isPass ? "border-slate-200" : "border-rose-200"
        }`}
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-[3px] ${
            isPass ? "bg-emerald-500" : "bg-rose-500"
          }`}
        />
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-50 transition"
            data-testid={`check-row-toggle-${check.name.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[14px] font-medium ${
                    isPass ? "text-slate-900" : "text-rose-700"
                  }`}
                >
                  {check.name}
                </span>
                <StatusBadge status={check.status} />
              </div>
              <p className="text-[13px] text-slate-600 mt-1.5">{check.summary}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ConfidenceDots level={check.confidence} showLabel />
              <span className="text-slate-400 ml-1">
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3">
                  <div className="rounded-md bg-slate-50 border border-slate-100 px-3 py-2 text-[12.5px] text-slate-700">
                    {check.rationale}
                  </div>

                  {check.details && (
                    <div className="grid grid-cols-[1fr_240px] gap-3">
                      <div className="rounded-md border border-slate-200">
                        <dl className="divide-y divide-slate-100 text-[13px]">
                          <div className="flex items-center justify-between px-3 py-2">
                            <dt className="text-slate-600">Computed distance</dt>
                            <dd className="text-slate-900 font-medium tabular-nums">
                              {check.details.computedDistance}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between px-3 py-2">
                            <dt className="text-slate-600">Allowed radius</dt>
                            <dd className="text-slate-900 font-medium tabular-nums">
                              {check.details.allowedRadius}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between px-3 py-2">
                            <dt className="text-slate-600">Excess</dt>
                            <dd className="text-rose-600 font-medium tabular-nums">
                              {check.details.excess}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between px-3 py-2">
                            <dt className="text-slate-600">Method</dt>
                            <dd className="text-slate-900">{check.details.method}</dd>
                          </div>
                          <div className="flex items-center justify-between px-3 py-2">
                            <dt className="text-slate-600">Data source</dt>
                            <dd className="text-slate-900">
                              {check.details.dataSource}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <div className="rounded-md border border-slate-200 p-3">
                        <div className="text-[12px] text-slate-500 mb-1">Policy</div>
                        <div className="text-[13px] text-slate-800">
                          {check.details.policy}
                        </div>
                      </div>
                    </div>
                  )}

                  {check.details && (
                    <div className="rounded-md overflow-hidden border border-slate-200 relative bg-[#eef4ec]">
                      <svg
                        viewBox="0 0 800 200"
                        className="w-full h-[200px]"
                        aria-hidden="true"
                      >
                        <defs>
                          {/* Light map background pattern */}
                          <pattern id="mapBg" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                            <rect width="120" height="120" fill="#eef4ec" />
                            <path d="M 0 60 Q 30 40 60 60 T 120 60" fill="none" stroke="#d8e6d3" strokeWidth="1" />
                            <path d="M 60 0 Q 40 30 60 60 T 60 120" fill="none" stroke="#d8e6d3" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="800" height="200" fill="url(#mapBg)" />
                        {/* Faint waterway curves */}
                        <path d="M -10 70 C 150 40, 300 120, 500 90 S 780 60, 820 80" fill="none" stroke="#c8dbe2" strokeWidth="6" opacity="0.6" />
                        <path d="M -10 150 C 200 130, 350 180, 550 160 S 780 140, 820 160" fill="none" stroke="#c8dbe2" strokeWidth="4" opacity="0.5" />

                        {/* Dashed connection line between pins */}
                        <line
                          x1="90"
                          y1="140"
                          x2="710"
                          y2="55"
                          stroke="#0f2a4a"
                          strokeWidth="2"
                          strokeDasharray="8 8"
                          strokeLinecap="round"
                        />

                        {/* OLD address marker (blue) */}
                        <g transform="translate(90,140)">
                          <circle r="10" fill="#1d4ed8" opacity="0.2" />
                          <circle r="6" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
                        </g>

                        {/* NEW address marker (red, teardrop pin) */}
                        <g transform="translate(710,55)">
                          <path
                            d="M 0 -22 C -9 -22 -14 -14 -14 -6 C -14 4 0 12 0 12 C 0 12 14 4 14 -6 C 14 -14 9 -22 0 -22 Z"
                            fill="#ef4444"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                          <circle r="4" cy="-8" fill="#ffffff" />
                        </g>
                      </svg>

                      {/* OLD label */}
                      <div className="absolute top-3 left-3 bg-white rounded-lg shadow-[0_2px_8px_rgba(15,23,42,0.08)] px-3 py-2 min-w-[180px]">
                        <div className="text-[11px] font-bold tracking-wide text-slate-900">
                          OLD <span className="text-slate-400 font-normal">·</span> HSR Layout
                        </div>
                        <div className="text-[11px] text-slate-500 tabular-nums mt-0.5">
                          12.9116, 77.6380
                        </div>
                      </div>

                      {/* NEW label */}
                      <div className="absolute top-[64px] right-3 bg-white rounded-lg shadow-[0_2px_8px_rgba(15,23,42,0.08)] px-3 py-2 min-w-[180px]">
                        <div className="text-[11px] font-bold tracking-wide text-slate-900">
                          NEW <span className="text-slate-400 font-normal">·</span> Whitefield
                        </div>
                        <div className="text-[11px] text-slate-500 tabular-nums mt-0.5">
                          12.9698, 77.7500
                        </div>
                      </div>

                      {/* Distance badge on the dashed line */}
                      <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0f2a4a] text-white text-[12px] font-semibold shadow-[0_2px_6px_rgba(15,23,42,0.25)] tabular-nums">
                          {check.details.computedDistance}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Was this check right? — visible only within expanded content */}
                  <CheckFeedback
                    checkName={check.name}
                    onDisagree={onDisagreeCheck}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const AddressDetailsPanel = ({ open, onClose, request }) => {
  const checks = request ? buildCheckSequence(request) : [];
  const isRejected = request?.verdict === "Rejected";

  const [flagVerdictOpen, setFlagVerdictOpen] = useState(false);
  const [disagreeOpen, setDisagreeOpen] = useState(false);
  const [disagreeCheckName, setDisagreeCheckName] = useState(null);

  const handleDisagreeCheck = (name) => {
    setDisagreeCheckName(name);
    setDisagreeOpen(true);
  };

  return (
    <>
      <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-testid="details-panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/25"
          />
          <motion.aside
            data-testid="details-panel"
            role="dialog"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[880px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-8 pt-6 pb-4 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-[22px] font-semibold text-slate-900">
                    {request?.name}
                    <span className="text-slate-500 font-medium">
                      {" "}
                      — {request?.id}
                    </span>
                  </h2>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[13px] font-medium ${
                      isRejected
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {request?.verdict}
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-[11px] tracking-wide uppercase text-slate-400">
                      Decided
                    </div>
                    <div className="text-[14px] text-slate-800">
                      {request?.decidedFull || request?.decided}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] tracking-wide uppercase text-slate-400">
                      Requested on
                    </div>
                    <div className="text-[14px] text-slate-800">
                      {request?.requestedOn}
                    </div>
                  </div>
                  <button
                    data-testid="details-panel-close"
                    onClick={onClose}
                    className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-5 text-[11px] tracking-[0.12em] uppercase font-semibold text-slate-500">
                Check sequence · <span className="text-slate-400">run in order</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="space-y-5">
                {checks.map((c, i) => (
                  <CheckRow
                    key={i}
                    check={c}
                    defaultOpen={c.status === "FAIL" && !!c.details}
                    isFirst={i === 0}
                    isLast={i === checks.length - 1}
                    onDisagreeCheck={handleDisagreeCheck}
                  />
                ))}

                {/* Verdict footer */}
                <div
                  data-testid="agent-verdict-container"
                  className="rounded-lg border px-4 py-4 mt-6"
                  style={{
                    backgroundColor: "#FDF2F4",
                    borderColor: "#FED6D8",
                    color: "#181F33",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[13px] font-medium"
                        style={{ color: "#181F33" }}
                      >
                        Agent verdict
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[13px] font-medium ${
                          isRejected ? "" : "bg-emerald-100 text-emerald-700"
                        }`}
                        style={
                          isRejected
                            ? { backgroundColor: "#E0322E", color: "#FFFFFF" }
                            : undefined
                        }
                      >
                        {request?.verdict}
                      </span>
                    </div>
                    <button
                      type="button"
                      data-testid="flag-verdict-btn"
                      onClick={() => setFlagVerdictOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium bg-white transition hover:bg-slate-50"
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#CBD5E1",
                        color: "#475569",
                      }}
                    >
                      <Flag size={14} strokeWidth={2} />
                      Flag this verdict
                    </button>
                  </div>
                  <p
                    className="text-[13px] mt-2"
                    style={{ color: "#181F33" }}
                  >
                    {isRejected
                      ? "2 of 6 checks failed a hard threshold — the agent declined on its own."
                      : "All required checks passed — the agent approved on its own."}
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
      </AnimatePresence>

      {/* Flagging modals — portaled, so mounted here so they persist
          independently of the side panel's exit animation. */}
      <FlagVerdictModal
        open={flagVerdictOpen}
        onOpenChange={setFlagVerdictOpen}
      />
      <DisagreeCheckModal
        open={disagreeOpen}
        onOpenChange={setDisagreeOpen}
        checkName={disagreeCheckName}
      />
    </>
  );
};

export default AddressDetailsPanel;
