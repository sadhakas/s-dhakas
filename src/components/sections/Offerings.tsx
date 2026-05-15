import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { BookOpen, Users, Compass, Music, Map, Target } from "lucide-react";

const offerings = [
  {
    id: "manual",
    title: "Manual\nof Life",
    label: "01 — Flagship",
    description: "Our modular deep-dive into the fundamental dimensions of existence. Philosophy, science, and practice unified into one lived experience.",
    icon: BookOpen,
    bg: "oklch(0.13 0.04 280)",     // Deep Indigo
    accent: "oklch(0.72 0.18 300)", // Radiant Amethyst
    textCol: "oklch(0.95 0.02 280)"
  },
  {
    id: "community",
    title: "Community",
    label: "02 — Belonging",
    description: "A gathering of genuine seekers. Deep, unpretentious dialogue in intentional spaces where vulnerability is a strength, not a risk.",
    icon: Users,
    bg: "oklch(0.11 0.06 260)",     // Midnight Blue
    accent: "oklch(0.70 0.15 260)", // Mystic Periwinkle
    textCol: "oklch(0.95 0.02 260)"
  },
  {
    id: "workshops",
    title: "Workshops",
    label: "03 — Practice",
    description: "Intensive deep-dives into philosophy and practical application. One day. One idea. Permanently altered.",
    icon: Target,
    bg: "oklch(0.14 0.07 310)",     // Deep Violet
    accent: "oklch(0.75 0.18 320)", // Fuchsia
    textCol: "oklch(0.96 0.02 310)"
  },
  {
    id: "music",
    title: "Music &\nCulture",
    label: "04 — Experience",
    description: "Immersive events bridging art, sound, and consciousness. Where a playlist becomes a philosophy and a gathering becomes a ritual.",
    icon: Music,
    bg: "oklch(0.13 0.05 290)",     // Deep Plum
    accent: "oklch(0.72 0.16 290)", // Violet
    textCol: "oklch(0.96 0.02 290)"
  },
  {
    id: "mentoring",
    title: "Mentoring",
    label: "05 — Clarity",
    description: "1-on-1 guidance to cultivate clarity, discipline, and profound existential meaning. The one conversation you have been avoiding.",
    icon: Compass,
    bg: "oklch(0.12 0.04 270)",     // Cobalt Night
    accent: "oklch(0.68 0.14 270)", // Steel Blue
    textCol: "oklch(0.96 0.02 270)"
  },
  {
    id: "retreats",
    title: "Retreats",
    label: "06 — The Journey",
    description: "Moving from theory into rugged, transformative experience. We step into landscapes that strip away the familiar and force an inward pivot.",
    icon: Map,
    bg: "oklch(0.12 0.03 280)",     // Back to Indigo
    accent: "oklch(0.70 0.18 300)", // Amethyst
    textCol: "oklch(0.96 0.02 280)"
  }
];

// ── Each panel must be its own component (Rules of Hooks: no hooks in .map) ──
function OfferingPanel({
  item,
  i,
  total,
  scrollYProgress
}: {
  item: typeof offerings[0];
  i: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const sectionSize = 1 / total;
  const start = i * sectionSize;
  const peak = start + sectionSize * 0.15;
  const holdEnd = start + sectionSize * 0.85;
  const end = (i + 1) * sectionSize;

  // Clip-path reveal: each panel slides up to reveal, then slides up to exit
  const clipTopEntry = useTransform(scrollYProgress, [start, peak], ["100%", "0%"]);
  const clipTopExit = useTransform(scrollYProgress, [holdEnd, end], ["0%", "100%"]);

  // Merge: entry drives from bottom, exit drives out top
  const clipInset = useTransform(
    scrollYProgress,
    [start, peak, holdEnd, end],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );

  // Content entrance — slightly delayed after panel reveals
  const contentOpacity = useTransform(scrollYProgress, [start, peak, holdEnd, end], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [start, peak], [60, 0]);
  const contentExitY = useTransform(scrollYProgress, [holdEnd, end], [0, -40]);
  const contentRightY = useTransform(scrollYProgress, [start, peak], [80, 0]);

  const Icon = item.icon;

  return (
    <motion.div
      style={{ clipPath: clipInset }}
      className="absolute inset-0 w-full h-full"
    >
      {/* Full-screen colored panel */}
      <div
        style={{ backgroundColor: item.bg }}
        className="w-full h-full flex items-center justify-center relative overflow-hidden"
      >
        {/* Giant background number watermark */}
        <div
          className="absolute select-none pointer-events-none font-serif font-light leading-none"
          style={{
            fontSize: "clamp(200px, 40vw, 500px)",
            color: `color-mix(in oklch, ${item.accent} 8%, transparent)`,
            right: "-5%",
            bottom: "-10%",
          }}
        >
          {String(i + 1).padStart(2, "0")}
        </div>

        {/* Main content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-12"
        >
          {/* Left: Label + Big Title */}
          <div className="flex-1">
            <p
              className="text-[10px] tracking-[0.5em] uppercase mb-8 font-light"
              style={{ color: `color-mix(in oklch, ${item.accent} 70%, white)` }}
            >
              {item.label}
            </p>
            <h3
              className="font-serif font-light leading-[0.88] tracking-tight"
              style={{
                fontSize: "clamp(56px, 10vw, 130px)",
                color: item.textCol,
                whiteSpace: "pre-line"
              }}
            >
              {item.title}
            </h3>
          </div>

          {/* Right: Icon + Description */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentRightY }}
            className="md:max-w-sm w-full"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{
                backgroundColor: `color-mix(in oklch, ${item.accent} 15%, transparent)`,
                border: `1px solid color-mix(in oklch, ${item.accent} 30%, transparent)`,
                color: item.accent
              }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <p
              className="text-lg md:text-xl font-light leading-relaxed"
              style={{ color: `color-mix(in oklch, ${item.textCol} 60%, transparent)` }}
            >
              {item.description}
            </p>
            <div
              className="mt-8 h-[1px] w-16"
              style={{ background: `linear-gradient(to right, ${item.accent}, transparent)` }}
            />
          </motion.div>
        </motion.div>

        {/* Bottom progress tick */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {offerings.map((_, idx) => (
            <div
              key={idx}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === i ? "24px" : "6px",
                height: "6px",
                backgroundColor: idx === i
                  ? item.accent
                  : `color-mix(in oklch, ${item.accent} 25%, transparent)`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Offerings() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="offerings"
      ref={containerRef}
      className="relative h-[700vh] w-full"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Section header — visible only at the very start before first panel covers */}
        <div className="absolute inset-0 flex items-center justify-center z-0 bg-background pointer-events-none">
          <div className="text-center">
            <p className="text-primary text-[10px] tracking-[0.5em] uppercase mb-4 opacity-60">
              the path forward
            </p>
            <h2 className="font-serif text-5xl md:text-7xl font-light text-foreground/80">
              Our Offerings
            </h2>
          </div>
        </div>

        {/* Stacked offering panels — each clips in from bottom and exits to top */}
        {offerings.map((item, i) => (
          <OfferingPanel
            key={item.id}
            item={item}
            i={i}
            total={offerings.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
