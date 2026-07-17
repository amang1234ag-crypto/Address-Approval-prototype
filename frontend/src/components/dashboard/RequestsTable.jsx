import React from "react";
import { ChevronRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import { ConfidenceDots } from "./ConfidenceDots";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const VerdictBadge = ({ verdict }) => {
  const isRejected = verdict === "Rejected";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium ${
        isRejected
          ? "bg-rose-50 text-rose-700"
          : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {verdict}
    </span>
  );
};

const rowAccent = (verdict, confidence) => {
  if (verdict === "Rejected") return "bg-rose-500";
  if (confidence === "Med") return "bg-amber-400";
  return "bg-emerald-500";
};

export const RequestsTable = ({ rows, onView }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[180px_minmax(220px,1.1fr)_minmax(360px,2fr)_200px_180px_120px] items-center px-6 py-3 border-b border-slate-200 text-[11px] tracking-[0.12em] uppercase font-semibold text-slate-500">
        <div>Agent verdict</div>
        <div>Employee</div>
        <div>Why</div>
        <div className="flex items-center gap-1.5">
          Confidence
          <TooltipProvider delayDuration={150} disableHoverableContent={false}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="What is confidence?"
                  data-testid="confidence-info-tooltip-trigger"
                  className="inline-flex items-center justify-center text-slate-400 hover:text-slate-500 focus:outline-none cursor-default"
                >
                  <Info size={13} />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="start"
                sideOffset={8}
                data-testid="confidence-info-tooltip"
                className="z-[60] w-[320px] max-w-[320px] rounded-md bg-[#0f2a4a] text-white px-3.5 py-2.5 text-[12.5px] leading-[1.55] font-normal normal-case tracking-normal shadow-[0_8px_24px_rgba(15,23,42,0.18)]"
              >
                Confidence is how sure the agent feels about its own decision.
                It helps you decide which requests to review first, but it
                doesn't tell you whether the decision is actually correct.
                Think of it as a prioritization signal, not proof.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>Decided</div>
        <div>Actions</div>
      </div>

      <ul>
        {rows.map((r, i) => (
          <motion.li
            key={r.id + i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.2) }}
            className="relative border-b last:border-b-0 border-slate-100"
          >
            {/* Left accent bar */}
            <span
              className={`absolute left-0 top-0 bottom-0 w-[4px] ${rowAccent(
                r.verdict,
                r.confidence
              )}`}
            />
            <div className="grid grid-cols-[180px_minmax(220px,1.1fr)_minmax(360px,2fr)_200px_180px_120px] items-center px-6 py-4 hover:bg-slate-50/70 transition-colors">
              <div>
                <VerdictBadge verdict={r.verdict} />
              </div>

              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-slate-900 truncate">
                  {r.name}
                </div>
                <div className="text-[13px] text-slate-500 tabular-nums">
                  {r.id}
                </div>
              </div>

              <div className="text-[14px] text-slate-700 leading-snug pr-6">
                {r.why}
              </div>

              <div>
                <ConfidenceDots level={r.confidence} showLabel />
              </div>

              <div className="text-[14px] text-slate-700">{r.decided}</div>

              <div>
                <button
                  data-testid={`view-btn-${r.id}`}
                  onClick={() => onView(r)}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full border border-[#1d7bff]/40 text-[#1d7bff] text-[14px] font-medium bg-white hover:bg-[#1d7bff] hover:text-white hover:border-[#1d7bff] transition-colors"
                >
                  View
                  <ChevronRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default RequestsTable;
