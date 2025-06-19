import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import RippleEffect from "@/components/RippleEffect";
import ScrollVideoSection from "@/components/ScrollVideoSection";
import BrandKits from "@/components/BrandKits";
import PortfolioStats from "@/components/PortfolioStats";
import ParallaxVision from "@/components/ParallaxVision";
import ShowcaseWork from "@/components/ShowcaseWork";
import StrikingBackground from "@/components/StrikingBackground";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onLoadComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Ripple Effect Background */}
          <RippleEffect />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation */}
            <Navigation />

            {/* Hero Section */}
            <section
              id="home"
              className="relative min-h-screen bg-gradient-to-br from-deep-purple-900/95 via-deep-purple-800/95 to-deep-purple-700/95 backdrop-blur-sm flex items-center justify-center overflow-hidden"
            >
              {/* Animated background blobs */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-1/3 left-1/5 w-96 h-96 bg-white/5 blob-shape"
                  animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-white/3 blob-shape"
                  animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                    Welcome to
                    <br />
                    <span className="text-light-purple">Happy Sellers</span>
                  </h1>

                  <motion.p
                    className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    Transform your Amazon business with powerful review
                    automation and analytics that drive real results
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <motion.a
                      href="#pricing"
                      className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started Today
                    </motion.a>

                    <motion.a
                      href="#testimonials"
                      className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      See Success Stories
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <motion.div
                    className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className="w-1 h-3 bg-white rounded-full mt-2"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials">
              <TestimonialsSection />
            </section>

            {/* Pricing Section */}
            <section id="pricing">
              <PricingSection />
            </section>

            {/* Video Section */}
            <section id="video">
              <ScrollVideoSection />
            </section>

            {/* Brand Kits Section */}
            <section id="brandkits" className="py-20">
              <BrandKits />
            </section>

            {/* Portfolio Stats Section */}
            <section id="stats">
              <PortfolioStats />
            </section>

            {/* Parallax Vision Section */}
            <section id="vision">
              <ParallaxVision />
            </section>

            {/* Showcase Work Section */}
            <section id="showcase">
              <ShowcaseWork />
            </section>

            {/* Interactive Background Section */}
            <section id="interactive">
              <StrikingBackground />
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <motion.h3
                    className="text-2xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Happy Sellers
                  </motion.h3>

                  <motion.p
                    className="text-gray-400 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Empowering Amazon sellers with intelligent automation
                  </motion.p>

                  <motion.div
                    className="flex justify-center space-x-8 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact Us
                    </a>
                  </motion.div>

                  <motion.p
                    className="text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    © 2024 Happy Sellers. All rights reserved.
                  </motion.p>
                </div>
              </div>
            </footer>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Index;
