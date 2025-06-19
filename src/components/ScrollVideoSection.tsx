import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Play, X } from "lucide-react";

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values based on scroll progress
  const waveScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 1.5, 2.5, 3],
  );
  const waveRotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 15, 45, 90],
  );
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 0.6, 0.9, 1],
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1.2, 1.5],
  );

  const openVideoModal = () => {
    setShowVideoModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-[300vh] bg-[#E0E5EC] overflow-hidden"
      >
        {/* Background Image Container */}
        <div className="sticky top-0 h-screen w-full">
          {/* Subtle background image */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              opacity: backgroundOpacity,
              scale: contentScale,
            }}
          >
            <img
              src="https://cdn.builder.io/api/v1/assets/96fa70b7eb664ab6acbd62e2c416296c/screenshot-2025-06-19-at-3.50.35-pm-53f2d2?format=webp&width=800"
              alt="3D Scene"
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>

          {/* Wavy Purple Overlays */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              scale: waveScale,
              rotate: waveRotate,
            }}
          >
            {/* First wave from top-left */}
            <motion.div
              className="absolute -top-20 -left-20 w-96 h-96 bg-[#B3A4EA] opacity-70 rounded-full"
              style={{
                clipPath: "ellipse(60% 40% at 30% 30%)",
                transform: "rotate(-30deg) skew(-15deg)",
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Second wave from bottom */}
            <motion.div
              className="absolute -bottom-20 -left-10 w-80 h-80 bg-[#B3A4EA] opacity-60 rounded-full"
              style={{
                clipPath: "ellipse(70% 50% at 50% 70%)",
                transform: "rotate(45deg) skew(20deg)",
              }}
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Third wave curving across */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-[600px] h-32 bg-[#8B7CE8] opacity-50"
              style={{
                clipPath:
                  "polygon(0% 50%, 25% 20%, 50% 80%, 75% 30%, 100% 60%, 100% 100%, 0% 100%)",
                transform: "translate(-50%, -50%) rotate(15deg)",
              }}
              animate={{
                rotate: [15, 25, 15],
                scaleX: [1, 1.2, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* ABOUT US Button */}
          <motion.div
            className="absolute top-20 right-20 z-10"
            initial={{ opacity: 1 }}
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
            }}
          >
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span className="text-sm font-medium text-gray-800 uppercase tracking-wide">
                ABOUT US
              </span>
            </button>
          </motion.div>

          {/* PLAY REEL Overlay - appears during scroll */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{
              opacity: useTransform(scrollYProgress, [0.4, 0.7], [0, 1]),
            }}
          >
            <motion.h2
              className="text-white text-6xl md:text-8xl font-bold mb-8 tracking-wider"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              PLAY REEL
            </motion.h2>

            <motion.button
              onClick={openVideoModal}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-white/20 transition-all duration-300">
                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Content Cards Section */}
        <div className="relative bg-[#F8F8F8] min-h-screen">
          {/* PLAY REEL Background Text */}
          <div className="absolute top-0 left-0 w-full overflow-hidden">
            <div className="text-[#E5E5E5] text-[120px] md:text-[200px] font-bold tracking-wider opacity-30 whitespace-nowrap">
              PLAY REEL PLAY REEL PLAY REEL
            </div>
          </div>

          {/* Content Cards */}
          <div className="relative z-10 pt-40 pb-20 px-8">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-4xl font-bold text-gray-900 mb-16">
                Featured Work
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    image:
                      "https://cdn.builder.io/api/v1/assets/96fa70b7eb664ab6acbd62e2c416296c/screenshot-2025-06-19-at-3.51.29-pm-74bd82?format=webp&width=800",
                    background: "bg-red-500",
                  },
                  {
                    image:
                      "https://cdn.builder.io/api/v1/assets/96fa70b7eb664ab6acbd62e2c416296c/screenshot-2025-06-19-at-3.51.36-pm-7fac66?format=webp&width=800",
                    background: "bg-purple-500",
                  },
                  {
                    image:
                      "https://cdn.builder.io/api/v1/assets/96fa70b7eb664ab6acbd62e2c416296c/screenshot-2025-06-19-at-3.51.23-pm-8d3bee?format=webp&width=800",
                    background: "bg-blue-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`aspect-video ${item.background} rounded-2xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <img
                        src={item.image}
                        alt={`Project ${index + 1}`}
                        className="w-full h-full object-cover mix-blend-overlay"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button className="text-gray-400 hover:text-gray-600 text-2xl transition-colors">
                        +
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Cards Row */}
              <div className="flex justify-center gap-4 mb-8">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
                  >
                    +
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeVideoModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Video Container */}
            <motion.div
              className="relative w-[90vw] h-[90vh] max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Video */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                controls
              >
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollVideoSection;
