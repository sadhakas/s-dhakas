import { motion } from "framer-motion";

export interface JourneyData {
  title: string;
  location: string;
  description: string;
  status: "Completed" | "Upcoming";
  date: string;
  image: string;
  gallery?: string[];
  cost?: string;
  startPoint?: string;
  endPoint?: string;
  duration?: string;
  exactDates?: string;
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
      whileHover={{ y: -10, scale: 1.02 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
      className={`group relative bg-surface/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-surface/80 hover:shadow-[0_0_40px_rgba(var(--color-primary),0.1)] cursor-pointer ${
        compact ? "flex-none w-[300px] md:w-[350px]" : ""
      }`}
    >
      {/* Image / Poster */}
      <div className={`relative overflow-hidden ${compact ? "h-40 md:h-44" : "h-56 md:h-64"}`}>
        <img
          src={journey.image}
          alt={journey.title}
          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110 memory-mode"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

        {/* Status badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`text-[10px] tracking-[0.2em] lowercase px-3 py-1 rounded-full border ${
              isCompleted
                ? "border-primary/30 text-primary/60 bg-background/60"
                : "border-primary/50 text-primary bg-background/60"
            } backdrop-blur-sm shadow-lg`}
          >
            {isCompleted ? "memory" : "upcoming"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={compact ? "p-4 md:p-6" : "p-6 md:p-8"}>
        <p className="text-primary text-[10px] tracking-[0.3em] lowercase mb-2">
          {journey.location}
        </p>
        <h3 className={`font-serif font-light text-foreground mb-3 lowercase ${compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}>
          {journey.title}
        </h3>
        <p className={`text-muted-foreground text-sm leading-relaxed mb-4 ${compact ? "line-clamp-2" : ""}`}>
          {journey.description}
        </p>
        <p className="text-muted-foreground/40 text-[10px] tracking-[0.15em]">
          {journey.date}
        </p>
        <div className="mt-6 w-12 h-[1px] bg-gradient-to-r from-primary/20 to-transparent group-hover:from-primary/60 transition-colors duration-500" />
      </div>
    </motion.div>
  );
}
