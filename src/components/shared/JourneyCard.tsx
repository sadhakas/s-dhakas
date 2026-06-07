import { motion } from "framer-motion";

export interface JourneyData {
  title: string;
  location: string;
  description: string;
  status: "Completed" | "Upcoming";
  date: string;
  image?: string;
  gallery?: string[];
  cost?: string;
  startPoint?: string;
  endPoint?: string;
  duration?: string;
  exactDates?: string;
  type?: "trip" | "event";
}

export default function JourneyCard({ 
  journey, 
  index, 
  onClick,
  compact = false
}: { 
  journey: JourneyData; 
  index: number; 
  onClick?: () => void;
  compact?: boolean;
}) {
  const isCompleted = journey.status === "Completed";

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`group relative bg-surface border border-border rounded-lg overflow-hidden transition-colors duration-500 hover:border-gold/40 cursor-pointer h-full flex flex-col ${
        compact ? "flex-none w-[300px] md:w-[350px]" : ""
      }`}
    >
      {/* Image / Poster */}
      <div className={`relative overflow-hidden ${compact ? "h-40 md:h-44" : "h-56 md:h-64"}`}>
        {journey.image ? (
          <img
            src={journey.image}
            alt={journey.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 memory-mode"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(10,8,6,0.95) 100%)" }}
          >
            <span className="font-serif text-gold/30 text-4xl tracking-widest select-none">
              {journey.type === "event" ? "✦" : "◎"}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

        {/* Status / type badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`text-[10px] tracking-[0.2em] lowercase px-3 py-1 rounded-full border ${
              isCompleted
                ? "border-gold/30 text-gold-dim bg-background/60"
                : "border-gold/50 text-gold bg-background/60"
            } backdrop-blur-sm shadow-lg`}
          >
            {isCompleted ? "memory" : journey.type === "event" ? "event" : "upcoming"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${compact ? "p-4 md:p-6" : "p-6 md:p-8"}`}>
        <p className="text-gold-dim text-[10px] tracking-[0.3em] lowercase mb-2">
          {journey.location}
        </p>
        <h3 className={`font-serif font-light text-foreground mb-3 lowercase ${compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}>
          {journey.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {journey.description}
        </p>
        <p className="text-muted-foreground/40 text-[10px] tracking-[0.15em]">
          {journey.date}
        </p>
        <div className="mt-auto pt-6 border-t border-border/50">
          <button className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 px-4 rounded-md text-xs font-semibold tracking-widest uppercase hover:bg-accent/90 transition-all duration-300">
            {isCompleted ? "View Memories" : "Explore Journey"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
