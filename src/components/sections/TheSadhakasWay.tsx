import { motion } from "framer-motion";

const elements = [
  {
    title: "Question",
    description: "It begins with an inquiry. A profound realization that our standard education has left the most critical aspects of our existence entirely unaddressed."
  },
  {
    title: "Gather",
    description: "We assemble into intentional spaces where vulnerability becomes a strength, and deep, unpretentious dialogue replaces superficial networking."
  },
  {
    title: "Travel",
    description: "Moving from theory directly into experience. We step far out of familiar environments and into transformative landscapes that force an inward pivot."
  },
  {
    title: "Integrate",
    description: "Reading the texts that truly matter, and weaving the eternal wisdom of philosophy, science, and the humanities back into our daily living."
  },
  {
    title: "Act",
    description: "Action born strictly from clarity. Once the mind is settled, we return to the noise of the world not to escape it, but to engage with it entirely."
  }
];

export default function TheSadhakasWay() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="text-gold-dim text-xs tracking-[0.4em] lowercase mb-4">
            the synthesis
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            The Sādhakas Way
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {elements.map((el, index) => (
            <motion.div
              key={el.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 text-center md:text-left"
            >
              {/* Massive Number Indicator */}
              <div className="text-6xl md:text-8xl font-serif text-gold/10 font-light select-none">
                0{index + 1}
              </div>
              
              <div className="flex-1 mt-2 md:mt-4">
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  {el.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-light">
                  {el.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
