import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { journeysData } from "../../data/journeys";
import TripInterestOverlay from "../shared/TripInterestOverlay";

// Pull all upcoming trips directly from journeys data
const UPCOMING = journeysData.filter((j) => j.status === "Upcoming");

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  if (UPCOMING.length === 0) return null;

  const trip = UPCOMING[idx % UPCOMING.length];

  const handleRegisterClick = () => {
    setShowOverlay(true);
  };

  const next = () => setIdx((i) => (i + 1) % UPCOMING.length);
  const prev = () => setIdx((i) => (i - 1 + UPCOMING.length) % UPCOMING.length);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="announcement-bar"
          initial={{ y: -52, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -52, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[9997] h-11 flex items-center"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,8,6,0.96) 0%, rgba(22,16,6,0.96) 50%, rgba(10,8,6,0.96) 100%)",
            borderBottom: "1px solid rgba(212,175,55,0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="w-full max-w-5xl mx-auto px-4 flex items-center gap-3">

            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>

            {/* Label */}
            <span className="text-gold text-[10px] tracking-[0.35em] uppercase shrink-0 hidden sm:block">
              Upcoming Journey
            </span>

            <div className="w-[1px] h-3 bg-gold/20 hidden sm:block" />

            {/* Trip info — animates on change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={trip.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
                className="flex items-center gap-2 min-w-0 flex-1"
              >
                <span className="font-serif text-foreground text-sm truncate">
                  {trip.title}
                </span>
                <span className="text-muted-foreground/60 text-xs shrink-0 hidden md:inline">
                  — {trip.exactDates ?? trip.date}
                </span>
                {trip.cost && (
                  <span className="text-gold/60 text-[10px] shrink-0 hidden lg:inline">
                    · {trip.cost}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Cycle through (only if multiple upcoming) */}
            {UPCOMING.length > 1 && (
              <div className="flex gap-1 shrink-0">
                <button onClick={prev} aria-label="Previous trip" className="text-muted-foreground/40 hover:text-gold transition-colors text-xs px-1">‹</button>
                <button onClick={next} aria-label="Next trip"     className="text-muted-foreground/40 hover:text-gold transition-colors text-xs px-1">›</button>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleRegisterClick}
              className="shrink-0 text-[10px] text-black bg-gold hover:bg-gold-bright transition-colors duration-300 px-3 py-1 rounded-full font-medium tracking-wide"
            >
              Register →
            </button>

            {/* Dismiss */}
            <button
              onClick={() => setVisible(false)}
              aria-label="Dismiss"
              className="shrink-0 text-muted-foreground/30 hover:text-muted-foreground/70 transition-colors text-xs ml-1"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {/* Conditionally render the modal overlay at the root level */}
      {showOverlay && (
        <TripInterestOverlay 
          key="announcement-interest-overlay"
          journey={trip}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </AnimatePresence>
  );
}
