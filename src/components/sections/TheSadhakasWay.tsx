import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const elements = [
  {
    title: "Question",
    description: "It begins with an inquiry. A profound realization that our standard education has left the most critical aspects of our existence entirely unaddressed.",
    dir: "left" as const
  },
  {
    title: "Gather",
    description: "We assemble into intentional spaces where vulnerability becomes a strength, and deep, unpretentious dialogue replaces superficial networking.",
    dir: "right" as const
  },
  {
    title: "Travel",
    description: "Moving from theory directly into experience. We step far out of familiar environments and into transformative landscapes that force an inward pivot.",
    dir: "left" as const
  },
  {
    title: "Integrate",
    description: "Reading the texts that truly matter, and weaving the eternal wisdom of philosophy, science, and the humanities back into our daily living.",
    dir: "right" as const
  },
  {
    title: "Act",
    description: "Action born strictly from clarity. Once the mind is settled, we return to the noise of the world not to escape it, but to engage with it entirely.",
    dir: "left" as const
  }
];

// ── Each step is its own component (Rules of Hooks: no hooks in .map) ──
function StepSlide({
  el,
  i,
  total,
  scrollYProgress
}: {
  el: typeof elements[0];
  i: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const sectionSize = 1 / total;
  const center = i * sectionSize + sectionSize / 2;
  const peakStart = i === 0 ? 0 : center - 0.06;
  const peakEnd = i === total - 1 ? 1 : center + 0.06;
  const fadeStart = Math.max(0, center - 0.18);
  const fadeEnd = Math.min(1, center + 0.18);

  const entryOffset = el.dir === "left" ? -160 : 160;

  const opacity = useTransform(scrollYProgress, [fadeStart, peakStart, peakEnd, fadeEnd], [0, 1, 1, 0]);
  // Slide in from the side, then slide out upward
  const x = useTransform(scrollYProgress, [fadeStart, peakStart], [entryOffset, 0]);
  const yExit = useTransform(scrollYProgress, [peakEnd, fadeEnd], [0, -60]);
  const scale = useTransform(scrollYProgress, [fadeStart, peakStart, peakEnd, fadeEnd], [0.92, 1, 1, 0.96]);

  return (
    <motion.div
      style={{ opacity, x, y: yExit, scale }}
      className="absolute w-full max-w-5xl px-6 md:px-12"
    >
      <div className={`flex flex-col ${el.dir === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-20`}>
        {/* Index number */}
        <div className="shrink-0 select-none">
          <span className="font-serif text-[100px] md:text-[180px] leading-none text-primary/10 font-light">
            0{i + 1}
          </span>
        </div>
        {/* Content */}
        <div className={`flex-1 text-center ${el.dir === "left" ? "md:text-left" : "md:text-right"}`}>
          <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-none tracking-tight">
            {el.title}
          </h3>
          <div className={`h-[1px] w-24 bg-gradient-to-r from-primary/60 to-transparent mb-6 ${el.dir === "left" ? "mx-auto md:mx-0" : "mx-auto md:ml-auto md:mr-0 rotate-180 md:rotate-0"}`} />
          <p className="text-muted-foreground/80 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0">
            {el.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TheSadhakasWay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "oklch(0.12 0.03 280)",
      "oklch(0.15 0.07 295)",
      "oklch(0.13 0.05 265)",
      "oklch(0.12 0.03 280)"
    ]
  );

  const auraX = useTransform(scrollYProgress, [0, 0.5, 1], ["-30%", "30%", "-30%"]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.15, 0.35, 0.35, 0.15]);

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative h-[600vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        {/* Travelling ambient glow — follows the alternating direction */}
        <motion.div
          style={{ x: auraX, opacity: auraOpacity }}
          className="absolute top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/25 blur-[140px] rounded-full pointer-events-none"
        />

        {/* Pinned section header */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
          <p className="text-primary/60 text-[10px] tracking-[0.5em] uppercase mb-3">
            The Synthesis
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground/60">
            The Sādhakas Way
          </h2>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/40 origin-left"
        />

        {/* Steps — each slides in from its direction */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center">
          {elements.map((el, i) => (
            <StepSlide
              key={el.title}
              el={el}
              i={i}
              total={elements.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </motion.section>
  );
}
