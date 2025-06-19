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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-gradient-to-br from-deep-purple-900/95 via-deep-purple-800/95 to-deep-purple-700/95 overflow-hidden backdrop-blur-sm"
      ref={ref}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 blob-shape"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 blob-shape"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/4 blob-shape"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
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
          <motion.p
            className="text-light-purple text-lg font-medium mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Customer Testimonials
          </motion.p>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">
            {isInView && <TypewriterText text="Happy Sellers" delay={500} />}
          </h1>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ y }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-card-purple rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.8 + index * 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Testimonial Text */}
              <p className="text-white text-lg leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Video Thumbnail */}
              {testimonial.videoThumbnail && (
                <div className="mb-6">
                  <div className="relative w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors cursor-pointer">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}

              {/* Attribution */}
              <div className="flex items-center text-gray-300">
                <span className="w-2 h-2 bg-white rounded-full mr-3" />
                <span className="text-sm font-medium">
                  {testimonial.author}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional testimonials hint */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p className="text-light-purple text-lg">
            Join thousands of happy sellers who trust our platform
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
