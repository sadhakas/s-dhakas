import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
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
        {/* Concentric circles */}
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
              <div
                style={{ width: c.size, height: c.size }}
                className="rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.04em] text-foreground"
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
