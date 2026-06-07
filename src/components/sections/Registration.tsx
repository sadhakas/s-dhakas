import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPill, setSelectedPill] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const scriptURL = import.meta.env.VITE_REGISTRATION_URL;

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors"
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Registration Script Error:", error);
      alert("Failed to register. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="relative pt-32 pb-8 px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#1A1A18]/60 text-xs tracking-[0.4em] lowercase mb-4 font-mono">
            begin the inquiry
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1A1A18]">
            Join the Circle
          </h2>
          <div className="w-24 h-[1px] bg-[#1A1A18]/30 mx-auto mt-6" />
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-[#1A1A18]/5 border border-[#1A1A18]/10 mx-auto flex items-center justify-center mb-6">
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-8 h-8 text-[#1A1A18]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            </div>
            <p className="font-serif text-2xl text-[#1A1A18] mb-3">
              Welcome, Sādhaka.
            </p>
            <p className="text-[#1A1A18]/60 text-sm font-light">
              We'll be in touch with you soon.
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
              <label className="block text-[#1A1A18]/50 text-[10px] tracking-[0.3em] lowercase mb-2 font-mono">
                name
              </label>
              <input
                required
                name="name"
                type="text"
                className="w-full bg-transparent border-b border-[#1A1A18]/20 py-3 text-[#1A1A18] font-serif text-lg focus:outline-none focus:border-[#1A1A18] transition-colors duration-300 placeholder:text-[#1A1A18]/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[#1A1A18]/50 text-[10px] tracking-[0.3em] lowercase mb-2 font-mono">
                email
              </label>
              <input
                required
                name="email"
                type="email"
                className="w-full bg-transparent border-b border-[#1A1A18]/20 py-3 text-[#1A1A18] font-serif text-lg focus:outline-none focus:border-[#1A1A18] transition-colors duration-300 placeholder:text-[#1A1A18]/20"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-[#1A1A18]/50 text-[10px] tracking-[0.3em] lowercase mb-2 font-mono">
                phone
              </label>
              <input
                required
                name="phone"
                type="tel"
                className="w-full bg-transparent border-b border-[#1A1A18]/20 py-3 text-[#1A1A18] font-serif text-lg focus:outline-none focus:border-[#1A1A18] transition-colors duration-300 placeholder:text-[#1A1A18]/20"
                placeholder="+91 99999 99999"
              />
            </div>
            <div>
              <label className="block text-[#1A1A18]/50 text-[10px] tracking-[0.3em] lowercase mb-4 font-mono">
                what calls you here?
              </label>
              <div className="flex flex-wrap gap-3 mb-2">
                {["Online Community", "Upcoming Retreats", "Curiosity", "Self-Discovery", "Other"].map((pill) => (
                  <button
                    type="button"
                    key={pill}
                    onClick={() => setSelectedPill(pill)}
                    className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                      selectedPill === pill 
                        ? "bg-[#1A1A18] text-white border-[#1A1A18]" 
                        : "bg-transparent text-[#1A1A18]/60 border-[#1A1A18]/20 hover:border-[#1A1A18]/50"
                    }`}
                  >
                    {pill}
                  </button>
                ))}
              </div>
              <input type="hidden" name="message" value={selectedPill} />
            </div>
            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 border border-[#1A1A18]/30 text-[#1A1A18] py-4 text-xs tracking-[0.3em] lowercase rounded-lg hover:bg-[#1A1A18]/5 hover:border-[#1A1A18]/60 transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#1A1A18]" />
                    processing...
                  </>
                ) : (
                  "begin the journey"
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
