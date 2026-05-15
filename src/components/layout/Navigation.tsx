import { useState, useRef, useEffect } from "react";
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

  // Close menu on outside click
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        isOpen && 
        window.innerWidth < 768 && 
        navRef.current && 
        !navRef.current.contains(e.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

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
        ref={navRef}
        className="fixed top-6 right-6 z-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-4">
          {/* Menu Icon */}
          <button
            onClick={handleClick}
            className="relative z-50 flex flex-col gap-1.5 p-2 group cursor-pointer"
            aria-label="Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1px] bg-white origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-4 h-[1px] bg-white ml-auto"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1px] bg-white origin-center"
            />
          </button>
        </div>

        {/* Full Screen Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center"
            >
              <ul className="flex flex-col items-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-foreground hover:text-primary text-5xl md:text-7xl font-serif tracking-tight transition-colors duration-500 cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 text-center"
              >
                <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent mx-auto mb-6" />
                {/* Feature 8 trigger — long hover on brand text */}
                <p
                  className="text-muted-foreground/40 text-xs uppercase tracking-[0.4em] cursor-default select-none transition-colors duration-300 hover:text-primary"
                  onMouseEnter={handleBrandMouseEnter}
                  onMouseLeave={handleBrandMouseLeave}
                  title="Hold to feel the connection..."
                >
                  sādhakas
                </p>
              </motion.div>
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
