import { useRef, useEffect } from "react";

const ENGAGE_DELAY_MS = 1500; // Require 1.5s hold to trigger
const LINGER_MS = 2500;       // Stay for 2.5s after un-hover
const SITE_ID = "site-content";
const OVERLAY_ID = "perspective-overlay";
const WHISPERS_ID = "sanskrit-whispers";

/**
 * usePerspectiveShift
 *
 * Controls the "Paradigm Shift" effect:
 *   Phase 1 — Hold: Hover for at least 2.5s to trigger.
 *   Phase 2 — Active: White flash, site inverts to bright blue/white, whispers fade in.
 *   Phase 3 — Disengage: Waits 2.5s of linger, then fades back to dark mode.
 */
export function usePerspectiveShift() {
  const engageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disengageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEngaged = useRef(false);

  useEffect(() => {
    return () => {
      if (engageTimer.current) clearTimeout(engageTimer.current);
      if (disengageTimer.current) clearTimeout(disengageTimer.current);
      document.getElementById(SITE_ID)?.classList.remove("perspective-shifted");
      document.getElementById(WHISPERS_ID)?.classList.remove("active");
      document.getElementById(OVERLAY_ID)?.classList.remove("flash");
    };
  }, []);

  const engage = () => {
    // If we're already disengaging but hover again, cancel the disengage and stay shifted
    if (disengageTimer.current) clearTimeout(disengageTimer.current);
    if (isEngaged.current) return;
    
    // Start countdown for the shift
    if (engageTimer.current) clearTimeout(engageTimer.current);
    engageTimer.current = setTimeout(() => {
      isEngaged.current = true;
      
      // 1. White flash
      const overlay = document.getElementById(OVERLAY_ID);
      if (overlay) {
        overlay.classList.add("flash");
        setTimeout(() => overlay.classList.remove("flash"), 700);
      }

      // 2. Site inverts + whispers appear — together
      document.getElementById(SITE_ID)?.classList.add("perspective-shifted");
      document.getElementById(WHISPERS_ID)?.classList.add("active");
    }, ENGAGE_DELAY_MS);
  };

  const disengage = () => {
    // They let go; cancel engage if it hasn't happened yet
    if (engageTimer.current) clearTimeout(engageTimer.current);
    
    // If we were fully engaged, start the timer to return to normal
    if (isEngaged.current) {
      if (disengageTimer.current) clearTimeout(disengageTimer.current);
      disengageTimer.current = setTimeout(() => {
        document.getElementById(SITE_ID)?.classList.remove("perspective-shifted");
        document.getElementById(WHISPERS_ID)?.classList.remove("active");
        isEngaged.current = false;
      }, LINGER_MS);
    }
  };

  return { engage, disengage };
}
