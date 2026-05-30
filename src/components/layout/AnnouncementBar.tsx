import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { journeysData } from "../../data/journeys";
import TripInterestOverlay from "../shared/TripInterestOverlay";

// Pull all upcoming trips directly from journeys data
const UPCOMING = journeysData.filter((j) => j.status === "Upcoming");

export default function AnnouncementBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [idx, setIdx] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isAlarming, setIsAlarming] = useState(false);

  // Collapse after 7s (reduced threshold)
  useEffect(() => {
    if (!isExpanded) return;
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  // Jitter logic (every 2.5s)
  useEffect(() => {
    if (isExpanded) return;
    const alarmInterval = setInterval(() => {
      setIsAlarming(true);
      setTimeout(() => setIsAlarming(false), 400); // jitter duration
    }, 2500);
    return () => clearInterval(alarmInterval);
  }, [isExpanded]);

  if (UPCOMING.length === 0) return null;

  const trip = UPCOMING[idx % UPCOMING.length];

  const handleRegisterClick = () => {
    setShowOverlay(true);
  };

  const next = () => setIdx((i) => (i + 1) % UPCOMING.length);
  const prev = () => setIdx((i) => (i - 1 + UPCOMING.length) % UPCOMING.length);

  return (
    <>
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="banner"
            id="announcement-bar"
            initial={{ y: -52, opacity: 0, x: "-50%" }}
            animate={{ y: 6, opacity: 1, x: "-50%" }}
            exit={{ y: -52, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 z-[9997] h-11 flex items-center rounded-full px-4 sm:px-5 shadow-[0_0_20px_rgba(0,0,0,0.8)] w-[calc(100vw-2rem)] sm:w-auto max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-6rem)] overflow-hidden"
            style={{
              left: "50%",
              background: "rgba(10,8,6,0.85)",
              border: "1px solid rgba(212,175,55,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="w-full flex items-center justify-between sm:justify-start gap-2 sm:gap-3 min-w-0">
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>

              {/* Label */}
              <span className="text-white text-[10px] tracking-[0.35em] uppercase shrink-0 hidden sm:block">
                Upcoming Event
              </span>

              <div className="w-[1px] h-3 bg-white/20 hidden sm:block" />

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
                    <span className="text-white/60 text-[10px] shrink-0 hidden lg:inline">
                      · {trip.cost}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

              {UPCOMING.length > 1 && (
                <div className="flex gap-1 shrink-0">
                  <button onClick={prev} aria-label="Previous trip" className="text-muted-foreground/40 hover:text-foreground transition-colors text-xs px-1">‹</button>
                  <button onClick={next} aria-label="Next trip"     className="text-muted-foreground/40 hover:text-foreground transition-colors text-xs px-1">›</button>
                </div>
              )}

              {/* CTA */}
              <button
                onClick={handleRegisterClick}
                className="shrink-0 text-[10px] text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-300 px-3 py-1 rounded-full font-medium tracking-wide"
              >
                Register →
              </button>

              {/* Collapse to ball */}
              <button
                onClick={() => setIsExpanded(false)}
                aria-label="Collapse"
                className="shrink-0 text-muted-foreground/30 hover:text-muted-foreground/70 transition-colors text-xs ml-1"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="ball"
            initial={{ y: -52, opacity: 0, x: "-50%" }}
            animate={
              isAlarming 
                ? { y: 24, opacity: 1, x: "-50%", rotate: [-8, 8, -8, 8, 0], scale: 1.1 } 
                : { y: 24, opacity: 1, x: "-50%", rotate: 0, scale: 1 }
            }
            exit={{ y: -52, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsExpanded(true)}
            className="fixed top-0 left-1/2 z-[9997] w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-md border-[1.5px] border-border backdrop-blur-md bg-surface/80 group hover:bg-surface transition-colors"
            style={{ left: "50%" }}
            aria-label="Expand Upcoming Journey"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Conditionally render the modal overlay at the root level */}
      {showOverlay && (
        <TripInterestOverlay 
          key="announcement-interest-overlay"
          journey={trip}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </>
  );
}
