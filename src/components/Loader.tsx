import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [animationPhase, setAnimationPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Phase 1: Linear progress bar grows from 0 to 100
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds total

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const normalizedTime = Math.min(elapsed / duration, 1);

      // Linear progress (no curve)
      const currentProgress = Math.floor(normalizedTime * 100);

      setProgress(currentProgress);
      setBarWidth(normalizedTime * 200); // Bar width grows to 200px linearly

      if (normalizedTime < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Progress complete, start breaking animation
        setTimeout(() => setAnimationPhase(2), 300); // Break and rotate
        setTimeout(() => setAnimationPhase(3), 1000); // L comes outward
        setTimeout(() => setAnimationPhase(4), 1800); // Transform to smaller L
        setTimeout(() => setAnimationPhase(5), 2500); // Final horizontal bar
        setTimeout(() => {
          setAnimationPhase(6);
          setTimeout(onLoadComplete, 500);
        }, 3200);
      }
    };

    updateProgress();
  }, [onLoadComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Phase 1: Linear progress bar growing from 0 to 100 */}
        {animationPhase === 1 && (
          <>
            {/* Progress bar */}
            <div className="relative">
              {/* Background bar */}
              <div className="bg-gray-800 h-6 w-60 rounded-sm overflow-hidden">
                {/* Progress fill */}
                <motion.div
                  className="bg-white h-full"
                  style={{ width: `${barWidth}px` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              </div>
            </div>
            {/* Progress number counting up */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              {String(progress).padStart(3, "0")}
            </div>
          </>
        )}

        {/* Phase 2: Left side breaks and rotates upward */}
        {animationPhase === 2 && (
          <>
            <div className="relative">
              {/* Horizontal bar that will break */}
              <motion.div
                className="bg-white absolute"
                style={{ width: "200px", height: "24px", left: "32px" }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              />

              {/* Left piece that breaks off and rotates */}
              <motion.div
                className="bg-white absolute"
                style={{
                  width: "24px",
                  height: "120px",
                  transformOrigin: "bottom left",
                }}
                initial={{
                  width: "32px",
                  height: "24px",
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                animate={{
                  width: "24px",
                  height: "120px",
                  x: 0,
                  y: -96,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </div>
            {/* "100" text fixed bottom left */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              100
            </div>
          </>
        )}

        {/* Phase 3: L Shape comes outward and grows */}
        {animationPhase === 3 && (
          <>
            <motion.div
              className="relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Vertical part of L */}
              <motion.div
                className="bg-white absolute"
                style={{ width: "32px", height: "160px", x: 0, y: -160 }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              {/* Horizontal part of L */}
              <motion.div
                className="bg-white absolute"
                style={{ width: "128px", height: "32px", x: 0, y: 0 }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
            {/* "100" text fixed bottom left */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              100
            </div>
          </>
        )}

        {/* Phase 4: L Shape scales down - Reference Image 2 */}
        {animationPhase === 4 && (
          <>
            <motion.div
              className="relative"
              initial={{ scale: 1.2 }}
              animate={{ scale: 0.8 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {/* Vertical part of smaller L */}
              <motion.div
                className="bg-white absolute"
                style={{ width: "24px", height: "100px", x: 0, y: -100 }}
              />
              {/* Horizontal part of smaller L */}
              <motion.div
                className="bg-white absolute"
                style={{ width: "80px", height: "24px", x: 0, y: 0 }}
              />
            </motion.div>
            {/* "100" text fixed bottom left */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              100
            </div>
          </>
        )}

        {/* Phase 5: Transform to horizontal bar - Reference Image 3 */}
        {animationPhase === 5 && (
          <>
            <motion.div
              className="bg-white"
              initial={{ width: "80px", height: "24px" }}
              animate={{ width: "200px", height: "20px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            {/* "100" text fixed bottom left */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              100
            </div>
          </>
        )}

        {/* Phase 6: Diagonal wipe and content reveal */}
        {animationPhase === 6 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{
              clipPath: "polygon(0 100%, 0 100%, 0 100%)",
            }}
            animate={{
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
