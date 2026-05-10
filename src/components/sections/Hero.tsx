import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePerspectiveShift } from "../../hooks/usePerspectiveShift";
import { Link } from "@tanstack/react-router";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { engage, disengage } = usePerspectiveShift();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const circleScale1 = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const circleScale2 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const circleScale3 = useTransform(scrollYProgress, [0, 1], [1, 3.5]);
  const circleScale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const circles = [
    { scale: circleScale4, size: 500, delay: 0 },
    { scale: circleScale3, size: 380, delay: 0.1 },
    { scale: circleScale2, size: 260, delay: 0.2 },
    { scale: circleScale1, size: 140, delay: 0.3 },
  ];

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Concentric circle rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {circles.map((c, i) => (
            <motion.div
              key={i}
              style={{ scale: c.scale }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: c.delay + 0.5 }}
              className="absolute rounded-full border border-gold/20"
              aria-hidden
            >
              <div style={{ width: c.size, height: c.size }} className="rounded-full" />
            </motion.div>
          ))}
        </div>
        {/* Drifting Mantra Card Portal */}
        <motion.div
          animate={{
            y: [0, -40, 20, -20, 0],
            x: [0, 30, -15, 25, 0],
            rotate: [-5, 5, -2, 4, -5],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ opacity: titleOpacity }}
          className="absolute z-20 top-[15%] right-[5%] md:right-[15%] lg:right-[20%] cursor-pointer group pointer-events-auto"
        >
          <Link to="/mantra-card" className="block relative">
            {/* The Glassmorphic Drifting Card */}
            <div className="w-16 h-24 md:w-20 md:h-32 lg:w-24 lg:h-36 rounded-xl border border-gold/30 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] group-hover:border-gold/60 group-hover:scale-105 transition-all duration-700 flex flex-col items-center justify-center overflow-hidden">
               
               {/* Inner Border & Text */}
               <div className="absolute inset-x-1.5 top-1.5 bottom-1.5 md:inset-x-2 md:top-2 md:bottom-2 border border-gold/20 rounded-lg flex flex-col items-center justify-center p-1">
                  <div className="text-[6px] md:text-[8px] lg:text-[10px] uppercase tracking-widest text-gold/60 text-center font-serif leading-loose opacity-70 group-hover:opacity-100 transition-opacity">
                    Mantra<br/>Card
                  </div>
                  <div className="mt-2 w-4 md:w-6 h-[1px] bg-gold/30" />
               </div>

               {/* Subtle sweeping glare effect on hover */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out" />
            </div>
            
            {/* Tooltip hint */}
            <div className="absolute top-1/2 -left-4 -translate-x-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap pointer-events-none flex items-center pr-2">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold/80 font-serif dropping-shadow">Fetch the card</span>
              {/* Leader line pointing to the card */}
              <div className="absolute right-0 top-1/2 w-4 h-[1px] bg-gold/40 translate-x-full" />
            </div>
          </Link>
        </motion.div>
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 text-center px-4"
        >
          {/* Perspective shift hint */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="mb-4 select-none pt-2"
          >
            <span className="hidden md:inline text-gold-dim/40 text-[9px] tracking-[0.4em] uppercase">
              hover & hold
            </span>
            <span className="md:hidden text-gold-dim/40 text-[9px] tracking-[0.4em] uppercase">
              press & hold
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.04em] text-foreground cursor-pointer select-none inline-block relative"
            style={{ fontFamily: "'Gencha', serif" }}
            onMouseEnter={engage}
            onMouseLeave={disengage}
            onTouchStart={engage}
            onTouchEnd={disengage}
          >
            Sādhakas
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="gold-line w-32 md:w-48 mx-auto my-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="font-serif text-lg md:text-xl text-gold-dim tracking-[0.3em] uppercase font-light"
          >
            The Missing Curriculum
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ opacity: titleOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
