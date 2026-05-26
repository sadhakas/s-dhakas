import { motion } from "framer-motion";

const elements = [
  {
    title: "Question",
    description: "It begins with an inquiry. A profound realization that our standard education has left the most critical aspects of our existence entirely unaddressed.",
    dir: "left" as const
  },
  {
    title: "Gather",
    description: "We assemble into intentional spaces where vulnerability becomes a strength, and deep, unpretentious dialogue replaces superficial networking.",
    dir: "right" as const
  },
  {
    title: "Travel",
    description: "Moving from theory directly into experience. We step far out of familiar environments and into transformative landscapes that force an inward pivot.",
    dir: "left" as const
  },
  {
    title: "Integrate",
    description: "Reading the texts that truly matter, and weaving the eternal wisdom of philosophy, science, and the humanities back into our daily living.",
    dir: "right" as const
  },
  {
    title: "Act",
    description: "Action born strictly from clarity. Once the mind is settled, we return to the noise of the world not to escape it, but to engage with it entirely.",
    dir: "left" as const
  }
];

function StepSlide({ el, i }: { el: typeof elements[0]; i: number }) {
  const isLeft = el.dir === "left";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24"
    >
      <div className={`flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-20`}>
        {/* Index number */}
        <div className="shrink-0 select-none">
          <span className="font-serif text-[100px] md:text-[180px] leading-none text-primary/10 font-light">
            0{i + 1}
          </span>
        </div>
        {/* Content */}
        <div className={`flex-1 text-center ${isLeft ? "md:text-left" : "md:text-right"}`}>
          <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-none tracking-tight">
            {el.title}
          </h3>
          <div className={`h-[1px] w-24 bg-gradient-to-r from-primary/60 to-transparent mb-6 ${isLeft ? "mx-auto md:mx-0" : "mx-auto md:ml-auto md:mr-0 rotate-180 md:rotate-0"}`} />
          <p className="text-muted-foreground/80 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0">
            {el.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TheSadhakasWay() {
  return (
    <section className="relative w-full py-32 overflow-hidden">
      <div className="text-center mb-24 relative z-10 px-6">
        <p className="text-primary/60 text-[10px] tracking-[0.5em] uppercase mb-3">
          The Synthesis
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground">
          The Sādhakas Way
        </h2>
      </div>

      <div className="relative z-10 space-y-12 md:space-y-0">
        {elements.map((el, i) => (
          <StepSlide key={el.title} el={el} i={i} />
        ))}
      </div>
    </section>
  );
}
