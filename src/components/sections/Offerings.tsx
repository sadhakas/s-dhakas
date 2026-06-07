import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BookOpen, Users, Compass, Music, Map, Target } from "lucide-react";

const offerings = [
  {
    title: "Manual of Life",
    description: "Our flagship modular program exploring the fundamental dimensions of existence.",
    icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    title: "Community",
    description: "A gathering of genuine seekers engaging in transformative, unpretentious dialogue.",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    title: "Workshops",
    description: "Intensive deep-dives into specific philosophy, practical application, and integration.",
    icon: <Target className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    title: "Music & Culture",
    description: "Immersive experiences bridging the gap between art, sound, and consciousness.",
    icon: <Music className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    title: "Mentoring",
    description: "1-on-1 guidance to cultivate clarity, discipline, and profound existential meaning.",
    icon: <Compass className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    title: "Retreats",
    description: "Expansive journeys moving from theory into rugged, transformative experience.",
    icon: <Map className="w-6 h-6 md:w-8 md:h-8" />,
  },
];

export default function Offerings() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Slide horizontally across the offerings
  const x = useTransform(scrollYProgress, [0, 1], ["50vw", isMobile ? "-450vw" : "-250vw"]);

  return (
    <section id="offerings" ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Section header pinned to top */}
        <motion.div
          className="absolute top-[10%] left-6 md:left-24 z-10"
        >
          <p className="text-[#1A1A18]/60 text-xs tracking-[0.4em] lowercase mb-4 font-mono">
            the path forward
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1A1A18]">
            Our Offerings
          </h2>
          <div className="w-24 h-[1px] bg-[#1A1A18]/30 mt-6" />
        </motion.div>

        {/* Horizontal Scrolling Cards */}
        <motion.div 
          style={{ x }} 
          className="flex gap-16 md:gap-32 items-center w-max px-[20vw] mt-20"
        >
          {offerings.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            // Alternate entry directions
            const direction = idx % 2 === 0 ? 150 : -150;

            return (
              <motion.div
                initial={{ opacity: 0, y: direction }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                key={item.title}
                className={`relative w-[300px] md:w-[450px] shrink-0 border-l border-[#1A1A18]/10 pl-8 py-8 cursor-pointer transition-all duration-500 ${
                  isAnyHovered && !isHovered ? "opacity-30 blur-[2px]" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl text-[#1A1A18]/20 font-light">
                      0{idx + 1}
                    </span>
                    <div className={`transition-all duration-700 ${isHovered ? "scale-125 text-[#1A1A18] rotate-12" : "text-[#1A1A18]/30 scale-100 rotate-0"}`}>
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className={`font-serif text-3xl md:text-5xl font-light transition-all duration-500 tracking-tight ${isHovered ? "text-[#1A1A18] translate-x-2" : "text-[#1A1A18]"}`}>
                    {item.title}
                  </h3>
                </div>

                {/* Animated Description Content */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6">
                        <p className="text-[#1A1A18]/60 font-light text-lg leading-relaxed max-w-sm">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
