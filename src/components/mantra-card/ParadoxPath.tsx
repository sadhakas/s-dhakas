import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { VolumeX, Volume2 } from "lucide-react";
import SharedMantraReveal from "./SharedMantraReveal";

export default function ParadoxPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.8, 1]);
  const op1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95], [0, 1, 0]);
  const op5 = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  const [sliderVal, setSliderVal] = useState(50);
  const [showDialogue, setShowDialogue] = useState(false);
  const [selection, setSelection] = useState<number | null>(null);
  const isLeft = sliderVal < 50;

  return (
    <div className="w-full font-sans">
      {/* Descent Scrollytelling */}
      <div ref={ref} className="h-[400vh] relative w-full bg-white text-black">
        <motion.div style={{ opacity: bgOpacity, willChange: "opacity" }} className="sticky top-0 h-screen w-full bg-black z-0" />
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 pointer-events-none">
          <motion.div style={{ opacity: op1, willChange: "opacity" }} className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-serif">We are progressing.<br/>Living longer.<br/>Living better.</h1>
          </motion.div>
          <motion.div style={{ opacity: op2, willChange: "opacity" }} className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-serif text-white/90">Are we?</h1>
          </motion.div>
          <motion.div style={{ opacity: op3, willChange: "opacity" }} className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-serif text-white/80">Stress increasing.</h1>
          </motion.div>
          <motion.div style={{ opacity: op4, willChange: "opacity" }} className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-serif text-white/60">A generation connected to everything,<br/>yet deeply alone.</h1>
          </motion.div>
          <motion.div style={{ opacity: op5, willChange: "opacity" }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
            <p className="text-white/40 text-sm tracking-[0.4em] uppercase mb-4">The conclusion</p>
            <h1 className="text-2xl md:text-4xl font-serif text-white/80">Something doesn't add up.</h1>
            <button 
              onClick={() => document.getElementById("friction-stage")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-12 px-6 py-2 border border-white/20 text-white/50 rounded-full text-xs hover:text-white"
            >Explore the Paradox</button>
          </motion.div>
        </div>
      </div>

      {/* Friction Slider */}
      <div id="friction-stage" className="min-h-screen py-24 px-6 w-full bg-black flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none blur-[100px]"
             style={{ background: `radial-gradient(circle at center, ${isLeft ? 'rgba(255,255,255,0.05)' : 'rgba(255,0,0,0.02)'}, transparent 60%)` }} />
        <div className="max-w-2xl w-full z-10 text-center">
          <h2 className="text-gold text-xs tracking-[0.4em] uppercase mb-12">The Friction</h2>
          <div className="mb-16">
            <div className="flex justify-between text-[10px] tracking-widest text-white/50 uppercase mb-4 px-2">
              <span className={sliderVal < 30 ? 'text-white' : ''}>Material Mastery</span>
              <span className={sliderVal > 70 ? 'text-white' : ''}>Internal Void</span>
            </div>
            <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:rounded-full cursor-ew-resize"
            />
            <div className="mt-12 h-24 flex items-center justify-center">
              {sliderVal < 25 && <p className="text-xl font-serif text-white/80">"I have the degree. I have the job."</p>}
              {sliderVal >= 25 && sliderVal <= 75 && <p className="text-lg font-serif text-white/40">Drag to balance the paradox.</p>}
              {sliderVal > 75 && <p className="text-xl font-serif text-white/80">"Why is there a hum of anxiety?"</p>}
            </div>
          </div>
          
          <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8 text-left">
            <button onClick={() => setShowDialogue(!showDialogue)} className="flex items-center justify-center gap-3 w-full text-gold uppercase text-xs font-semibold">
              {showDialogue ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
              {showDialogue ? "Silence the mind" : "Listen to the mind"}
            </button>
            <AnimatePresence>
              {showDialogue && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-8 space-y-4 overflow-hidden">
                  <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><span className="text-[8px]">MIND</span></div><div className="bg-white/10 p-3 rounded-xl text-sm text-white/70">If I just reach Friday, I'll be happy.</div></div>
                  <div className="flex gap-4 flex-row-reverse"><div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center"><span className="text-[8px]">SOUL</span></div><div className="bg-gold/10 p-3 rounded-xl text-sm text-white/80">You said that last week.</div></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Crossroad */}
      <div className="min-h-screen py-32 px-6 w-full bg-black flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-white/90 mb-16">Where do you stand?</h2>
        <div className="flex flex-col gap-4 w-full max-w-md">
          {[{id:1, t:"I believe material progress is enough."}, {id:2, t:"Something is definitely missing."}, {id:3, t:"I am confused."}].map(opt => (
            <button key={opt.id} onClick={() => setSelection(opt.id)} className={`p-5 rounded-2xl border text-left font-serif transition-colors ${selection === opt.id ? "bg-white text-black" : "bg-transparent text-white/60 hover:border-white/50"}`}>
              {opt.t}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {selection && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 w-full max-w-xl mx-auto p-8 border border-gold/30 bg-gold/5 rounded-3xl relative overflow-hidden">
               <p className="text-lg font-light leading-relaxed text-white/90 font-serif relative z-10">
                 Regardless of your choice, the ancients faced this exact crossroad. Texts like the Bhagavad Gita don't reject the material—they ask: <span className="text-gold italic">What good is external mastery if the inner world is chaos?</span>
               </p>
               <button onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })} className="mt-8 px-6 py-2 bg-gold/20 text-gold rounded-full text-xs uppercase tracking-widest hover:bg-gold hover:text-black">
                 View the Ancient Solution
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SharedMantraReveal />
    </div>
  );
}
