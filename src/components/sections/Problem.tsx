import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Problem() {
  const [activeStat, setActiveStat] = useState<1 | 2>(1);

  return (
    <section id="problem" className="relative h-auto md:h-[250vh]">
      <div className="flex w-full">
        
        {/* LEFT PANEL - Sticky Visuals */}
        <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center border-r border-[#1A1A18]/10 overflow-hidden">
          
          {/* Faint grid background for texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(26,26,24,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,24,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <AnimatePresence mode="wait">
            {activeStat === 1 ? (
              <motion.div 
                key="stat1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="absolute text-center flex flex-col items-center justify-center"
              >
                <span className="block font-serif text-[25vw] md:text-[18rem] font-light text-[#1A1A18] leading-none tracking-tighter">
                  58<span className="text-[12vw] md:text-[10rem]">%</span>
                </span>
                <span className="font-mono text-[8px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-[#1A1A18]/40">
                  The Age of Information
                </span>
              </motion.div>
            ) : (
              <motion.div 
                key="stat2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="absolute text-center flex flex-col items-center justify-center"
              >
                <span className="block font-serif text-[25vw] md:text-[18rem] font-light text-[#1A1A18] leading-none tracking-tighter">
                  51<span className="text-[12vw] md:text-[10rem]">%</span>
                </span>
                <span className="font-mono text-[8px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-[#1A1A18]/40">
                  The Meaning Gap
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT PANEL - Scrolling Text */}
        <div className="w-1/2 flex flex-col justify-between py-[30vh] md:py-[50vh] px-4 md:px-24">
          
          {/* Text Block 1 */}
          <motion.div 
            onViewportEnter={() => setActiveStat(1)}
            viewport={{ margin: "-40% 0px -40% 0px" }}
            className="max-w-md mb-[60vh]"
          >
            <p className="font-serif text-2xl md:text-4xl text-[#1A1A18] mb-4 md:mb-6 leading-tight">
              Drowning in noise, starving for wisdom.
            </p>
            <p className="text-[#1A1A18]/60 text-sm md:text-lg leading-relaxed font-light">
              58% of young adults report feeling overwhelmed by the sheer volume of information available, yet feel entirely unable to find what truly matters. We are hyper-connected but fundamentally disconnected from purpose.
            </p>
          </motion.div>

          {/* Text Block 2 */}
          <motion.div 
            onViewportEnter={() => setActiveStat(2)}
            viewport={{ margin: "-40% 0px -40% 0px" }}
            className="max-w-md mb-[30vh] md:mb-[50vh]"
          >
            <p className="font-serif text-2xl md:text-4xl text-[#1A1A18] mb-4 md:mb-6 leading-tight">
              An education that forgot the soul.
            </p>
            <p className="text-[#1A1A18]/60 text-sm md:text-lg leading-relaxed font-light">
              51% report a persistent sense that their education failed to address the deeper questions of meaning, purpose, and how to live well. We learned how to make a living, but forgot how to live.
            </p>
            <div className="w-8 md:w-12 h-[1px] bg-[#1A1A18]/30 mt-8 md:mt-12" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
