import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Phase timing orchestration
    const phaseTimers = [
      // Phase 1: Expanding white bar (0-700ms)
      setTimeout(() => setAnimationPhase(1), 0),
      // Phase 2: Contracting and re-expanding (700-1500ms)
      setTimeout(() => setAnimationPhase(2), 700),
      // Phase 3: Transform to L shape (1500-2000ms)
      setTimeout(() => setAnimationPhase(3), 1500),
      // Phase 4: Diagonal wipe (2000-2300ms)
      setTimeout(() => setAnimationPhase(4), 2000),
      // Phase 5: Content reveal (2300ms+)
      setTimeout(() => {
        setAnimationPhase(5);
        setTimeout(onLoadComplete, 300);
      }, 2300),
    ];

    return () => {
      phaseTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [onLoadComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Phase 1 & 2: White bar with gray extension */}
        {(animationPhase === 1 || animationPhase === 2) && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* White bar */}
            <div
              className={`
                bg-white h-6 transition-all duration-700 ease-out
                ${
                  animationPhase === 1
                    ? "w-48 loader-expand-white"
                    : "w-8 loader-contract-white"
                }
              `}
              style={{
                transformOrigin: "center",
              }}
            />

            {/* Gray extension/dark block */}
            <div
              className={`
                bg-gray-800 h-6 transition-all duration-700 ease-out
                ${
                  animationPhase === 1
                    ? "w-24 loader-expand-gray"
                    : "w-40 loader-dark-block"
                }
              `}
              style={{
                transformOrigin: "left center",
              }}
            />
          </div>
        )}

        {/* Phase 3: L Shape formation */}
        {animationPhase === 3 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Vertical part of L */}
              <div
                className="bg-white w-8 h-24 loader-l-vertical"
                style={{
                  transformOrigin: "bottom left",
                }}
              />
              {/* Horizontal part of L */}
              <div
                className="bg-white h-8 w-24 absolute bottom-0 left-0 loader-l-horizontal"
                style={{
                  transformOrigin: "left bottom",
                }}
              />
            </div>
          </div>
        )}

        {/* Phase 4: Diagonal wipe panels */}
        {animationPhase === 4 && (
          <>
            {/* First diagonal panel */}
            <div
              className="absolute bg-white loader-wipe-1"
              style={{
                width: "200vw",
                height: "200vh",
                top: "100%",
                left: "-50vw",
                transformOrigin: "bottom left",
                transform: "rotate(-45deg)",
              }}
            />
            {/* Second diagonal panel */}
            <div
              className="absolute bg-white loader-wipe-2"
              style={{
                width: "200vw",
                height: "200vh",
                top: "100%",
                right: "-50vw",
                transformOrigin: "bottom right",
                transform: "rotate(45deg)",
              }}
            />
          </>
        )}

        {/* Phase 5: White screen before content reveal */}
        {animationPhase === 5 && (
          <div className="absolute inset-0 bg-white loader-content-reveal" />
        )}
      </motion.div>

      {/* CSS Keyframe Animations */}
      <style jsx>{`
        @keyframes expandWhite {
          0% {
            width: 32px;
          }
          100% {
            width: 192px;
          }
        }

        @keyframes expandGray {
          0% {
            width: 16px;
          }
          100% {
            width: 96px;
          }
        }

        @keyframes contractWhite {
          0% {
            width: 192px;
          }
          50% {
            width: 32px;
          }
          100% {
            width: 192px;
          }
        }

        @keyframes darkBlock {
          0% {
            width: 96px;
          }
          50% {
            width: 160px;
          }
          100% {
            width: 160px;
          }
        }

        @keyframes lVertical {
          0% {
            height: 24px;
            width: 192px;
            transform: rotate(0deg);
          }
          50% {
            height: 24px;
            width: 32px;
            transform: rotate(0deg);
          }
          100% {
            height: 96px;
            width: 32px;
            transform: rotate(0deg);
          }
        }

        @keyframes lHorizontal {
          0% {
            width: 0px;
            opacity: 0;
          }
          50% {
            width: 0px;
            opacity: 0;
          }
          100% {
            width: 96px;
            opacity: 1;
          }
        }

        @keyframes wipe1 {
          0% {
            transform: rotate(-45deg) translateY(0%);
          }
          100% {
            transform: rotate(-45deg) translateY(-100%);
          }
        }

        @keyframes wipe2 {
          0% {
            transform: rotate(45deg) translateY(0%);
          }
          100% {
            transform: rotate(45deg) translateY(-100%);
          }
        }

        @keyframes contentReveal {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .loader-expand-white {
          animation: expandWhite 0.7s ease-out forwards;
        }

        .loader-expand-gray {
          animation: expandGray 0.7s ease-out forwards;
        }

        .loader-contract-white {
          animation: contractWhite 0.8s linear forwards;
        }

        .loader-dark-block {
          animation: darkBlock 0.8s linear forwards;
        }

        .loader-l-vertical {
          animation: lVertical 0.5s ease-out forwards;
        }

        .loader-l-horizontal {
          animation: lHorizontal 0.5s ease-out forwards;
        }

        .loader-wipe-1 {
          animation: wipe1 0.3s ease-in forwards;
        }

        .loader-wipe-2 {
          animation: wipe2 0.3s ease-in forwards;
        }

        .loader-content-reveal {
          animation: contentReveal 0.3s ease-out forwards;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default Loader;
