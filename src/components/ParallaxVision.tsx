import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";

const ParallaxVision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values for different parallax layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 1, 0.5, 0],
  );
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Thumbnail images for the bottom reel
  const thumbnails = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-lg overflow-hidden"
    >
      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
    </div>
  ));

  return (
    <div className="relative">
      {/* Parallax Section */}
      <div
        ref={containerRef}
        className="relative h-[200vh] overflow-hidden bg-background"
      >
        {/* Background Layer - Room Image */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-gray-800 to-gray-900">
            {/* Placeholder for room image - replace with actual image */}
            <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-200 to-amber-300 opacity-60">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              {/* Chair and table silhouettes */}
              <div className="absolute bottom-1/4 right-1/3 w-16 h-24 bg-black/30 rounded-t-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-8 bg-black/20 rounded-lg" />
            </div>
          </div>
        </motion.div>

        {/* Mid-ground Layer - Girl Image */}
        <motion.div
          style={{ y: midgroundY }}
          className="absolute left-0 top-0 w-1/2 h-full"
        >
          {/* Placeholder for girl image - replace with actual image */}
          <div className="w-full h-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            {/* Girl silhouette */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-black/20 rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-40 h-48 bg-black/15 rounded-t-full" />

            {/* UI overlay elements - Los Angeles timestamp */}
            <div className="absolute bottom-8 left-8 bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-border">
              <div className="text-foreground text-sm font-medium">
                Los Angeles
              </div>
              <div className="text-muted-foreground text-xs">May 5 1:56 PM</div>
            </div>
          </div>
        </motion.div>

        {/* Foreground Layer - Text Content */}
        <motion.div
          style={{
            y: foregroundY,
            opacity: textOpacity,
            scale: textScale,
          }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="text-center text-foreground max-w-2xl px-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm uppercase tracking-wider text-muted-foreground mb-4"
            >
              Connection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Share quality time. <span className="block">And space.</span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Bottom Reel - Photo Thumbnails */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex space-x-3 bg-background/30 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
            {thumbnails}
          </div>
        </motion.div>

        {/* Gradient overlay for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-30" />
      </div>

      {/* Transition Section - New Content */}
      <section className="relative bg-background py-20 px-8 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              A more engaging way to get together.
            </h2>

            <div className="max-w-3xl">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Apple Vision Pro makes it easy to collaborate and connect
                wherever you are. You can see FaceTime participants in life-size
                video tiles, or you can choose to use your spatial Persona and
                feel like you are sharing the same space with others. And use
                SharePlay to watch, listen, and play together with your favorite
                people.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Learn more about connection</span>
              <Plus className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ParallaxVision;
