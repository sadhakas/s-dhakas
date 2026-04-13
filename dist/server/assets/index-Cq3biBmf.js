import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { BookOpen, Users, Target, Music, Compass, Map, X, ChevronLeft, ChevronRight, Loader2, Calendar, Clock, MapPin, CreditCard } from "lucide-react";
function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const navLinks = [
  { label: "philosophy", href: "#philosophy" },
  { label: "offerings", href: "#offerings" },
  { label: "manual of life", href: "#manual" },
  { label: "journeys", href: "#journeys" },
  { label: "register", href: "#register" }
];
function Navigation() {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const timeoutRef = useRef(null);
  const isOpen = isPinned || isHovered || isMobileOpen;
  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    timeoutRef.current = setTimeout(() => setIsHovered(false), 200);
  };
  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsPinned(!isPinned);
      if (!isPinned) setIsHovered(false);
    }
  };
  const handleLinkClick = (href) => {
    setIsMobileOpen(false);
    setIsPinned(false);
    setIsHovered(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed top-6 right-6 z-50",
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleClick,
            className: "relative z-50 flex flex-col gap-1.5 p-2 group cursor-pointer",
            "aria-label": "Menu",
            children: [
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
                  className: "block w-6 h-[1px] bg-gold origin-center"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: isOpen ? { opacity: 0 } : { opacity: 1 },
                  className: "block w-4 h-[1px] bg-gold ml-auto"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
                  className: "block w-6 h-[1px] bg-gold origin-center"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
          motion.nav,
          {
            initial: { opacity: 0, x: 40 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 40 },
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            className: "absolute top-0 right-0 pt-14 pr-2",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-surface-elevated/95 backdrop-blur-xl border border-border rounded-lg p-6 min-w-[180px]", children: [
              /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-4", children: navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleLinkClick(link.href),
                  className: "text-muted-foreground hover:text-gold text-sm lowercase tracking-[0.2em] transition-colors duration-300 cursor-pointer",
                  children: link.label
                }
              ) }, link.label)) }),
              /* @__PURE__ */ jsx("div", { className: "gold-line mt-5 mb-3 opacity-30" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/40 text-[10px] lowercase tracking-[0.15em]", children: "sādhakas" })
            ] })
          }
        ) })
      ]
    }
  );
}
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const circleScale1 = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const circleScale2 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const circleScale3 = useTransform(scrollYProgress, [0, 1], [1, 3.5]);
  const circleScale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const circles = [
    { scale: circleScale4, size: 500, delay: 0 },
    { scale: circleScale3, size: 380, delay: 0.1 },
    { scale: circleScale2, size: 260, delay: 0.2 },
    { scale: circleScale1, size: 140, delay: 0.3 }
  ];
  return /* @__PURE__ */ jsx("section", { ref, className: "relative h-[200vh]", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-0 h-screen flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: circles.map((c, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        style: { scale: c.scale },
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.2, delay: c.delay + 0.5 },
        className: "absolute rounded-full border border-gold/20",
        "aria-hidden": true,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            style: { width: c.size, height: c.size },
            className: "rounded-full"
          }
        )
      },
      i
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        style: { opacity: titleOpacity, y: titleY },
        className: "relative z-10 text-center px-4",
        children: [
          /* @__PURE__ */ jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 1 },
              className: "text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.04em] text-foreground",
              style: { fontFamily: "'Gencha', serif" },
              children: "Sādhakas"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scaleX: 0 },
              animate: { scaleX: 1 },
              transition: { duration: 0.8, delay: 1.5 },
              className: "gold-line w-32 md:w-48 mx-auto my-6"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.8, delay: 1.8 },
              className: "font-serif text-lg md:text-xl text-gold-dim tracking-[0.3em] uppercase font-light",
              children: "The Missing Curriculum"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 2.5 },
        style: { opacity: titleOpacity },
        className: "absolute bottom-12 left-1/2 -translate-x-1/2",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { y: [0, 8, 0] },
            transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            className: "w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent"
          }
        )
      }
    )
  ] }) });
}
const minds = [
  {
    name: "Albert Einstein",
    domain: "Physics · Imagination",
    quote: "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.",
    years: "1879 – 1955",
    image: "/assets/images/minds/port_einstein.png"
  },
  {
    name: "Nikola Tesla",
    domain: "Engineering · Vision",
    quote: "The Vedic conception of the universe is the most magnificent.",
    years: "1856 – 1943",
    image: "/assets/images/minds/port_tesla.png"
  },
  {
    name: "Rabindra Tagore",
    domain: "Poetry · Consciousness",
    quote: "The Upanishads give what the world needs most—a knowledge of the Self.",
    years: "1861 – 1941",
    image: "/assets/images/minds/port_rabindra_tagore.png"
  }
];
function MindCard({ mind, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const direction = index % 2 === 0 ? 1 : -1;
  const y = useTransform(scrollYProgress, [0, 1], [direction * 20, direction * -20]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      style: { y },
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.7, delay: index * 0.15 },
      whileHover: { y: -6 },
      className: "group relative bg-surface border border-border rounded-lg p-8 transition-colors duration-500 hover:border-gold/40",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/50 transition-all duration-700" }),
        /* @__PURE__ */ jsx("div", { className: "relative w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full overflow-hidden border border-border max-md:border-gold/50 md:group-hover:border-gold/50 transition-all duration-700 max-md:drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] md:group-hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] z-10", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: mind.image,
            alt: mind.name,
            className: "w-full h-full object-cover filter max-md:grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-gold text-xs tracking-[0.3em] lowercase mb-1", children: mind.domain }),
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-3xl font-light text-foreground mb-4", children: mind.name }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/60 text-[10px] tracking-[0.2em] mb-6", children: mind.years }),
        /* @__PURE__ */ jsxs("blockquote", { className: "font-serif text-sm md:text-base leading-relaxed text-muted-foreground italic", children: [
          '"',
          mind.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsx("div", { className: "gold-line mt-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500" })
      ]
    }
  );
}
function Philosophy() {
  return /* @__PURE__ */ jsx("section", { id: "philosophy", className: "relative py-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto relative", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8 },
        className: "text-center mb-20",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-gold-dim text-xs tracking-[0.4em] lowercase mb-4", children: "a gallery of minds" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl md:text-5xl font-light text-foreground", children: "Those Who Sought" }),
          /* @__PURE__ */ jsx("div", { className: "gold-line w-24 mx-auto mt-6" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8", children: minds.map((mind, i) => /* @__PURE__ */ jsx(MindCard, { mind, index: i }, mind.name)) })
  ] }) });
}
function AnimatedNumber({ value, suffix = "%" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      ref,
      initial: { opacity: 0 },
      animate: inView ? { opacity: 1 } : {},
      className: "font-serif text-7xl md:text-8xl font-light",
      children: inView ? /* @__PURE__ */ jsxs(
        motion.span,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 },
          children: [
            value,
            suffix
          ]
        }
      ) : /* @__PURE__ */ jsxs("span", { className: "opacity-0", children: [
        value,
        suffix
      ] })
    }
  );
}
function Problem() {
  return /* @__PURE__ */ jsx("section", { id: "problem", className: "relative py-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        className: "text-gold-dim text-xs tracking-[0.4em] lowercase text-center mb-16",
        children: "the paradox of our time"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-0", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7 },
          className: "border-r-0 md:border-r border-border p-8 md:p-12 text-center md:text-right",
          children: [
            /* @__PURE__ */ jsx(AnimatedNumber, { value: 58 }),
            /* @__PURE__ */ jsx("p", { className: "font-serif text-lg md:text-xl text-foreground mt-4 mb-3", children: "The Age of Information" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-sm ml-auto", children: "of young adults report feeling overwhelmed by the sheer volume of information available, yet unable to find what truly matters." })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, delay: 0.2 },
          className: "p-8 md:p-12 text-center md:text-left",
          children: [
            /* @__PURE__ */ jsx(AnimatedNumber, { value: 51 }),
            /* @__PURE__ */ jsx("p", { className: "font-serif text-lg md:text-xl text-foreground mt-4 mb-3", children: "The Meaning Gap" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-sm", children: "report a persistent sense that their education failed to address the deeper questions of purpose, meaning, and how to live well." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true },
        transition: { duration: 1, delay: 0.4 },
        className: "gold-line max-w-xs mx-auto mt-16"
      }
    )
  ] }) });
}
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
function TheSadhakasWay() {
  return /* @__PURE__ */ jsx("section", { className: "relative py-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "text-center mb-24",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-gold-dim text-xs tracking-[0.4em] lowercase mb-4", children: "the synthesis" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl md:text-5xl font-light text-foreground", children: "The Sādhakas Way" }),
          /* @__PURE__ */ jsx("div", { className: "gold-line w-24 mx-auto mt-6" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "space-y-16 md:space-y-24", children: elements.map((el, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, delay: index * 0.1 },
        className: "flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 text-center md:text-left",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-6xl md:text-8xl font-serif text-gold/10 font-light select-none", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 mt-2 md:mt-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl text-foreground mb-4", children: el.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed text-lg font-light", children: el.description })
          ] })
        ]
      },
      el.title
    )) })
  ] }) });
}
function Intro() {
  return /* @__PURE__ */ jsx("section", { className: "relative py-24 md:py-32 px-6 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
        viewport: { once: true },
        transition: { duration: 1.2, ease: "easeOut" },
        className: "w-full md:w-1/2 flex justify-center",
        children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold/5 blur-[100px] rounded-full point-events-none" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/assets/images/logo.png",
              alt: "Sādhakas Emblem",
              className: "relative w-64 md:w-[28rem] h-auto object-contain drop-shadow-2xl opacity-90 transition-opacity hover:opacity-100"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 30 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 1, delay: 0.3 },
        className: "w-full md:w-1/2 text-center md:text-left",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-gold-dim text-xs tracking-[0.4em] lowercase mb-6", children: "the genesis" }),
          /* @__PURE__ */ jsxs("h2", { className: "font-serif text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight", children: [
            "We are Sādhakas.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/50", children: "Seekers of the missing curriculum." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-muted-foreground text-lg leading-relaxed font-light max-w-lg mx-auto md:mx-0", children: [
            /* @__PURE__ */ jsx("p", { children: "Our current structures of learning ask us what we want to do, but rarely who we wish to become. We believe the deepest questions of existence shouldn't be left to chance." }),
            /* @__PURE__ */ jsx("p", { children: "Sādhakas was born to build that bridge. A community of minds choosing inquiry over certainty, traversing history, philosophy, and experience to remember what it means to be truly alive." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "gold-line w-24 mx-auto md:mx-0 mt-12" })
        ]
      }
    )
  ] }) });
}
const offerings = [
  {
    title: "Manual of Life",
    description: "Our flagship modular program exploring the fundamental dimensions of existence.",
    icon: /* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5 md:w-6 md:h-6" })
  },
  {
    title: "Community",
    description: "A gathering of genuine seekers engaging in transformative, unpretentious dialogue.",
    icon: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 md:w-6 md:h-6" })
  },
  {
    title: "Workshops",
    description: "Intensive deep-dives into specific philosophy, practical application, and integration.",
    icon: /* @__PURE__ */ jsx(Target, { className: "w-5 h-5 md:w-6 md:h-6" })
  },
  {
    title: "Music & Culture",
    description: "Immersive experiences bridging the gap between art, sound, and consciousness.",
    icon: /* @__PURE__ */ jsx(Music, { className: "w-5 h-5 md:w-6 md:h-6" })
  },
  {
    title: "Mentoring",
    description: "1-on-1 guidance to cultivate clarity, discipline, and profound existential meaning.",
    icon: /* @__PURE__ */ jsx(Compass, { className: "w-5 h-5 md:w-6 md:h-6" })
  },
  {
    title: "Retreats",
    description: "Expansive journeys moving from theory into rugged, transformative experience.",
    icon: /* @__PURE__ */ jsx(Map, { className: "w-5 h-5 md:w-6 md:h-6" })
  }
];
function Offerings() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = offerings[activeIdx];
  return /* @__PURE__ */ jsx("section", { id: "offerings", className: "relative py-24 md:py-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "text-center mb-16 md:mb-20 w-full",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-gold-dim text-xs tracking-[0.4em] lowercase mb-4", children: "the path forward" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl md:text-5xl font-light text-foreground", children: "Our Offerings" }),
          /* @__PURE__ */ jsx("div", { className: "gold-line w-24 mx-auto mt-6" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 md:gap-16 items-start w-full max-w-5xl", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full md:w-[40%] flex flex-col space-y-3", children: offerings.map((item, idx) => {
        const isActive = activeIdx === idx;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveIdx(idx),
            className: `group flex items-center justify-between px-6 py-5 w-full text-left rounded-2xl transition-all duration-500 border cursor-pointer
                    ${isActive ? "bg-gold/10 border-gold/30 text-gold shadow-[0_0_30px_rgba(212,175,55,0.05)]" : "bg-surface-elevated/20 border-white/5 text-muted-foreground hover:border-gold/20 hover:text-white"}
                  `,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: `transition-colors duration-500 ${isActive ? "text-gold" : "text-white/40 group-hover:text-gold/50"}`, children: item.icon }),
                /* @__PURE__ */ jsx("span", { className: "font-serif text-xl sm:text-2xl", children: item.title })
              ] }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: { x: isActive ? 5 : 0, opacity: isActive ? 1 : 0 },
                  transition: { type: "spring", stiffness: 300, damping: 30 },
                  children: isActive && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold" })
                }
              )
            ]
          },
          item.title
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full md:w-[60%]", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.98, x: 20 },
          animate: { opacity: 1, scale: 1, x: 0 },
          exit: { opacity: 0, scale: 0.98, x: -20 },
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          className: "w-full min-h-[350px] md:min-h-[450px] rounded-3xl bg-surface/40 backdrop-blur-xl border border-gold/10 p-8 sm:p-12 shadow-[0_0_50px_rgba(212,175,55,0.05)] text-center md:text-left flex flex-col items-center md:items-start justify-center",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.15)]", children: /* @__PURE__ */ jsx("div", { className: "scale-150", children: activeItem.icon }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6", children: activeItem.title }),
            /* @__PURE__ */ jsx("div", { className: "gold-line w-16 mb-8 opacity-50 md:mx-0 mx-auto" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground font-light text-lg sm:text-xl leading-relaxed", children: activeItem.description })
          ]
        },
        activeItem.title
      ) }) })
    ] })
  ] }) });
}
const themes = [
  {
    title: "The Self",
    subtitle: "Understanding Identity",
    description: "Exploring what defines the individual beyond temporary roles and labels."
  },
  {
    title: "The Mind",
    subtitle: "Inner Clarity",
    description: "Understanding how thoughts and emotions shape our experience of life."
  },
  {
    title: "Action",
    subtitle: "The Principle of Choices",
    description: "How decisions influence character, consequences, and direction."
  },
  {
    title: "Nature",
    subtitle: "Human Tendencies",
    description: "Understanding the forces that shape behavior and habits."
  },
  {
    title: "Higher Wisdom",
    subtitle: "Living with Purpose",
    description: "Integrating insight to cultivate clarity, discipline, and meaning."
  }
];
const deliverables = [
  "curated concept notes",
  "visual pocket maps",
  "reflection workbook",
  "life-design exercises",
  "completion certificate"
];
function ManualOfLife() {
  return /* @__PURE__ */ jsx("section", { id: "manual", className: "relative py-32 px-6 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "text-center md:text-left mb-20 max-w-3xl",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center md:justify-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "w-8 h-8 text-gold" }),
            /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl md:text-5xl text-gold", children: "The Manual of Life" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-6", children: "A modular program exploring the fundamental dimensions of life through philosophical inquiry and practical reflection." }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/70 leading-relaxed max-w-2xl", children: "Participants examine timeless ideas and apply them to modern life through guided discussions, concept maps, and reflective exercises." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative py-12 mb-24 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-16", children: themes.map((theme, idx) => {
        const isEven = idx % 2 === 0;
        return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col md:flex-row items-center w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full md:w-[calc(50%-1px)] flex justify-center md:justify-end md:pr-12 md:order-1 order-2", children: isEven && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -30 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: idx * 0.1 },
              className: "text-center md:text-right",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "inline-block bg-gradient-to-r from-gold/80 to-gold text-black rounded-full px-6 py-2 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: theme.title }),
                  " — ",
                  theme.subtitle
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/80 text-sm max-w-xs ml-auto mr-auto md:mr-0 pl-4 border-l-2 md:border-l-0 md:border-r-2 border-gold/30", children: theme.description })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border border-gold z-10 items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-gold" }) }),
          /* @__PURE__ */ jsx("div", { className: "w-full md:w-[calc(50%-1px)] flex justify-center md:justify-start md:pl-12 md:order-3 order-2", children: !isEven && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 30 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: idx * 0.1 },
              className: "text-center md:text-left pt-6 md:pt-0",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "inline-block bg-gradient-to-r from-gold to-gold/80 text-black rounded-full px-6 py-2 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: theme.title }),
                  " — ",
                  theme.subtitle
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/80 text-sm max-w-xs mx-auto md:mx-0 pr-4 border-r-2 md:border-r-0 md:border-l-2 border-gold/30", children: theme.description })
              ]
            }
          ) })
        ] }, theme.title);
      }) })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "text-center bg-black/40 border border-gold/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm",
        children: [
          /* @__PURE__ */ jsx("h3", { className: "text-gold text-lg font-serif mb-8", children: "Participants receive:" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 md:gap-x-8 gap-y-4", children: deliverables.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-gold/50" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm tracking-widest lowercase", children: item })
          ] }, i)) })
        ]
      }
    )
  ] }) });
}
function JourneyCard({
  journey,
  index,
  onClick,
  compact = false
}) {
  const isCompleted = journey.status === "Completed";
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      onClick,
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.7, delay: index * 0.15 },
      className: `group relative bg-surface border border-border rounded-lg overflow-hidden transition-colors duration-500 hover:border-gold/40 cursor-pointer ${compact ? "flex-none w-[300px] md:w-[350px]" : ""}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden ${compact ? "h-40 md:h-44" : "h-56 md:h-64"}`, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: journey.image,
              alt: journey.title,
              className: "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 memory-mode"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ jsx(
            "span",
            {
              className: `text-[10px] tracking-[0.2em] lowercase px-3 py-1 rounded-full border ${isCompleted ? "border-gold/30 text-gold-dim bg-background/60" : "border-gold/50 text-gold bg-background/60"} backdrop-blur-sm shadow-lg`,
              children: isCompleted ? "memory" : "upcoming"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: compact ? "p-4 md:p-6" : "p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gold-dim text-[10px] tracking-[0.3em] lowercase mb-2", children: journey.location }),
          /* @__PURE__ */ jsx("h3", { className: `font-serif font-light text-foreground mb-3 lowercase ${compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`, children: journey.title }),
          /* @__PURE__ */ jsx("p", { className: `text-muted-foreground text-sm leading-relaxed mb-4 ${compact ? "line-clamp-2" : ""}`, children: journey.description }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/40 text-[10px] tracking-[0.15em]", children: journey.date }),
          /* @__PURE__ */ jsx("div", { className: "gold-line mt-6 opacity-20 group-hover:opacity-50 transition-opacity duration-500" })
        ] })
      ]
    }
  );
}
const journeysData = [
  {
    title: "Ganga Echoes",
    location: "Rishikesh · Ganga · Dehradun",
    description: "A soulful getaway to Rishikesh. Designed for connection and clarity, this trip is an invitation to pause, breathe, and experience the profound serenity of the Ganges. Pack your bags, bring an open mind, and we will see you by the river.",
    status: "Completed",
    date: "April 2026",
    image: "/assets/images/journeys/gangaechoes2026/rsks_1.jpg",
    gallery: [
      "/assets/images/journeys/gangaechoes2026/rsks_1.jpg",
      "/assets/images/journeys/gangaechoes2026/sastradhara.jpg",
      "/assets/images/journeys/gangaechoes2026/dprg_1.jpg",
      "/assets/images/journeys/gangaechoes2026/rafting_1.jpg",
      "/assets/images/journeys/gangaechoes2026/dprg_2.jpg"
    ]
  },
  {
    title: "Inception 2025",
    location: "Kanak Ghati · Govind Devji · Jal Mahal",
    description: "A contemplative passage through Jaipur. Walking temple paths at dawn and pausing at Govind Dev Ji Temple, an inward journey of calm and clarity where the noise fades and something deeper begins to unfold.",
    status: "Completed",
    date: "March 2025",
    image: "/assets/images/journeys/inception2025/fort.jpg",
    gallery: [
      "/assets/images/journeys/inception2025/fort.jpg",
      "/assets/images/journeys/inception2025/gaushala_2.jpg",
      "/assets/images/journeys/inception2025/gaushala.jpg",
      "/assets/images/journeys/inception2025/sunrise_jalmahal.jpg",
      "/assets/images/journeys/inception2025/concert.jpg",
      "/assets/images/journeys/inception2025/sunrise_jalmahal_2.jpg"
    ]
  },
  {
    title: "MahaKumbh 2025",
    location: "Prayagraj · Ganga · Sangam Ghat",
    description: "A once-in-a-lifetime journey to the sacred Maha Kumbh Mela at Prayagraj, where millions gather at the divine confluence for a rare moment of spiritual immersion. An experience of devotion, energy, and profound inner awakening.",
    status: "Completed",
    date: "February 2025",
    image: "/assets/images/journeys/mahakumbh2025/arati.jpg",
    gallery: [
      "/assets/images/journeys/mahakumbh2025/bus_travel.jpg",
      "/assets/images/journeys/mahakumbh2025/nice_click_1.jpg",
      "/assets/images/journeys/mahakumbh2025/arati.jpg",
      "/assets/images/journeys/mahakumbh2025/tents.jpg",
      "/assets/images/journeys/mahakumbh2025/dip.jpg",
      "/assets/images/journeys/mahakumbh2025/dip_2.jpg"
    ]
  },
  {
    title: "Southern Sojourn",
    location: "Bangaluru · Mysuru · Udupi · Kodachadri Hills",
    description: "Soul-stirring journey across South India, from Bengaluru to Mysuru, Udupi, and the serene Kodachadri Hills. Blending sacred temple experiences, nature, and reflection into an inward exploration of calm, devotion, and quiet joy.",
    status: "Completed",
    date: "December 2024",
    image: "/assets/images/journeys/southernsojourn2024/south_temple.jpeg",
    gallery: [
      "/assets/images/journeys/southernsojourn2024/south_temple.jpeg",
      "/assets/images/journeys/southernsojourn2024/south_templecourtyard.jpeg",
      "/assets/images/journeys/southernsojourn2024/svadhyay.jpeg",
      "/assets/images/journeys/southernsojourn2024/tushar_south.jpeg"
    ]
  },
  {
    title: "Ayodhya Divine Diaries",
    location: "Ayodhya · Chitrakoot · Prayagraj",
    description: "A reflective journey through Ayodhya, Chitrakoot, and Prayagraj, walking along the serene banks of the Sarayu, witnessing the sacred confluence, and pausing in spaces rich with history and devotion. An inward exploration of faith, connection, and quiet rejuvenation.",
    status: "Completed",
    date: "May 2024",
    image: "/assets/images/journeys/ayodhyadivinediaries2024/sunset.jpeg",
    gallery: [
      "/assets/images/journeys/ayodhyadivinediaries2024/group_photo.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/hilltop_view.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/eating_group.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/ghat.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/boat_people.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/sunset.jpeg"
    ]
  },
  {
    title: "Himalayan Reset",
    location: "Rishikesh · Devprayag · Badrinath",
    description: "An ascending journey through altitude and altitude of mind. From the Dalai Lama's residence to the stark moonscapes of Spiti, where the thin air strips away everything but the essential questions.",
    status: "Upcoming",
    date: "May 2026",
    image: "/assets/images/journeys/himalayanreset2026/poster.png",
    cost: "₹12,500 (Includes Stay, Food & Travel)",
    startPoint: "Pilani -> Rishikesh -> Devprayag -> Badrinath",
    endPoint: "Rishikesh",
    duration: "7 Days, 7 Nights",
    exactDates: "17 May - 24 May, 2026"
  }
];
function MemoryOverlay({ journey, onClose }) {
  const rawImages = journey.gallery || [journey.image];
  const images = rawImages.filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, []);
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5e3);
    return () => clearInterval(timer);
  }, [images.length, isHovering]);
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 800 : -800,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 800 : -800,
      opacity: 0
    })
  };
  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8",
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/90 backdrop-blur-md",
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.95, y: 20, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
            exit: { scale: 0.95, y: 20, opacity: 0 },
            transition: { type: "spring", damping: 25, stiffness: 200 },
            className: "relative w-full max-w-6xl h-[85vh] bg-surface border border-gold/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-gold/5",
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "absolute top-4 right-4 z-30 p-2 bg-black/40 hover:bg-black/80 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors cursor-pointer",
                  children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/3 p-8 md:p-12 overflow-y-auto border-b md:border-b-0 md:border-r border-border custom-scrollbar flex flex-col justify-center", children: [
                /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.2, duration: 0.5 },
                    className: "text-gold-dim text-[10px] tracking-[0.4em] lowercase mb-4",
                    children: [
                      journey.date,
                      " · memory"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.h2,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3, duration: 0.5 },
                    className: "font-serif text-3xl md:text-5xl font-light text-foreground mb-6",
                    children: journey.title
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.4, duration: 0.5 },
                    className: "text-gold-dim text-sm leading-relaxed mb-6",
                    children: journey.location
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5, duration: 0.5 },
                    className: "text-muted-foreground text-sm leading-relaxed",
                    children: journey.description
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-2/3 h-64 md:h-full bg-black flex items-center justify-center overflow-hidden", children: [
                images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/60 backdrop-blur-sm rounded-full text-white/50 hover:text-white transition-all cursor-pointer",
                      onClick: () => paginate(-1),
                      children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/60 backdrop-blur-sm rounded-full text-white/50 hover:text-white transition-all cursor-pointer",
                      onClick: () => paginate(1),
                      children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6" })
                    }
                  )
                ] }),
                images.length > 0 ? /* @__PURE__ */ jsx(AnimatePresence, { initial: false, custom: direction, children: /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    src: images[currentIndex],
                    custom: direction,
                    variants: slideVariants,
                    initial: "enter",
                    animate: "center",
                    exit: "exit",
                    transition: {
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 }
                    },
                    className: "absolute w-full h-full object-cover opacity-90"
                  },
                  currentIndex
                ) }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black", children: /* @__PURE__ */ jsx("p", { className: "text-white/40 font-serif text-xl md:text-2xl font-light tracking-wide", children: "Memories are being developed..." }) }),
                images.length > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 right-8 z-20 flex gap-2", children: images.map((_, idx) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-6 bg-gold" : "w-2 bg-white/30"}`
                  },
                  idx
                )) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function InterestForm({ journeyTitle }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("journeyTitle", journeyTitle);
    const data = Object.fromEntries(formData.entries());
    const scriptURL = "https://script.google.com/macros/s/AKfycbxgLDkTK-lVTFv90nTsIEauiRJfC42a-OukNKrmqXeaDW7ocp_RNmjxm-7BHXl6yIrpzQ/exec";
    try {
      await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors"
        // Crucial for client-side GAS connections
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error connecting to Google Script:", error);
      alert("Failed to submit form. Please ensure you have internet access or try again later.");
    } finally {
      setLoading(false);
    }
  };
  if (submitted) {
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-16",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-gold/10 mx-auto flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(
            motion.svg,
            {
              initial: { pathLength: 0 },
              animate: { pathLength: 1 },
              transition: { duration: 1, ease: "easeOut" },
              className: "w-8 h-8 text-gold",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: "2",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl text-foreground mb-3", children: "Interest Recorded." }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "We'll be in touch regarding ",
            journeyTitle,
            " soon."
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    motion.form,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: 0.4 },
      onSubmit: handleSubmit,
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2", children: "name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              name: "name",
              type: "text",
              className: "w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30",
              placeholder: "Your name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2", children: "email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              name: "email",
              type: "email",
              className: "w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30",
              placeholder: "your@email.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2", children: "phone" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              name: "phone",
              type: "tel",
              className: "w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30",
              placeholder: "+91 99999 99999"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2", children: [
            "what calls you to ",
            journeyTitle,
            "?"
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              name: "message",
              rows: 3,
              className: "w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 resize-none placeholder:text-muted-foreground/30",
              placeholder: "A few words..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full flex items-center justify-center gap-2 border border-gold/40 text-gold py-4 text-xs tracking-[0.3em] lowercase rounded-lg hover:bg-gold/10 hover:border-gold/70 transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin text-gold" }),
              "processing..."
            ] }) : "register interest"
          }
        ) })
      ]
    }
  );
}
function TripInterestOverlay({ journey, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/90 backdrop-blur-md",
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.95, y: 20, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
            exit: { scale: 0.95, y: 20, opacity: 0 },
            transition: { type: "spring", damping: 25, stiffness: 200 },
            className: "relative w-full max-w-6xl max-h-[90vh] bg-surface border border-gold/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-gold/5",
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-sm rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                  children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 p-8 md:p-12 overflow-y-auto border-b md:border-b-0 md:border-r border-border custom-scrollbar", children: [
                /* @__PURE__ */ jsx("p", { className: "text-gold-dim text-[10px] tracking-[0.4em] lowercase mb-4", children: "upcoming journey" }),
                /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-5xl font-light text-foreground mb-6", children: journey.title }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: journey.description }),
                journey.image && /* @__PURE__ */ jsx("div", { className: "mb-10 rounded-xl overflow-hidden border border-gold/10 shadow-lg shadow-black/20 bg-black/40 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: journey.image,
                    alt: `${journey.title} Poster`,
                    className: "w-full max-w-sm h-auto max-h-[500px] object-contain"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-full bg-gold/10 text-gold", children: /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-foreground text-sm font-medium mb-1", children: "Dates" }),
                      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: journey.exactDates || journey.date })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-full bg-gold/10 text-gold", children: /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-foreground text-sm font-medium mb-1", children: "Duration" }),
                      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: journey.duration || "TBD" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-full bg-gold/10 text-gold", children: /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-foreground text-sm font-medium mb-1", children: "Route" }),
                      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: journey.startPoint ? `${journey.startPoint} ➔ ${journey.endPoint}` : journey.location })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-full bg-gold/10 text-gold", children: /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-foreground text-sm font-medium mb-1", children: "Cost" }),
                      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: journey.cost || "Details coming soon" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-background/50 custom-scrollbar flex flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto w-full", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-foreground mb-8", children: "Register Your Interest" }),
                /* @__PURE__ */ jsx(InterestForm, { journeyTitle: journey.title })
              ] }) })
            ]
          }
        )
      ]
    }
  );
}
function JourneyCarousel({
  title,
  journeys,
  onSelect
}) {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  if (journeys.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center mb-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl md:text-3xl font-light text-foreground lowercase text-center", children: title }),
      journeys.length > 1 && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scroll("left"),
            className: "p-2 rounded-full bg-surface border border-border hover:border-gold/50 transition-colors cursor-pointer text-muted-foreground hover:text-foreground",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scroll("right"),
            className: "p-2 rounded-full bg-surface border border-border hover:border-gold/50 transition-colors cursor-pointer text-muted-foreground hover:text-foreground",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: `flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden ${journeys.length === 1 ? "justify-center" : "justify-start"}`,
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        children: journeys.map((journey, i) => /* @__PURE__ */ jsx("div", { className: "snap-start flex-none", children: /* @__PURE__ */ jsx(
          JourneyCard,
          {
            journey,
            index: i,
            onClick: () => onSelect(journey),
            compact: true
          }
        ) }, journey.title))
      }
    )
  ] });
}
function Journeys() {
  const [selectedJourney, setSelectedJourney] = useState(null);
  const handleCloseOverlay = () => {
    setSelectedJourney(null);
  };
  const upcomingJourneys = journeysData.filter((j) => j.status === "Upcoming");
  const completedJourneys = journeysData.filter((j) => j.status === "Completed");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { id: "journeys", className: "relative py-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[90rem] mx-auto 2xl:px-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.8 },
          className: "text-center mb-20",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-gold-dim text-xs tracking-[0.4em] lowercase mb-4", children: "where we wander" }),
            /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl md:text-5xl font-light text-foreground", children: "The Journeys" }),
            /* @__PURE__ */ jsx("div", { className: "gold-line w-24 mx-auto mt-6" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-16", children: [
        /* @__PURE__ */ jsx(
          JourneyCarousel,
          {
            title: "Upcoming Trips",
            journeys: upcomingJourneys,
            onSelect: setSelectedJourney
          }
        ),
        /* @__PURE__ */ jsx(
          JourneyCarousel,
          {
            title: "Past Memories",
            journeys: completedJourneys,
            onSelect: setSelectedJourney
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(AnimatePresence, { children: [
      selectedJourney && selectedJourney.status === "Completed" && /* @__PURE__ */ jsx(
        MemoryOverlay,
        {
          journey: selectedJourney,
          onClose: handleCloseOverlay
        },
        "memory-overlay"
      ),
      selectedJourney && selectedJourney.status === "Upcoming" && /* @__PURE__ */ jsx(
        TripInterestOverlay,
        {
          journey: selectedJourney,
          onClose: handleCloseOverlay
        },
        "interest-overlay"
      )
    ] })
  ] });
}
function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const scriptURL = "https://script.google.com/macros/s/AKfycbwpVfcXkXVJHAGtGhicLHehp13FDPoDZZfhNgYR8VOHfE6RF9Ca8vmlwb_uxfGSP8Ou/exec";
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
  return /* @__PURE__ */ jsx("section", { id: "register", className: "relative py-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8 },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-gold-dim text-xs tracking-[0.4em] lowercase mb-4", children: "begin the inquiry" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl md:text-5xl font-light text-foreground", children: "Join the Circle" }),
          /* @__PURE__ */ jsx("div", { className: "gold-line w-24 mx-auto mt-6" })
        ]
      }
    ),
    submitted ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-16",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-gold/10 mx-auto flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(
            motion.svg,
            {
              initial: { pathLength: 0 },
              animate: { pathLength: 1 },
              transition: { duration: 1, ease: "easeOut" },
              className: "w-8 h-8 text-gold",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: "2",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl text-foreground mb-3", children: "Welcome, Sādhaka." }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "We'll be in touch with you soon! :D" })
        ]
      }
    ) : /* @__PURE__ */ jsxs(
      motion.form,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7 },
        onSubmit: handleSubmit,
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2", children: "name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                required: true,
                name: "name",
                type: "text",
                className: "w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30",
                placeholder: "Your name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2", children: "email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                required: true,
                name: "email",
                type: "email",
                className: "w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30",
                placeholder: "your@email.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2", children: "phone" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                required: true,
                name: "phone",
                type: "tel",
                className: "w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-muted-foreground/30",
                placeholder: "+91 99999 99999"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-muted-foreground text-[10px] tracking-[0.3em] lowercase mb-2", children: "what calls you here?" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                name: "message",
                rows: 3,
                className: "w-full bg-transparent border-b border-border py-3 text-foreground font-serif text-lg focus:outline-none focus:border-gold transition-colors duration-300 resize-none placeholder:text-muted-foreground/30",
                placeholder: "A few words..."
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "w-full flex items-center justify-center gap-2 border border-gold/40 text-gold py-4 text-xs tracking-[0.3em] lowercase rounded-lg hover:bg-gold/10 hover:border-gold/70 transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
              children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin text-gold" }),
                "processing..."
              ] }) : "begin the journey"
            }
          ) })
        ]
      }
    )
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "relative py-16 px-6", children: [
    /* @__PURE__ */ jsx("div", { className: "gold-line max-w-xs mx-auto mb-12 opacity-30" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl text-foreground font-light mb-2", children: "Sādhakas" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/40 text-[10px] tracking-[0.3em] lowercase mb-8", children: "the missing curriculum" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6 md:gap-8 mb-8", children: [
        { label: "philosophy", href: "#philosophy" },
        { label: "offerings", href: "#offerings" },
        { label: "manual of life", href: "#manual" },
        { label: "journeys", href: "#journeys" },
        { label: "register", href: "#register" }
      ].map((link) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }),
          className: "text-muted-foreground/40 text-[10px] tracking-[0.2em] lowercase hover:text-gold transition-colors duration-300 cursor-pointer",
          children: link.label
        },
        link.label
      )) }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/20 text-[10px] tracking-[0.15em] lowercase", children: "© 2025 sādhakas. all rights reserved." })
    ] })
  ] });
}
function Index() {
  return /* @__PURE__ */ jsx(LenisProvider, { children: /* @__PURE__ */ jsxs("div", { className: "grain-overlay", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Philosophy, {}),
    /* @__PURE__ */ jsx(Problem, {}),
    /* @__PURE__ */ jsx(TheSadhakasWay, {}),
    /* @__PURE__ */ jsx(Intro, {}),
    /* @__PURE__ */ jsx(Offerings, {}),
    /* @__PURE__ */ jsx(ManualOfLife, {}),
    /* @__PURE__ */ jsx(Journeys, {}),
    /* @__PURE__ */ jsx(Registration, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
export {
  Index as component
};
