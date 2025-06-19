import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Play, Star, Award, Zap, Users } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "The Agency transformed our entire brand identity. Their strategic approach and creative vision resulted in a 400% increase in brand recognition. The team's attention to detail and innovative designs exceeded all our expectations.",
    author: "Sarah Johnson",
    company: "Tech Innovators Inc.",
    role: "CEO",
    videoThumbnail: true,
    rating: 5,
    project: "Complete Brand Overhaul",
  },
  {
    id: 2,
    text: "Working with The Agency was a game-changer for our startup. They didn't just design our website; they crafted our entire digital presence. The result? 250% increase in user engagement and triple our conversion rate.",
    author: "Marcus Chen",
    company: "GreenTech Solutions",
    role: "Founder",
    videoThumbnail: false,
    rating: 5,
    project: "Digital Transformation",
  },
  {
    id: 3,
    text: "Professional, creative, and results-driven. The Agency delivered a brand strategy that perfectly captured our vision. Their campaign increased our market presence by 300% and established us as industry leaders.",
    author: "Emma Rodriguez",
    company: "Luxe Lifestyle",
    role: "Marketing Director",
    videoThumbnail: true,
    rating: 5,
    project: "Brand Strategy & Campaign",
  },
  {
    id: 4,
    text: "The Agency's innovative approach to our rebranding was exceptional. They understood our vision and transformed it into a compelling brand story. Our client acquisition increased by 180% post-launch.",
    author: "David Park",
    company: "Urban Architects",
    role: "Creative Director",
    videoThumbnail: false,
    rating: 5,
    project: "Architecture Firm Rebrand",
  },
  {
    id: 5,
    text: "From concept to execution, The Agency delivered beyond expectations. Their design thinking and strategic insights helped us connect with our audience in ways we never imagined. Truly transformational work.",
    author: "Lisa Thompson",
    company: "Future Foods",
    role: "Brand Manager",
    videoThumbnail: true,
    rating: 5,
    project: "Product Launch Campaign",
  },
  {
    id: 6,
    text: "The Agency doesn't just create designs—they create experiences. Their holistic approach to our brand refresh resulted in a 220% increase in customer loyalty and significant market share growth.",
    author: "James Wilson",
    company: "Nordic Wellness",
    role: "CEO",
    videoThumbnail: false,
    rating: 5,
    project: "Wellness Brand Refresh",
  },
];

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const typewriterTimer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typewriterTimer);
        }
      }, 50);

      return () => clearInterval(typewriterTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className="relative">
      {displayText}
      {showCursor && <span className="animate-blink ml-1 text-white">|</span>}
    </span>
  );
};

