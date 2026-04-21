import { useEffect } from "react";

export default function SeekerTrail() {
  useEffect(() => {
    // Skip on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9992;overflow:hidden;";
    document.body.appendChild(container);

    let mouseX = -300;
    let mouseY = -300;
    let prevMouseX = -300;
    let prevMouseY = -300;
    let lastX = -300;
    let lastY = -300;
    let rafId: number;
    let isMoving = false;
    let idleFrames = 0;
    let idleTime = 0;

    // --- Hold Mechanic State ---
    let isHolding = false;
    let holdStart = 0;
    let level1Fired = false;
    let level2Fired = false;

    // Inject CSS for the Stardust physics and Petal Blast
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes stardust-fade {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; filter: brightness(1.2); }
        100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.1); opacity: 0; filter: brightness(0.5); }
      }
      @keyframes petal-blast {
        0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
        15% { transform: translate(calc(-50% + var(--tx) * 0.4), calc(-50% + var(--ty) * 0.2)) scale(1.2) rotate(180deg); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.6) rotate(720deg); opacity: 0; }
      }
      .stardust-particle {
        position: absolute;
        border-radius: 50%;
        background: #FFF;
        box-shadow: 0 0 6px 1px rgba(255, 220, 80, 0.9), 0 0 12px 2px rgba(212, 175, 55, 0.5);
        pointer-events: none;
        mix-blend-mode: screen;
        animation: stardust-fade var(--dur) ease-out forwards;
      }
      .petal-blast-particle {
        position: absolute;
        pointer-events: none;
        border-radius: 50% 0 50% 0;
        z-index: 9999;
        animation: petal-blast var(--dur) ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    const spawnStardust = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        const size = Math.random() < 0.2 ? 2.5 : Math.random() < 0.5 ? 1.5 : 1; 
        
        const dist = 5 + Math.random() * 20; 
        const angle = Math.random() * Math.PI * 2;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist + (Math.random() * 15);

        const dur = (0.6 + Math.random() * 0.6).toFixed(2);

        el.className = "stardust-particle";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        
        el.style.setProperty("--tx", `${tx}px`);
        el.style.setProperty("--ty", `${ty}px`);
        el.style.setProperty("--dur", `${dur}s`);

        container.appendChild(el);
        setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 50);
      }
    };

    const spawnFireworksBurst = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        const size = 2 + Math.random() * 3;
        const dist = 30 + Math.random() * 100;
        const angle = Math.random() * Math.PI * 2;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist + 40;
        const dur = (0.3 + Math.random() * 0.5).toFixed(2);

        el.className = "stardust-particle";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        
        el.style.background = Math.random() > 0.5 ? "#FFF" : "#FFD700";
        el.style.boxShadow = "0 0 10px 2px rgba(255, 210, 80, 1)";
        
        el.style.setProperty("--tx", `${tx}px`);
        el.style.setProperty("--ty", `${ty}px`);
        el.style.setProperty("--dur", `${dur}s`);

        container.appendChild(el);
        setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 50);
      }
    };

    const animate = () => {
      // Only detect if the PHYSICAL mouse has moved since last frame
      const realDist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      isMoving = realDist > 0;
      
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      
      const drawDist = Math.hypot(mouseX - lastX, mouseY - lastY);

      // ── Progressive Hold Logic ──
      if (isHolding) {
        const heldFor = performance.now() - holdStart;
        
        if (heldFor < 2500) {
          const angle = heldFor * 0.015;
          const radius = Math.max(0, 30 - heldFor * 0.012); 
          spawnStardust(mouseX + Math.cos(angle) * radius, mouseY + Math.sin(angle) * radius, 1);
        }

        if (heldFor > 1000 && !level1Fired) {
          level1Fired = true;
          spawnFireworksBurst(mouseX, mouseY, 40);
        }

        if (heldFor > 2500 && !level2Fired) {
          level2Fired = true;
          spawnFireworksBurst(mouseX, mouseY, 80);
          
          // Epic Petal Outward Blast
          const PETAL_COLORS = ["#F97316", "#EF4444", "#FBBF24", "#FDE68A", "#FCA5A5", "#FDBA74"];
          const petalCount = 120; // Massive explosion

          for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement("div");
            petal.className = "petal-blast-particle";

            const size = 6 + Math.random() * 14;
            const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
            const dur = (3.0 + Math.random() * 2.0).toFixed(2);
            
            // Radial outward distribution spanning across full screen
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * (window.innerWidth * 0.6); // shoots outwards
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance + 500; // heavy gravity pulls down heavily after blast

            petal.style.cssText = `
              left: ${mouseX}px;
              top: ${mouseY}px;
              width: ${size}px;
              height: ${size}px;
              background-color: ${color};
              --tx: ${tx}px;
              --ty: ${ty}px;
              --dur: ${dur}s;
            `;
            container.appendChild(petal);
            setTimeout(() => petal.remove(), parseFloat(dur) * 1000 + 50);
          }
        }

      } else {
        // Standard cursor idle/movement FX
        if (isMoving) {
          idleFrames = 0;
          idleTime = Math.PI / 2; // When idle starts, the loop must begin EXACTLY at the center (crossover) point
          const count = Math.min(4, Math.ceil(drawDist / 8));
          spawnStardust(mouseX, mouseY, count);
          
          // Smooth tracking engine when moving
          lastX += (mouseX - lastX) * 0.4;
          lastY += (mouseY - lastY) * 0.4;
        } else {
          idleFrames++;
          
          // Ethereal Infinity Loop (Lemniscate) Idle
          // When resting for >2.5s (approx 150 frames), form an elegant floating figure-8 around cursor
          if (idleFrames > 150) {
            idleTime += 0.08; 
            const loopWidth = 140; 
            
            // Lemniscate equation
            const ox = (Math.cos(idleTime) * loopWidth) / (1 + Math.sin(idleTime) ** 2);
            const oy = (Math.sin(idleTime) * Math.cos(idleTime) * loopWidth) / (1 + Math.sin(idleTime) ** 2);
            
            // Bypass the dragging physics so the meeting of the two circles is perfectly mathematically centered on the pointer
            const exactX = mouseX + ox;
            const exactY = mouseY + oy;

            lastX = exactX;
            lastY = exactY;
            
            spawnStardust(exactX, exactY, 3);
          } else {
            // Gentle random twinkle immediately after stopping, before the 2.5s loop kicks in
            if (Math.random() > 0.6) {
              spawnStardust(lastX, lastY, 1);
            }
            lastX += (mouseX - lastX) * 0.4;
            lastY += (mouseY - lastY) * 0.4;
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Track holds
    const onDown = () => {
      isHolding = true;
      holdStart = performance.now();
      level1Fired = false;
      level2Fired = false;
    };
    
    const onUp = () => {
      isHolding = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId);
      container.remove();
      style.remove();
    };
  }, []);

  return null;
}
