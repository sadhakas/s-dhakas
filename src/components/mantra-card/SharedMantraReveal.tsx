import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

// ─── Commitment Modal ─────────────────────────────────────────────────────────
function CommitmentModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [committed, setCommitted] = useState(false);

  const handleCommit = () => {
    const date = new Date().toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
    const mantra = "Hare Kṛṣṇa Hare Kṛṣṇa, Kṛṣṇa Kṛṣṇa Hare Hare, Hare Rāma Hare Rāma, Rāma Rāma Hare Hare";
    const text = encodeURIComponent(
      `🙏 I, ${name.trim() || "a seeker"}, am beginning my 21-day Maha-Mantra practice with Sādhakas today — ${date}.\n\n${mantra}.\n\nsadhakas.org`
    );
    window.open(`https://wa.me/919024003180?text=${text}`, "_blank");
    setCommitted(true);
  };

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-sm bg-[#0f0e0b] border border-white/10 rounded-3xl p-8 text-center overflow-hidden"
      >
        {/* Close button */}
        {!committed && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />

        <AnimatePresence mode="wait">
          {!committed ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">Make it official</p>
              <h3 className="font-serif text-2xl text-white/90 mb-2">Make the commitment.</h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                21 days. One sound. One experiment.<br />Your words, sent by you, to us.
              </p>

              <div className="space-y-3 mb-8 text-left">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/30 mb-1 block">Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What shall we call you?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={handleCommit}
                className="w-full py-4 bg-gold text-black text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-white transition-colors duration-300"
              >
                Begin my 21 days →
              </button>
              <p className="text-[10px] text-white/20 mt-4">
                Opens WhatsApp. No spam — just your own commitment, witnessed.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-4"
            >
              {/* Ripple rings */}
              <div className="relative w-16 h-16 mx-auto mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-gold/40"
                    initial={{ scale: 0.5, opacity: 0.7 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ delay: i * 0.3, duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-gold" />
                </div>
              </div>

              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-3">Commitment made</p>
              <h3 className="font-serif text-xl text-white/90 mb-4">
                Your experiment begins today.
              </h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                Day 1 starts now. The practice is simple: chant once, sincerely.
              </p>
              <button
                onClick={onClose}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SharedMantraReveal() {
  const [lang, setLang] = useState<"eng" | "hin">("eng");
  const [showModal, setShowModal] = useState(false);

  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <>
      <AnimatePresence>
        {showModal && <CommitmentModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <div id="solution" className="min-h-screen py-32 px-6 w-full bg-[#1A1105] flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,115,0,0.15),transparent_80%)] pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-xs text-gold tracking-[0.4em] uppercase mb-4">The Higher Taste</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white/90 mb-8 leading-tight">
            A Universal Solution.
          </h3>
          <p className="text-lg text-white/70 mb-16 font-light leading-relaxed">
            Whether you are questioning your identity or exhausted by material paradoxes, the Vedic texts offer the same structural solution: Spiritual Technology. The Mantra is a sonic frequency designed to clear the lens of the mind.
          </p>

          {/* Mantra Card */}
          <div className="w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-md p-8 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(212,115,0,0.1)]">
            <div className="flex gap-4 mb-8 bg-black/40 p-1 rounded-full border border-white/10 mx-auto">
              <button
                onClick={() => setLang("eng")}
                className={`px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase transition-all ${lang === "eng" ? "bg-gold text-black" : "text-white/60"}`}
              >
                English
              </button>
              <button
                onClick={() => setLang("hin")}
                className={`px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase transition-all ${lang === "hin" ? "bg-gold text-black" : "text-white/60"}`}
              >
                Hindi
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {lang === "eng" ? (
                  <motion.div key="eng" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif text-2xl leading-loose text-white tracking-wide">
                    Hare Kṛṣṇa Hare Kṛṣṇa<br />
                    Kṛṣṇa Kṛṣṇa Hare Hare<br />
                    Hare Rāma Hare Rāma<br />
                    Rāma Rāma Hare Hare
                  </motion.div>
                ) : (
                  <motion.div key="hin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif text-3xl leading-loose text-white">
                    हरे कृष्ण हरे कृष्ण<br />
                    कृष्ण कृष्ण हरे हरे<br />
                    हरे राम हरे राम<br />
                    राम राम हरे हरे
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="text-gold text-[10px] uppercase tracking-widest text-center">Maha-Mantra</p>
            </div>
          </div>

          {/* 21-Day Tracker */}
          <div className="mt-24">
            <h3 className="text-3xl font-serif text-white/90 mb-4">The 21-Day Inward Pivot</h3>
            <p className="text-sm text-white/50 mb-12 max-w-md mx-auto">
              Knowledge without application is empty. Test this frequency for 21 consecutive days and observe the shift in your cognitive terrain.
            </p>

            <div className="grid grid-cols-7 gap-3 justify-center max-w-sm mx-auto mb-10">
              {days.map((day) => (
                <div
                  key={day}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/40 hover:border-gold hover:text-gold transition-colors cursor-crosshair"
                >
                  {day}
                </div>
              ))}
            </div>

            <p className="text-xs text-white/30 mb-6 max-w-xs mx-auto leading-relaxed">
              Make it real. Send your commitment to us on WhatsApp — witnessed intentions carry more weight.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="w-full max-w-xs mx-auto block px-8 py-4 bg-gold text-black uppercase tracking-widest text-xs font-semibold rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              Accept the Experiment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
