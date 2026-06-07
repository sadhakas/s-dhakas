import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { minds } from "../../data/minds";
import MindCard from "../shared/MindCard";

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Slide the cards horizontally as the user scrolls vertically.
  // Mobile needs a longer negative translation to see all cards
  const x = useTransform(scrollYProgress, [0, 1], ["50vw", isMobile ? "-200vw" : "-80vw"]);
  
  // Fade the title up and out as they enter and leave the scrolling section
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section id="philosophy" ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Sticky Title */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }} 
          className="absolute top-[15%] w-full text-center px-6 z-10"
        >
          <p className="text-[#1A1A18]/60 text-xs tracking-[0.4em] lowercase mb-4 font-mono">
            a gallery of minds
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#1A1A18]">
            Those Who Sought
          </h2>
          <div className="w-24 h-[1px] bg-[#1A1A18]/30 mx-auto mt-6" />
        </motion.div>

        {/* Horizontally Scrolling Cards */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 md:gap-16 items-center w-max px-[20vw] mt-24"
        >
          {minds.map((mind, i) => (
            <div key={mind.name} className="w-[300px] md:w-[450px] shrink-0">
              <MindCard mind={mind} index={i} />
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
