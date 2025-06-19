import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
      }, 100);

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
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Insane split animation transforms
  const splitProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const fullscreenProgress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const testimonialProgress = useTransform(
    scrollYProgress,
    [0.4, 1],
    [0, testimonials.length - 1],
  );

  // Split from middle animation
  const leftSplit = useTransform(
    splitProgress,
    [0, 1],
    [0, -window.innerWidth / 2],
  );
  const rightSplit = useTransform(
    splitProgress,
    [0, 1],
    [0, window.innerWidth / 2],
  );
  const splitScale = useTransform(splitProgress, [0, 1], [1, 2.5]);
  const splitRotate = useTransform(splitProgress, [0, 1], [0, 15]);

  // Fullscreen expansion
  const fullscreenScale = useTransform(fullscreenProgress, [0, 1], [0.3, 1]);
  const fullscreenOpacity = useTransform(fullscreenProgress, [0, 1], [0, 1]);

  // Testimonial cycling with insane effects
  const currentTestimonial = useTransform(testimonialProgress, (latest) =>
    Math.floor(latest),
  );
  const testimonialOffset = useTransform(
    testimonialProgress,
    (latest) => (latest % 1) * 100,
  );

  // Crazy particle effects
  const particleRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const particleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 0]);

  // Update active testimonial
  useEffect(() => {
    const unsubscribe = currentTestimonial.onChange((latest) => {
      setActiveIndex(Math.min(Math.floor(latest), testimonials.length - 1));
    });
    return () => unsubscribe();
  }, [currentTestimonial]);

  // Check if we're in fullscreen mode
  useEffect(() => {
    const unsubscribe = fullscreenProgress.onChange((latest) => {
      setIsFullscreen(latest > 0.5);
    });
    return () => unsubscribe();
  }, [fullscreenProgress]);

  return (
    <section
      id="testimonials"
      className="relative h-[500vh] bg-black overflow-hidden"
      ref={containerRef}
    >
      {/* Insane Particle System */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: particleRotation,
              scale: particleScale,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Sticky Container for Split Animation */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Initial Split Cards */}
        <AnimatePresence>
          {splitProgress.get() < 1 && (
            <>
              {/* Left Split */}
              <motion.div
                className="absolute left-1/2 w-1/2 h-full bg-gradient-to-br from-purple-900 to-purple-800 flex items-center justify-center"
                style={{
                  x: leftSplit,
                  scale: splitScale,
                  rotate: splitRotate,
                  transformOrigin: "right center",
                }}
              >
                <div className="text-center text-white p-12">
                  <motion.div
                    className="text-8xl font-black mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotateY: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    CLIENT
                  </motion.div>
                  <motion.div
                    className="text-2xl opacity-80"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    SUCCESS
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Split */}
              <motion.div
                className="absolute right-1/2 w-1/2 h-full bg-gradient-to-bl from-pink-900 to-pink-800 flex items-center justify-center"
                style={{
                  x: rightSplit,
                  scale: splitScale,
                  rotate: splitRotate,
                  transformOrigin: "left center",
                }}
              >
                <div className="text-center text-white p-12">
                  <motion.div
                    className="text-8xl font-black mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotateY: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  >
                    STORIES
                  </motion.div>
                  <motion.div
                    className="text-2xl opacity-80"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  >
                    REVEALED
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Fullscreen Testimonial Experience */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black"
              style={{
                scale: fullscreenScale,
                opacity: fullscreenOpacity,
              }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {/* Active Testimonial with Insane Transitions */}
              <div className="relative h-full flex items-center justify-center p-20">
                {/* Background Morphing Shapes */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 80%, purple 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 20%, pink 0%, transparent 50%)",
                      "radial-gradient(circle at 40% 40%, blue 0%, transparent 50%)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                {/* Testimonial Content */}
                <motion.div
                  key={activeIndex}
                  className="relative z-10 max-w-6xl text-center"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    rotateX: 90,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.2,
                    rotateX: -90,
                    y: -100,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  {/* Quote with Insane Typography */}
                  <motion.blockquote
                    className="text-4xl md:text-6xl font-light text-white mb-12 leading-relaxed"
                    style={{
                      textShadow: "0 0 30px rgba(255,255,255,0.3)",
                    }}
                    animate={{
                      textShadow: [
                        "0 0 30px rgba(255,255,255,0.3)",
                        "0 0 50px rgba(138,43,226,0.5)",
                        "0 0 30px rgba(255,105,180,0.4)",
                        "0 0 30px rgba(255,255,255,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    "{testimonials[activeIndex]?.text}"
                  </motion.blockquote>

                  {/* Author Info with 3D Effect */}
                  <motion.div
                    className="flex items-center justify-center gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {/* Avatar with Crazy Border */}
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
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold relative">
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-white/50"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        {testimonials[activeIndex]?.author
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                    </motion.div>

                    {/* Author Details */}
                    <div className="text-left">
                      <motion.h3
                        className="text-3xl font-bold text-white mb-2"
                        animate={{
                          backgroundPosition: ["0%", "100%"],
                        }}
                        style={{
                          background:
                            "linear-gradient(90deg, #fff, #a855f7, #ec4899, #fff)",
                          backgroundSize: "200% 100%",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {testimonials[activeIndex]?.author}
                      </motion.h3>
                      <p className="text-purple-300 text-xl">
                        {testimonials[activeIndex]?.role}
                      </p>
                      <p className="text-pink-300 text-lg font-semibold">
                        {testimonials[activeIndex]?.company}
                      </p>
                    </div>
                  </motion.div>

                  {/* Project Type Badge */}
                  <motion.div
                    className="mt-8 inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(138,43,226,0.3)",
                        "0 0 40px rgba(255,105,180,0.4)",
                        "0 0 20px rgba(138,43,226,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <span className="text-white font-semibold">
                      {testimonials[activeIndex]?.project}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Progress Indicator with Insane Design */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-4">
                    {testimonials.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 ${
                          index === activeIndex
                            ? "bg-white border-white"
                            : "bg-transparent border-white/50"
                        }`}
                        animate={
                          index === activeIndex
                            ? {
                                scale: [1, 1.5, 1],
                                rotate: [0, 360],
                                boxShadow: [
                                  "0 0 0px rgba(255,255,255,0.5)",
                                  "0 0 20px rgba(255,255,255,0.8)",
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
                </div>

                {/* Floating Elements */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-50"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0],
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
            </motion.div>
          )}
        </AnimatePresence>
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
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: 0.8 + index * 0.15,
        duration: 0.8,
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
      <p className="text-white text-sm leading-relaxed mb-6">
        "{testimonial.text}"
      </p>

      {/* Video Thumbnail */}
      {testimonial.videoThumbnail && (
        <div className="mb-4">
          <motion.div
            className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform"
            onClick={() => setIsVideoOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
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
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
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
