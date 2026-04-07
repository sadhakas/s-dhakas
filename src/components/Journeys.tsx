import { motion } from "framer-motion";
import JourneyCard from "./JourneyCard";
import { journeysData } from "../data/journeys";

export default function Journeys() {
  return (
    <section id="journeys" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-gold-dim text-xs tracking-[0.4em] lowercase mb-4">
            where we wander
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            The Journeys
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {journeysData.map((journey, i) => (
            <JourneyCard key={journey.title} journey={journey} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
