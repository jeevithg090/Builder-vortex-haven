import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Car shape component that responds to mouse proximity
const CarObject = ({ x, y, color, rotation, mousePos }: any) => {
  const carX =
    (x / 100) * (typeof window !== "undefined" ? window.innerWidth : 1920);
  const carY =
    (y / 100) * (typeof window !== "undefined" ? window.innerHeight : 1080);

  // Calculate distance from mouse to car
  const distance = Math.sqrt(
    Math.pow(mousePos.x - carX, 2) + Math.pow(mousePos.y - carY, 2),
  );

  // Influence radius
  const influenceRadius = 150;
  const influence = Math.max(0, 1 - distance / influenceRadius);

  // Calculate offset based on mouse position (jelly effect)
  const offsetX = influence > 0 ? (mousePos.x - carX) * influence * 0.3 : 0;
  const offsetY = influence > 0 ? (mousePos.y - carY) * influence * 0.3 : 0;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        x: offsetX,
        y: offsetY,
        scale: 1 + influence * 0.4,
        rotate: rotation + influence * 15,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      }}
    >
      <div
        className="relative transform-gpu"
        style={{
          filter: `drop-shadow(0 0 ${10 + influence * 20}px ${color}60)`,
        }}
      >
        {/* Car body */}
        <div
          className="absolute rounded-lg"
          style={{
            backgroundColor: color,
            width: "32px",
            height: "16px",
            left: "-16px",
            top: "-8px",
          }}
        />
        {/* Car cabin */}
        <div
          className="absolute rounded-t-lg"
          style={{
            backgroundColor: color,
            width: "20px",
            height: "12px",
            left: "-10px",
            top: "-14px",
            opacity: 0.8,
          }}
        />
        {/* Wheels */}
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: "#333",
            width: "6px",
            height: "6px",
            left: "-12px",
            top: "4px",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: "#333",
            width: "6px",
            height: "6px",
            left: "6px",
            top: "4px",
          }}
        />
        {/* Headlights */}
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: "#FFF",
            width: "3px",
            height: "3px",
            left: "13px",
            top: "-2px",
            opacity: influence > 0.3 ? 1 : 0.5,
          }}
        />
      </div>
    </motion.div>
  );
};

// Ripple effect component
const RippleEffect = ({ x, y }: any) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="w-32 h-32 rounded-full border-4 border-gradient-to-r from-purple-400 via-pink-500 to-blue-500 opacity-60">
        {/* Chromatic aberration effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-transparent via-purple-500/20 to-transparent animate-pulse" />
        <div className="absolute inset-2 rounded-full bg-gradient-radial from-transparent via-pink-500/20 to-transparent animate-pulse delay-75" />
        <div className="absolute inset-4 rounded-full bg-gradient-radial from-transparent via-blue-500/20 to-transparent animate-pulse delay-150" />
      </div>
    </motion.div>
  );
};

const StrikingBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);

  // Generate car objects with random orientations
  const carObjects = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ["#0000FF", "#000000", "#CCCCCC"][Math.floor(Math.random() * 3)],
    rotation: Math.random() * 360, // Random initial rotation
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Create ripple effect
    const newRipple = {
      id: rippleId.current++,
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1500);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-blue-900/20 animate-pulse" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
      </div>

      {/* Cross objects */}
      {crossObjects.map((obj) => (
        <CrossObject
          key={obj.id}
          x={obj.x}
          y={obj.y}
          color={obj.color}
          delay={obj.delay}
        />
      ))}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <RippleEffect key={ripple.id} x={ripple.x} y={ripple.y} />
      ))}

      {/* Mouse follower */}
      <motion.div
        className="absolute w-6 h-6 pointer-events-none z-20"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
        }}
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 opacity-60 blur-sm" />
      </motion.div>

      {/* Foreground Content Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-white max-w-4xl px-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-8 tracking-tight"
            animate={{
              textShadow: [
                "0 0 20px #8B5CF6",
                "0 0 40px #EC4899",
                "0 0 20px #3B82F6",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            STRIKING
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Experience the future of interactive design with immersive
            environments that respond to your every move.
          </motion.p>
        </motion.div>
      </div>

      {/* Performance indicator */}
      <div className="absolute top-4 right-4 z-20 text-white/50 text-xs font-mono">
        CSS3D Active
      </div>

      {/* Interaction hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/60 text-sm text-center"
      >
        <p>Move your mouse to create ripple effects</p>
        <motion.div
          className="mt-2 w-8 h-8 mx-auto border border-white/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};

export default StrikingBackground;
