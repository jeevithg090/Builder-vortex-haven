import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import {
  Play,
  X,
  ArrowUp,
  Star,
  Users,
  Award,
  ChevronDown,
  Volume2,
  VolumeX,
  Maximize,
  Heart,
  Share2,
  MessageCircle,
  Zap,
  Sparkles,
  Camera,
} from "lucide-react";

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showTestimonialPopup, setShowTestimonialPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showFloatingTooltip, setShowFloatingTooltip] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Enhanced scroll tracking with multiple triggers and auto-dismiss
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);

    // Show scroll to top button
    setShowScrollToTop(latest > 0.3);

    // Trigger testimonial popup at specific scroll points
    if (latest > 0.4 && latest < 0.5 && !showTestimonialPopup) {
      setTimeout(() => setShowTestimonialPopup(true), 500);
    }
    // Auto-dismiss testimonial popup when scrolling past its zone
    if ((latest <= 0.4 || latest >= 0.6) && showTestimonialPopup) {
      setShowTestimonialPopup(false);
    }

    // Trigger stats popup
    if (latest > 0.6 && latest < 0.7 && !showStatsPopup) {
      setTimeout(() => setShowStatsPopup(true), 800);
    }
    // Auto-dismiss stats popup when scrolling past its zone
    if ((latest <= 0.6 || latest >= 0.8) && showStatsPopup) {
      setShowStatsPopup(false);
    }

    // Show action panel
    if (latest > 0.8) {
      setShowActionPanel(true);
    }
    // Auto-dismiss action panel when scrolling back up
    if (latest <= 0.7 && showActionPanel) {
      setShowActionPanel(false);
    }
  });

  // Enhanced video animations
  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 0.6, 0.9, 1],
  );

  const videoWidth = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["50%", "70%", "90%", "100%"],
  );

  const videoHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["40vh", "60vh", "80vh", "100vh"],
  );

  const videoBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [32, 16, 0],
  );

  // Background animations
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.8, 0.3],
  );

  const waveScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2]);

  const waveOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 0.6, 0.2],
  );

  // Play button animations
  const playButtonOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8, 1],
    [1, 1, 0.5, 0],
  );

  const playButtonScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [1, 1.2, 0.8, 0.5],
  );

  // Enhanced floating elements animations
  const floatingElementsY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const testimonials = [
    {
      text: "This video perfectly captures our brand essence. The Agency delivered beyond expectations!",
      author: "Sarah Johnson",
      company: "TechStart",
      rating: 5,
    },
    {
      text: "Incredible storytelling through video. Our conversion rate increased by 300% after this campaign.",
      author: "Michael Chen",
      company: "GrowthLab",
      rating: 5,
    },
    {
      text: "The creative direction and execution were flawless. Best investment we've made!",
      author: "Emma Rodriguez",
      company: "BrandForge",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Video Projects" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "250M+", label: "Total Views" },
    { number: "15", label: "Industry Awards" },
  ];

  const openVideoModal = () => {
    setShowVideoModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    document.body.style.overflow = "unset";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Auto-cycle testimonials
  useEffect(() => {
    if (showTestimonialPopup) {
      const interval = setInterval(nextTestimonial, 4000);
      return () => clearInterval(interval);
    }
  }, [showTestimonialPopup]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-[500vh] bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden"
      >
        {/* Enhanced Background with Interactive Elements */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-blue-900/10"
            style={{ opacity: backgroundOpacity }}
          />

          {/* Enhanced Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Enhanced Wavy Overlays */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              scale: waveScale,
              opacity: waveOpacity,
            }}
          >
            {/* Primary enhanced wave */}
            <motion.div
              className="absolute -top-32 -left-32 w-[600px] h-[600px]"
              animate={{
                x: [0, 80, 0],
                y: [0, -60, 0],
                scale: [1, 1.3, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-blue-500/25 rounded-full blur-xl"
                style={{
                  clipPath: "ellipse(65% 45% at 35% 40%)",
                  transform: "rotate(-25deg) skew(-12deg)",
                }}
              />
            </motion.div>

            {/* Secondary enhanced wave */}
            <motion.div
              className="absolute -bottom-40 -right-20 w-[700px] h-[500px]"
              animate={{
                x: [0, -70, 0],
                y: [0, 40, 0],
                rotate: [45, 65, 45],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-tl from-blue-500/25 via-purple-500/15 to-pink-500/20 rounded-full blur-xl"
                style={{
                  clipPath: "ellipse(55% 70% at 60% 30%)",
                  transform: "skew(15deg, -8deg)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced Video Card */}
          <motion.div
            className="relative z-10 shadow-2xl overflow-hidden border-4 border-white/10"
            style={{
              width: videoWidth,
              height: videoHeight,
              borderRadius: videoBorderRadius,
              scale: videoScale,
            }}
            onMouseEnter={() => {
              setIsVideoHovered(true);
              setShowFloatingTooltip(true);
            }}
            onMouseLeave={() => {
              setIsVideoHovered(false);
              setShowFloatingTooltip(false);
            }}
          >
            {/* Video element */}
            <video
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>

            {/* Enhanced Video Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

            {/* Video Progress Bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
              style={{
                width: `${scrollProgress * 100}%`,
                opacity: scrollProgress > 0.2 ? 1 : 0,
              }}
            />

            {/* Enhanced Play Button */}
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
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Enhanced glow effect */}
                <motion.div
                  className="absolute -inset-12 bg-white/30 rounded-full blur-2xl"
                  animate={{
                    scale: isVideoHovered ? [1, 1.5, 1] : 1,
                    opacity: isVideoHovered ? [0.3, 0.8, 0.3] : 0.3,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: isVideoHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Main play button with enhanced design */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40 group-hover:bg-white group-hover:border-purple-500/50 transition-all duration-500">
                  <Play
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-gray-800 ml-1 group-hover:text-purple-600 transition-colors duration-300"
                    fill="currentColor"
                  />
                </div>

                {/* Multiple ripple effects */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 border-2 border-white/30 rounded-full"
                    animate={
                      isVideoHovered
                        ? {
                            scale: [1, 2 + ring * 0.3],
                            opacity: [0.8, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2 + ring * 0.5,
                      repeat: isVideoHovered ? Infinity : 0,
                      delay: ring * 0.3,
                    }}
                  />
                ))}
              </motion.button>
            </motion.div>

            {/* Video Controls Overlay */}
            <AnimatePresence>
              {isVideoHovered && (
                <motion.div
                  className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => setLiked(!liked)}
                      className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={openVideoModal}
                      className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Tooltip */}
            <AnimatePresence>
              {showFloatingTooltip && (
                <motion.div
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Click to experience our creative process
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Floating Elements around Video */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: floatingElementsY }}
          >
            {/* Awards Badge */}
            <motion.div
              className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Award className="w-8 h-8 text-white" />
            </motion.div>

            {/* Stats Bubble */}
            <motion.div
              className="absolute bottom-32 left-16 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="text-sm font-bold text-gray-800">500M+ Views</div>
              <div className="text-xs text-gray-600">Across all platforms</div>
            </motion.div>

            {/* Creative Process Indicator */}
            <motion.div
              className="absolute top-1/2 left-8 bg-purple-500/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <Camera className="w-6 h-6 text-white mb-1" />
              <div className="text-xs text-white font-medium">
                Live Production
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Scroll Down Indicator */}
        <AnimatePresence>
          {scrollProgress < 0.1 && (
            <motion.div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <motion.div
                className="flex flex-col items-center text-gray-600"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm font-medium mb-2">
                  Scroll to explore
                </span>
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full shadow-xl z-40 flex items-center justify-center hover:shadow-2xl transition-shadow"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Testimonial Popup */}
      <AnimatePresence>
        {showTestimonialPopup && (
          <motion.div
            className="fixed top-20 right-8 max-w-sm bg-white rounded-2xl shadow-2xl p-6 z-40 border border-gray-200"
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button
              onClick={() => setShowTestimonialPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-gray-800 text-sm leading-relaxed mb-4">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div>
                <div className="font-semibold text-gray-900 text-sm">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-gray-600 text-xs">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-purple-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Popup */}
      <AnimatePresence>
        {showStatsPopup && (
          <motion.div
            className="fixed bottom-20 left-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-6 z-40"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, delay: 0.5 }}
          >
            <button
              onClick={() => setShowStatsPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6" />
              <h3 className="font-bold text-lg">Our Impact</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Panel */}
      <AnimatePresence>
        {showActionPanel && (
          <motion.div
            className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-l-2xl shadow-2xl p-4 z-40"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="flex flex-col gap-3">
              <button className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Users className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-lg"
              onClick={closeVideoModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-[95vw] h-[95vh] max-w-7xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ duration: 0.5, type: "spring", damping: 25 }}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors group"
              >
                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              <video
                autoPlay
                controls
                className="w-full h-full object-cover"
                poster="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Creative Process Behind the Magic
                </h3>
                <p className="text-gray-300 max-w-2xl">
                  Discover how our team transforms ideas into compelling visual
                  stories that drive results for our clients.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollVideoSection;
