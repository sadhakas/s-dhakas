import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import JourneyCard from "../shared/JourneyCard";
import type { JourneyData } from "../shared/JourneyCard";
import { journeysData } from "../../data/journeys";
import MemoryOverlay from "../shared/MemoryOverlay";
import TripInterestOverlay from "../shared/TripInterestOverlay";
import TmolRegistrationOverlay from "../shared/TmolRegistrationOverlay";

export default function Journeys() {
  const [selectedJourney, setSelectedJourney] = useState<JourneyData | null>(null);
  const [showTmolOverlay, setShowTmolOverlay] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Phase 1: [0, 0.3] Diagonal entry (up and left)
  // Phase 2: [0.3, 0.85] Horizontal scroll (left)
  // Phase 3: [0.85, 1] Hold at the end so it doesn't get covered by the next section prematurely
  const mobileEndX = "-400vw";
  const desktopEndX = "-150vw";
  const x = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.85, 1], 
    ["50vw", "0vw", isMobile ? mobileEndX : desktopEndX, isMobile ? mobileEndX : desktopEndX]
  );
  const y = useTransform(scrollYProgress, [0, 0.3], ["50vh", "0vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const handleSelect = (j: JourneyData) => {
    if (j.type === "event") {
      setShowTmolOverlay(true);
    } else {
      setSelectedJourney(j);
    }
  };

  const handleCloseOverlay = () => {
    setSelectedJourney(null);
  };

  const upcomingJourneys = journeysData.filter((j) => j.status === "Upcoming");
  const completedJourneys = journeysData.filter((j) => j.status === "Completed");

  return (
    <>
      <section id="journeys" ref={containerRef} className="relative h-[350vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          
          <motion.div
            style={{ opacity }}
            className="absolute top-[10%] left-6 md:left-24 z-10"
          >
            <p className="text-[#1A1A18]/60 text-xs tracking-[0.4em] lowercase mb-4 font-mono">
              where we wander
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1A1A18]">
              The Journeys
            </h2>
            <div className="w-24 h-[1px] bg-[#1A1A18]/30 mt-6" />
          </motion.div>

          <motion.div 
            style={{ x, y }} 
            className="flex items-center gap-16 md:gap-32 px-[10vw] mt-12 w-max"
          >
            {/* Upcoming Section */}
            <div className="flex flex-col items-center">
              <h3 className="font-serif text-3xl font-light text-[#1A1A18] lowercase mb-12">
                Upcoming Events
              </h3>
              <div className="flex gap-8">
                {upcomingJourneys.map((journey, i) => (
                  <div key={journey.title} className="w-[300px] shrink-0">
                    <JourneyCard 
                      journey={journey} 
                      index={i} 
                      onClick={() => handleSelect(journey)}
                      compact={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-[1px] h-[400px] bg-[#1A1A18]/10" />

            {/* Past Section */}
            <div className="flex flex-col items-center">
              <h3 className="font-serif text-3xl font-light text-[#1A1A18] lowercase mb-12">
                Past Memories
              </h3>
              <div className="flex gap-8">
                {completedJourneys.map((journey, i) => (
                  <div key={journey.title} className="w-[300px] shrink-0">
                    <JourneyCard 
                      journey={journey} 
                      index={i} 
                      onClick={() => handleSelect(journey)}
                      compact={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Overlays */}
      <AnimatePresence>
        {selectedJourney && selectedJourney.status === "Completed" && (
          <MemoryOverlay 
            key="memory-overlay" 
            journey={selectedJourney} 
            onClose={handleCloseOverlay} 
          />
        )}
        
        {selectedJourney && selectedJourney.status === "Upcoming" && selectedJourney.type !== "event" && (
          <TripInterestOverlay 
            key="interest-overlay" 
            journey={selectedJourney} 
            onClose={handleCloseOverlay} 
          />
        )}

        {showTmolOverlay && (
          <TmolRegistrationOverlay
            key="journeys-tmol-overlay"
            onClose={() => setShowTmolOverlay(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
