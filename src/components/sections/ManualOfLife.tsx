import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const themes = [
  {
    title: "The Self",
    subtitle: "Understanding Identity",
    description: "Exploring what defines the individual beyond temporary roles and labels."
  },
  {
    title: "The Mind",
    subtitle: "Inner Clarity",
    description: "Understanding how thoughts and emotions shape our experience of life."
  },
  {
    title: "Action",
    subtitle: "The Principle of Choices",
    description: "How decisions influence character, consequences, and direction."
  },
  {
    title: "Nature",
    subtitle: "Human Tendencies",
    description: "Understanding the forces that shape behavior and habits."
  },
  {
    title: "Higher Wisdom",
    subtitle: "Living with Purpose",
    description: "Integrating insight to cultivate clarity, discipline, and meaning."
  }
];

const deliverables = [
  "curated concept notes",
  "visual pocket maps",
  "reflection workbook",
  "life-design exercises",
  "completion certificate"
];

export default function ManualOfLife() {
  return (
    <section id="manual" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mb-20 max-w-3xl"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <BookOpen className="w-8 h-8 text-gold" />
            <h2 className="font-serif text-4xl md:text-5xl text-gold">
              The Manual of Life
            </h2>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-6">
            A modular program exploring the fundamental dimensions of life through philosophical inquiry and practical reflection.
          </p>
          <p className="text-muted-foreground/70 leading-relaxed max-w-2xl">
            Participants examine timeless ideas and apply them to modern life through guided discussions, concept maps, and reflective exercises.
          </p>
        </motion.div>

        {/* Staggered Vertical Theme Tree */}
        <div className="relative py-12 mb-24 max-w-4xl mx-auto">
          {/* Faint connecting line down the middle */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" />

          <div className="space-y-16">
            {themes.map((theme, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={theme.title} className="relative flex flex-col md:flex-row items-center w-full">
                  
                  {/* Left Side Container */}
                  <div className="w-full md:w-[calc(50%-1px)] flex justify-center md:justify-end md:pr-12 md:order-1 order-2">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="text-center md:text-right"
                      >
                        <div className="inline-block bg-gradient-to-r from-gold/80 to-gold text-black rounded-full px-6 py-2 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                          <span className="font-semibold">{theme.title}</span> — {theme.subtitle}
                        </div>
                        <p className="text-muted-foreground/80 text-sm max-w-xs ml-auto mr-auto md:mr-0 pl-4 border-l-2 md:border-l-0 md:border-r-2 border-gold/30">
                          {theme.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node (visible on desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border border-gold z-10 items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-gold" />
                  </div>

                  {/* Right Side Container */}
                  <div className="w-full md:w-[calc(50%-1px)] flex justify-center md:justify-start md:pl-12 md:order-3 order-2">
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="text-center md:text-left pt-6 md:pt-0"
                      >
                        <div className="inline-block bg-gradient-to-r from-gold to-gold/80 text-black rounded-full px-6 py-2 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                          <span className="font-semibold">{theme.title}</span> — {theme.subtitle}
                        </div>
                        <p className="text-muted-foreground/80 text-sm max-w-xs mx-auto md:mx-0 pr-4 border-r-2 md:border-r-0 md:border-l-2 border-gold/30">
                          {theme.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Deliverables Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-black/40 border border-gold/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
        >
          <h3 className="text-gold text-lg font-serif mb-8">Participants receive:</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-x-8 gap-y-4">
            {deliverables.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold/50" />
                <span className="text-muted-foreground text-sm tracking-widest lowercase">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
