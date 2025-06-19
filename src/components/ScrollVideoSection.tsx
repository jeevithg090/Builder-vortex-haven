import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { Play, X } from "lucide-react";

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Track scroll progress for debugging
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Simple video card pop-up animation on scroll
  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.4, 0.8, 1], // Card pops up as you scroll
  );

  const videoWidth = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["60%", "80%", "95%", "100%"], // Card width grows
  );

  const videoHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["50vh", "70vh", "100vh", "100vh"], // Card height grows to full screen
  );

  const videoBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [24, 12, 0], // Rounded card to sharp edges
  );

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.7, 0.3], // Background fades as video grows
  );

  // Play button appears when video is large enough
  const playButtonOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.6, 1],
    [0, 1, 1],
  );

  const playButtonScale = useTransform(
    scrollYProgress,
    [0.4, 0.6, 1],
    [0.5, 1, 1],
  );

  // Wave animations that react to scroll
  const waveScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 4]);

  const waveOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 0.4, 0.1],
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
        className="relative min-h-[500vh] bg-gradient-to-br from-[#E0E5EC] via-[#F5F7FA] to-[#E8EDF5] overflow-hidden"
      >
        {/* Background with wavy overlays */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          {/* Background layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#E0E5EC] via-[#F5F7FA] to-[#E8EDF5]"
            style={{
              opacity: backgroundOpacity,
            }}
          />

          {/* Wavy background overlays */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              scale: waveScale,
              opacity: waveOpacity,
            }}
          >
            {/* Primary wave */}
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

            {/* Secondary wave */}
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
          </motion.div>

          {/* Video Card that grows to fullscreen */}
          <motion.div
            className="relative z-10 shadow-2xl overflow-hidden"
            style={{
              width: videoWidth,
              height: videoHeight,
              borderRadius: videoBorderRadius,
              scale: videoScale,
            }}
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
          >
            {/* Video element */}
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
            </video>

            {/* Video overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

            {/* Play button overlay ON the video */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: playButtonOpacity,
                scale: playButtonScale,
              }}
            >
              <motion.button
                onClick={openVideoModal}
                className="group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect behind button */}
                <motion.div
                  className="absolute -inset-8 bg-white/20 rounded-full blur-xl"
                  animate={{
                    scale: isVideoHovered ? [1, 1.2, 1] : 1,
                    opacity: isVideoHovered ? [0.3, 0.6, 0.3] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isVideoHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Main play button */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 group-hover:bg-white transition-all duration-300">
                  <Play
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-800 ml-1"
                    fill="currentColor"
                  />
                </div>

                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/40 rounded-full"
                  animate={
                    isVideoHovered
                      ? {
                          scale: [1, 1.8],
                          opacity: [0.6, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isVideoHovered ? Infinity : 0,
                    ease: "easeOut",
                  }}
                />
              </motion.button>
            </motion.div>

            {/* PLAY REEL text overlay */}
            <motion.div
              className="absolute top-8 left-8 md:top-12 md:left-12"
              style={{
                opacity: playButtonOpacity,
              }}
            >
              <h2 className="text-white text-2xl md:text-4xl lg:text-6xl font-black tracking-wider drop-shadow-2xl">
                PLAY
              </h2>
              <h2 className="text-white text-2xl md:text-4xl lg:text-6xl font-black tracking-wider drop-shadow-2xl">
                REEL
              </h2>
            </motion.div>
          </motion.div>

          {/* ABOUT US Button */}
          <motion.div
            className="absolute top-8 right-8 z-30"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
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
