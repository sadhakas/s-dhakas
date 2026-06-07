import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";

const elements = [
  {
    title: "Question",
    description: "It begins with an inquiry. A profound realization that our standard education has left the most critical aspects of our existence entirely unaddressed."
  },
  {
    title: "Gather",
    description: "We assemble into intentional spaces where vulnerability becomes a strength, and deep, unpretentious dialogue replaces superficial networking."
  },
  {
    title: "Travel",
    description: "Moving from theory directly into experience. We step far out of familiar environments and into transformative landscapes that force an inward pivot."
  },
  {
    title: "Integrate",
    description: "Reading the texts that truly matter, and weaving the eternal wisdom of philosophy, science, and the humanities back into our daily living."
  },
  {
    title: "Act",
    description: "Action born strictly from clarity. Once the mind is settled, we return to the noise of the world not to escape it, but to engage with it entirely."
  }
];

export default function TheSadhakasWay() {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // The sticky sanskrit word starts visible and slowly fades into pure white negative space
  const sanskritOpacity = useTransform(scrollYProgress, [0, 0.8], [0.1, 0]);
  const sanskritY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const isMobile = useIsMobile();

  // Massive Diagonal Pan for the Right Canvas (Desktop) / Horizontal Pan (Mobile)
  // On mobile, we use a pure horizontal translation (canvasY stays at 0vh)
  const canvasX = useTransform(scrollYProgress, [0, 1], ["0vw", isMobile ? "-400vw" : "-100vw"]);
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0vh", isMobile ? "0vh" : "-100vh"]);

  return (
    <section id="sadhakas-way" ref={ref} className="relative h-[400vh]">
      
      {/* Sticky container covering the entire viewport */}
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        
        {/* LEFT PANEL - Fixed in Viewport (Clutter -> Clarity) */}
        {/* On mobile, this acts as a background watermark spanning w-full */}
        <div className="absolute left-0 top-0 w-full md:w-[40vw] h-screen flex flex-col items-center justify-center border-r border-[#1A1A18]/5 z-0 md:z-10 shrink-0 pointer-events-none opacity-20 md:opacity-100">
          
          <motion.div 
            style={{ opacity: sanskritOpacity, y: sanskritY }}
            className="absolute flex items-center justify-center pointer-events-auto"
          >
            <span className="font-serif text-[40vw] md:text-[20vw] text-[#1A1A18] whitespace-nowrap select-none leading-none">
              साधक
            </span>
          </motion.div>

          {/* Section Title stays pinned */}
          <div className="absolute top-[20%] text-center px-4 pointer-events-auto">
            <p className="text-[#1A1A18]/60 text-xs tracking-[0.4em] lowercase mb-4 font-mono">
              the synthesis
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1A1A18]">
              The Sādhakas Way
            </h2>
            <div className="w-16 h-[1px] bg-[#1A1A18]/20 mx-auto mt-6" />
          </div>
        </div>

        {/* RIGHT PANEL - The 2D Diagonal Canvas */}
        {/* On mobile, this spans w-full so text isn't cut off. On desktop, it's strictly clipped to the right 60vw. */}
        <div className="absolute left-0 md:left-[40vw] top-0 w-full md:w-[60vw] h-screen overflow-hidden z-10 md:z-0 pointer-events-none md:pointer-events-auto">
          <motion.div 
            style={{ x: canvasX, y: canvasY }} 
            className="relative w-[300vw] md:w-[200vw] h-[250vh] md:h-[200vh] pointer-events-auto"
          >
            
            {elements.map((el, index) => {
              // On mobile: strictly horizontal layout. On desktop: diagonal layout.
              const topPos = isMobile ? `30vh` : `${(index * 30) + 20}vh`; 
              const leftPos = isMobile ? `${(index * 100) + 10}vw` : `${(index * 25) + 10}vw`; 

              return (
                <div
                  key={el.title}
                  className="absolute flex flex-col w-[90vw] md:max-w-sm px-6 md:px-0"
                  style={{ top: topPos, left: leftPos }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Minimal Number Indicator */}
                    <div className="text-4xl md:text-6xl font-serif text-[#1A1A18]/20 font-light select-none mb-4">
                      0{index + 1}
                    </div>
                    
                    <h3 className="font-serif text-2xl md:text-4xl text-[#1A1A18] mb-6">
                      {el.title}
                    </h3>
                    <p className="text-[#1A1A18]/60 leading-relaxed text-lg font-light">
                      {el.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}

          </motion.div>
        </div>

      </div>
    </section>
  );
}
