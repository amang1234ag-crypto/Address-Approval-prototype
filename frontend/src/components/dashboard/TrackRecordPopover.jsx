import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import { trackRecordData } from "../../data/mockData";

const VolumeChart = () => {
  const data = trackRecordData.volume;
  return (
    <div className="w-full h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
          />
          <YAxis
            domain={[160, 220]}
            ticks={[160, 180, 200, 220]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            width={32}
          />
          <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={22}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.current ? "#1d4ed8" : "#93c5fd"}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const RejectChart = () => {
  const data = trackRecordData.rejectRate;
  return (
    <div className="w-full h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
          />
          <YAxis
            domain={[0, 8]}
            ticks={[0, 2, 4, 6, 8]}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            width={32}
          />
          <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={22}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.peak ? "#b91c1c" : "#fca5a5"}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const LegendDot = ({ color }) => (
  <span
    className="inline-block w-2.5 h-2.5 rounded-full"
    style={{ background: color }}
  />
);

export const TrackRecordPopover = ({ open, onClose, anchorRect }) => {
  if (!anchorRect && open) return null;

  // Anchor to the right side but keep it in viewport
  const width = 720;
  const style = anchorRect
    ? {
        top: anchorRect.bottom + 10,
        left: Math.max(16, Math.min(anchorRect.right - width, window.innerWidth - width - 16)),
      }
    : {};

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-testid="track-record-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-30"
          />
          <motion.div
          data-testid="track-record-popover"
          role="dialog"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ ...style, width }}
          className="fixed z-40 bg-white rounded-xl border border-slate-200 shadow-[0_10px_40px_rgba(15,23,42,0.14)] p-5"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[17px] font-semibold text-slate-900">
                {trackRecordData.title}
              </div>
              <div className="text-[13px] text-slate-500 mt-0.5">
                {trackRecordData.subtitle}
              </div>
            </div>
            <button
              data-testid="track-record-popover-close"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-slate-200 pt-5 divide-x divide-slate-200">
            <div className="pr-6">
              <div className="text-[13px] font-semibold text-slate-800">
                Volume handled / day
              </div>
              <div className="text-[11px] text-slate-500 mb-2">
                requests processed, by week
              </div>
              <VolumeChart />
              <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5">
                  <LegendDot color="#1d4ed8" /> Current week
                </span>
                <span className="flex items-center gap-1.5">
                  <LegendDot color="#93c5fd" /> Prior weeks
                </span>
              </div>
            </div>

            <div className="pl-6">
              <div className="text-[13px] font-semibold text-slate-800">Reject rate</div>
              <div className="text-[11px] text-slate-500 mb-2">
                % of requests declined by agent
              </div>
              <RejectChart />
              <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5">
                  <LegendDot color="#b91c1c" /> Wk 1 (peak)
                </span>
                <span className="flex items-center gap-1.5">
                  <LegendDot color="#fca5a5" /> Subsequent
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TrackRecordPopover;
