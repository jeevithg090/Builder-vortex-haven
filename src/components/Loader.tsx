import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [animationPhase, setAnimationPhase] = useState(1);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Phase timing orchestration matching reference images
    const phaseTimers = [
      // Phase 1: Large L shape with "100" (0-1500ms) - Reference Image 1
      setTimeout(() => setAnimationPhase(2), 1500),
      // Phase 2: Smaller L shape with "100" (1500-2500ms) - Reference Image 2
      setTimeout(() => setAnimationPhase(3), 2500),
      // Phase 3: Horizontal bar with countdown (2500-4000ms) - Reference Image 3
      setTimeout(() => {
        setAnimationPhase(4);
        // Start countdown during horizontal bar phase
        let currentProgress = 100;
        const progressTimer = setInterval(() => {
          currentProgress -= 1;
          setProgress(currentProgress);
          if (currentProgress <= 90) {
            clearInterval(progressTimer);
          }
        }, 40);
      }, 3000),
      // Phase 4: Diagonal wipe (4000-4400ms)
      setTimeout(() => setAnimationPhase(5), 4000),
      // Phase 5: Content reveal (4400ms+) - Reference Image 4
      setTimeout(() => {
        setAnimationPhase(6);
        setTimeout(onLoadComplete, 500);
      }, 4400),
    ];

    return () => {
      phaseTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [onLoadComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Phase 1: Large L Shape - Reference Image 1 */}
        {animationPhase === 1 && (
          <div className="relative">
            {/* Vertical part of large L */}
            <motion.div
              className="bg-white absolute"
              initial={{ width: 40, height: 200, x: 0, y: -100 }}
              animate={{ width: 40, height: 200, x: 0, y: -100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Horizontal part of large L */}
            <motion.div
              className="bg-white absolute"
              initial={{ width: 160, height: 40, x: 0, y: 60 }}
              animate={{ width: 160, height: 40, x: 0, y: 60 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* "100" text bottom left */}
            <div
              className="absolute text-white text-7xl font-bold"
              style={{ bottom: "-200px", left: "-300px" }}
            >
              100
            </div>
          </div>
        )}

        {/* Phase 2: Smaller L Shape - Reference Image 2 */}
        {animationPhase === 2 && (
          <div className="relative">
            {/* Vertical part of smaller L */}
            <motion.div
              className="bg-white absolute"
              initial={{ width: 40, height: 200, x: 0, y: -100 }}
              animate={{ width: 30, height: 120, x: 0, y: -60 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {/* Horizontal part of smaller L */}
            <motion.div
              className="bg-white absolute"
              initial={{ width: 160, height: 40, x: 0, y: 60 }}
              animate={{ width: 90, height: 30, x: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {/* "100" text bottom left */}
            <div
              className="absolute text-white text-7xl font-bold"
              style={{ bottom: "-200px", left: "-300px" }}
            >
              100
            </div>
          </div>
        )}

        {/* Phase 3: Transform to horizontal bar - Reference Image 3 */}
        {animationPhase === 3 && (
          <div className="relative">
            <motion.div
              className="bg-white"
              initial={{ width: 90, height: 30 }}
              animate={{ width: 200, height: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* "100" text bottom left */}
            <div
              className="absolute text-white text-7xl font-bold"
              style={{ bottom: "-200px", left: "-300px" }}
            >
              100
            </div>
          </div>
        )}

        {/* Phase 4: Horizontal bar with countdown - Reference Image 3 */}
        {animationPhase === 4 && (
          <div className="relative">
            <motion.div
              className="bg-white h-5"
              initial={{ width: 200 }}
              animate={{ width: 220 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {/* Countdown number */}
            <div
              className="absolute text-white text-7xl font-bold"
              style={{ bottom: "-200px", left: "-300px" }}
            >
              {String(progress).padStart(3, "0")}
            </div>
          </div>
        )}

        {/* Phase 5: Diagonal wipe */}
        {animationPhase === 5 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{
              clipPath: "polygon(0 100%, 0 100%, 0 100%)",
            }}
            animate={{
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            }}
            transition={{ duration: 0.4, ease: "easeIn" }}
          />
        )}

        {/* Phase 6: Final content reveal transition */}
        {animationPhase === 6 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
