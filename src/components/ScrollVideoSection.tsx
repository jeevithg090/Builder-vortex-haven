import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { Play, X, Volume2, Maximize } from "lucide-react";

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const isInView = useInView(containerRef, { margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // More refined transform values for smooth animations
  const waveScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [1, 1.2, 2, 3.5, 5],
  );

  const waveOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.8, 0.6, 0.3, 0.1],
  );

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.95, 1, 1.15, 1.3, 1.5],
  );

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.4, 0.7, 0.9, 1, 1],
  );

  const playButtonScale = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    [0, 1, 1],
  );

  const playButtonOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    [0, 1, 1],
  );

  const textScale = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0.8, 1, 1]);

  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 1]);

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
        className="relative min-h-[400vh] bg-gradient-to-br from-[#E0E5EC] via-[#F5F7FA] to-[#E8EDF5] overflow-hidden"
      >
        {/* Background Container */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          {/* Background video that transforms during scroll */}
          <motion.div
            className="absolute inset-0 rounded-3xl overflow-hidden mx-8 my-8"
            style={{
              opacity: backgroundOpacity,
              scale: backgroundScale,
            }}
          >
            <div className="relative w-full h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                  type="video/mp4"
                />
                {/* Fallback gradient */}
              </video>

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              {/* Ambient glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Enhanced Wavy Overlays */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              scale: waveScale,
              opacity: waveOpacity,
            }}
          >
            {/* Primary wave - flowing from top */}
            <motion.div
              className="absolute -top-32 -left-32 w-[500px] h-[500px]"
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-br from-[#B3A4EA]/80 via-[#8B7CE8]/60 to-[#A78BFA]/70 rounded-full blur-sm"
                style={{
                  clipPath: "ellipse(65% 45% at 35% 40%)",
                  transform: "rotate(-25deg) skew(-12deg)",
                }}
              />
            </motion.div>

            {/* Secondary wave - organic flow */}
            <motion.div
              className="absolute -bottom-40 -right-20 w-[600px] h-[400px]"
              animate={{
                x: [0, -50, 0],
                y: [0, 30, 0],
                rotate: [45, 55, 45],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-tl from-[#C4B5FD]/70 via-[#DDD6FE]/50 to-[#E9D5FF]/60 rounded-full blur-sm"
                style={{
                  clipPath: "ellipse(55% 70% at 60% 30%)",
                  transform: "skew(15deg, -8deg)",
                }}
              />
            </motion.div>

            {/* Tertiary wave - crossing diagonal */}
            <motion.div
              className="absolute top-1/3 left-1/4 w-[800px] h-[200px]"
              animate={{
                rotate: [20, 35, 20],
                scaleX: [1, 1.3, 1],
                scaleY: [1, 0.8, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-r from-[#8B5CF6]/40 via-[#A78BFA]/60 to-[#C4B5FD]/40 blur-sm"
                style={{
                  clipPath:
                    "polygon(0% 60%, 30% 20%, 60% 80%, 100% 40%, 100% 100%, 0% 100%)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* ABOUT US Button - Enhanced */}
          <motion.div
            className="absolute top-8 right-8 z-30"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.2], [0, -50]),
            }}
          >
            <motion.button
              className="group flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-white border border-gray-200/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-110 transition-transform duration-300"></span>
              <span className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                ABOUT US
              </span>
            </motion.button>
          </motion.div>

          {/* PLAY REEL Section - Enhanced with better animations */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-8"
            style={{
              opacity: playButtonOpacity,
              scale: playButtonScale,
            }}
          >
            {/* Main heading with gradient text */}
            <motion.div
              className="text-center mb-12"
              style={{
                opacity: textOpacity,
                scale: textScale,
              }}
            >
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                PLAY
              </h2>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                REEL
              </h2>
            </motion.div>

            {/* Enhanced Play Button */}
            <motion.button
              onClick={openVideoModal}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                opacity: playButtonOpacity,
              }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 rounded-full blur-xl"
                animate={{
                  scale: isHovering ? [1, 1.2, 1] : 1,
                  opacity: isHovering ? [0.5, 0.8, 0.5] : 0.5,
                }}
                transition={{
                  duration: 2,
                  repeat: isHovering ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />

              {/* Main button */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-white via-gray-50 to-white rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-white/30 border-4 border-white/20 backdrop-blur-sm transition-all duration-500">
                {/* Inner play icon */}
                <motion.div
                  animate={{
                    scale: isHovering ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: isHovering ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <Play
                    className="w-12 h-12 text-gray-800 ml-2"
                    fill="currentColor"
                  />
                </motion.div>

                {/* Ripple effect on hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/50 rounded-full"
                  animate={
                    isHovering
                      ? {
                          scale: [1, 1.5],
                          opacity: [0.8, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isHovering ? Infinity : 0,
                    ease: "easeOut",
                  }}
                />
              </div>

              {/* Floating elements around button */}
              <motion.div
                className="absolute -top-6 -right-6 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-8 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.button>

            {/* Subtle instruction text */}
            <motion.p
              className="text-white/80 text-lg font-medium mt-8 tracking-wide"
              style={{
                opacity: textOpacity,
              }}
            >
              Click to watch our story
            </motion.p>
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
                    video:
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                    background: "bg-red-500",
                    title: "Project One",
                  },
                  {
                    video:
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                    background: "bg-purple-500",
                    title: "Project Two",
                  },
                  {
                    video:
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                    background: "bg-blue-500",
                    title: "Project Three",
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
                      className={`aspect-video ${item.background} rounded-2xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300 relative`}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover mix-blend-overlay group-hover:mix-blend-normal transition-all duration-300"
                      >
                        <source src={item.video} type="video/mp4" />
                        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600" />
                      </video>

                      {/* Overlay icons */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-gray-800" />
                        </div>
                      </div>
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
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
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
