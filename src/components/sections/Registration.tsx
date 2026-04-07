import { useState } from "react";
import { motion } from "framer-motion";

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="register" className="relative py-32 px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold-dim text-xs tracking-[0.4em] lowercase mb-4">
            begin the inquiry
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Join the Circle
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <p className="font-serif text-2xl text-foreground mb-3">
              Welcome, Sādhaka.
            </p>
            <p className="text-muted-foreground text-sm">
              We'll be in touch with the details of the next journey.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">
                name
              </label>
              <input
                required
                type="text"
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">
                email
              </label>
              <input
                required
                type="email"
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">
                phone
              </label>
              <input
                required
                type="tel"
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30"
                placeholder="+91 99999 99999"
              />
            </div>
            <div>
              <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">
                what calls you here?
              </label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 resize-none placeholder:text-muted-foreground/30"
                placeholder="A few words..."
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full border border-gold/40 text-gold py-4 text-xs tracking-[0.3em] lowercase rounded-lg hover:bg-gold/10 hover:border-gold/70 transition-all duration-500 cursor-pointer"
              >
                begin the journey
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
