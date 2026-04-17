import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ConnectionWave from "../shared/ConnectionWave";

export default function Footer() {
  const [showWave, setShowWave] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBrandEnter = () => {
    holdTimer.current = setTimeout(() => setShowWave(true), 1200);
  };
  const handleBrandLeave = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  return (
    <>
      <footer className="relative py-16 px-6">
        <div className="gold-line max-w-xs mx-auto mb-12 opacity-30" />
        <div className="max-w-5xl mx-auto text-center">

          {/* Feature 8 — Long-hover triggers Connection Wave */}
          <p
            className="font-serif text-2xl text-foreground font-light mb-2 cursor-default select-none transition-colors duration-500 hover:text-gold/80"
            onMouseEnter={handleBrandEnter}
            onMouseLeave={handleBrandLeave}
            title="Hold to feel the connection..."
          >
            Sādhakas
          </p>

          <p className="text-muted-foreground/40 text-[10px] tracking-[0.3em] lowercase mb-8">
            the missing curriculum
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            {[
              { label: "philosophy", href: "#philosophy" },
              { label: "offerings", href: "#offerings" },
              { label: "manual of life", href: "#manual" },
              { label: "journeys", href: "#journeys" },
              { label: "register", href: "#register" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() =>
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-muted-foreground/40 text-[10px] tracking-[0.2em] lowercase hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
          <p className="text-muted-foreground/20 text-[10px] tracking-[0.15em] lowercase">
            © {new Date().getFullYear()} sādhakas. all rights reserved.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showWave && <ConnectionWave onClose={() => setShowWave(false)} />}
      </AnimatePresence>
    </>
  );
}