const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<
    "intro" | "split" | "fullscreen"
  >("intro");
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update phase and testimonial based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest < 0.15) {
        setCurrentPhase("intro");
      } else if (latest < 0.4) {
        setCurrentPhase("split");
      } else {
        setCurrentPhase("fullscreen");
        // Update testimonial index based on scroll
        const testimonialIndex = Math.floor(
          (latest - 0.4) / (0.6 / testimonials.length),
        );
        setActiveIndex(
          Math.min(Math.max(testimonialIndex, 0), testimonials.length - 1),
        );
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Ensure we always have a valid activeIndex
  useEffect(() => {
    if (activeIndex < 0 || activeIndex >= testimonials.length) {
      setActiveIndex(0);
    }
  }, [activeIndex]);

  // Initialize loaded state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Split animation transforms
  const splitProgress = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const leftSplit = useTransform(splitProgress, [0, 1], [0, -400]);
  const rightSplit = useTransform(splitProgress, [0, 1], [0, 400]);
  const splitScale = useTransform(splitProgress, [0, 1], [1, 1.2]);

  return (
    <section
      id="testimonials"
      className="relative h-[400vh] bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden"
      ref={containerRef}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Loading State */}
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-center text-white">
              <motion.div
                className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <p className="text-purple-300">Loading testimonials...</p>
            </div>
          </motion.div>
        )}
        {/* Phase 1: Intro with all testimonials */}
        {currentPhase === "intro" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl w-full text-center">
              <motion.div
                className="mb-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500"></div>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold tracking-wider uppercase">
                    <Award className="w-4 h-4" />
                    Client Success Stories
                  </div>
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Trusted by Industry Leaders
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Scroll down to experience testimonials in an immersive way
                </p>
              </motion.div>

              {/* Show all testimonials in a grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                    isInView={true}
                    isActive={index === 0}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 2: Split Animation */}
        {currentPhase === "split" && (
          <>
            {/* Left Split */}
            <motion.div
              className="absolute left-1/2 w-1/2 h-full bg-gradient-to-br from-purple-800 to-purple-600 flex items-center justify-center"
              style={{
                x: leftSplit,
                scale: splitScale,
                transformOrigin: "right center",
              }}
            >
              <div className="text-center text-white p-12">
                <motion.div
                  className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  SUCCESS
                </motion.div>
                <div className="text-xl opacity-80">REVEALED</div>
              </div>
            </motion.div>

            {/* Right Split */}
            <motion.div
              className="absolute right-1/2 w-1/2 h-full bg-gradient-to-bl from-pink-800 to-pink-600 flex items-center justify-center"
              style={{
                x: rightSplit,
                scale: splitScale,
                transformOrigin: "left center",
              }}
            >
              <div className="text-center text-white p-12">
                <motion.div
                  className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                >
                  STORIES
                </motion.div>
                <div className="text-xl opacity-80">IMMERSIVE</div>
              </div>
            </motion.div>
          </>
        )}

        {/* Phase 3: Fullscreen Testimonial Experience */}
        {currentPhase === "fullscreen" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Active Testimonial */}
            <div className="relative h-full flex items-center justify-center p-8 md:p-20">
              {testimonials[activeIndex] && (
                <motion.div
                  key={activeIndex}
                  className="relative z-10 max-w-5xl text-center"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  {/* Quote */}
                  <motion.blockquote
                    className="text-2xl md:text-4xl font-light text-white mb-12 leading-relaxed"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255,255,255,0.3)",
                        "0 0 30px rgba(138,43,226,0.4)",
                        "0 0 20px rgba(255,105,180,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    "{testimonials[activeIndex].text}"
                  </motion.blockquote>

                  {/* Author Info */}
                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {/* Avatar */}
                    <motion.div
                      className="relative"
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-white/50"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        {testimonials[activeIndex].author
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                    </motion.div>

                    {/* Author Details */}
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {testimonials[activeIndex].author}
                      </h3>
                      <p className="text-purple-300 text-lg">
                        {testimonials[activeIndex].role}
                      </p>
                      <p className="text-pink-300 font-semibold">
                        {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </motion.div>

                  {/* Project Badge */}
                  <motion.div
                    className="mt-8 inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-white font-semibold">
                      {testimonials[activeIndex].project}
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* Progress Indicator */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-3">
                  {testimonials.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-3 h-3 rounded-full border-2 transition-all ${
                        index === activeIndex
                          ? "bg-white border-white"
                          : "bg-transparent border-white/50"
                      }`}
                      animate={
                        index === activeIndex
                          ? {
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                "0 0 0px rgba(255,255,255,0.5)",
                                "0 0 15px rgba(255,255,255,0.8)",
                                "0 0 0px rgba(255,255,255,0.5)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1,
                        repeat: index === activeIndex ? Infinity : 0,
                      }}
                    />
                  ))}
                </div>
                <p className="text-white/60 text-sm mt-3 text-center">
                  {activeIndex + 1} of {testimonials.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Enhanced Testimonial Card Component
const TestimonialCard = ({ testimonial, index, isInView, isActive }: any) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <motion.div
      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 hover:bg-white/15 group ${
        isActive
          ? "border-purple-400 shadow-lg shadow-purple-400/25"
          : "border-white/20"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        <span className="ml-2 text-sm text-gray-300">
          {testimonial.project}
        </span>
      </div>

      {/* Quote */}
      <p className="text-white text-sm leading-relaxed mb-6 line-clamp-4">
        "{testimonial.text}"
      </p>

      {/* Video Thumbnail */}
      {testimonial.videoThumbnail && (
        <div className="mb-4">
          <motion.div
            className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </motion.div>
        </div>
      )}

      {/* Author Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-sm">
            {testimonial.author}
          </div>
          <div className="text-gray-400 text-xs">{testimonial.role}</div>
          <div className="text-purple-400 text-xs font-medium">
            {testimonial.company}
          </div>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">
            {testimonial.author
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;
