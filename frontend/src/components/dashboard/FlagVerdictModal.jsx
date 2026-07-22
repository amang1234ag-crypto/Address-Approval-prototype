import React, { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

/**
 * FlagVerdictModal
 *
 * Large modal opened from the "Flag this verdict" button in the Agent
 * Verdict section of the address details side panel.
 *
 * Behaviour:
 *   - Opens with no reason (check) selected. Comments field empty.
 *   - "Flag Verdict" CTA is disabled until a reason is selected.
 *   - Comments field is optional and writable.
 *   - Dismissible via X, backdrop click, and Escape (Radix defaults).
 *
 * Layout, spacing and typography follow the attached reference exactly.
 */
const CHECK_OPTIONS = [
  "Pin ↔ typed address agreement",
  "Colleague cluster fit",
  "Distance from prior address",
  "Serviceable zone check",
  "Marshal Route (dark hours)",
];

const CheckboxRow = ({ value, checked, onToggle }) => (
  <button
    type="button"
    onClick={() => onToggle(value)}
    data-testid={`flag-verdict-option-${value
      .replace(/\s+/g, "-")
      .toLowerCase()}`}
    className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-md hover:bg-slate-50 transition"
  >
    <span
      className={`shrink-0 inline-flex items-center justify-center w-[18px] h-[18px] rounded-[4px] border-2 ${
        checked
          ? "bg-[#0937B2] border-[#0937B2]"
          : "bg-white border-slate-300"
      }`}
      aria-hidden="true"
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M1.5 5.2 4 7.5 8.5 2.5"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
    <span className="text-[14px] text-[#181F33]">{value}</span>
  </button>
);

export const FlagVerdictModal = ({ open, onOpenChange }) => {
  const [reasons, setReasons] = useState([]);
  const [comments, setComments] = useState("");

  // Reset internal state every time the modal opens.
  useEffect(() => {
    if (open) {
      setReasons([]);
      setComments("");
    }
  }, [open]);

  const toggleReason = (value) => {
    setReasons((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const isActive = reasons.length > 0;
  const buttonStyle = isActive
    ? { backgroundColor: "#0937B2", color: "#FFFFFF" }
    : { backgroundColor: "#F5F5F5", color: "#929DAB" };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-testid="flag-verdict-overlay"
          className="fixed inset-0 z-[70] bg-slate-900/25 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content
          data-testid="flag-verdict-modal"
          aria-describedby={undefined}
          style={{
            fontFamily: '"Lato", ui-sans-serif, system-ui, sans-serif',
          }}
          className="fixed left-1/2 top-1/2 z-[80] w-[min(600px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)] p-6 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <DialogPrimitive.Title className="text-[18px] font-semibold text-slate-900">
              Flag Verdict
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              data-testid="flag-verdict-close"
              aria-label="Close"
              className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            >
              <X size={20} />
            </DialogPrimitive.Close>
          </div>

          {/* Select Check */}
          <div>
            <div className="text-[14px] font-medium text-slate-800 mb-2">
              Select Check
            </div>
            <div className="rounded-lg border border-slate-200 divide-y divide-slate-100">
              {CHECK_OPTIONS.map((opt) => (
                <CheckboxRow
                  key={opt}
                  value={opt}
                  checked={reasons.includes(opt)}
                  onToggle={toggleReason}
                />
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-5">
            <label
              htmlFor="flag-verdict-comments"
              className="block text-[14px] font-medium text-slate-800 mb-2"
            >
              Comments
            </label>
            <textarea
              id="flag-verdict-comments"
              data-testid="flag-verdict-comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-[14px] leading-relaxed resize-none focus:outline-none focus:border-slate-400"
              style={{ color: "#181F33" }}
            />
          </div>

          {/* CTA */}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              data-testid="flag-verdict-submit"
              disabled={!isActive}
              onClick={() => onOpenChange && onOpenChange(false)}
              className="px-5 py-2.5 rounded-md text-[14px] font-semibold transition"
              style={buttonStyle}
            >
              Flag Verdict
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default FlagVerdictModal;
