import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Users,
  Ticket,
  Upload,
  CheckCircle2,
  AlertCircle,
  Video,
  Loader2,
  ChevronDown,
  Compass,
  Brain,
  Zap,
  Sprout,
  Search,
  Copy,
  Download
} from "lucide-react";

const GPAY_URL = "gpay://upi/pay?pa=yogya@superyes&pn=Sadhakas&am=300.00&cu=INR&tn=TMOL%20Registration";
const PHONEPE_URL = "phonepe://upi/pay?pa=yogya@superyes&pn=Sadhakas&am=300.00&cu=INR&tn=TMOL%20Registration";
const PAYTM_URL = "paytmmp://upi/pay?pa=yogya@superyes&pn=Sadhakas&am=300.00&cu=INR&tn=TMOL%20Registration";
const GENERIC_UPI_URL = "upi://pay?pa=yogya@superyes&pn=Sadhakas&am=300.00&cu=INR&tn=TMOL%20Registration";

export const isInternationalUser = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz !== "Asia/Calcutta" && tz !== "Asia/Kolkata";
  } catch (e) {
    return false; // default to India if unknown
  }
};

interface TmolRegistrationOverlayProps {
  onClose: () => void;
}

const PERKS = [
  { icon: BookOpen, label: "Physical self-help book", sub: "Shipped to your address" },
  { icon: Ticket, label: "Trip perks — Detox & Discover", sub: "Exclusive discounts on North & South India trips for 100% TMOL attendees" },
  { icon: Award, label: "Completion certificate", sub: "Issued upon finishing all 21 days" },
  { icon: Users, label: "Lifetime community access", sub: "Sādhakas community & resources" },
];

const MODULES = [
  {
    id: "01",
    title: "Foundations for Meaningful Living",
    topics: [
      "IQ, EQ & SQ: Understanding Human Intelligence Beyond Academics",
      "What Is Real Success? Existing vs Truly Living",
      "The Theory of Everything",
      "Finding Peace Amidst Chaos",
      "Science, Humanity & Spirituality: A Unified Vision",
      "Breaking Free: Habits, Discipline & Time Management",
    ],
  },
  {
    id: "02",
    title: "Discovering Infallible Wisdom",
    topics: [
      "Rediscovering Identity & Purpose",
      "Discovering Divinity: Does God Exist — Myth or Reality?",
      "Why Do Bad Things Happen to Good People? Understanding Karma",
      "Understanding the World Around Us: Science & Consciousness",
      "The Power and Influence of Time",
    ],
  },
  {
    id: "03",
    title: "Practical Application of Timeless Wisdom",
    topics: [
      "Applying Spiritual Wisdom in Daily Life",
      "The Search for Real Happiness & How to Attain It",
      "Mastering the Mind: Overcoming Restlessness & Inner Conflict",
      "Summary & Reflections",
    ],
  },
];

