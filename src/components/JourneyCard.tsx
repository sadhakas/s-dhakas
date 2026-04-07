import { motion } from "framer-motion";

export interface JourneyData {
  title: string;
  location: string;
  description: string;
  status: "Completed" | "Upcoming";
  date: string;
  image: string;
}

export default function JourneyCard({ journey, index }: { journey: JourneyData; index: number }) {
  const isCompleted = journey.status === "Completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative bg-surface border border-border rounded-lg overflow-hidden transition-colors duration-500 hover:border-gold/40"
    >
      {/* Image */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={journey.image}
          alt={journey.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isCompleted ? "memory-mode" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`text-[10px] tracking-[0.2em] lowercase px-3 py-1 rounded-full border ${
              isCompleted
                ? "border-gold/30 text-gold-dim bg-background/60"
                : "border-gold/50 text-gold bg-background/60"
            } backdrop-blur-sm`}
          >
            {isCompleted ? "memory" : "upcoming"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <p className="text-gold-dim text-[10px] tracking-[0.3em] lowercase mb-2">
          {journey.location}
        </p>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-3 lowercase">
          {journey.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {journey.description}
        </p>
        <p className="text-muted-foreground/40 text-[10px] tracking-[0.15em]">
          {journey.date}
        </p>
        <div className="gold-line mt-6 opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
