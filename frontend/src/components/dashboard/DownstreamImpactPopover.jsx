import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { downstreamData } from "../../data/mockData";

export const DownstreamImpactPopover = ({ open, onClose, anchorRect }) => {
  if (!anchorRect && open) return null;

  const style = anchorRect
    ? {
        top: anchorRect.bottom + 10,
        left: Math.max(16, anchorRect.left),
      }
    : {};

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-testid="downstream-impact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-30"
          />
          <motion.div
          data-testid="downstream-impact-popover"
          role="dialog"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={style}
          className="fixed z-40 w-[440px] bg-white rounded-xl border border-slate-200 shadow-[0_10px_40px_rgba(15,23,42,0.14)] p-5"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[17px] font-semibold text-slate-900">
                {downstreamData.title}
              </div>
              <div className="text-[13px] text-slate-500 mt-0.5">
                {downstreamData.subtitle}
              </div>
            </div>
            <button
              data-testid="downstream-impact-popover-close"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="border-t border-slate-200 pt-4 mb-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
                <div className="text-[12px] text-slate-500">Incidents</div>
                <div className="mt-1 text-[18px] font-semibold text-emerald-600">
                  {downstreamData.incidents}
                </div>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 px-4 py-3">
                <div className="text-[12px] text-slate-500">Decisions</div>
                <div className="mt-1 text-[18px] font-semibold text-slate-900 tabular-nums">
                  {downstreamData.decisions}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[11px] tracking-wide text-slate-400 uppercase mb-1">
              By source
            </div>
            <ul className="divide-y divide-slate-100">
              {downstreamData.bySource.map((s) => (
                <li key={s.name} className="py-2.5 flex items-center justify-between">
                  <span className="text-[14px] text-slate-800">{s.name}</span>
                  <span className="text-[14px] tabular-nums font-medium text-slate-800">
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 rounded-md bg-amber-50 border border-amber-100 px-3 py-2 text-[12px] text-amber-900">
            {downstreamData.disclaimer}
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DownstreamImpactPopover;
