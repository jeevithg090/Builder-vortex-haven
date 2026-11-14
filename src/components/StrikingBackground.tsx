import { useMemo, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";

// Car shape component that responds to mouse proximity
interface Point {
  x: number;
  y: number;
}

interface Car {
  id: number;
  /** Horizontal position, as a percentage of the container width. */
  x: number;
  /** Vertical position, as a percentage of the container height. */
  y: number;
  color: string;
  rotation: number;
}

interface Ripple extends Point {
  id: number;
}

const CAR_COUNT = 30;
const CAR_COLORS = ["#0000FF", "#000000", "#CCCCCC", "#FF0000", "#00FF00"];

/** Places cars in a loose ring around the centre of the container. */
const createCars = (): Car[] =>
  Array.from({ length: CAR_COUNT }, (_, i) => {
    const angle = (i / CAR_COUNT) * Math.PI * 2;
    const radius = Math.random() * 25 + 5; // 5%-30% from centre
    const centerX = 50 + Math.cos(angle) * radius;
    const centerY = 50 + Math.sin(angle) * radius;

    return {
      id: i,
      x: Math.max(10, Math.min(90, centerX)),
      y: Math.max(10, Math.min(90, centerY)),
      color: CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)],
      rotation: Math.random() * 360,
    };
  });

interface CarObjectProps extends Omit<Car, "id"> {
  mousePos: Point;
  containerSize: { width: number; height: number };
}

// Car shape component that responds to mouse proximity
const CarObject = ({
  x,
  y,
  color,
  rotation,
  mousePos,
  containerSize,
}: CarObjectProps) => {
  const carX = (x / 100) * containerSize.width;
  const carY = (y / 100) * containerSize.height;

  // Calculate distance from mouse to car
  const distance = Math.sqrt(
    Math.pow(mousePos.x - carX, 2) + Math.pow(mousePos.y - carY, 2),
  );

  // Influence radius - made larger for smoother interaction
  const influenceRadius = 200;
  const influence = Math.max(0, 1 - distance / influenceRadius);

  // Calculate offset based on mouse position (gentler jelly effect)
  const offsetX = influence > 0 ? (mousePos.x - carX) * influence * 0.15 : 0;
  const offsetY = influence > 0 ? (mousePos.y - carY) * influence * 0.15 : 0;

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
        scale: 1 + influence * 0.2,
        rotate: rotation + influence * 8,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 25,
        mass: 1.5,
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
const RippleEffect = ({ x, y }: Point) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
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
  const [mousePos, setMousePos] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 960,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 540,
  });
  const [containerSize, setContainerSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  }));
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleId = useRef(0);

  // Generated once: regenerating on every render made the cars jump around
  // each time the mouse moved.
  const carObjects = useMemo(createCars, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    setContainerSize((size) =>
      size.width === rect.width && size.height === rect.height
        ? size
        : { width: rect.width, height: rect.height },
    );

    // Create ripple effect less frequently for better performance
    if (Math.random() > 0.7) {
      const newRipple = {
        id: rippleId.current++,
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id),
        );
      }, 2000);
    }
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
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      {/* Car objects */}
      {carObjects.map((obj) => (
        <CarObject
          key={obj.id}
          x={obj.x}
          y={obj.y}
          color={obj.color}
          rotation={obj.rotation}
          mousePos={mousePos}
          containerSize={containerSize}
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
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
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
          <motion.h2
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
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Your vision deserves extraordinary execution. We guarantee
            innovative solutions that exceed expectations and deliver measurable
            results.
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
        <p>Move your mouse slowly to enjoy the car interactions</p>
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
