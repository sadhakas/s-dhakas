import { motion } from "framer-motion";
import { minds } from "../data/minds";
import MindCard from "./MindCard";
import ParticleField from "./ParticleField";

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-32 px-6">
      <ParticleField />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-gold-dim text-xs tracking-[0.4em] lowercase mb-4">
            a gallery of minds
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Those Who Sought
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {minds.map((mind, i) => (
            <MindCard key={mind.name} mind={mind} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
