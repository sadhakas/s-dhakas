import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  /** Called when the user dismisses the overlay */
  onClose: () => void;
}

export default function ConnectionWave({ onClose }: Props) {
  const [waveKey, setWaveKey] = useState(0);

  // Re-trigger the wave ring animation each time it mounts
  useEffect(() => {
    setWaveKey((k) => k + 1);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleRegister = () => {
    onClose();
    setTimeout(() => {
      document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Wave rings — decorative, positioned at center */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 0.3, 0.6].map((delay, i) => (
          <div
            key={`${waveKey}-${i}`}
            className="connection-wave-ring"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-sm w-full mx-4 rounded-3xl border border-gold/20 bg-surface/80 backdrop-blur-2xl p-10 text-center shadow-[0_0_80px_rgba(212,175,55,0.12)]"
      >
        {/* Decorative gold circle */}
        <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c4.97 0 9 3.582 9 8s-4.03 8-9 8a9.863 9.863 0 01-4.255-.96L3 21l1.97-4.745A7.93 7.93 0 013 11c0-4.418 4.03-8 9-8z"
            />
          </svg>
        </div>

        <p className="text-gold-dim text-xs tracking-[0.35em] lowercase mb-3">
          you've lingered
        </p>
        <h2 className="font-serif text-3xl text-foreground font-light mb-3 leading-snug">
          You belong here.
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          The fact that you're still here means something is pulling you.
          Don't walk away without taking the next step.
        </p>

        <div className="flex flex-col gap-3">
          {/* Primary — Register */}
          <button
            onClick={handleRegister}
            className="w-full py-3 px-6 rounded-full bg-gold text-black text-sm font-medium tracking-wide hover:bg-gold-bright transition-colors duration-300"
          >
            Register →
          </button>

          {/* Secondary — WhatsApp */}
          <a
            href="https://chat.whatsapp.com/EjTFqNEk2dEKySTooqr2Ak?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3 px-6 rounded-full border border-gold/30 text-gold text-sm font-medium tracking-wide hover:border-gold/70 hover:bg-gold/5 transition-all duration-300"
          >
            Join the Community
          </a>
        </div>

        {/* Dismiss */}
        <button
          onClick={onClose}
          className="mt-6 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-300 tracking-widest lowercase"
        >
          not yet
        </button>
      </motion.div>
    </motion.div>
  );
}
