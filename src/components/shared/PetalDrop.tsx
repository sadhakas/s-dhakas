import { useEffect, useRef } from "react";

const PETAL_COLORS = [
  "#F97316", // marigold orange
  "#EF4444", // rose red
  "#FBBF24", // saffron gold
  "#FDE68A", // pale yellow
  "#FCA5A5", // soft rose
  "#FDBA74", // peach
];

function spawnPetals(x: number, y: number) {
  const count = 18;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";

    const size = 8 + Math.random() * 14;
    const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    const fallDuration = 2 + Math.random() * 1.5;
    const driftDuration = 1.5 + Math.random() * 1.5;
    const spreadX = (Math.random() - 0.5) * 200;

    petal.style.cssText = `
      left: ${x + spreadX}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      --fall-duration: ${fallDuration}s;
      --drift-duration: ${driftDuration}s;
    `;

    document.body.appendChild(petal);

    // Remove the DOM node after animation ends
    const cleanup = () => petal.remove();
    petal.addEventListener("animationend", cleanup, { once: true });
    setTimeout(cleanup, (fallDuration + 0.5) * 1000);
  }
}

/**
 * PetalDrop
 *
 * Mount once at the root. Listens for mousedown / touchstart globally.
 * If the user holds for ≥400ms, a burst of petals falls from the cursor.
 */
export default function PetalDrop() {
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleDown = (e: MouseEvent | TouchEvent) => {
      const point =
        e instanceof MouseEvent
          ? { x: e.clientX, y: e.clientY }
          : { x: e.touches[0].clientX, y: e.touches[0].clientY };

      holdPos.current = point;

      holdTimer.current = setTimeout(() => {
        spawnPetals(holdPos.current.x, holdPos.current.y);
      }, 400);
    };

    const handleUp = () => {
      if (holdTimer.current) {
        clearTimeout(holdTimer.current);
        holdTimer.current = null;
      }
    };

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("touchstart", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("touchstart", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, []);

  // Renders nothing — pure side-effect component
  return null;
}
