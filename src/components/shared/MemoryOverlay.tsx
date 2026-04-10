import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { JourneyData } from "./JourneyCard";

interface MemoryOverlayProps {
  journey: JourneyData;
  onClose: () => void;
}

export default function MemoryOverlay({ journey, onClose }: MemoryOverlayProps) {
  // Gracefully filter out any undefined/null images if any exist
  const rawImages = journey.gallery || [journey.image];
  const images = rawImages.filter(Boolean);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length, isHovering]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 800 : -800,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 800 : -800,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
        className="relative w-full max-w-6xl h-[85vh] bg-surface border border-gold/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-gold/5"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-black/40 hover:bg-black/80 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Trip Details */}
        <div className="w-full md:w-1/3 p-8 md:p-12 overflow-y-auto border-b md:border-b-0 md:border-r border-border custom-scrollbar flex flex-col justify-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gold-dim text-[10px] tracking-[0.4em] lowercase mb-4"
          >
            {journey.date} · memory
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-serif text-3xl md:text-5xl font-light text-foreground mb-6"
          >
            {journey.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gold-dim text-sm leading-relaxed mb-6"
          >
            {journey.location}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-muted-foreground text-sm leading-relaxed"
          >
            {journey.description}
          </motion.p>
        </div>

        {/* Right Side: Slideshow */}
        <div className="relative w-full md:w-2/3 h-64 md:h-full bg-black flex items-center justify-center overflow-hidden">
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/60 backdrop-blur-sm rounded-full text-white/50 hover:text-white transition-all cursor-pointer"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/60 backdrop-blur-sm rounded-full text-white/50 hover:text-white transition-all cursor-pointer"
                onClick={() => paginate(1)}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {images.length > 0 ? (
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute w-full h-full object-cover opacity-90"
              />
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <p className="text-white/40 font-serif text-xl md:text-2xl font-light tracking-wide">
                Memories are being developed...
              </p>
            </div>
          )}

          {/* Progress indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-6 right-8 z-20 flex gap-2">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-6 bg-gold" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
