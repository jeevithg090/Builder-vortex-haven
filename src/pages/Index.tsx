import {
  Suspense,
  useCallback,
  useEffect,
  useState,
  type ComponentType,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import { lazyWithPreload } from "@/lib/lazyWithPreload";
import type { SectionId } from "@/lib/navigation";
import { usePageTitle } from "@/lib/usePageTitle";

// Everything below the hero is split into its own chunks and fetched while
// the intro loader plays, keeping the initial bundle small.
const RippleEffect = lazyWithPreload(() => import("@/components/RippleEffect"));
const TestimonialsSection = lazyWithPreload(
  () => import("@/components/TestimonialsSection"),
);
const ClientCarousel = lazyWithPreload(
  () => import("@/components/ClientCarousel"),
);
const PricingSection = lazyWithPreload(
  () => import("@/components/PricingSection"),
);
const ScrollVideoSection = lazyWithPreload(
  () => import("@/components/ScrollVideoSection"),
);
const BrandKitsWithStats = lazyWithPreload(
  () => import("@/components/BrandKitsWithStats"),
);
const ParallaxVision = lazyWithPreload(
  () => import("@/components/ParallaxVision"),
);
const ShowcaseWork = lazyWithPreload(() => import("@/components/ShowcaseWork"));
const TeamAboutSection = lazyWithPreload(
  () => import("@/components/TeamAboutSection"),
);
const StrikingBackground = lazyWithPreload(
  () => import("@/components/StrikingBackground"),
);
const ContactSection = lazyWithPreload(
  () => import("@/components/ContactSection"),
);
const EnhancedFooter = lazyWithPreload(
  () => import("@/components/EnhancedFooter"),
);

const LAZY_PARTS = [
  RippleEffect,
  TestimonialsSection,
  ClientCarousel,
  PricingSection,
  ScrollVideoSection,
  BrandKitsWithStats,
  ParallaxVision,
  ShowcaseWork,
  TeamAboutSection,
  StrikingBackground,
  ContactSection,
  EnhancedFooter,
];

/** Placeholder shown if a section's chunk is still downloading. */
const SectionFallback = () => (
  <div
    role="status"
    aria-label="Loading section"
    className="flex min-h-[50vh] items-center justify-center bg-background"
  >
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-brand-purple" />
  </div>
);

/** Content sections rendered after the hero, in page order. */
const CONTENT_SECTIONS: ReadonlyArray<{
  id: Exclude<SectionId, "home">;
  Component: ComponentType;
}> = [
  { id: "testimonials", Component: TestimonialsSection },
  { id: "client-stories", Component: ClientCarousel },
  { id: "pricing", Component: PricingSection },
  { id: "video", Component: ScrollVideoSection },
  { id: "brandkits-stats", Component: BrandKitsWithStats },
  { id: "vision", Component: ParallaxVision },
  { id: "showcase", Component: ShowcaseWork },
  { id: "team-about", Component: TeamAboutSection },
  { id: "interactive", Component: StrikingBackground },
  { id: "contact", Component: ContactSection },
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  usePageTitle();

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Failed preloads are retried (and surfaced) when the section renders.
    LAZY_PARTS.forEach((part) => part.preload().catch(() => undefined));
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onLoadComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Ripple Effect Background */}
          <Suspense fallback={null}>
            <RippleEffect />
          </Suspense>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
            >
              Skip to content
            </a>

            {/* Navigation */}
            <Navigation />

            <main id="main-content" tabIndex={-1} className="outline-none">
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
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                      Welcome to
                      <br />
                      <span className="text-light-purple">The Agency</span>
                    </h1>

                    <motion.p
                      className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto px-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      Transform your brand with innovative design strategies and
                      creative solutions that drive meaningful connections
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <motion.a
                        href="#contact"
                        className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start Your Project
                      </motion.a>

                      <motion.a
                        href="#testimonials"
                        className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Our Work
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                  aria-hidden="true"
                  className="absolute bottom-8 inset-x-0 mx-auto w-fit z-10"
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
              </section>

              {CONTENT_SECTIONS.map(({ id, Component }) => (
                <section key={id} id={id} className="scroll-mt-16">
                  <Suspense fallback={<SectionFallback />}>
                    <Component />
                  </Suspense>
                </section>
              ))}
            </main>

            {/* Enhanced Footer */}
            <Suspense fallback={null}>
              <EnhancedFooter />
            </Suspense>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Index;