const OUTCOMES = [
  {
    icon: Compass,
    title: "Clarity & Direction",
    bullets: [
      "Understand what truly matters to you",
      "Make decisions with greater confidence",
      "Develop a clearer sense of purpose",
    ],
  },
  {
    icon: Brain,
    title: "Mastery of Mind & Emotions",
    bullets: [
      "Learn practical tools to handle stress and overthinking",
      "Improve focus and mental resilience",
      "Build emotional intelligence and self-awareness",
    ],
  },
  {
    icon: Zap,
    title: "Discipline & Personal Growth",
    bullets: [
      "Break free from unhelpful habits",
      "Develop sustainable discipline and time management",
      "Create systems that support long-term success",
    ],
  },
  {
    icon: Sprout,
    title: "Inner Peace & Well-Being",
    bullets: [
      "Discover how to remain calm amidst uncertainty",
      "Explore proven practices for lasting happiness",
      "Learn how to cultivate inner fulfillment rather than chasing temporary satisfaction",
    ],
  },
  {
    icon: Search,
    title: "Answers to Life's Bigger Questions",
    bullets: [
      "Who am I beyond my roles and achievements?",
      "What is the purpose of life?",
      "Does consciousness extend beyond the brain?",
      "What can timeless wisdom teach us about modern life?",
    ],
  },
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Reusable form body (used in both overlay and direct page) ───────────────
export function TmolRegistrationForm({ onSuccess, isInternational }: { onSuccess?: () => void, isInternational: boolean }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFree = ["SAMSONI108", "SATYABITSP100"].includes(couponCode.trim().toUpperCase());
  const requireScreenshot = !isInternational && !isFree;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFileError("Please upload an image file (JPG, PNG, etc.).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFileError("Screenshot must be under 2 MB. Please compress and re-upload.");
      return;
    }
    const base64 = await fileToBase64(file);
    setScreenshot(base64);
    setScreenshotName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (requireScreenshot && !screenshot) {
      setFileError("Please upload your payment screenshot to proceed.");
      return;
    }
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {
      journeyTitle: "TMOL — The Manual of Life",
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      couponCode: (formData.get("couponCode") as string) || "",
      message: (formData.get("message") as string) || "",
      paymentScreenshot: screenshot || "",
    };

    const scriptURL = import.meta.env.VITE_INTEREST_URL;

    try {
      // Fire-and-forget: The browser handles the upload in the background
      // so the user sees the success state instantly without waiting for GAS.
      fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
      setSubmitted(true);
      // We don't call onSuccess() immediately anymore so the modal stays open 
      // and shows the success checkmark.
    } catch (error) {
      console.error("TMOL Registration Error:", error);
      alert("Failed to submit. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 flex flex-col items-center"
      >
        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </motion.div>
        </div>
        <p className="font-serif text-2xl text-foreground mb-3">Registration Received.</p>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
          Welcome to the journey, Sādhaka. We'll verify your payment and be in touch within 24 hours. ✦
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">name</label>
        <input
          required
          name="name"
          type="text"
          className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-base focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30"
          placeholder="Your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">email</label>
        <input
          required
          name="email"
          type="email"
          className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-base focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30"
          placeholder="your@email.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">phone</label>
        <input
          required
          name="phone"
          type="tel"
          className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-base focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30"
          placeholder="+91 99999 99999"
        />
      </div>

      {/* Coupon Code */}
      <div>
        <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">
          coupon code <span className="text-muted-foreground/40">(optional)</span>
        </label>
        <input
          name="couponCode"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-base focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30 uppercase tracking-widest"
          placeholder="ENTER CODE"
        />
        {isFree && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs mt-2"
          >
            Valid code applied. Registration is free.
          </motion.p>
        )}
      </div>

      {/* Payment Screenshot Upload */}
      <motion.div animate={{ opacity: requireScreenshot ? 1 : 0.5 }}>
        <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-3">
          payment screenshot {requireScreenshot ? <span className="text-gold/70">*</span> : <span className="text-muted-foreground/40">(optional)</span>}
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`w-full flex items-center justify-center gap-3 border rounded-lg py-4 px-4 transition-all duration-300 cursor-pointer ${screenshot
            ? "border-gold/60 bg-gold/5 text-gold"
            : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
            }`}
        >
          {screenshot ? (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-sm truncate">{screenshotName}</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 shrink-0" />
              <span className="text-sm">Upload payment screenshot</span>
            </>
          )}
        </button>

        {fileError && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-2 text-red-400 text-xs"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {fileError}
          </motion.div>
        )}

        <p className="text-muted-foreground/50 text-[10px] mt-2 tracking-wide">
          Max 2 MB · JPG / PNG accepted
        </p>
      </motion.div>

      {/* Optional message */}
      <div>
        <label className="block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">
          anything you'd like to share? <span className="text-muted-foreground/40">(optional)</span>
        </label>
        <textarea
          name="message"
          rows={2}
          className="w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-base focus:outline-none focus:border-gold transition-colors duration-300 resize-none placeholder:text-muted-foreground/30"
          placeholder="A few words..."
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gold/10 border border-gold/50 text-gold py-4 text-xs tracking-[0.3em] lowercase rounded-lg hover:bg-gold/20 hover:border-gold transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              processing...
            </>
          ) : (
            "confirm registration →"
          )}
        </button>
      </div>
    </motion.form>
  );
}

