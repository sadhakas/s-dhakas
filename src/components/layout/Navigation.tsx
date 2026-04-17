import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectionWave from "../shared/ConnectionWave";

const navLinks = [
  { label: "philosophy", href: "#philosophy" },
  { label: "offerings", href: "#offerings" },
  { label: "manual of life", href: "#manual" },
  { label: "journeys", href: "#journeys" },
  { label: "register", href: "#register" },
];

export default function Navigation() {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Feature 6 — Resonating Swan
  const [swanClickCount, setSwanClickCount] = useState(0);
  const [showRipple, setShowRipple] = useState(false);
  const rippleKey = useRef(0);

  // Feature 8 — Connection Wave (triggered from nav brand text)
  const [showWave, setShowWave] = useState(false);
  const waveHoldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const isOpen = isPinned || isHovered || isMobileOpen;

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    timeoutRef.current = setTimeout(() => setIsHovered(false), 200);
  };

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsPinned(!isPinned);
      if (!isPinned) setIsHovered(false);
    }
  };

  const handleLinkClick = (href: string) => {
    setIsMobileOpen(false);
    setIsPinned(false);
    setIsHovered(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // Feature 6 — Swan ripple: 3 clicks trigger a ripple
  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = swanClickCount + 1;
    setSwanClickCount(next);
    if (next >= 3) {
      rippleKey.current += 1;
      setShowRipple(true);
      setSwanClickCount(0);
      setTimeout(() => setShowRipple(false), 1400);
    }
  };

  // Feature 8 — Long-hover on "Sādhakas" brand text in nav panel
  const handleBrandMouseEnter = () => {
    waveHoldTimer.current = setTimeout(() => setShowWave(true), 1200);
  };
  const handleBrandMouseLeave = () => {
    if (waveHoldTimer.current) clearTimeout(waveHoldTimer.current);
  };

  return (
    <>
      <div
        className="fixed top-6 right-6 z-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Menu Icon */}
        <button
          onClick={handleClick}
          className="relative z-50 flex flex-col gap-1.5 p-2 group cursor-pointer"
          aria-label="Menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[1px] bg-gold origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-4 h-[1px] bg-gold ml-auto"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[1px] bg-gold origin-center"
          />
        </button>

        {/* Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-0 right-0 pt-14 pr-2"
            >
              <div className="bg-surface-elevated/95 backdrop-blur-xl border border-border rounded-lg p-6 min-w-[180px]">
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-muted-foreground hover:text-gold text-sm lowercase tracking-[0.2em] transition-colors duration-300 cursor-pointer"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="gold-line mt-5 mb-3 opacity-30" />
                {/* Feature 8 trigger — long hover on brand text */}
                <p
                  className="text-muted-foreground/40 text-[10px] lowercase tracking-[0.15em] cursor-default select-none transition-colors duration-300 hover:text-gold/30"
                  onMouseEnter={handleBrandMouseEnter}
                  onMouseLeave={handleBrandMouseLeave}
                  title="Hold to feel the connection..."
                >
                  sādhakas
                </p>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Feature 6 — Logo area with ripple (inside Navbar pill — targeting the logo img in Navbar.tsx instead) */}
      {/* Swan ripple is triggered from the Navbar logo — see Navbar.tsx */}

      {/* Feature 8 — Connection Wave overlay */}
      <AnimatePresence>
        {showWave && <ConnectionWave onClose={() => setShowWave(false)} />}
      </AnimatePresence>
    </>
  );
}
