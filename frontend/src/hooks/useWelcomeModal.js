import { useCallback, useEffect, useState } from "react";

/**
 * useWelcomeModal
 *
 * Single source of truth for the Welcome Modal's open state.
 *
 * Behaviour is controlled by the `persistDismissal` option:
 *
 *   persistDismissal: false  (DEFAULT — stakeholder demo mode)
 *     - Modal auto-opens on EVERY dashboard load / tab refresh.
 *     - Manual dismissal only closes it for the current session.
 *     - No localStorage / no persistence.
 *
 *   persistDismissal: true   (first-time-only mode)
 *     - Modal auto-opens once, then remembers the dismissal in
 *       localStorage under `welcomeModalSeen` and does not
 *       auto-open again on future visits.
 *
 * `openModal` is always available so a future
 * "Watch Product Walkthrough" CTA on the dashboard can re-open the
 * modal on demand regardless of mode.
 *
 * Returns:
 *   { open, setOpen, openModal, closeModal }
 */
const STORAGE_KEY = "welcomeModalSeen";

const readSeenFlag = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const writeSeenFlag = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // no-op
  }
};

export function useWelcomeModal({ persistDismissal = false } = {}) {
  const [open, setOpenState] = useState(false);

  // Auto-open policy on mount.
  //   - Demo mode (default): always open.
  //   - Persist mode: open only if not previously seen.
  useEffect(() => {
    if (persistDismissal) {
      if (!readSeenFlag()) setOpenState(true);
    } else {
      setOpenState(true);
    }
  }, [persistDismissal]);

  const setOpen = useCallback(
    (nextOpen) => {
      const value =
        typeof nextOpen === "function" ? nextOpen(false) : nextOpen;
      if (!value && persistDismissal) writeSeenFlag();
      setOpenState(value);
    },
    [persistDismissal]
  );

  const openModal = useCallback(() => setOpenState(true), []);
  const closeModal = useCallback(() => {
    if (persistDismissal) writeSeenFlag();
    setOpenState(false);
  }, [persistDismissal]);

  return { open, setOpen, openModal, closeModal };
}

export default useWelcomeModal;
