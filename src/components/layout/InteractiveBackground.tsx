import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface InteractiveBackgroundProps {
  children?: React.ReactNode;
}

export default function InteractiveBackground({ children }: InteractiveBackgroundProps) {
  // state for checking if it's a mobile device (based on screen width)
  const [isMobile, setIsMobile] = useState(false);
  
  // Motion values to track mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // useSpring for smooth, fluid tracking instead of rigid instant moves
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleResize = () => {
      // 768px is the standard Tailwind 'md' breakpoint
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial mount
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // If we're on mobile, don't attach mouse event listeners
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Container for Z-Index management and pointer isolation */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden">
        {/* Texture Layer */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Spotlight Layer */}
        {isMobile ? (
          // Mobile Fallback: A perfectly centered, "breathing" gradient pulse
          <motion.div
            className="absolute left-1/2 top-1/2 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          // Desktop: A golden radial spotlight tracking the mouse
          <motion.div
            className="absolute rounded-full"
            style={{
              // Radius is 600px, so width/height is 1200px
              width: 1200,
              height: 1200,
              // Offset by -600px so the center of the div aligns with the mouse coordinate
              left: -600,
              top: -600,
              x: springX,
              y: springY,
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 50%)",
            }}
          />
        )}
      </div>

      {/* Main Content Render */}
      {/* Must remain relative to stay atop the -z-10 background */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}
