import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import SharedMantraReveal from "./SharedMantraReveal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const IDENTITY_LABELS = [
  "My Career",
  "My Thoughts",
  "My Emotions",
  "My Relationships",
  "My Nationality",
  "My Past",
  "My Fears",
  "My Ambitions",
];

const TRADITIONS = [
  {
    id: 1,
    tradition: "Vedanta",
    quote: "Tat tvam asi",
    context: '"That thou art" — the Self is universal consciousness, not bound by body or name.',
    tint: "rgba(255,153,31,0.06)",
  },
  {
    id: 2,
    tradition: "Socrates · Greek",
    quote: "Know thyself.",
    context: "The examined life begins with doubting every assumed identity.",
    tint: "rgba(200,210,255,0.04)",
  },
  {
    id: 3,
    tradition: "Christianity · Luke 17:21",
    quote: "The kingdom of God is within you.",
    context: "Not a place to reach — a nature to recognise, already present.",
    tint: "rgba(255,255,230,0.04)",
  },
  {
    id: 4,
    tradition: "Buddhism",
    quote: "Look within, thou art the Buddha.",
    context: "The witness-self exists prior to ego, thought, and form.",
    tint: "rgba(255,100,100,0.04)",
  },
  {
    id: 5,
    tradition: "Sufism · Rumi",
    quote: "Die before you die.",
    context: "Discover what cannot die. That is the Self.",
    tint: "rgba(160,80,220,0.05)",
  },
  {
    id: 6,
    tradition: "Sikhism",
    quote: "So hum.",
    context: '"I am That" — the answer carried silently in every breath.',
    tint: "rgba(100,160,220,0.05)",
  },
];

const CHARIOT_ROWS = [
  { label: "Physical Body", analogy: "The Chariot", note: "It carries you. It is not you.", gold: false },
  { label: "Five Senses", analogy: "Wild Horses", note: "They pull toward stimulation, constantly.", gold: false },
  { label: "The Mind", analogy: "The Reins", note: "The pivot point. The battlefield.", gold: true },
  { label: "Intelligence", analogy: "The Driver", note: "Capable of steering — if trained.", gold: false },
  { label: "Consciousness", analogy: "The Passenger", note: "You. The one who is reading this.", gold: false },
];

// ─── Stage 2: Identity Peeler ─────────────────────────────────────────────────
function IdentityPeeler() {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);

  const remaining = IDENTITY_LABELS.filter((_, i) => !dismissed.has(i));
  const topIndex = IDENTITY_LABELS.findIndex((_, i) => !dismissed.has(i));

  const handleDismiss = () => {
    if (topIndex === -1) return;
    const next = new Set(dismissed);
    next.add(topIndex);
    setDismissed(next);
    if (next.size === IDENTITY_LABELS.length) {
      setTimeout(() => setRevealed(true), 500);
    }
  };

  return (
    <div id="identity-peeler" className="min-h-screen py-32 px-6 w-full flex flex-col items-center justify-center bg-[#0c0c0c]">
      <div className="max-w-md w-full text-center">
        <p className="text-white/25 text-[10px] tracking-[0.4em] uppercase mb-3">Stage 1</p>
        <h2 className="text-3xl md:text-4xl font-serif text-white/90 mb-3">Peel the layers.</h2>
        <p className="text-sm text-white/35 mb-16">Tap each card to let it go.</p>

        {/* Card stack */}
        <div className="relative h-48 flex items-center justify-center mb-12">
          <AnimatePresence>
            {!revealed &&
              IDENTITY_LABELS.map((label, idx) => {
                if (dismissed.has(idx)) return null;
                const stackPos = remaining.indexOf(label);
                const isTop = idx === topIndex;

                return (
                  <motion.div
                    key={label}
                    layout
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -140, y: -70, rotate: -18, scale: 0.75, transition: { duration: 0.4 } }}
                    animate={{
                      y: stackPos * 5,
                      scale: 1 - stackPos * 0.03,
                      opacity: isTop ? 1 : 1 - stackPos * 0.18,
                    }}
                    style={{ position: "absolute", zIndex: remaining.length - stackPos, willChange: "transform, opacity" }}
                    onClick={isTop ? handleDismiss : undefined}
                    className={`w-64 py-5 px-8 rounded-2xl border text-center select-none transition-colors duration-200
                      ${isTop
                        ? "border-white/30 bg-white/[0.07] text-white cursor-pointer hover:border-white/50 active:scale-95"
                        : "border-white/10 bg-white/[0.03] text-white/40 cursor-default"
                      }`}
                    whileTap={isTop ? { scale: 0.95 } : {}}
                  >
                    <span className="font-serif text-lg">{label}</span>
                  </motion.div>
                );
              })}

            {revealed && (
              <motion.div
                key="blank"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-64 py-5 px-8 rounded-2xl border border-gold/50 bg-gold/[0.06] text-center shadow-[0_0_40px_rgba(212,175,55,0.12)]"
              >
                <span className="font-serif text-2xl text-gold">？</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Count remaining */}
        {!revealed && remaining.length > 0 && (
          <p className="text-white/20 text-xs mb-8">
            {remaining.length} {remaining.length === 1 ? "layer" : "layers"} remaining
          </p>
        )}

        {/* Revealed message */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="space-y-3"
            >
              <p className="text-2xl font-serif text-white/90">Something remains.</p>
              <p className="text-lg font-serif text-white/60">The one who was watching.</p>
              <p className="text-sm text-white/30 italic mt-4">
                That which observes is never the observed.
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                onClick={() => document.getElementById("convergence")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-8 inline-block px-6 py-2 border border-gold/30 text-gold/70 rounded-full text-xs hover:bg-gold/10 hover:text-gold transition-all"
              >
                See who else asked this →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Stage 3: Universal Convergence ──────────────────────────────────────────
function FlipCard({ tradition, quote, context, tint, isFlipped, onFlip }: {
  tradition: string; quote: string; context: string; tint: string;
  isFlipped: boolean; onFlip: () => void;
}) {
  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1000px", height: "180px" }}
      onClick={onFlip}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", willChange: "transform" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", background: `linear-gradient(135deg, ${tint}, #08080800)` }}
        >
          <p className="text-[9px] tracking-widest uppercase text-white/30">{tradition}</p>
          <p className="font-serif text-lg text-white/80 italic leading-snug">"{quote}"</p>
          <p className="text-[9px] text-white/20">Tap to reveal</p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/15 p-5 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: `linear-gradient(135deg, ${tint}, #0d0d0d)` }}
        >
          <p className="text-[9px] tracking-widest uppercase text-white/30 mb-3">{tradition}</p>
          <p className="text-sm text-white/70 leading-relaxed">{context}</p>
        </div>
      </motion.div>
    </div>
  );
}

