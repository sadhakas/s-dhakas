import { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SECTION_IDS = ["philosophy", "problem", "offerings", "manual", "journeys", "register"];

export default function IlluminatedPath() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  // FIX: compute y as pixels so we use transform (GPU) not top (layout reflow)
  const tipYRaw = useTransform(scrollYProgress, (v) => {
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    return v * (h - 8);
  });
  const tipY = useSpring(tipYRaw, { stiffness: 80, damping: 25, restDelta: 0.5 });

  const [flares, setFlares] = [[] as { id: number; top: number }[], () => {}];
  const flareState = useRef<{ id: number; top: number }[]>([]);
  const flareCounter = useRef(0);
  const firedSections = useRef<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !firedSections.current.has(id)) {
              firedSections.current.add(id);

              // Spawn a flare imperatively — no React state needed
              const container = containerRef.current;
              if (!container) return;

              const rect = el.getBoundingClientRect();
              const topPercent =
                (window.scrollY + rect.top) / document.documentElement.scrollHeight;
              const topPx = topPercent * window.innerHeight;

              const flare = document.createElement("div");
              flare.className = "path-flare";
              flare.style.top = `${Math.min(topPx, window.innerHeight - 4)}px`;
              container.appendChild(flare);
              setTimeout(() => flare.remove(), 900);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:block fixed left-5 top-0 bottom-0 w-[2px] z-30 pointer-events-none"
    >
      {/* Faint track */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      {/* Progress line — uses scaleY (GPU transform) */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          height: "100%",
          background:
            "linear-gradient(to bottom, transparent, rgba(212,175,55,0.15) 10%, rgba(212,175,55,0.5), rgba(212,175,55,0.2) 90%, transparent)",
        }}
      />

      {/* Tip glow — uses y (GPU transform), NOT top (layout property) */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full"
        style={{
          top: 0,
          y: tipY,
          background: "rgba(212,175,55,0.9)",
          boxShadow: "0 0 8px 3px rgba(212,175,55,0.4)",
        }}
      />
    </div>
  );
}
