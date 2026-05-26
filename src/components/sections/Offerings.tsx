import { motion } from "framer-motion";
import { BookOpen, Users, Compass, Music, Map, Target } from "lucide-react";

const offerings = [
  {
    id: "manual",
    title: "Manual of Life",
    label: "01 — Flagship",
    description: "Our modular deep-dive into the fundamental dimensions of existence. Philosophy, science, and practice unified into one lived experience.",
    icon: BookOpen,
  },
  {
    id: "community",
    title: "Community",
    label: "02 — Belonging",
    description: "A gathering of genuine seekers. Deep, unpretentious dialogue in intentional spaces where vulnerability is a strength, not a risk.",
    icon: Users,
  },
  {
    id: "workshops",
    title: "Workshops",
    label: "03 — Practice",
    description: "Intensive deep-dives into philosophy and practical application. One day. One idea. Permanently altered.",
    icon: Target,
  },
  {
    id: "music",
    title: "Music & Culture",
    label: "04 — Experience",
    description: "Immersive events bridging art, sound, and consciousness. Where a playlist becomes a philosophy and a gathering becomes a ritual.",
    icon: Music,
  },
  {
    id: "mentoring",
    title: "Mentoring",
    label: "05 — Clarity",
    description: "1-on-1 guidance to cultivate clarity, discipline, and profound existential meaning. The one conversation you have been avoiding.",
    icon: Compass,
  },
  {
    id: "retreats",
    title: "Retreats",
    label: "06 — The Journey",
    description: "Moving from theory into rugged, transformative experience. We step into landscapes that strip away the familiar and force an inward pivot.",
    icon: Map,
  }
];

export default function Offerings() {
  return (
    <section id="offerings" className="relative w-full py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-20">
          <p className="text-primary text-[10px] tracking-[0.5em] uppercase mb-4 opacity-80">
            the path forward
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-foreground">
            Our Offerings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-background border border-border rounded-2xl p-8 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(var(--color-primary),0.05)] transition-all duration-500 flex flex-col"
              >
                <div className="absolute top-0 right-0 p-6 text-[100px] font-serif font-light leading-none text-primary/5 pointer-events-none select-none group-hover:text-primary/10 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                
                <p className="text-[10px] tracking-[0.4em] text-primary/60 uppercase mb-3">
                  {item.label}
                </p>
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed text-sm flex-grow">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
