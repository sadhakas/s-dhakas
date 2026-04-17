import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectionWave from "../shared/ConnectionWave";
import { usePerspectiveShift } from "../../hooks/usePerspectiveShift";

export default function Navbar() {
  // Feature 6 — Resonating Swan: 3 clicks → ripple → Connection Wave
  const [swanCount, setSwanCount] = useState(0);
  const [ripples, setRipples] = useState<number[]>([]);
  const [showWave, setShowWave] = useState(false);
  const rippleCounter = useRef(0);

  // Feature — Perspective Shift trigger #2 (logo area)
  const { engage, disengage } = usePerspectiveShift();

  const handleLogoClick = () => {
    const next = swanCount + 1;
    setSwanCount(next);

    if (next >= 3) {
      const id = ++rippleCounter.current;
      setRipples((prev) => [...prev, id]);
      setSwanCount(0);
      // After ripple expands, open Connection Wave
      setTimeout(() => setShowWave(true), 700);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r !== id)), 1400);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        style={{ left: "50%" }}
        className="fixed bottom-6 z-40 bg-surface-elevated/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/80"
      >
        <div className="px-4 py-2.5 flex items-center justify-between gap-6 md:gap-12 min-w-max">

          {/* Logo + Brand */}
          <div className="relative flex items-center gap-3 pl-2">
            
            {/* Perspective shift hint hovering just above the Sādhakas text */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
              className="absolute -top-[18px] left-[3.2rem] md:left-[4rem] pointer-events-none select-none whitespace-nowrap"
            >
              <span className="hidden md:inline text-gold-dim/40 text-[8px] tracking-[0.4em] uppercase">
                hover & hold
              </span>
              <span className="md:hidden text-gold-dim/40 text-[8px] tracking-[0.4em] uppercase">
                press & hold
              </span>
            </motion.div>
            
            {/* Swan ripple rings */}
            <AnimatePresence>
              {ripples.map((id) => (
                <motion.div
                  key={id}
                  initial={{ scale: 0.5, opacity: 0.6 }}
                  animate={{ scale: 4.5, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute top-1/2 left-[1.25rem] md:left-[1.5rem] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/70 pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
                />
              ))}
            </AnimatePresence>

            {/* Logo button — Connection Wave trigger (3 clicks) */}
            <button
              onClick={handleLogoClick}
              className="relative cursor-pointer focus:outline-none divine-spark rounded-full"
              aria-label="Sādhakas logo"
              title={swanCount === 0 ? "Click 3 times..." : `${3 - swanCount} more click${3 - swanCount !== 1 ? "s" : ""}...`}
            >
              <img
                src="/assets/images/logo.png"
                alt="Sādhakas Logo"
                className="h-8 md:h-10 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </button>

            {/* "Sādhakas" text — Perspective Shift trigger #2 */}
            <span
              className="font-serif text-xl font-light tracking-widest text-foreground hidden sm:block cursor-pointer select-none"
              onMouseEnter={engage}
              onMouseLeave={disengage}
              onTouchStart={engage}
              onTouchEnd={disengage}
            >
              Sādhakas
            </span>
          </div>

          {/* WhatsApp Join Button */}
          <a
            href="https://chat.whatsapp.com/EjTFqNEk2dEKySTooqr2Ak?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-5 py-2 rounded-full border border-gold/30 hover:border-gold/80 transition-colors duration-500 overflow-hidden whitespace-nowrap divine-spark"
          >
            <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-dim group-hover:text-gold transition-colors duration-500">
              Join Community
            </span>
          </a>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showWave && <ConnectionWave onClose={() => setShowWave(false)} />}
      </AnimatePresence>
    </>
  );
}
