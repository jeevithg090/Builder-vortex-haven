import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Cross shape component with CSS-based 3D transforms
const CrossObject = ({ x, y, color, delay }: any) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0, rotateX: 0, rotateY: 0 }}
      animate={{
        opacity: 1,
        scale: [0.8, 1.2, 1],
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="relative">
        {/* Horizontal bar */}
        <div
          className={`absolute w-8 h-2 rounded-sm transform-gpu`}
          style={{
            backgroundColor: color,
            left: "-16px",
            top: "-4px",
            boxShadow: `0 0 20px ${color}40`,
          }}
        />
        {/* Vertical bar */}
        <div
          className={`absolute w-2 h-8 rounded-sm transform-gpu`}
          style={{
            backgroundColor: color,
            left: "-4px",
            top: "-16px",
            boxShadow: `0 0 20px ${color}40`,
          }}
        />
      </div>
    </motion.div>
  );
};

// Ripple effect component
const RippleEffect = ({ x, y, key }: any) => {
  return (
    <motion.div
      key={key}
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

  // Generate cross objects
  const crossObjects = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ["#0000FF", "#000000", "#CCCCCC"][Math.floor(Math.random() * 3)],
    delay: Math.random() * 5,
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
