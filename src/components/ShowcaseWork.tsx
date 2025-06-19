import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  FolderOpen,
  X,
  ExternalLink,
  Calendar,
  Users,
  Award,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  tags: string[];
  image: string;
  number: string;
  description: string;
  client: string;
  year: string;
  duration: string;
  team: string[];
  results: string[];
  category: string;
}

const ShowcaseWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "PIXEL STUDIO BRAND IDENTITY",
      tags: ["BRANDING", "DESIGN", "IDENTITY"],
      image:
        "https://images.pexels.com/photos/4466115/pexels-photo-4466115.jpeg",
      number: "01",
      description:
        "Complete brand transformation for a cutting-edge design studio, including logo design, visual identity system, and brand guidelines that positioned them as industry leaders.",
      client: "Pixel Studio",
      year: "2024",
      duration: "3 months",
      team: ["Sarah Chen", "Marcus Johnson", "Emma Rodriguez"],
      results: [
        "300% increase in client inquiries",
        "Featured in Design Week",
        "Won Best Rebrand Award 2024",
      ],
      category: "Brand Identity",
    },
    {
      id: 2,
      title: "CREATIVE TEAM COLLABORATION HUB",
      tags: ["DIGITAL", "WORKSPACE", "INNOVATION"],
      image:
        "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg",
      number: "02",
      description:
        "Designed and developed a revolutionary collaboration platform that connects creative teams worldwide, featuring real-time collaboration tools and project management.",
      client: "CollabSpace",
      year: "2024",
      duration: "6 months",
      team: ["David Park", "Lisa Thompson", "James Wilson"],
      results: [
        "10,000+ active users in first month",
        "85% user retention rate",
        "$2M seed funding raised",
      ],
      category: "Digital Platform",
    },
    {
      id: 3,
      title: "MODERN DESIGN WORKSPACE",
      tags: ["STUDIO", "CREATIVE", "ENVIRONMENT"],
      image:
        "https://images.pexels.com/photos/7238759/pexels-photo-7238759.jpeg",
      number: "03",
      description:
        "Architectural and interior design project for a modern creative workspace that fosters innovation and collaboration among designers and developers.",
      client: "Future Works",
      year: "2023",
      duration: "4 months",
      team: ["Emma Rodriguez", "Sarah Chen"],
      results: [
        "50% increase in productivity",
        "Best Workspace Design Award",
        "Featured in Architectural Digest",
      ],
      category: "Space Design",
    },
    {
      id: 4,
      title: "LUXURY BRAND EXPERIENCE",
      tags: ["PREMIUM", "BRANDING", "LIFESTYLE"],
      image:
        "https://images.pexels.com/photos/3989394/pexels-photo-3989394.jpeg",
      number: "04",
      description:
        "Luxury fragrance brand development including packaging design, retail experience, and digital marketing strategy that elevated the brand to premium market positioning.",
      client: "Essence Luxe",
      year: "2023",
      duration: "5 months",
      team: ["Marcus Johnson", "David Park", "Lisa Thompson"],
      results: [
        "200% increase in brand value",
        "International market expansion",
        "Celebrity endorsements secured",
      ],
      category: "Luxury Branding",
    },
    {
      id: 5,
      title: "STRATEGIC PLANNING SESSION",
      tags: ["STRATEGY", "TEAM", "INNOVATION"],
      image:
        "https://images.pexels.com/photos/6248976/pexels-photo-6248976.jpeg",
      number: "05",
      description:
        "Comprehensive brand strategy workshop and planning session that transformed how teams approach creative problem-solving and brand development.",
      client: "Innovation Labs",
      year: "2024",
      duration: "2 months",
      team: ["Sarah Chen", "Emma Rodriguez", "James Wilson"],
      results: [
        "40% faster project delivery",
        "90% client satisfaction",
        "New methodology adopted industry-wide",
      ],
      category: "Strategy Consulting",
    },
  ];

  // Calculate horizontal movement
  const projectsCount = projects.length;
  const totalWidth = projectsCount * 100; // 100vw per project
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalWidth - 100)],
  );

  // Background numbers parallax (slower movement)
  const numbersXTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalWidth - 100) * 0.5],
  );

  // Update current project based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const projectIndex = Math.floor(latest * projectsCount);
      setCurrentProject(Math.min(projectIndex, projectsCount - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress, projectsCount]);

  return (
    <div ref={containerRef} className="relative">
      {/* Main section with increased height for scroll range */}
      <div className="h-[400vh] bg-[#E60023]">
        {/* Pinned content container */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background Numbers */}
          <motion.div
            style={{ x: numbersXTransform }}
            className="absolute inset-0 flex items-center justify-end pr-20 z-10"
          >
            <div className="flex space-x-[100vw]">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="flex-shrink-0 w-[100vw] flex justify-end items-center pr-32"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: currentProject === index ? 1 : 0.3,
                    scale: currentProject === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <span
                    className="text-[20rem] font-black text-white select-none"
                    style={{
                      WebkitTextStroke: "3px white",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "Impact, Arial Black, sans-serif",
                    }}
                  >
                    {project.number}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main content - Projects */}
          <motion.div
            style={{ x: xTransform }}
            className="absolute inset-0 flex z-20"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-screen h-full flex items-center px-16 lg:px-24"
              >
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {/* Left side - Text content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                      opacity: currentProject === index ? 1 : 0,
                      x: currentProject === index ? 0 : -50,
                    }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                  >
                    {/* Title */}
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight uppercase">
                      {project.title}
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-2 text-sm font-semibold text-white uppercase tracking-wide border-2 border-white rounded-lg bg-transparent hover:bg-white hover:text-[#E60023] transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <motion.button
                        onClick={() =>
                          setSelectedProject(projects[currentProject])
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-white text-[#E60023] font-black px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 border-2 border-white text-white font-black px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-white hover:text-[#E60023] transition-colors duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Site</span>
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Right side - Project image */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{
                      opacity: currentProject === index ? 1 : 0,
                      x: currentProject === index ? 0 : 50,
                      scale: currentProject === index ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-background/40 group-hover:bg-background/60 transition-colors duration-300 flex flex-col justify-between p-6">
                        <div className="flex justify-between items-start">
                          <div className="text-white">
                            <div className="text-lg font-bold mb-1">
                              {project.client}
                            </div>
                            <div className="text-sm opacity-80">
                              {project.year} • {project.category}
                            </div>
                          </div>
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ExternalLink className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        <div className="text-white">
                          <div className="text-sm font-semibold mb-2 opacity-80">
                            PROJECT {project.number}
                          </div>
                          <div className="text-xs opacity-60 mb-2">
                            {project.tags.join(" • ")}
                          </div>
                          <div className="text-xs opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                            Click to view details
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Sticky "View All Cases" Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <motion.button
              onClick={() => setShowAllProjects(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-xl uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <FolderOpen className="w-5 h-5" />
              <span>View All Cases</span>
            </motion.button>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex space-x-3">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentProject === index
                      ? "bg-white scale-125"
                      : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-background/50 rounded-full flex items-center justify-center text-foreground hover:bg-background/70 transition-colors backdrop-blur-sm border border-border"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <div className="text-sm font-semibold mb-1">
                    PROJECT {selectedProject.number}
                  </div>
                  <div className="text-2xl font-bold">
                    {selectedProject.client}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedProject.title}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Year</div>
                      <div className="font-semibold">
                        {selectedProject.year}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-semibold">
                        {selectedProject.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Category</div>
                      <div className="font-semibold">
                        {selectedProject.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Project Overview
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Team */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Team Members
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.team.map((member, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-purple-100 text-purple-700 font-medium rounded-lg"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Key Results
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all">
                    View Live Site
                  </button>
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all">
                    Download Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Projects Gallery Modal */}
      <AnimatePresence>
        {showAllProjects && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllProjects(false)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    All Projects
                  </h2>
                  <button
                    onClick={() => setShowAllProjects(false)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="group cursor-pointer"
                      onClick={() => {
                        setShowAllProjects(false);
                        setSelectedProject(project);
                      }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 mb-2">
                          {project.client}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {project.category}
                        </p>
                        <div className="flex justify-center gap-1">
                          {project.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowcaseWork;
