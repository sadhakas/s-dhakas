import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MindData } from "../../data/minds";

interface MindCardProps {
  mind: MindData;
  index: number;
}

export default function MindCard({ mind, index }: MindCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Stagger parallax offset per card
  const direction = index % 2 === 0 ? 1 : -1;
  const y = useTransform(scrollYProgress, [0, 1], [direction * 20, direction * -20]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="group relative bg-surface/50 backdrop-blur-xl border border-border rounded-2xl p-8 transition-all duration-500 hover:border-primary/40 hover:bg-surface/80 hover:shadow-[0_0_40px_rgba(var(--color-primary),0.1)]"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-700" />

      {/* Portrait / Avatar */}
      <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full overflow-hidden border border-border max-md:border-primary/50 md:group-hover:border-primary/50 transition-all duration-700 max-md:drop-shadow-[0_0_20px_rgba(var(--color-primary),0.4)] md:group-hover:drop-shadow-[0_0_20px_rgba(var(--color-primary),0.6)] z-10">
        <img
          src={mind.image}
          alt={mind.name}
          className="w-full h-full object-cover filter max-md:grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
        />
      </div>

      <p className="text-primary text-xs tracking-[0.3em] lowercase mb-1">
        {mind.domain}
      </p>
      <h3 className="font-serif text-3xl font-light text-foreground mb-4">
        {mind.name}
      </h3>
      <p className="text-muted-foreground/60 text-[10px] tracking-[0.2em] mb-6">
        {mind.years}
      </p>
      <blockquote className="font-serif text-sm md:text-base leading-relaxed text-muted-foreground italic">
        "{mind.quote}"
      </blockquote>

      <div className="mt-8 w-12 h-[1px] bg-gradient-to-r from-primary/20 to-transparent group-hover:from-primary/60 transition-colors duration-500" />
    </motion.div>
  );
}
