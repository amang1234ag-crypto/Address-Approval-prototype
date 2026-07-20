import { useCallback, useEffect, useState } from "react";

/**
 * useWelcomeModal
 *
 * Single source of truth for the Welcome Modal's open state.
 *
 * Behaviour:
 *   - Opens automatically on first visit (persists a flag in localStorage
 *     under `welcomeModalSeen`).
 *   - Once dismissed, does not auto-open again on subsequent visits.
 *   - Exposes `openModal` so a future "Watch Product Walkthrough" CTA on
 *     the dashboard can re-open the same modal on demand. Manual re-opens
 *     do NOT clear the "seen" flag.
 *
 * Returns:
 *   { open, setOpen, openModal, closeModal }
 */
const STORAGE_KEY = "welcomeModalSeen";

const readSeenFlag = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    // localStorage unavailable -> treat as unseen (safe default)
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

export function useWelcomeModal() {
  const [open, setOpenState] = useState(false);

  // Auto-open on first visit only. Runs once on mount.
  useEffect(() => {
    if (!readSeenFlag()) {
      setOpenState(true);
    }
  }, []);

  // Wrapped setter: any transition to closed marks the modal as seen.
  const setOpen = useCallback((nextOpen) => {
    const value = typeof nextOpen === "function" ? nextOpen(false) : nextOpen;
    if (!value) writeSeenFlag();
    setOpenState(value);
  }, []);

  const openModal = useCallback(() => setOpenState(true), []);
  const closeModal = useCallback(() => {
    writeSeenFlag();
    setOpenState(false);
  }, []);

  return { open, setOpen, openModal, closeModal };
}

export default useWelcomeModal;
