import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createRootRoute, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";
const appCss = "/assets/styles-B1ul6KxH.css";
function ParticleField({ count = 35 }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.35,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * -20
    }));
    setParticles(generated);
  }, [count]);
  if (particles.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", "aria-hidden": true });
  }
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", "aria-hidden": true, children: particles.map((p) => /* @__PURE__ */ jsx(
    "span",
    {
      className: "absolute rounded-full bg-gold animate-float-particle",
      style: {
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        opacity: p.opacity,
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
        willChange: "transform, opacity"
      }
    },
    p.id
  )) });
}
function InteractiveBackground({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, mouseX, mouseY]);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden", children: [
      /* @__PURE__ */ jsx(ParticleField, { count: 45 }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.03] mix-blend-overlay",
          style: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat"
          }
        }
      ),
      isMobile ? (
        // Mobile Fallback: A perfectly centered, "breathing" gradient pulse
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute left-1/2 top-1/2 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full",
            style: {
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%)"
            },
            animate: {
              scale: [1, 1.15, 1],
              opacity: [0.5, 1, 0.5]
            },
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        )
      ) : (
        // Desktop: A golden radial spotlight tracking the mouse
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute rounded-full",
            style: {
              // Radius is 600px, so width/height is 1200px
              width: 1200,
              height: 1200,
              // Offset by -600px so the center of the div aligns with the mouse coordinate
              left: -600,
              top: -600,
              x: springX,
              y: springY,
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 50%)"
            }
          }
        )
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-0", children })
  ] });
}
function Navbar() {
  return /* @__PURE__ */ jsx(
    motion.nav,
    {
      initial: { y: 100, x: "-50%", opacity: 0 },
      animate: { y: 0, x: "-50%", opacity: 1 },
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
      style: { left: "50%" },
      className: "fixed bottom-6 z-40 bg-surface-elevated/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/80",
      children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-2.5 flex items-center justify-between gap-6 md:gap-12 min-w-max", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pl-2", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/assets/images/logo.png",
              alt: "Sādhakas Logo",
              className: "h-8 md:h-10 w-auto object-contain",
              onError: (e) => {
                e.currentTarget.style.display = "none";
              }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-serif text-xl font-light tracking-widest text-foreground hidden sm:block", children: "Sādhakas" })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://chat.whatsapp.com/EjTFqNEk2dEKySTooqr2Ak?mode=gi_t",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "group relative px-5 py-2 rounded-full border border-gold/30 hover:border-gold/80 transition-colors duration-500 overflow-hidden whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" }),
              /* @__PURE__ */ jsx("span", { className: "relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-dim group-hover:text-gold transition-colors duration-500", children: "Join Community" })
            ]
          }
        )
      ] })
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$1 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sādhakas — The Missing Curriculum" },
      { name: "description", content: "A philosophical journey exploring the questions your education never addressed. Join immersive journeys that bridge science, art, and consciousness." },
      { name: "author", content: "Sādhakas" },
      { property: "og:title", content: "Sādhakas — The Missing Curriculum" },
      { property: "og:description", content: "A philosophical journey exploring the questions your education never addressed." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://lovable.dev/opengraph-image-p98pqg.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:image", content: "https://lovable.dev/opengraph-image-p98pqg.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/assets/images/logo.png"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(InteractiveBackground, { children }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const $$splitComponentImporter = () => import("./index-Cq3biBmf.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({
  error,
  reset
}) {
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router;
};
export {
  getRouter
};
