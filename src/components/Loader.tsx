import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { BAR_MAX_WIDTH_PX, getLoaderProgress } from "@/lib/loader";

interface LoaderProps {
  onLoadComplete: () => void;
}

const Loader = ({ onLoadComplete }: LoaderProps) => {
  const [animationPhase, setAnimationPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Phase 1: linear progress bar grows from 0 to 100, then the bar
    // "breaks" through phases 2-5 before handing off to the page.
    const startTime = performance.now();
    const timeouts: number[] = [];
    let frameId = 0;

    const schedule = (callback: () => void, delay: number) => {
      timeouts.push(window.setTimeout(callback, delay));
    };

    const updateProgress = (now: number) => {
      const normalizedTime = getLoaderProgress(now - startTime);

      setProgress(Math.floor(normalizedTime * 100));
      setBarWidth(normalizedTime * BAR_MAX_WIDTH_PX);

      if (normalizedTime < 1) {
        frameId = requestAnimationFrame(updateProgress);
        return;
      }

      schedule(() => setAnimationPhase(2), 100); // Break and rotate
      schedule(() => setAnimationPhase(3), 300); // L comes outward
      schedule(() => setAnimationPhase(4), 600); // Final horizontal bar
      schedule(() => {
        setAnimationPhase(5);
        schedule(onLoadComplete, 200);
      }, 900);
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [onLoadComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        role="progressbar"
        aria-label="Loading site"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="fixed inset-0 z-50 bg-background overflow-hidden flex items-center justify-center"
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
              <div className="bg-muted h-6 w-60 rounded-sm overflow-hidden">
                {/* Progress fill */}
                <motion.div
                  className="bg-foreground h-full"
                  style={{ width: `${barWidth}px` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              </div>
            </div>
            {/* Progress number counting up */}
            <div className="fixed bottom-8 left-8 text-foreground text-8xl font-bold">
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
                className="bg-foreground absolute"
                style={{ width: "200px", height: "24px", left: "32px" }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              />

              {/* Left piece that breaks off and rotates */}
              <motion.div
                className="bg-foreground absolute"
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
            <div className="fixed bottom-8 left-8 text-foreground text-8xl font-bold">
              100
            </div>
          </>
        )}

        {/* Phase 3: L Shape comes outward and stays */}
        {animationPhase === 3 && (
          <>
            <motion.div
              className="relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Vertical part of L */}
              <motion.div
                className="bg-foreground absolute"
                style={{ width: "32px", height: "120px", x: 0, y: -120 }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              {/* Horizontal part of L */}
              <motion.div
                className="bg-foreground absolute"
                style={{ width: "96px", height: "32px", x: 0, y: 0 }}
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

        {/* Phase 4: Transform to horizontal bar - Reference Image 3 */}
        {animationPhase === 4 && (
          <>
            <motion.div
              className="bg-foreground"
              initial={{ width: "96px", height: "32px" }}
              animate={{ width: "200px", height: "20px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
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
            className="absolute inset-0 bg-background"
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
