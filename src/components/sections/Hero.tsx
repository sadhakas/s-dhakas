import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Main text parallax
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Clutter parallax elements (moving at different speeds to create depth)
  const clutterY1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const clutterY2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const clutterY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const clutterOpacity = useTransform(scrollYProgress, [0, 0.5], [0.25, 0]);

  return (
    <section id="hero" ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* NARRATIVE ARC: "THE CLUTTER" 
            Abstract, chaotic elements representing the noise of modern life.
            These elements aggressively parallax and fade away as the user scrolls, 
            beginning the journey towards clarity. */}
        <motion.div 
          style={{ opacity: clutterOpacity }} 
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Chaotic SVG paths */}
          <motion.svg style={{ y: clutterY1 }} className="absolute top-[5%] left-[0%] w-[50vw] h-[60vh] opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M-10,50 Q20,-10 40,60 T70,10 T110,80" fill="none" stroke="#1A1A18" strokeWidth="0.2" />
            <path d="M-5,80 Q30,100 50,40 T80,-10" fill="none" stroke="#1A1A18" strokeWidth="0.3" />
            <path d="M10,20 Q40,90 60,10 T100,50" fill="none" stroke="#1A1A18" strokeWidth="0.1" />
          </motion.svg>

          <motion.svg style={{ y: clutterY2 }} className="absolute top-[20%] right-[-10%] w-[60vw] h-[80vh] opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,90 Q40,10 60,70 T100,20" fill="none" stroke="#1A1A18" strokeWidth="0.4" />
            <path d="M20,0 Q30,100 70,30 T120,80" fill="none" stroke="#1A1A18" strokeWidth="0.2" />
          </motion.svg>

          {/* Typographic Clutter */}
          <motion.div style={{ y: clutterY3 }} className="absolute top-[25%] left-[10%] text-3xl md:text-5xl font-serif text-[#1A1A18] transform -rotate-6 blur-[1px]">Noise.</motion.div>
          <motion.div style={{ y: clutterY1 }} className="absolute top-[65%] left-[15%] text-xl md:text-3xl font-sans tracking-widest text-[#1A1A18] transform rotate-12 opacity-80 blur-[2px]">Overload</motion.div>
          <motion.div style={{ y: clutterY2 }} className="absolute top-[35%] right-[15%] text-5xl md:text-7xl font-serif text-[#1A1A18] transform rotate-6 blur-[1px] opacity-70">Hustle</motion.div>
          <motion.div style={{ y: clutterY3 }} className="absolute top-[75%] right-[20%] text-lg md:text-2xl font-mono text-[#1A1A18] transform -rotate-12 opacity-90 blur-[3px]">distraction_</motion.div>
          <motion.div style={{ y: clutterY1 }} className="absolute top-[45%] left-[50%] -translate-x-1/2 text-7xl md:text-9xl font-serif text-[#1A1A18] opacity-30 transform scale-150 blur-[4px]">Anxiety</motion.div>
          <motion.div style={{ y: clutterY2 }} className="absolute top-[15%] left-[40%] text-2xl font-sans italic text-[#1A1A18] transform rotate-45 opacity-60">more. faster.</motion.div>
        </motion.div>

        {/* MAIN HERO TEXT (The anchor of clarity amidst the clutter) */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl lg:text-[11rem] font-light tracking-[0.02em] text-[#1A1A18] select-none"
            style={{ fontFamily: "'Gencha', serif" }}
          >
            Sādhakas
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="w-24 md:w-40 h-[1px] bg-[#1A1A18]/40 mx-auto my-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="font-serif text-lg md:text-2xl text-[#1A1A18]/60 tracking-[0.4em] uppercase font-light"
          >
            The Missing Curriculum
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ opacity: titleOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#1A1A18]/40 font-mono">Scroll to begin</span>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#1A1A18]/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
