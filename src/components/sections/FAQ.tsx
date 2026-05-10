import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What exactly is The Missing Curriculum?",
    answer: "It is the education they forgot to give us. While modern systems focus almost entirely on external achievement—grades, careers, and wealth—The Missing Curriculum is the science of the inner world. It gives you the actual frameworks to navigate your own mind, dissolve anxiety, locate deep purpose, and master your psychological terrain."
  },
  {
    question: "Is Sādhakas a religious organization?",
    answer: "No. Sādhakas is an exploration of spiritual technology. We utilize ancient frameworks, primarily from Vedic texts, treating them as profound cognitive science and structural psychological tools rather than dogma or blind faith."
  },
  {
    question: "Who is this for?",
    answer: "For the seeker. For the outlier. For the student who realizes that standard metrics of success are wildly insufficient for a deeply fulfilled life. If you are questioning the default narrative and demand substance over surface, you belong here."
  },
  {
    question: "How do I start my journey?",
    answer: "Step into the ecosystem. Register for an upcoming cohort or begin the 21-day mantra challenge. The path reveals itself to those who actually walk it."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToRegistration = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-32 relative z-10 px-6 max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-gold-dim text-xs tracking-[0.4em] lowercase mb-4">
          clarity
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6">
          Frequent Inquiries
        </h2>
        <div className="gold-line w-24 mx-auto" />
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="border border-border/50 rounded-xl bg-background/40 backdrop-blur-md overflow-hidden transition-colors hover:border-gold/30"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
            >
              <h3 className="text-lg font-serif font-medium text-foreground/90 pr-8">{faq.question}</h3>
              <div className="text-gold text-2xl flex-shrink-0 font-light w-6 text-center">
                {openIndex === idx ? "−" : "+"}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed font-sans text-base">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 text-center"
      >
        <p className="text-muted-foreground/70 mb-6 font-serif italic text-lg">Have a deeper inquiry regarding your path?</p>
        <button 
          onClick={scrollToRegistration}
          className="px-8 py-3 bg-transparent border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold/70 transition-all duration-500 rounded-full text-xs tracking-[0.3em] lowercase cursor-pointer"
        >
          Ask us directly
        </button>
      </motion.div>
    </section>
  );
}
