import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface InterestFormProps {
  journeyTitle: string;
}

export default function InterestForm({ journeyTitle }: InterestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Construct form data exactly as expected by Google Apps Script
    const formData = new FormData(e.currentTarget);
    formData.append("journeyTitle", journeyTitle);
    const data = Object.fromEntries(formData.entries());

    const scriptURL = import.meta.env.VITE_INTEREST_URL;

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors" // Crucial for client-side GAS connections
      });
      // no-cors obscures response.ok, so if fetch resolves, we assume success
      setSubmitted(true);
    } catch (error) {
      console.error("Error connecting to Google Script:", error);
      alert("Failed to submit form. Please ensure you have internet access or try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-gold/10 mx-auto flex items-center justify-center mb-6">
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-8 h-8 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        </div>
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
          name="name"
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
          name="email"
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
          name="phone"
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
          name="message"
          rows={3}
          className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 resize-none placeholder:text-muted-foreground/30"
          placeholder="A few words..."
        />
      </div>
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-gold/40 text-gold py-4 text-xs tracking-[0.3em] lowercase rounded-lg hover:bg-gold/10 hover:border-gold/70 transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-gold" />
              processing...
            </>
          ) : (
            "register interest"
          )}
        </button>
      </div>
    </motion.form>
  );
}
