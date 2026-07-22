import React, { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

/**
 * DisagreeCheckModal
 *
 * Smaller modal opened from the "Disagree" button inside an expanded
 * validation check card.
 *
 * Behaviour follows the same pattern as FlagVerdictModal:
 *   - Opens with an empty comments field.
 *   - "Flag Verdict" CTA is disabled until the user has typed
 *     something in the comments field.
 *   - Dismissible via X, backdrop click, and Escape.
 *
 * Props:
 *   open, onOpenChange - controlled dialog state
 *   checkName         - optional context (unused visually but useful for
 *                       future analytics wiring)
 */
export const DisagreeCheckModal = ({ open, onOpenChange, checkName }) => {
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (open) setComments("");
  }, [open]);

  const isActive = comments.trim().length > 0;
  const buttonStyle = isActive
    ? { backgroundColor: "#0937B2", color: "#FFFFFF" }
    : { backgroundColor: "#F5F5F5", color: "#929DAB" };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-testid="disagree-check-overlay"
          className="fixed inset-0 z-[70] bg-slate-900/25 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content
          data-testid="disagree-check-modal"
          data-check-name={checkName || ""}
          aria-describedby={undefined}
          style={{
            fontFamily: '"Lato", ui-sans-serif, system-ui, sans-serif',
          }}
          className="fixed left-1/2 top-1/2 z-[80] w-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)] p-6 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center justify-between mb-4">
            <DialogPrimitive.Title className="text-[18px] font-semibold text-slate-900">
              Disagree With Check
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              data-testid="disagree-check-close"
              aria-label="Close"
              className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            >
              <X size={20} />
            </DialogPrimitive.Close>
          </div>

          <label
            htmlFor="disagree-check-comments"
            className="block text-[14px] font-medium text-slate-800 mb-2"
          >
            Comments (Optional)
          </label>
          <textarea
            id="disagree-check-comments"
            data-testid="disagree-check-comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-[14px] leading-relaxed resize-none focus:outline-none focus:border-slate-400"
            style={{ color: "#181F33" }}
          />

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              data-testid="disagree-check-submit"
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

export default DisagreeCheckModal;
