import { useState } from "react";
import { motion } from "framer-motion";

interface InterestFormProps {
  journeyTitle: string;
}

export default function InterestForm({ journeyTitle }: InterestFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here we'd send the form data and the specific journeyTitle to an API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <p className="font-serif text-2xl text-foreground mb-3">
          Interest Recorded.
        </p>
        <p className="text-muted-foreground text-sm">
          We'll be in touch regarding {journeyTitle} soon.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
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
          what calls you to {journeyTitle}?
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
          register interest
        </button>
      </div>
    </motion.form>
  );
}