function UniversalConvergence() {
  const [flipped, setFlipped] = useState<boolean[]>(Array(TRADITIONS.length).fill(false));
  const allFlipped = flipped.every(Boolean);

  const toggle = (idx: number) => setFlipped((f) => f.map((v, i) => (i === idx ? !v : v)));

  return (
    <div id="convergence" className="py-32 px-6 w-full flex flex-col items-center bg-[#080808]">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-16">
          <p className="text-white/25 text-[10px] tracking-[0.4em] uppercase mb-3">Stage 2</p>
          <h2 className="text-3xl md:text-4xl font-serif text-white/90 mb-3">You are not the first to ask.</h2>
          <p className="text-sm text-white/35">Tap each tradition to hear its answer.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {TRADITIONS.map((t, idx) => (
            <FlipCard
              key={t.id}
              tradition={t.tradition}
              quote={t.quote}
              context={t.context}
              tint={t.tint}
              isFlipped={flipped[idx]}
              onFlip={() => toggle(idx)}
            />
          ))}
        </div>

        <AnimatePresence>
          {allFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center max-w-xl mx-auto"
            >
              <p className="text-2xl md:text-3xl font-serif text-white/90 mb-6 leading-snug">
                Different maps.<br />The same territory.
              </p>
              <div className="w-12 h-px bg-gold/30 mx-auto mb-6" />
              <p className="text-sm text-white/40 leading-relaxed">
                We are not asking you to adopt any belief.<br />
                We are inviting you to notice what is already present.
              </p>
              <button
                onClick={() => document.getElementById("chariot")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-10 px-6 py-2 border border-white/15 text-white/40 rounded-full text-xs hover:text-white hover:border-white/30 transition-all"
              >
                So how did we get lost? →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Stage 4: Animated Chariot ───────────────────────────────────────────────
function AnimatedChariot() {
  return (
    <div id="chariot" className="min-h-screen py-32 px-6 w-full flex flex-col items-center justify-center bg-[#0a0a0a]">
      <div className="max-w-2xl w-full text-center">
        <p className="text-white/25 text-[10px] tracking-[0.4em] uppercase mb-3">Stage 3</p>
        <h2 className="text-xs tracking-widest uppercase text-gold mb-3">The Upanishadic Engine</h2>
        <h3 className="text-3xl md:text-4xl font-serif text-white/90 mb-16">The Chariot of the Self</h3>

        <div className="flex flex-col items-center gap-5 mb-16">
          {CHARIOT_ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              className="w-full max-w-sm"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.14, duration: 0.6, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
            >
              <div
                className={`p-4 border rounded-full flex justify-between px-8 text-sm ${row.gold
                    ? "border-gold/40 bg-gold/10 shadow-[0_0_24px_rgba(212,175,55,0.1)]"
                    : "border-white/15 bg-white/[0.04]"
                  }`}
              >
                <span className={row.gold ? "text-gold/80" : "text-white/50"}>{row.label}</span>
                <span className={row.gold ? "text-gold font-serif" : "text-white font-serif"}>{row.analogy}</span>
              </div>
              <p className={`text-[11px] mt-2 text-center ${row.gold ? "text-gold/40" : "text-white/20"}`}>
                {row.note}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-base text-white/55 font-light leading-relaxed max-w-md mx-auto">
            Right now, the horses are out of control — dragging the chariot toward temporary shiny things, while you sit terrified in the back row.
            <br /><br />
            The chariot cannot steer itself. And it cannot be driven from the back seat.
          </p>
          <button
            onClick={() => document.getElementById("open-hand")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-block px-6 py-2 border border-white/15 text-white/40 rounded-full text-xs hover:text-white hover:border-white/30 transition-all"
          >
            We know what you're thinking →
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Stage 5: The Open Hand ───────────────────────────────────────────────────
function OpenHand() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const lines: { text: string; style: string; delay: number }[] = [
    { text: "We know.", style: "text-2xl text-white/80", delay: 0 },
    { text: "This might sound like religion wearing philosophy's clothes.", style: "text-base text-white/50", delay: 0.4 },
    { text: "Or philosophy wearing religion's.", style: "text-base text-white/50", delay: 0.65 },
    { text: "You may be sceptical. You may disagree entirely.", style: "text-base text-white/50", delay: 1.0 },
    { text: "Good.", style: "text-2xl text-white/90 font-serif", delay: 1.4 },
    { text: "Genuine seekers always question.", style: "text-base text-white/50", delay: 1.7 },
    { text: "We are not here to hand you a belief system.", style: "text-base text-white/50", delay: 2.1 },
    {
      text: '"Who am I?" is the most honest question a human being can ask.',
      style: "text-base text-white/60",
      delay: 2.5,
    },
    { text: "And you deserve an honest attempt at answering it.", style: "text-base text-white/50", delay: 2.9 },
  ];

  return (
    <div id="open-hand" ref={ref} className="min-h-screen py-32 px-6 w-full flex flex-col items-center justify-center bg-[#100d08]">
      <div className="max-w-lg w-full text-center space-y-5">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: line.delay, duration: 0.7, ease: "easeOut" }}
            className={`font-serif leading-relaxed ${line.style}`}
          >
            {line.text}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 3.4, duration: 0.8 }}
          className="pt-8"
        >
          <p className="text-sm text-white/30 mb-6">If you have pushback, bring it.</p>
          <a
            href="https://chat.whatsapp.com/EjTFqNEk2dEKySTooqr2Ak?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 border border-white/15 text-white/45 rounded-full text-xs hover:border-white/30 hover:text-white/75 transition-all"
          >
            Talk to us on WhatsApp →
          </a>
          <p className="text-[10px] text-white/20 mt-3">Opens our community. An admin will respond.</p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, speed: number, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return { displayed, done };
}

// ─── Stage 6: The Bridge ──────────────────────────────────────────────────────
function MantraBridge({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  const line1 = useTypewriter("The ancients didn't write books about this.", 38, phase >= 1);
  const line2 = useTypewriter("They gave you a sound.", 48, phase >= 2);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setPhase(1), 600);
    return () => clearTimeout(t);
  }, [isInView]);

  useEffect(() => {
    if (line1.done) {
      const t = setTimeout(() => setPhase(2), 900);
      return () => clearTimeout(t);
    }
  }, [line1.done]);

  useEffect(() => {
    if (line2.done) {
      const t = setTimeout(onComplete, 1400);
      return () => clearTimeout(t);
    }
  }, [line2.done, onComplete]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center bg-black px-6">
      <div className="text-center max-w-xl">
        <p className="font-serif text-2xl md:text-3xl text-white/75 leading-relaxed min-h-[2.5rem]">
          {line1.displayed}
          {phase === 1 && !line1.done && (
            <span className="animate-pulse text-gold ml-0.5">|</span>
          )}
        </p>

        {phase >= 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-2xl md:text-3xl text-gold mt-6 min-h-[2.5rem]"
          >
            {line2.displayed}
            {!line2.done && <span className="animate-pulse ml-0.5">|</span>}
          </motion.p>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function WhoAmIPath() {
  const [showReveal, setShowReveal] = useState(false);

  return (
    <div className="w-full font-sans">


      {/* ── Stage 2: Identity Peeler ───────────────────────────────────────── */}
      <IdentityPeeler />

      {/* ── Stage 3: Universal Convergence ────────────────────────────────── */}
      <UniversalConvergence />

      {/* ── Stage 4: Animated Chariot ──────────────────────────────────────── */}
      <AnimatedChariot />

      {/* ── Stage 5: The Open Hand ─────────────────────────────────────────── */}
      <OpenHand />

      {/* ── Stage 6: Bridge + Reveal ───────────────────────────────────────── */}
      {!showReveal && <MantraBridge onComplete={() => setShowReveal(true)} />}

      {showReveal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
          <SharedMantraReveal />
        </motion.div>
      )}
    </div>
  );
}
