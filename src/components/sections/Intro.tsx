import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">

        {/* Left Side: Statement Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative">
            {/* Background ambient glow behind logo */}
            <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full point-events-none" />
            <img
              src="/assets/images/logo.png"
              alt="Sādhakas Emblem"
              className="relative w-64 md:w-[28rem] h-auto object-contain drop-shadow-2xl opacity-90 transition-opacity hover:opacity-100"
            />
          </div>
        </motion.div>

        {/* Right Side: Narrative Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <p className="text-gold-dim text-xs tracking-[0.4em] lowercase mb-6">
            the genesis
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight">
            We are Sādhakas.<br />
            <span className="text-muted-foreground/50">Seekers of the missing curriculum.</span>
          </h2>

          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light max-w-lg mx-auto md:mx-0">
            <p>
              Our current structures of learning ask us what we want to do, but rarely who we wish to become. We believe the deepest questions of existence shouldn't be left to chance.
            </p>
            <p>
              Sādhakas was born to build that bridge. A community of minds choosing inquiry over certainty, traversing history, philosophy, and experience to remember what it means to be truly alive.
            </p>
          </div>

          <div className="mt-10 flex justify-center md:justify-start">
            <motion.button
              onClick={() => navigate({ to: "/register-tmol-2k26" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-3 bg-gradient-to-r from-gold to-[#FFE58F] text-black font-semibold text-sm md:text-base px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all duration-500 cursor-pointer overflow-hidden group border border-gold"
            >
              <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />
              <BookOpen className="w-4 h-4 relative z-10" />
              <span className="relative z-10 uppercase tracking-wider">Register for TMOL</span>
            </motion.button>
          </div>

          <div className="gold-line w-24 mx-auto md:mx-0 mt-12" />
        </motion.div>

      </div>
    </section>
  );
}
