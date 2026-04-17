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
    const fontSize = Math.max(3, 7 - i * 1.2);
    ghost.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: ${fontSize}rem;
      font-weight: 300;
      color: rgba(212,175,55,${(0.4 - i * 0.1).toFixed(2)});
      pointer-events: none;
      z-index: 9985;
      white-space: nowrap;
      line-height: 1;
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
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="font-serif text-7xl md:text-8xl font-light cursor-pointer select-none"
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
  );
}

export default function Problem() {
  return (
    <section id="problem" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold-dim text-xs tracking-[0.4em] lowercase text-center mb-16"
        >
          the paradox of our time
        </motion.p>

        <div className="grid md:grid-cols-2 gap-0">
          {/* 58% — The Age of Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="border-r-0 md:border-r border-border p-8 md:p-12 text-center md:text-right"
          >
            <AnimatedNumber value={58} />
            <p className="font-serif text-xs text-muted-foreground/40 tracking-widest lowercase mt-1 mb-4">
              tap to echo
            </p>
            <p className="font-serif text-lg md:text-xl text-foreground mb-3">
              The Age of Information
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm ml-auto">
              of young adults report feeling overwhelmed by the sheer volume of information available, yet unable to find what truly matters.
            </p>
          </motion.div>

          {/* 51% — The Meaning Gap */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 md:p-12 text-center md:text-left"
          >
            <AnimatedNumber value={51} />
            <p className="font-serif text-xs text-muted-foreground/40 tracking-widest lowercase mt-1 mb-4">
              tap to echo
            </p>
            <p className="font-serif text-lg md:text-xl text-foreground mb-3">
              The Meaning Gap
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              report a persistent sense that their education failed to address the deeper questions of purpose, meaning, and how to live well.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="gold-line max-w-xs mx-auto mt-16"
        />
      </div>
    </section>
  );
}
