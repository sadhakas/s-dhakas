export default function Footer() {
  return (
    <footer className="relative py-16 px-6">
      <div className="gold-line max-w-xs mx-auto mb-12 opacity-30" />
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-serif text-2xl text-foreground font-light mb-2">
          Sādhakas
        </p>
        <p className="text-muted-foreground/40 text-[10px] tracking-[0.3em] lowercase mb-8">
          the missing curriculum
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
          {[
            { label: "philosophy", href: "#philosophy" },
            { label: "offerings", href: "#offerings" },
            { label: "manual of life", href: "#manual" },
            { label: "journeys", href: "#journeys" },
            { label: "register", href: "#register" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() =>
                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-muted-foreground/40 text-[10px] tracking-[0.2em] lowercase hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
        <p className="text-muted-foreground/20 text-[10px] tracking-[0.15em] lowercase">
          © 2025 sādhakas. all rights reserved.
        </p>
      </div>
    </footer>
  );
}
