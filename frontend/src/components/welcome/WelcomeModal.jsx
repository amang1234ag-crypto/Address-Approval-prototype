import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { WelcomeVideoPlayer } from "./WelcomeVideoPlayer";
import { WALKTHROUGH_VIDEO_SOURCE } from "./videoConfig";

/**
 * WelcomeModal
 *
 * Reusable, controlled dialog that shows a welcome message + walkthrough
 * video. Built on Radix Dialog primitives so it natively handles:
 *   - Escape key dismissal
 *   - Backdrop click dismissal
 *   - Focus trap + a11y
 *   - Portaled rendering / z-index above the dashboard
 *
 * The dashboard remains visible underneath through a subtle backdrop.
 *
 * Props:
 *   open:          boolean, controls visibility (from useWelcomeModal)
 *   onOpenChange:  called when Radix requests a state change (X / Esc /
 *                  outside click). Wire to setOpen from useWelcomeModal.
 *   title:         header text (placeholder copy for now)
 *   videoSource:   optional override; defaults to WALKTHROUGH_VIDEO_SOURCE.
 *                  Swap this later to { type: "mp4", url: "/walkthrough.mp4" }.
 */
export const WelcomeModal = ({
  open,
  onOpenChange,
  title = "Welcome",
  videoSource = WALKTHROUGH_VIDEO_SOURCE,
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Subtle backdrop - dashboard visible underneath */}
        <DialogPrimitive.Overlay
          data-testid="welcome-modal-overlay"
          className="fixed inset-0 z-[70] bg-slate-900/25 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />

        <DialogPrimitive.Content
          data-testid="welcome-modal"
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
          style={{
            fontFamily: '"Lato", ui-sans-serif, system-ui, sans-serif',
          }}
          className="fixed left-1/2 top-1/2 z-[80] w-[min(960px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)] p-6 sm:p-7 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <DialogPrimitive.Title
              data-testid="welcome-modal-title"
              className="text-[22px] font-semibold text-slate-900 leading-none"
            >
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              data-testid="welcome-modal-close"
              aria-label="Close"
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <X size={20} strokeWidth={2} />
            </DialogPrimitive.Close>
          </div>

          {/* Video */}
          <WelcomeVideoPlayer source={videoSource} title="Product walkthrough" />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default WelcomeModal;
