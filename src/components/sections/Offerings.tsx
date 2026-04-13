import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Compass, Music, Map, Target } from "lucide-react";

const offerings = [
  {
    title: "Manual of Life",
    description: "Our flagship modular program exploring the fundamental dimensions of existence.",
    icon: <BookOpen className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Community",
    description: "A gathering of genuine seekers engaging in transformative, unpretentious dialogue.",
    icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Workshops",
    description: "Intensive deep-dives into specific philosophy, practical application, and integration.",
    icon: <Target className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Music & Culture",
    description: "Immersive experiences bridging the gap between art, sound, and consciousness.",
    icon: <Music className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Mentoring",
    description: "1-on-1 guidance to cultivate clarity, discipline, and profound existential meaning.",
    icon: <Compass className="w-5 h-5 md:w-6 md:h-6" />,
  },
  {
    title: "Retreats",
    description: "Expansive journeys moving from theory into rugged, transformative experience.",
    icon: <Map className="w-5 h-5 md:w-6 md:h-6" />,
  }
];

export default function Offerings() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeItem = offerings[activeIdx];

  return (
    <section id="offerings" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16 md:mb-20 w-full"
        >
          <p className="text-gold-dim text-xs tracking-[0.4em] lowercase mb-4">
            the path forward
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Our Offerings
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start w-full max-w-5xl">
          
          {/* Left Side: Navigation List */}
          <div className="w-full md:w-[40%] flex flex-col space-y-3">
            {offerings.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={item.title}
                  onClick={() => setActiveIdx(idx)}
                  className={`group flex items-center justify-between px-6 py-5 w-full text-left rounded-2xl transition-all duration-500 border cursor-pointer
                    ${isActive 
                      ? "bg-gold/10 border-gold/30 text-gold shadow-[0_0_30px_rgba(212,175,55,0.05)]" 
                      : "bg-surface-elevated/20 border-white/5 text-muted-foreground hover:border-gold/20 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`transition-colors duration-500 ${isActive ? 'text-gold' : 'text-white/40 group-hover:text-gold/50'}`}>
                      {item.icon}
                    </div>
                    <span className="font-serif text-xl sm:text-2xl">{item.title}</span>
                  </div>
                  
                  {/* Active Indicator Arrow */}
                  <motion.div
                    animate={{ x: isActive ? 5 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {isActive && <div className="w-2 h-2 rounded-full bg-gold" />}
                  </motion.div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Active Display Context */}
          <div className="w-full md:w-[60%]">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeItem.title}
                 initial={{ opacity: 0, scale: 0.98, x: 20 }}
                 animate={{ opacity: 1, scale: 1, x: 0 }}
                 exit={{ opacity: 0, scale: 0.98, x: -20 }}
                 transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                 className="w-full min-h-[350px] md:min-h-[450px] rounded-3xl bg-surface/40 backdrop-blur-xl border border-gold/10 p-8 sm:p-12 shadow-[0_0_50px_rgba(212,175,55,0.05)] text-center md:text-left flex flex-col items-center md:items-start justify-center"
               >
                  <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                    {/* Scale up the original icon specifically for this display block */}
                    <div className="scale-150">
                      {activeItem.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
                    {activeItem.title}
                  </h3>
                  
                  <div className="gold-line w-16 mb-8 opacity-50 md:mx-0 mx-auto" />
                  
                  <p className="text-muted-foreground font-light text-lg sm:text-xl leading-relaxed">
                    {activeItem.description}
                  </p>
               </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
