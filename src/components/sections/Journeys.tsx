import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import JourneyCard from "../shared/JourneyCard";
import type { JourneyData } from "../shared/JourneyCard";
import { journeysData } from "../../data/journeys";
import MemoryOverlay from "../shared/MemoryOverlay";
import TripInterestOverlay from "../shared/TripInterestOverlay";

// Custom inner Carousel component 
function JourneyCarousel({ 
  title, 
  journeys, 
  onSelect 
}: { 
  title: string; 
  journeys: JourneyData[]; 
  onSelect: (j: JourneyData) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Approximate scroll distance based on typical compact card width + gap
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (journeys.length === 0) return null;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="relative flex items-center justify-center mb-8">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground lowercase text-center">
          {title}
        </h3>
        
        {/* Navigation arrows isolated per carousel, anchored to the right */}
        {journeys.length > 1 && (
          <div className="absolute right-0 flex gap-2">
            <button 
              onClick={() => scroll("left")} 
              className="p-2 rounded-full bg-surface border border-border hover:border-gold/50 transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll("right")} 
              className="p-2 rounded-full bg-surface border border-border hover:border-gold/50 transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      {/* Scrollable Container with disabled visual scrollbar */}
      <div 
        ref={scrollRef} 
        className={`flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden ${
          journeys.length === 1 ? "justify-center" : "justify-start"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {journeys.map((journey, i) => (
          <div key={journey.title} className="snap-start flex-none">
            <JourneyCard 
              journey={journey} 
              index={i} 
              onClick={() => onSelect(journey)}
              compact={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Journeys() {
  const [selectedJourney, setSelectedJourney] = useState<JourneyData | null>(null);

  const handleCloseOverlay = () => {
    setSelectedJourney(null);
  };

  const upcomingJourneys = journeysData.filter((j) => j.status === "Upcoming");
  const completedJourneys = journeysData.filter((j) => j.status === "Completed");

  return (
    <>
      <section id="journeys" className="relative py-32 px-6">
        <div className="max-w-[90rem] mx-auto 2xl:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-gold-dim text-xs tracking-[0.4em] lowercase mb-4">
              where we wander
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              The Journeys
            </h2>
            <div className="gold-line w-24 mx-auto mt-6" />
          </motion.div>

          {/* Side-by-Side Dual Carousel Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <JourneyCarousel 
              title="Upcoming Trips" 
              journeys={upcomingJourneys} 
              onSelect={setSelectedJourney} 
            />
            
            <JourneyCarousel 
              title="Past Memories" 
              journeys={completedJourneys} 
              onSelect={setSelectedJourney} 
            />
          </div>
        </div>
      </section>

      {/* Render the appropriate overlay securely placed at the very top of the DOM */}
      <AnimatePresence>
        {selectedJourney && selectedJourney.status === "Completed" && (
          <MemoryOverlay 
            key="memory-overlay" 
            journey={selectedJourney} 
            onClose={handleCloseOverlay} 
          />
        )}
        
        {selectedJourney && selectedJourney.status === "Upcoming" && (
          <TripInterestOverlay 
            key="interest-overlay" 
            journey={selectedJourney} 
            onClose={handleCloseOverlay} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
