import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Progress countdown during horizontal bar phase
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressTimer);
          return 0;
        }
        return prev - 2;
      });
    }, 50);

    // Phase timing orchestration matching reference
    const phaseTimers = [
      // Phase 1: Initial horizontal bar (0-1000ms)
      setTimeout(() => setAnimationPhase(1), 100),
      // Phase 2: Contract and transform to L (1000-1500ms)
      setTimeout(() => setAnimationPhase(2), 1000),
      // Phase 3: L shape prominent display (1500-2500ms)
      setTimeout(() => setAnimationPhase(3), 1500),
      // Phase 4: Horizontal bar with countdown (2500-4000ms)
      setTimeout(() => setAnimationPhase(4), 2500),
      // Phase 5: Diagonal wipe (4000-4500ms)
      setTimeout(() => setAnimationPhase(5), 4000),
      // Phase 6: Content reveal (4500ms+)
      setTimeout(() => {
        setAnimationPhase(6);
        setTimeout(onLoadComplete, 400);
      }, 4500),
    ];

    return () => {
      phaseTimers.forEach((timer) => clearTimeout(timer));
      clearInterval(progressTimer);
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
        {/* Phase 1: Initial horizontal bar with gray extension */}
        {animationPhase === 1 && (
          <div className="flex items-center">
            <motion.div
              className="bg-white h-6"
              initial={{ width: 60 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="bg-gray-700 h-6"
              initial={{ width: 30 }}
              animate={{ width: 60 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Phase 2: Transition - bar contracts and dark block covers */}
        {animationPhase === 2 && (
          <div className="flex items-center">
            <motion.div
              className="bg-white h-6"
              initial={{ width: 120 }}
              animate={{ width: 20 }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
            <motion.div
              className="bg-gray-900 h-6"
              initial={{ width: 60 }}
              animate={{ width: 100 }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          </div>
        )}

        {/* Phase 3: L Shape formation - matches reference image 1 & 2 */}
        {animationPhase === 3 && (
          <div className="relative">
            <motion.div
              className="bg-white"
              initial={{ width: 20, height: 6 }}
              animate={{ width: 32, height: 120 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "bottom left" }}
            />
            <motion.div
              className="bg-white absolute bottom-0 left-0"
              initial={{ width: 0, height: 32 }}
              animate={{ width: 120, height: 32 }}
              transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
              style={{ transformOrigin: "left bottom" }}
            />
            {/* Progress number display */}
            <div className="absolute bottom-8 left-8 text-white text-6xl font-bold">
              100
            </div>
          </div>
        )}

        {/* Phase 4: Horizontal bar with countdown - matches reference image 3 */}
        {animationPhase === 4 && (
          <div className="relative">
            <motion.div
              className="bg-white h-8"
              initial={{ width: 120 }}
              animate={{ width: 160 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {/* Countdown number */}
            <div className="absolute bottom-12 left-0 text-white text-6xl font-bold">
              {String(progress).padStart(3, "0")}
            </div>
          </div>
        )}

        {/* Phase 5: Diagonal wipe */}
        {animationPhase === 5 && (
          <>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{
                clipPath: "polygon(0 100%, 0 100%, 0 100%)",
              }}
              animate={{
                clipPath: "polygon(0 100%, 100% 0%, 100% 100%)",
              }}
              transition={{ duration: 0.4, ease: "easeIn" }}
            />
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%)",
              }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%)",
              }}
              transition={{ duration: 0.4, ease: "easeIn", delay: 0.1 }}
            />
          </>
        )}

        {/* Phase 6: Final white screen before content reveal */}
        {animationPhase === 6 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