// ─── Overlay wrapper (modal) ─────────────────────────────────────────────────
export default function TmolRegistrationOverlay({ onClose }: TmolRegistrationOverlayProps) {
  const [isInternational, setIsInternational] = useState(false);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText("yogya@superyes");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = "yogya@superyes";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    setIsInternational(isInternationalUser());
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-surface border border-gold/20 rounded-2xl overflow-y-auto md:overflow-hidden shadow-2xl shadow-gold/5 flex flex-col md:flex-row"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-sm rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left — Event Details + QR */}
        <div
          data-lenis-prevent="true"
          className="w-full md:w-1/2 p-8 md:p-12 overflow-visible md:overflow-y-auto border-b md:border-b-0 md:border-r border-border custom-scrollbar"
        >
          <p className="text-gold-dim text-[10px] tracking-[0.4em] lowercase mb-4">21-day live program</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
            The Manual of Life
          </h2>
          <p className="text-gold text-sm tracking-widest uppercase mb-8">TMOL · 2026</p>

          {/* Philosophy Pull-Quote */}
          <div className="border-l-2 border-gold/45 pl-4 py-1.5 my-8 max-w-md bg-gold/[0.02] rounded-r-lg">
            <p className="font-serif italic text-lg text-gold leading-relaxed">
              "We are taught how to build a career, but rarely how to build a life."
            </p>
            <p className="text-[10px] text-muted-foreground/40 tracking-wider uppercase mt-1">
              The Sādhakas Way
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
            Realign your life this summer! A transformative 21-day journey through the fundamental dimensions
            of life. Hosted online on Google Meet, each 30-minute daily session dives deep into The Self, The
            Mind, Action, Nature, and Higher Wisdom.
          </p>

          {/* Why This Program? */}
          <div className="mb-10 max-w-md">
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-3">
              why this program?
            </p>
            <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
              In a world where people can achieve success yet still struggle with anxiety, confusion, burnout, and lack of fulfillment, TMOL explores the timeless principles that help us understand ourselves, find direction, and live with greater purpose.
            </p>
          </div>

          {/* Key Details */}
          <div className="space-y-5 mb-10">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-0.5">Dates</p>
                <p className="text-muted-foreground text-sm">13 June – 5 July, 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-0.5">Registration Deadline</p>
                <p className="text-muted-foreground text-sm">10th June, 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-0.5">Session Timing & Duration</p>
                <p className="text-muted-foreground text-sm">8:30 PM IST · 30 minutes/day · 21 consecutive days</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-0.5">Format</p>
                <p className="text-muted-foreground text-sm">Online on Google Meet</p>
              </div>
            </div>
          </div>

          {/* Curriculum Journey */}
          <div className="mb-10 max-w-md">
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-4">
              what you will learn
            </p>
            <div className="space-y-3">
              {MODULES.map((mod, idx) => {
                const isOpen = activeModule === idx;
                return (
                  <div
                    key={mod.id}
                    className="border border-gold/15 bg-black/20 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveModule(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gold/5 transition-colors duration-300 focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-gold/60">{mod.id}</span>
                        <span className="font-serif text-sm text-foreground tracking-wide font-light">
                          {mod.title}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gold/60" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-4 pb-4 pt-2 border-t border-gold/5 bg-black/10 space-y-2">
                            {mod.topics.map((topic, tIdx) => (
                              <div key={tIdx} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold/45 mt-1.5 shrink-0" />
                                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                                  {topic}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What You'll Gain */}
          <div className="mb-10 max-w-2xl">
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-5">
              what you'll gain from tmol
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OUTCOMES.map((out, idx) => (
                <div
                  key={idx}
                  className="group border border-gold/10 hover:border-gold/25 bg-white/[0.01] hover:bg-white/[0.03] p-5 rounded-2xl transition-all duration-500 shadow-lg hover:shadow-gold/[0.02]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 shrink-0">
                      <out.icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif text-sm text-foreground tracking-wide font-light">
                      {out.title}
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {out.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gold/30 mt-1.5 shrink-0" />
                        <span className="text-[11px] text-muted-foreground/80 leading-relaxed font-light">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Perks */}
          <div className="mb-10">
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-5">what you get</p>
            <div className="space-y-4">
              {PERKS.filter(p => !isInternational || !p.label.includes("Trip")).map((perk) => (
                <div key={perk.label} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-md bg-gold/8 text-gold shrink-0">
                    <perk.icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm">{perk.label}</p>
                    <p className="text-muted-foreground/60 text-xs mt-0.5">{perk.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details / QR */}
          {isInternational ? (
            <div className="rounded-2xl border border-gold/15 bg-black/40 p-6 text-center">
              <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-4">
                registration cost
              </p>
              <p className="font-serif text-3xl text-gold mb-2">$9.99</p>
              <p className="text-muted-foreground/60 text-xs mt-4 mb-5 leading-relaxed">
                Secure your spot. Pay securely via DodoPayments, then upload your receipt below.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 bg-gold text-black font-medium py-3 px-4 text-xs tracking-widest uppercase rounded-lg hover:bg-gold/90 transition-all duration-300 mb-2"
              >
                Pay $9.99 (DodoPayments)
              </a>
              <p className="text-muted-foreground/40 text-[10px] tracking-widest uppercase">
                Free with coupon code
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-gold/15 bg-black/40 p-6 text-center">
              <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-4">
                step 1 — pay ₹300 via UPI
              </p>
              <div className="inline-block rounded-xl overflow-hidden border border-gold/20 shadow-lg shadow-black/40 bg-white p-2">
                <img
                  src="/assets/images/payment-qr.png"
                  alt="Sādhakas UPI Payment QR"
                  className="w-44 h-44 object-contain"
                />
              </div>
              <div className="mt-2 flex justify-center">
                <a
                  href="/assets/images/payment-qr.png"
                  download="Sadhakas-UPI-QR.png"
                  className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-gold uppercase tracking-wider transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Download QR</span>
                </a>
              </div>
              <p className="text-muted-foreground/60 text-xs mt-4 leading-relaxed">
                Scan the QR code, pay <span className="text-gold">₹300</span>, take a screenshot of the
                success screen, and upload it in the form →
              </p>
              {/* Pay Now UPI Options for mobile/all users */}
              <div className="mt-4 space-y-3 md:hidden">
                <p className="text-muted-foreground/40 text-[9px] tracking-[0.25em] uppercase">
                  Pay directly via UPI App
                </p>

                <div className="flex justify-center">
                  <a
                    href={GENERIC_UPI_URL}
                    className="group relative flex items-center justify-center gap-2 rounded-lg border border-gold/25 bg-gold/5 px-4 py-2.5 text-xs font-medium tracking-wider text-gold-dim hover:text-gold uppercase transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Pay Using UPI
                  </a>
                </div>

                <p className="text-muted-foreground/30 text-[8px] tracking-wide lowercase">
                  *Select your installed UPI app.
                </p>
              </div>
              {/* UPI ID fallback */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-muted-foreground/40 text-[10px] tracking-widest">or pay to UPI ID</span>
              </div>
              <div className="mt-1 flex items-center justify-center gap-2">
                <p className="font-mono text-gold text-sm tracking-wider select-all">yogya@superyes</p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-gold transition-colors"
                  title="Copy UPI ID"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right — Registration Form */}
        <div
          data-lenis-prevent="true"
          className="w-full md:w-1/2 p-8 md:p-12 overflow-visible md:overflow-y-auto bg-background/50 custom-scrollbar flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">step 2 — register</p>
            <h3 className="font-serif text-2xl text-foreground mb-8">Complete Your Registration</h3>
            <TmolRegistrationForm isInternational={isInternational} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
