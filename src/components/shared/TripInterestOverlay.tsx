import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, MapPin, Calendar, Clock, CreditCard } from "lucide-react";
import type { JourneyData } from "./JourneyCard";
import InterestForm from "./InterestForm";

interface TripInterestOverlayProps {
  journey: JourneyData;
  onClose: () => void;
}

export default function TripInterestOverlay({ journey, onClose }: TripInterestOverlayProps) {
  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <motion.div 
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-surface border border-gold/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-gold/5"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-sm rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Trip Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto border-b md:border-b-0 md:border-r border-border custom-scrollbar">
          <p className="text-gold-dim text-[10px] tracking-[0.4em] lowercase mb-4">
            upcoming journey
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-6">
            {journey.title}
          </h2>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            {journey.description}
          </p>

          {/* Embedded Poster for easy metadata/QR viewing */}
          {journey.image && (
            <div className="mb-10 rounded-xl overflow-hidden border border-gold/10 shadow-lg shadow-black/20 bg-black/40 flex items-center justify-center">
              <img 
                src={journey.image} 
                alt={`${journey.title} Poster`} 
                className="w-full max-w-sm h-auto max-h-[500px] object-contain" 
              />
            </div>
          )}

          <div className="space-y-6">
            {/* Dates */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gold/10 text-gold">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-1">Dates</p>
                <p className="text-muted-foreground text-sm">{journey.exactDates || journey.date}</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gold/10 text-gold">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-1">Duration</p>
                <p className="text-muted-foreground text-sm">{journey.duration || "TBD"}</p>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gold/10 text-gold">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-1">Route</p>
                <p className="text-muted-foreground text-sm">
                  {journey.startPoint ? `${journey.startPoint} ➔ ${journey.endPoint}` : journey.location}
                </p>
              </div>
            </div>

            {/* Cost */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gold/10 text-gold">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-1">Cost</p>
                <p className="text-muted-foreground text-sm">{journey.cost || "Details coming soon"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interest Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-background/50 custom-scrollbar flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h3 className="font-serif text-2xl text-foreground mb-8">
              Register Your Interest
            </h3>
            <InterestForm journeyTitle={journey.title} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
