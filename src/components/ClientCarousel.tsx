import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Handshake } from "lucide-react";

interface ClientImage {
  id: number;
  primary: string;
  secondary: string;
  alt: string;
  title: string;
  description: string;
}

const clientImages: ClientImage[] = [
  {
    id: 1,
    primary:
      "https://images.pexels.com/photos/8293753/pexels-photo-8293753.jpeg",
    secondary:
      "https://images.pexels.com/photos/7731402/pexels-photo-7731402.jpeg",
    alt: "Helping clients with real estate consultation",
    title: "Real Estate Consultation",
    description: "Guiding clients through their property investment journey",
  },
  {
    id: 2,
    primary:
      "https://images.pexels.com/photos/3811082/pexels-photo-3811082.jpeg",
    secondary:
      "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg",
    alt: "Team collaboration and client support",
    title: "Strategic Collaboration",
    description: "Working closely with our clients to achieve their goals",
  },
];

const ClientCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % clientImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + clientImages.length) % clientImages.length,
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-semibold tracking-wider uppercase">
              <Users className="w-4 h-4" />
              Client Success
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            How We Help Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Amazing Clients
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience our dedication to client success through immersive
            visuals. Hover over the images to see our collaborative process in
            action.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <motion.div
          ref={carouselRef}
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Main Carousel */}
          <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {clientImages.map((image, index) => {
                  const displayIndex =
                    (currentIndex + index) % clientImages.length;
                  const currentImage = clientImages[displayIndex];

                  return (
                    <motion.div
                      key={`${displayIndex}-${index}`}
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(displayIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image Container with Hover Swap */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={
                              hoveredIndex === displayIndex
                                ? "secondary"
                                : "primary"
                            }
                            src={
                              hoveredIndex === displayIndex
                                ? currentImage.secondary
                                : currentImage.primary
                            }
                            alt={currentImage.alt}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                          />
                        </AnimatePresence>

                        {/* Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                          initial={{ opacity: 0.6 }}
                          whileHover={{ opacity: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Content Overlay */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 p-6 text-white"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <motion.div
                            className="flex items-center gap-2 mb-3"
                            whileHover={{ x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Handshake className="w-5 h-5 text-purple-400" />
                            <span className="text-sm font-semibold uppercase tracking-wider text-purple-300">
                              Client Story
                            </span>
                          </motion.div>

                          <motion.h3
                            className="text-2xl font-bold mb-2"
                            animate={
                              hoveredIndex === displayIndex
                                ? {
                                    textShadow:
                                      "0 0 20px rgba(168, 85, 247, 0.5)",
                                  }
                                : {}
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {currentImage.title}
                          </motion.h3>

                          <motion.p
                            className="text-gray-300 text-sm leading-relaxed"
                            initial={{ opacity: 0.8 }}
                            animate={{
                              opacity: hoveredIndex === displayIndex ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {currentImage.description}
                          </motion.p>

                          {/* Hover Indicator */}
                          <motion.div
                            className="mt-4 text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ y: 10 }}
                            animate={{
                              y: hoveredIndex === displayIndex ? 0 : 10,
                            }}
                          >
                            {hoveredIndex === displayIndex
                              ? "Viewing collaboration moment"
                              : "Hover to see more"}
                          </motion.div>
                        </motion.div>

                        {/* Hover Effect Border */}
                        <motion.div
                          className="absolute inset-0 border-4 border-purple-500/0 rounded-2xl pointer-events-none"
                          animate={{
                            borderColor:
                              hoveredIndex === displayIndex
                                ? "rgba(168, 85, 247, 0.6)"
                                : "rgba(168, 85, 247, 0)",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {clientImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-500 shadow-lg shadow-purple-500/50"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  index === currentIndex
                    ? {
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 0px rgba(168, 85, 247, 0.5)",
                          "0 0 15px rgba(168, 85, 247, 0.8)",
                          "0 0 0px rgba(168, 85, 247, 0.5)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: index === currentIndex ? Infinity : 0,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support Available" },
            { number: "10+", label: "Years Experience" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-purple-600 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientCarousel;
