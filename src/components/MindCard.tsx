import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MindData } from "../data/minds";

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
      className="group relative bg-surface border border-border rounded-lg p-8 transition-colors duration-500 hover:border-gold/40"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/50 transition-all duration-700" />

      <p className="text-gold text-xs tracking-[0.3em] lowercase mb-1">
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

      <div className="gold-line mt-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
    </motion.div>
  );
}
