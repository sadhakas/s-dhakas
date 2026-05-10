import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LenisProvider from "@/components/layout/LenisProvider";
import { ChevronLeft } from "lucide-react";

import WhoAmIPath from "@/components/mantra-card/WhoAmIPath";
import ParadoxPath from "@/components/mantra-card/ParadoxPath";

export const Route = createFileRoute("/mantra-card")({
  component: MantraCardRouter,
});

function MantraCardRouter() {
  const [activePath, setActivePath] = useState<"hub" | "who-am-i" | "paradox">("hub");

  // Reset scroll position when switching paths magically
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePath]);

  return (
    <LenisProvider>
      <div className="bg-black text-foreground selection:bg-gold/20 min-h-screen">
        
        {/* Navigation Wrapper */}
        <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference pointer-events-none">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group text-sm uppercase tracking-widest pointer-events-auto">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Home
          </Link>
          {activePath !== "hub" && (
            <button onClick={() => setActivePath("hub")} className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors pointer-events-auto">
              Change Inquiry
            </button>
          )}
        </nav>

        <AnimatePresence mode="wait">
          {activePath === "hub" && (
            <motion.div 
              key="hub"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
              
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 z-10">Select your Inquiry.</h1>
              <p className="text-white/50 mb-16 max-w-md font-light z-10">
                Every seeker ultimately arrives at the exact same truth, but the path there is highly personal. Which paradox echoes yours?
              </p>

              <div className="flex flex-col md:flex-row gap-6 z-10 w-full max-w-5xl justify-center items-stretch flex-wrap">
                
                {/* Path A */}
                <button 
                  onClick={() => setActivePath("who-am-i")}
                  className="w-full md:w-72 p-8 border border-white/10 bg-white/5 hover:bg-white/10 rounded-3xl transition-all text-left flex flex-col group overflow-hidden relative"
                >
                  <h3 className="text-2xl font-serif text-white mb-2">The Observer</h3>
                  <p className="text-sm text-white/50 group-hover:text-gold transition-colors">I am not this body. I am not my thoughts. So who am I?</p>
                </button>

                {/* Path B */}
                <button 
                  onClick={() => setActivePath("paradox")}
                  className="w-full md:w-72 p-8 border border-white/10 bg-white/5 hover:bg-white/10 rounded-3xl transition-all text-left flex flex-col group overflow-hidden relative"
                >
                  <h3 className="text-2xl font-serif text-white mb-2">The Paradox</h3>
                  <p className="text-sm text-white/50 group-hover:text-gold transition-colors">We are progressing externally, yet I feel exhausted inside.</p>
                </button>

                {/* Path C (Loading Soon) */}
                <div className="w-full md:w-72 p-8 border border-white/5 bg-transparent rounded-3xl transition-all text-left flex flex-col relative opacity-50 cursor-not-allowed">
                  <div className="absolute inset-0 bg-white/5 rounded-3xl animate-pulse" />
                  <h3 className="text-2xl font-serif text-white/50 mb-2 mt-auto mix-blend-overlay">The Silence</h3>
                  <p className="text-sm text-white/30 truncate">More perspectives arriving soon...</p>
                </div>

              </div>
            </motion.div>
          )}

          {activePath === "who-am-i" && (
            <motion.div key="who-am-i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WhoAmIPath />
            </motion.div>
          )}

          {activePath === "paradox" && (
            <motion.div key="paradox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ParadoxPath />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </LenisProvider>
  );
}
