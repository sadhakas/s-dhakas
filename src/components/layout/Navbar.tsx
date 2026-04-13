import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      style={{ left: "50%" }}
      className="fixed bottom-6 z-40 bg-surface-elevated/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/80"
    >
      <div className="px-4 py-2.5 flex items-center justify-between gap-6 md:gap-12 min-w-max">
        {/* Logo Section */}
        <div className="flex items-center gap-3 pl-2">
          {/* We point this to a generic local path, it falls back gracefully to styling if missing */}
          <img 
            src="/assets/images/logo.png" 
            alt="Sādhakas Logo" 
            className="h-8 md:h-10 w-auto object-contain"
            onError={(e) => {
              // Hide broken image icon if logo hasn't been uploaded yet
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-serif text-xl font-light tracking-widest text-foreground hidden sm:block">
            Sādhakas
          </span>
        </div>

        {/* WhatsApp Community Button */}
        <a 
          href="https://chat.whatsapp.com/EjTFqNEk2dEKySTooqr2Ak?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-5 py-2 rounded-full border border-gold/30 hover:border-gold/80 transition-colors duration-500 overflow-hidden whitespace-nowrap"
        >
          <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-dim group-hover:text-gold transition-colors duration-500">
            Join Community
          </span>
        </a>
      </div>
    </motion.nav>
  );
}
