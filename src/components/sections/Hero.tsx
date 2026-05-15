import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PortalCard from "../shared/PortalCard";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section ref={ref} className="relative min-h-screen bg-background overflow-hidden flex items-center">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10"
      >
        {/* Left Side: Sharp Typography Branding */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left mt-20 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="overflow-hidden mb-6"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-surface border border-border text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              The Missing Curriculum
            </span>
          </motion.div>

          {/* Staggered Text Reveal for the Title */}
          <h1 className="text-7xl md:text-8xl lg:text-[130px] font-serif text-foreground leading-[0.85] tracking-tight cursor-default flex flex-wrap justify-center md:justify-start overflow-hidden">
            {"Sādhakas".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2 + index * 0.08,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="mt-8 text-muted-foreground font-sans font-light text-lg md:text-xl max-w-md leading-relaxed mx-auto md:mx-0"
          >
            An interactive deep-dive into the fundamental mechanics of living with clarity and purpose. 
            Step out of the noise.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.76, 0, 0.24, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <button
              onClick={() => document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 text-sm tracking-wide shadow-[0_0_30px_rgba(var(--color-primary),0.3)]"
            >
              Discover The Manual of Life
            </button>

            {/* Floating Community Badge */}
            <a
              href="https://chat.whatsapp.com/EjTFqNEk2dEKySTooqr2Ak?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 hover:border-primary/60 transition-all duration-500 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-primary text-sm font-light tracking-wide group-hover:text-primary/90 transition-colors">
                Join the Community
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: 2.5D Interactive Portal Card */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex justify-center md:justify-end w-full"
        >
          <div className="relative w-full">
            <PortalCard />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-border to-transparent"
        />
      </motion.div>
    </section>
  );
}
