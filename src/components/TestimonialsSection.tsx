import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "This platform completely transformed my Amazon business. The review automation saved me hours of manual work and increased my response rate by 300%. I've seen a significant boost in sales since implementing their system.",
    author: "Watchchem - UK Amazon Seller",
    videoThumbnail: true,
  },
  {
    id: 2,
    text: "As a new seller, I was overwhelmed with managing reviews and customer feedback. Happy Sellers made it so simple and intuitive. Their analytics dashboard gives me insights I never had before. Highly recommended!",
    author: "Sophie Wilson - USA Amazon Seller",
    videoThumbnail: false,
  },
  {
    id: 3,
    text: "The customer support is exceptional, and the automation features are exactly what I needed to scale my business. I'm now managing 10x more orders with the same effort. The ROI has been incredible.",
    author: "Emily James - USA Amazon Seller",
    videoThumbnail: true,
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

  return (
    <section
      id="testimonials"
      className="relative min-h-screen testimonials-gradient overflow-hidden"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>

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
