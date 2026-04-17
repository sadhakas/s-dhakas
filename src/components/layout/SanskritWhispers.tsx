/**
 * SanskritWhispers
 *
 * Invisible by default — opacity 0.
 * When #sanskrit-whispers gains class "active" (triggered by usePerspectiveShift after a 2.5s hold),
 * all phrases cascade in simultaneously over the inverted white site.
 *
 * It uses the same CSS filter as the site content root, so the gold turns into
 * a strong deep blue when the perspective shifts.
 * 
 * Styled via CSS: #sanskrit-whispers & .whisper
 */

interface WhisperDef {
  text: string;
  subtext: string;
  top: string;
  side: "left" | "right";
  rotate: number;
  textSize: string;
}

const WHISPERS: WhisperDef[] = [
  {
    text: "अथातो ब्रह्म जिज्ञासा",
    subtext: "now, therefore — an inquiry into Brahman",
    top: "7%",
    side: "left",
    rotate: -8,
    textSize: "3rem",
  },
  {
    text: "को अहम्",
    subtext: "who am I?",
    top: "14%",
    side: "right",
    rotate: 5,
    textSize: "4.5rem",
  },
  {
    text: "तत् त्वम् असि",
    subtext: "that thou art",
    top: "34%",
    side: "left",
    rotate: -4,
    textSize: "2.8rem",
  },
  {
    text: "ईश्वरः कः",
    subtext: "who is God?",
    top: "42%",
    side: "right",
    rotate: 3,
    textSize: "3.5rem",
  },
  {
    text: "अहं ब्रह्मास्मि",
    subtext: "I am Brahman",
    top: "60%",
    side: "left",
    rotate: -5,
    textSize: "3rem",
  },
  {
    text: "सत्यं ज्ञानम्",
    subtext: "truth · knowledge",
    top: "75%",
    side: "right",
    rotate: -3,
    textSize: "2.8rem",
  },
];

export default function SanskritWhispers() {
  return (
    <div
      id="sanskrit-whispers"
      className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9991 /* above inverted content, below grain */ }}
    >
      {WHISPERS.map((w, i) => (
        <div
          key={i}
          className="whisper absolute"
          style={{
            top: w.top,
            [w.side === "left" ? "left" : "right"]: "3%",
            maxWidth: "46vw",
            "--r": `${w.rotate}deg`,
            transitionDelay: `${i * 0.12}s`,
          } as React.CSSProperties}
        >
          <p
            className="font-serif leading-tight select-none"
            style={{ fontSize: w.textSize, color: "rgba(212,175,55,1)", fontWeight: 300 }}
          >
            {w.text}
          </p>
          <p
            className="select-none font-sans"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginTop: "0.25rem",
              color: "rgba(212,175,55,0.75)",
            }}
          >
            {w.subtext}
          </p>
        </div>
      ))}
    </div>
  );
}
