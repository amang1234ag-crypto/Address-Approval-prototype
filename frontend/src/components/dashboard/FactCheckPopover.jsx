import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { factCheckData } from "../../data/mockData";

export const FactCheckPopover = ({ open, onClose, anchorRect }) => {
  if (!anchorRect && open) return null;

  // Position: below the card, aligned to card's left edge
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
            data-testid="fact-check-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-30"
          />
          <motion.div
          data-testid="fact-check-popover"
          role="dialog"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={style}
          className="fixed z-40 w-[420px] bg-white rounded-xl border border-slate-200 shadow-[0_10px_40px_rgba(15,23,42,0.14)] p-5"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[17px] font-semibold text-slate-900">
                {factCheckData.title}
              </div>
              <div className="text-[13px] text-slate-500 mt-0.5">
                {factCheckData.subtitle}
              </div>
            </div>
            <button
              data-testid="fact-check-popover-close"
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
                <div className="text-[12px] text-slate-500">Overall</div>
                <div className="mt-1">
                  <span className="text-[18px] font-semibold text-emerald-600">
                    {factCheckData.overall}
                  </span>
                  <span className="ml-1.5 text-[13px] text-slate-800">accuracy</span>
                </div>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 px-4 py-3">
                <div className="text-[12px] text-slate-500">Reconciled sample</div>
                <div className="mt-1 text-[14px] text-slate-800">
                  {factCheckData.reconciledSample}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[11px] tracking-wide text-slate-400 uppercase mb-1">
              Per check
            </div>
            <ul className="divide-y divide-slate-100">
              {factCheckData.checks.map((c) => (
                <li key={c.name} className="py-2.5 flex items-start justify-between">
                  <div className="min-w-0 pr-3">
                    <div
                      className={`text-[14px] ${
                        c.status === "warn"
                          ? "text-rose-600 font-medium"
                          : "text-slate-800"
                      }`}
                    >
                      {c.name}
                    </div>
                    {c.note && (
                      <div className="text-[12px] text-slate-500 mt-0.5">
                        {c.note}
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-[14px] tabular-nums font-medium ${
                      c.status === "warn" ? "text-rose-600" : "text-slate-800"
                    }`}
                  >
                    {c.value}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FactCheckPopover;
