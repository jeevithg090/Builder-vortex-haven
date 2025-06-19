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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Split animation transforms
  const leftColumnY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightColumnY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const centerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const leftTestimonials = testimonials.filter((_, index) => index % 2 === 0);
  const rightTestimonials = testimonials.filter((_, index) => index % 2 === 1);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500"></div>
            <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold tracking-wider uppercase">
              <Award className="w-4 h-4" />
              Client Success Stories
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {isInView && (
              <TypewriterText text="Trusted by Industry Leaders" delay={500} />
            )}
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. See what our clients say about
            their transformative experiences with The Agency.
          </p>
        </motion.div>

        {/* Split Layout Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <motion.div className="space-y-8" style={{ y: leftColumnY }}>
            {leftTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index * 2}
                isInView={isInView}
                isActive={activeIndex === index * 2}
              />
            ))}
          </motion.div>

          {/* Center Stats */}
          <motion.div
            className="flex flex-col items-center justify-center space-y-12 py-12"
            style={{ scale: centerScale }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                <Users className="w-16 h-16 text-white" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">150+</div>
              <div className="text-gray-300 font-medium">Happy Clients</div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div>
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-gray-400">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">250%</div>
                <div className="text-sm text-gray-400">Avg. Growth</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">5★</div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24h</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div className="space-y-8" style={{ y: rightColumnY }}>
            {rightTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index * 2 + 1}
                isInView={isInView}
                isActive={activeIndex === index * 2 + 1}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-purple-100 mb-6">
              Let's create something amazing together
            </p>
            <motion.button
              className="bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
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
