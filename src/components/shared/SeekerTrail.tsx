import { useEffect } from "react";

// ── Sparkle shapes ──────────────────────────────────────────────────────────
// We alternate between circles (soft) and notched-rhombus shapes (star-like)
type ShapeType = "circle" | "star" | "cross";
const SHAPES: ShapeType[] = ["circle", "star", "circle", "cross", "circle", "star"];

function makeShapeCSS(shape: ShapeType, size: number, opacity: number): string {
  const base = `
    position:absolute;
    width:${size}px;
    height:${size}px;
    pointer-events:none;
    transform:translate(-50%,-50%) scale(0);
    animation:sparkle-fade var(--sp-dur,0.5s) ease-out var(--sp-del,0s) forwards;
  `;
  const glow = `box-shadow:0 0 ${size * 1.8}px rgba(255,210,60,0.75), 0 0 ${size * 3}px rgba(212,175,55,0.3);`;

  switch (shape) {
    case "star":
      return base + glow + `
        background:rgba(255,220,70,${opacity.toFixed(2)});
        clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
      `;
    case "cross":
      return base + glow + `
        background:rgba(212,175,55,${opacity.toFixed(2)});
        clip-path:polygon(35% 0%,65% 0%,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0% 65%,0% 35%,35% 35%);
      `;
    default: // circle
      return base + glow + `
        background:rgba(255,200,50,${opacity.toFixed(2)});
        border-radius:50%;
      `;
  }
}

const LEAD_COUNT = 6;

export default function SeekerTrail() {
  useEffect(() => {
    // Skip on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9992;";
    document.body.appendChild(container);

    // ── Smooth comet lead (5 lerped dots) ─────────────────────────────────
    const leadDots: HTMLDivElement[] = [];
    for (let i = 0; i < LEAD_COUNT; i++) {
      const d = document.createElement("div");
      const p = 1 - i / LEAD_COUNT;
      const size = Math.max(3, 8 * p);
      d.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:rgba(212,175,55,${(p * 0.75).toFixed(2)});
        transform:translate(-50%,-50%);
        pointer-events:none;
        ${i === 0
          ? "box-shadow:0 0 10px rgba(255,210,60,0.8),0 0 20px rgba(212,175,55,0.35);"
          : i === 1
          ? "box-shadow:0 0 5px rgba(212,175,55,0.4);"
          : ""}
      `;
      container.appendChild(d);
      leadDots.push(d);
    }

    const positions = Array.from({ length: LEAD_COUNT }, () => ({ x: -300, y: -300 }));
    let mouseX = -300;
    let mouseY = -300;
    let frameCount = 0;
    let rafId: number;
    let shapeIdx = 0;

    // ── Spawn a sparkle particle ───────────────────────────────────────
    const spawnSparkle = (x: number, y: number) => {
      const count = 1 + Math.round(Math.random() * 2);
      for (let k = 0; k < count; k++) {
        const shape = SHAPES[shapeIdx % SHAPES.length];
        shapeIdx++;

        const size = 3 + Math.random() * 7;
        const opacity = 0.55 + Math.random() * 0.45;
        const dur = 0.3 + Math.random() * 0.35;
        const delay = k * 0.05;
        const spreadR = 12 + Math.random() * 18;
        const angle = Math.random() * Math.PI * 2;
        const ox = Math.cos(angle) * spreadR;
        const oy = Math.sin(angle) * spreadR;

        const el = document.createElement("div");
        el.style.cssText =
          makeShapeCSS(shape, size, opacity) +
          `left:${x + ox}px;top:${y + oy}px;` +
          `--sp-dur:${dur}s;--sp-del:${delay}s;`;

        container.appendChild(el);
        setTimeout(() => el.remove(), (dur + delay) * 1000 + 80);
      }
    };

    // ── Animation loop ─────────────────────────────────────────────────
    const animate = () => {
      frameCount++;

      // Lerp lead dots
      positions[0].x += (mouseX - positions[0].x) * 0.3;
      positions[0].y += (mouseY - positions[0].y) * 0.3;
      for (let i = 1; i < LEAD_COUNT; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.45;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.45;
      }
      for (let i = 0; i < LEAD_COUNT; i++) {
        leadDots[i].style.left = positions[i].x + "px";
        leadDots[i].style.top = positions[i].y + "px";
      }

      // Spawn sparkles every 3rd frame
      if (frameCount % 3 === 0 && mouseX > -200) {
        spawnSparkle(positions[0].x, positions[0].y);
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      container.remove();
    };
  }, []);

  return null;
}
