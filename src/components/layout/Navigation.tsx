import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "journeys", href: "#journeys" },
  { label: "philosophy", href: "#philosophy" },
  { label: "journal", href: "#problem" },
  { label: "register", href: "#register" },
];

export default function Navigation() {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const isOpen = isPinned || isHovered || isMobileOpen;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
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

  return (
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
              <p className="text-muted-foreground/40 text-[10px] lowercase tracking-[0.15em]">
                sādhakas
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
