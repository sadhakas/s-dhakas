import { motion, useMotionValue, useTransform } from "framer-motion";

export default function PortalCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full max-w-[400px] aspect-[3/4] flex items-center justify-center mx-auto perspective-1000">
      {/* Magical Aura behind the card */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-primary/40 blur-[100px] rounded-full pointer-events-none"
      />

      {/* The Glass Portal Card */}
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-full h-full bg-surface-elevated/40 backdrop-blur-3xl border border-primary/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(var(--color-primary),0.1)] flex flex-col justify-between overflow-hidden cursor-pointer group"
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-[10px] text-primary uppercase tracking-[0.3em] mb-2 font-medium">The Portal Opens</p>
            <h3 className="font-serif text-5xl md:text-6xl text-foreground mb-6 tracking-tight leading-[0.9]">
              The Manual<br/>
              <span className="text-gold">of Life</span>
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-4 text-sm font-light text-muted-foreground"
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span>Date</span>
              <span className="text-foreground">13th June - 5th July</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span>Commitment</span>
              <span className="text-foreground">30 mins / day</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span>Cost</span>
              <span className="text-foreground">₹300</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 p-4 rounded-xl bg-black/20 border border-white/5"
          >
            <p className="text-xs text-primary mb-1 uppercase tracking-widest font-medium">Included Perks</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Certification, Physical Self-Help Book, Lifetime Sādhakas Access, and <strong className="text-foreground">₹3500 off</strong> the Detox & Discover Trip.
            </p>
          </motion.div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-full py-4 bg-primary text-primary-foreground font-medium rounded-xl text-sm uppercase tracking-[0.15em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
        >
          Register Now
        </motion.button>
      </motion.div>
    </div>
  );
}
