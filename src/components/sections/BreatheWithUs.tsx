import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type BreathPhase = "inhale" | "hold-full" | "exhale" | "hold-empty";

const CYCLE_S = 10; // seconds per full breath

// Map phase to display text
const PHASE_TEXT: Record<BreathPhase, string> = {
  "inhale": "Inhale...",
  "hold-full": "Hold.",
  "exhale": "Exhale...",
  "hold-empty": "...",
};

// Mandala SVG — 4 concentric rings + 8-petal lotus
function Mandala({ scale }: { scale: number }) {
  return (
    <svg
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      width={300}
      height={300}
      style={{ display: "block" }}
    >
      {/* Outer rings — counterscale slightly (create depth as lotus breathes) */}
      <circle cx="150" cy="150" r="138" stroke={`rgba(212,175,55,${0.04 + (1 - scale) * 0.04})`} strokeWidth="1" fill="none" />
      <circle cx="150" cy="150" r="118" stroke={`rgba(212,175,55,${0.05 + (1 - scale) * 0.03})`} strokeWidth="0.8" fill="none" />
      <circle cx="150" cy="150" r="98"  stroke={`rgba(212,175,55,0.07)`} strokeWidth="0.7" fill="none" />
      <circle cx="150" cy="150" r="74"  stroke={`rgba(212,175,55,0.06)`} strokeWidth="0.7" fill="none" />

      {/* 8 large petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={`petal-${deg}`}
          cx="150" cy="150"
          rx="16" ry="48"
          fill={`rgba(212,175,55,${0.04 + (scale - 0.92) * 0.08})`}
          transform={`rotate(${deg} 150 150) translate(0 -48)`}
        />
      ))}

      {/* 16 small petal points at r=100 */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 360) / 16;
        const x = 150 + Math.cos((angle * Math.PI) / 180) * 100;
        const y = 150 + Math.sin((angle * Math.PI) / 180) * 100;
        return (
          <circle
            key={`dot-${i}`}
            cx={x} cy={y}
            r="2"
            fill={`rgba(212,175,55,${0.08 + (scale - 0.92) * 0.15})`}
          />
        );
      })}

      {/* Inner lotus — 4 petals */}
      {[0, 90, 180, 270].map((deg) => (
        <ellipse
          key={`inner-${deg}`}
          cx="150" cy="150"
          rx="9" ry="22"
          fill={`rgba(212,175,55,${0.09 + (scale - 0.92) * 0.1})`}
          transform={`rotate(${deg} 150 150) translate(0 -22)`}
        />
      ))}

      {/* Center glowing core */}
      <circle cx="150" cy="150" r="8"  fill={`rgba(212,175,55,${0.08 + (scale - 0.92) * 0.15})`} />
      <circle cx="150" cy="150" r="3"  fill={`rgba(212,175,55,0.22)`} />
    </svg>
  );
}

export default function BreatheWithUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-15%" });

  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [currentScale, setCurrentScale] = useState(0.92);
  const [active, setActive] = useState(false);

  // Start breathing cycle when section enters view
  useEffect(() => {
    if (!inView) {
      setActive(false);
      return;
    }

    setActive(true);
    let elapsed = 0;
    const TICK = 80; // ms

    const interval = setInterval(() => {
      elapsed = (elapsed + TICK) % (CYCLE_S * 1000);
      const t = elapsed / 1000;

      let p: BreathPhase;
      let s: number;

      if (t < 4) {
        p = "inhale";
        s = 0.92 + (t / 4) * 0.16;
      } else if (t < 5) {
        p = "hold-full";
        s = 1.08;
      } else if (t < 9) {
        p = "exhale";
        s = 1.08 - ((t - 5) / 4) * 0.16;
      } else {
        p = "hold-empty";
        s = 0.92;
      }

      setPhase(p);
      setCurrentScale(s);
    }, TICK);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial ambient glow behind mandala */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          transition: "transform 0.5s ease",
          transform: `translate(-50%, -50%) scale(${currentScale})`,
        }}
      />

      {/* The Mandala */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={active ? { opacity: 1, scale: currentScale } : { opacity: 0, scale: 0.8 }}
        transition={
          active
            ? { duration: CYCLE_S, ease: "easeInOut" }
            : { duration: 1.2 }
        }
        className="relative"
        style={{ transition: `transform ${CYCLE_S}s ease-in-out, opacity 1.2s ease` }}
      >
        <Mandala scale={currentScale} />
      </motion.div>

      {/* Breath phase text */}
      <div className="mt-8 h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="font-serif text-gold/40 text-sm tracking-[0.5em] lowercase select-none"
          >
            {PHASE_TEXT[phase]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Tiny scroll prompt */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="mt-12 text-muted-foreground/20 text-[9px] tracking-[0.4em] lowercase select-none"
      >
        take a breath · scroll when ready
      </motion.p>
    </section>
  );
}
