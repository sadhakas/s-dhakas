import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CreditCard,
  BookOpen,
  Award,
  Users,
  Ticket,
  ArrowLeft,
  Video,
  Smartphone,
} from "lucide-react";
import { TmolRegistrationForm, isInternationalUser } from "@/components/shared/TmolRegistrationOverlay";
import InteractiveBackground from "@/components/layout/InteractiveBackground";

export const Route = createFileRoute("/register-tmol-2k26")({
  component: RegisterTmol,
  head: () => ({
    meta: [
      { title: "Register for TMOL — The Manual of Life · Sādhakas" },
      {
        name: "description",
        content:
          "Register for The Manual of Life — a 21-day live program by Sādhakas. 13 June – 5 July 2026. 30 min/day. ₹300 registration.",
      },
    ],
  }),
});

const PERKS = [
  {
    icon: BookOpen,
    label: "Physical self-help book",
    sub: "Shipped to your address",
  },
  {
    icon: Ticket,
    label: "Trip perks — Detox & Discover",
    sub: "Exclusive discounts on North & South India trips for 100% TMOL attendees",
  },
  {
    icon: Award,
    label: "Completion certificate",
    sub: "Issued upon finishing all 21 days",
  },
  {
    icon: Users,
    label: "Lifetime community access",
    sub: "Sādhakas community & resources",
  },
];

function RegisterTmol() {
  const [isInternational, setIsInternational] = useState(false);

  useEffect(() => {
    setIsInternational(isInternationalUser());
  }, []);

  return (
    <InteractiveBackground>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "rgba(10,8,6,0.97)" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/40">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sādhakas
          </Link>
          <span className="font-serif text-gold text-sm tracking-widest">
            TMOL · 2026
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full px-6 py-12 gap-12 lg:gap-16">
          {/* Left — Event Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 lg:sticky lg:top-12 lg:self-start"
          >
            <p className="text-gold-dim text-[10px] tracking-[0.4em] lowercase mb-4">
              21-day live program
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl font-light text-foreground mb-3"
              style={{ fontFamily: "'Gencha', serif" }}
            >
              The Manual of Life
            </h1>
            <p className="text-gold text-sm tracking-widest uppercase mb-8">
              TMOL · Sādhakas · 2026
            </p>

            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Realign your life this summer! A transformative 21-day journey through the fundamental dimensions
              of life. Hosted online on Google Meet, each 30-minute daily session dives deep into The Self, The
              Mind, Action, Nature, and Higher Wisdom.
            </p>

            {/* Key details */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium mb-0.5">
                    Dates
                  </p>
                  <p className="text-muted-foreground text-sm">
                    13 June – 5 July, 2026
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium mb-0.5">
                    Session Duration
                  </p>
                  <p className="text-muted-foreground text-sm">
                    30 minutes/day · 21 consecutive days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium mb-0.5">
                    Format
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Online on Google Meet
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gold/10 text-gold shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium mb-0.5">
                    Registration Cost
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {isInternational ? "$9.99" : "₹300"}
                  </p>
                </div>
              </div>
            </div>

            {/* Perks */}
            <div className="mb-10">
              <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-5">
                what you get
              </p>
              <div className="space-y-4">
                {PERKS.filter(p => !isInternational || !p.label.includes("Trip")).map((perk) => (
                  <div key={perk.label} className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-md bg-gold/8 text-gold shrink-0">
                      <perk.icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-foreground text-sm">{perk.label}</p>
                      <p className="text-muted-foreground/60 text-xs mt-0.5">
                        {perk.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details / QR */}
            {isInternational ? (
              <div className="rounded-2xl border border-gold/15 bg-black/50 p-6 text-center max-w-sm">
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
              <div className="rounded-2xl border border-gold/15 bg-black/50 p-6 text-center max-w-sm">
                <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-4">
                  step 1 — pay ₹300 via UPI
                </p>
                <div className="inline-block rounded-xl overflow-hidden border border-gold/20 shadow-lg bg-white p-2">
                  <img
                    src="/assets/images/payment-qr.png"
                    alt="Sādhakas UPI Payment QR"
                    className="w-44 h-44 object-contain"
                  />
                </div>
                <p className="text-muted-foreground/60 text-xs mt-4 leading-relaxed">
                  Scan · Pay <span className="text-gold">₹300</span> · Screenshot
                  the success screen · Upload below
                </p>
                {/* Pay Now UPI Options for mobile/all users */}
                <div className="mt-4 space-y-3 md:hidden">
                  <p className="text-muted-foreground/40 text-[9px] tracking-[0.25em] uppercase">
                    Pay directly via UPI App
                  </p>

                  {/* Grid of Apps */}
                  <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                    <a
                      href="gpay://upi/pay?pa=yogya@superyes&pn=Sadhakas&am=300.00&cu=INR&tn=TMOL%20Registration"
                      className="group relative flex items-center justify-center gap-1.5 rounded-lg border border-gold/25 bg-gold/5 px-2 py-2.5 text-[10px] font-medium tracking-wider text-gold-dim hover:text-gold uppercase transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Google Pay
                    </a>
                    <a
                      href="phonepe://upi/pay?pa=yogya@superyes&pn=Sadhakas&am=300.00&cu=INR&tn=TMOL%20Registration"
                      className="group relative flex items-center justify-center gap-1.5 rounded-lg border border-gold/25 bg-gold/5 px-2 py-2.5 text-[10px] font-medium tracking-wider text-gold-dim hover:text-gold uppercase transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      PhonePe
                    </a>
                    <a
                      href="paytmmp://upi/pay?pa=yogya@superyes&pn=Sadhakas&am=300.00&cu=INR&tn=TMOL%20Registration"
                      className="group relative flex items-center justify-center gap-1.5 rounded-lg border border-gold/25 bg-gold/5 px-2 py-2.5 text-[10px] font-medium tracking-wider text-gold-dim hover:text-gold uppercase transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Paytm
                    </a>
                    <a
                      href="upi://pay?pa=yogya@superyes&pn=Sadhakas&am=300.00&cu=INR&tn=TMOL%20Registration"
                      className="group relative flex items-center justify-center gap-1.5 rounded-lg border border-gold/25 bg-gold/5 px-2 py-2.5 text-[10px] font-medium tracking-wider text-gold-dim hover:text-gold uppercase transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Other App
                    </a>
                  </div>

                  <p className="text-muted-foreground/30 text-[8px] tracking-wide lowercase">
                    *Select your app.
                  </p>
                </div>
                {/* UPI ID fallback */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-muted-foreground/40 text-[10px] tracking-widest">or pay to UPI ID</span>
                </div>
                <p className="mt-1 font-mono text-gold text-sm tracking-wider select-all">yogya@superyes</p>
              </div>
            )}
          </motion.div>

          {/* Divider (desktop) */}
          <div className="hidden lg:block w-[1px] bg-border/40 self-stretch" />

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 max-w-lg"
          >
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2">
              step 2 — register
            </p>
            <h2 className="font-serif text-3xl text-foreground mb-8">
              Complete Your Registration
            </h2>
            <TmolRegistrationForm isInternational={isInternational} />
          </motion.div>
        </div>

        {/* Footer line */}
        <div className="border-t border-border/30 px-6 py-5 text-center">
          <p className="text-muted-foreground/30 text-[10px] tracking-[0.3em] lowercase">
            sādhakas · the missing curriculum
          </p>
        </div>
      </div>
    </InteractiveBackground>
  );
}
