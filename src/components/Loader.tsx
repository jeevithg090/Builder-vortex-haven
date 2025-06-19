import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [animationPhase, setAnimationPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Phase 1: Progress bar grows from 0 to 100 with hyperbolic timing
    const startTime = Date.now();
    const duration = 3000; // 3 seconds total

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const normalizedTime = Math.min(elapsed / duration, 1);

      // Hyperbolic curve: fast start, slow end
      const hyperbolicProgress = 100 * (1 - 1 / (1 + 3 * normalizedTime));
      const currentProgress = Math.floor(hyperbolicProgress);

      setProgress(currentProgress);
      setBarWidth(normalizedTime * 200); // Bar width grows to 200px

      if (normalizedTime < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Progress complete, start L shape phases
        setTimeout(() => setAnimationPhase(2), 200);
        setTimeout(() => setAnimationPhase(3), 1200);
        setTimeout(() => setAnimationPhase(4), 2200);
        setTimeout(() => {
          setAnimationPhase(5);
          setTimeout(onLoadComplete, 500);
        }, 2600);
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
        {/* Phase 1: Progress bar growing from 0 to 100 */}
        {animationPhase === 1 && (
          <>
            {/* Progress bar */}
            <div className="relative">
              {/* Background bar */}
              <div className="bg-gray-800 h-6 w-60 rounded-full overflow-hidden">
                {/* Progress fill */}
                <motion.div
                  className="bg-white h-full rounded-full"
                  style={{ width: `${barWidth}px` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </div>
            {/* Progress number counting up */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              {String(progress).padStart(3, "0")}
            </div>
          </>
        )}

        {/* Phase 2: Large L Shape emerges - Reference Image 1 */}
        {animationPhase === 2 && (
          <>
            <div className="relative">
              {/* Vertical part of large L */}
              <motion.div
                className="bg-white"
                style={{ width: "48px", height: "240px" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Horizontal part of large L */}
              <motion.div
                className="bg-white absolute bottom-0 left-0"
                style={{ width: "192px", height: "48px" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              />
            </div>
            {/* "100" text fixed bottom left */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              100
            </div>
          </>
        )}

        {/* Phase 3: Smaller L Shape - Reference Image 2 */}
        {animationPhase === 3 && (
          <>
            <div className="relative">
              {/* Vertical part of smaller L */}
              <motion.div
                className="bg-white"
                initial={{ width: "48px", height: "240px" }}
                animate={{ width: "32px", height: "120px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {/* Horizontal part of smaller L */}
              <motion.div
                className="bg-white absolute bottom-0 left-0"
                initial={{ width: "192px", height: "48px" }}
                animate={{ width: "96px", height: "32px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            {/* "100" text fixed bottom left */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              100
            </div>
          </>
        )}

        {/* Phase 4: Transform to horizontal bar - Reference Image 3 */}
        {animationPhase === 4 && (
          <>
            <motion.div
              className="bg-white"
              initial={{ width: "96px", height: "32px" }}
              animate={{ width: "200px", height: "24px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* "100" text fixed bottom left */}
            <div className="fixed bottom-8 left-8 text-white text-8xl font-bold">
              100
            </div>
          </>
        )}

        {/* Phase 5: Diagonal wipe and content reveal */}
        {animationPhase === 5 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{
              clipPath: "polygon(0 100%, 0 100%, 0 100%)",
            }}
            animate={{
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
