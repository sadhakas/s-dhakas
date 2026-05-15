import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ── The Echo: spawns ghost number ripples imperatively (no React state) ──────
function spawnEcho(el: HTMLElement, text: string) {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < 3; i++) {
    const ghost = document.createElement("span");
    ghost.textContent = text;
    const fontSize = Math.max(4, 9 - i * 1.5);
    ghost.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      font-family: 'Instrument Serif', 'Cormorant Garamond', Georgia, serif;
      font-size: ${fontSize}rem;
      font-weight: 300;
      color: oklch(0.70 0.18 300 / ${(0.4 - i * 0.1).toFixed(2)}); /* Amethyst Echo */
      pointer-events: none;
      z-index: 9985;
      white-space: nowrap;
      line-height: 1;
      transform: translate(-50%, -50%);
      animation: echo-ripple ${0.75 + i * 0.22}s ease-out ${i * 0.13}s forwards;
    `;
    document.body.appendChild(ghost);
    const lifespan = (0.75 + i * 0.22 + i * 0.13) * 1000 + 150;
    setTimeout(() => ghost.remove(), lifespan);
  }
}

function AnimatedNumber({
  value,
  suffix = "%",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleClick = () => {
    if (ref.current) spawnEcho(ref.current, `${value}${suffix}`);
  };

  return (
    <div className="relative inline-block">
      {/* Ethereal Glow Behind Number */}
      <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
      
      <motion.span
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="relative z-10 font-serif text-8xl md:text-[150px] font-light cursor-pointer select-none drop-shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
        onClick={handleClick}
        title="Click to echo"
        whileTap={{ scale: 0.96 }}
      >
        {inView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}{suffix}
          </motion.span>
        ) : (
          <span className="opacity-0">{value}{suffix}</span>
        )}
      </motion.span>
    </div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary text-xs tracking-[0.4em] lowercase text-center mb-20 drop-shadow-[0_0_10px_rgba(var(--color-primary),0.8)]"
        >
          the paradox of our time
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 md:gap-0">
          {/* 58% — The Age of Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:border-r border-white/5 p-8 md:p-12 text-center md:text-right relative"
          >
            <AnimatedNumber value={58} />
            <p className="font-serif text-[10px] text-primary/60 tracking-[0.3em] uppercase mt-4 mb-6">
              tap to echo
            </p>
            <p className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              The Age of Information
            </p>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm ml-auto font-light">
              of young adults report feeling overwhelmed by the sheer volume of information available, yet unable to find what truly matters.
            </p>
          </motion.div>

          {/* 51% — The Meaning Gap */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 md:p-12 text-center md:text-left relative"
          >
            <AnimatedNumber value={51} />
            <p className="font-serif text-[10px] text-primary/60 tracking-[0.3em] uppercase mt-4 mb-6">
              tap to echo
            </p>
            <p className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              The Meaning Gap
            </p>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm font-light">
              report a persistent sense that their education failed to address the deeper questions of purpose, meaning, and how to live well.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-xs mx-auto mt-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </div>
    </section>
  );
}
