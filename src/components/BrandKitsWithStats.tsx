import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  MoreHorizontal,
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Zap,
} from "lucide-react";

// Cloud icon component with customizable color
const CloudIcon = ({ color }: { color: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5 12.5C19.88 12.5 21 13.62 21 15S19.88 17.5 18.5 17.5H6C4.35 17.5 3 16.15 3 14.5S4.35 11.5 6 11.5C6.35 10.13 7.59 9 9.1 9C10.05 7.3 11.85 6 14 6C16.76 6 19.1 7.93 19.6 10.5C19.7 10.5 19.8 10.5 19.9 10.5C21.15 10.5 22.2 11.4 22.2 12.5"
      fill={color}
    />
  </svg>
);

interface BrandKit {
  id: string;
  name: string;
  iconColor: string;
  isSelected: boolean;
}

interface MetricData {
  year: string;
  value: number;
  percentage: number;
}

interface PortfolioMetric {
  title: string;
  unit: string;
  currentValue: string;
  changePercent: string;
  changeYear: string;
  isPositive: boolean;
  data: MetricData[];
  icon: React.ReactNode;
}

const BrandKitsWithStats = () => {
  const [activeView, setActiveView] = useState<"brands" | "stats">("brands");
  const [brandKits, setBrandKits] = useState<BrandKit[]>([
    {
      id: "pixel-studio",
      name: "Pixel Studio",
      iconColor: "#10B981", // green-500
      isSelected: false,
    },
    {
      id: "design-lab",
      name: "Design Lab",
      iconColor: "#F59E0B", // amber-500
      isSelected: false,
    },
    {
      id: "agency",
      name: "The Agency",
      iconColor: "#EF4444", // red-500
      isSelected: true,
    },
    {
      id: "creative-co",
      name: "Creative Co",
      iconColor: "#8B5CF6", // purple-500
      isSelected: false,
    },
  ]);

  const metrics: PortfolioMetric[] = [
    {
      title: "Active Projects",
      unit: "projects",
      currentValue: "127",
      changePercent: "+24%",
      changeYear: "from last month",
      isPositive: true,
      icon: <BarChart3 className="w-5 h-5" />,
      data: [
        { year: "Nov", value: 127, percentage: 100 },
        { year: "Oct", value: 102, percentage: 80 },
        { year: "Sep", value: 89, percentage: 70 },
        { year: "Aug", value: 76, percentage: 60 },
      ],
    },
    {
      title: "Client Satisfaction",
      unit: "%",
      currentValue: "98.5",
      changePercent: "+2.1%",
      changeYear: "from last quarter",
      isPositive: true,
      icon: <Users className="w-5 h-5" />,
      data: [
        { year: "Q4", value: 98.5, percentage: 100 },
        { year: "Q3", value: 96.4, percentage: 98 },
        { year: "Q2", value: 94.8, percentage: 96 },
        { year: "Q1", value: 91.2, percentage: 93 },
      ],
    },
    {
      title: "Revenue Growth",
      unit: "k",
      currentValue: "342.7",
      changePercent: "+18%",
      changeYear: "from last year",
      isPositive: true,
      icon: <Zap className="w-5 h-5" />,
      data: [
        { year: "2024", value: 342.7, percentage: 100 },
        { year: "2023", value: 290.2, percentage: 85 },
        { year: "2022", value: 245.8, percentage: 72 },
        { year: "2021", value: 198.4, percentage: 58 },
      ],
    },
  ];

  const toggleSelection = (id: string) => {
    setBrandKits((prev) =>
      prev.map((kit) =>
        kit.id === id ? { ...kit, isSelected: !kit.isSelected } : kit,
      ),
    );
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "k" && value > 1000) {
      return (value / 1000).toFixed(1) + "M";
    }
    return value.toLocaleString();
  };

  const selectedBrands = brandKits.filter((kit) => kit.isSelected);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Brand Portfolio Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Manage your brand collections and track performance metrics in one
            unified interface
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView("brands")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeView === "brands"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                Brand Kits
              </button>
              <button
                onClick={() => setActiveView("stats")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeView === "stats"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                Performance Stats
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Always show selected brands summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Active Brands
              </h3>

              {selectedBrands.length > 0 ? (
                <div className="space-y-4">
                  {selectedBrands.map((kit) => (
                    <motion.div
                      key={kit.id}
                      className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <CloudIcon color={kit.iconColor} />
                      <span className="text-white font-medium">{kit.name}</span>
                      <div
                        className="w-3 h-3 rounded-full ml-auto"
                        style={{ backgroundColor: kit.iconColor }}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CloudIcon color="#6B7280" />
                  </div>
                  <p className="text-gray-400">No brands selected</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Select brands to see them here
                  </p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {selectedBrands.length}
                    </div>
                    <div className="text-xs text-gray-400">Selected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {brandKits.length}
                    </div>
                    <div className="text-xs text-gray-400">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Main Content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {activeView === "brands" ? (
                <motion.div
                  key="brands"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                    <h2 className="text-white text-2xl font-semibold mb-6">
                      Brand Kit Management
                    </h2>

                    <div className="grid gap-4">
                      {brandKits.map((kit, index) => (
                        <motion.div
                          key={kit.id}
                          className="bg-gray-700/30 border border-gray-600 rounded-xl p-4 flex items-center justify-between hover:bg-gray-600/40 transition-all cursor-pointer group"
                          onClick={() => toggleSelection(kit.id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-4">
                            {/* Enhanced Checkbox */}
                            <div className="relative">
                              <motion.div
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                  kit.isSelected
                                    ? "bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/25"
                                    : "border-gray-500 hover:border-purple-400"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <AnimatePresence>
                                  {kit.isSelected && (
                                    <motion.div
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0, opacity: 0 }}
                                    >
                                      <Check
                                        className="w-4 h-4 text-white"
                                        strokeWidth={3}
                                      />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            </div>

                            {/* Enhanced Cloud icon with glow */}
                            <div className="relative">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                style={{
                                  filter: kit.isSelected
                                    ? `drop-shadow(0 0 8px ${kit.iconColor}40)`
                                    : "none",
                                }}
                              >
                                <CloudIcon color={kit.iconColor} />
                              </motion.div>
                            </div>

                            {/* Brand name with status */}
                            <div>
                              <span className="text-white text-lg font-medium group-hover:text-purple-300 transition-colors">
                                {kit.name}
                              </span>
                              {kit.isSelected && (
                                <div className="text-purple-400 text-sm font-medium">
                                  Active
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Settings menu with enhanced styling */}
                          <motion.button
                            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-600/50"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400">
                            {metric.icon}
                          </div>
                          <h3 className="text-gray-300 text-sm font-medium leading-relaxed">
                            {metric.title}
                          </h3>
                        </div>

                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="text-3xl font-bold text-white">
                            {metric.currentValue}
                          </span>
                          <span className="text-sm text-gray-400 font-medium">
                            {metric.unit}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                              metric.isPositive
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {metric.isPositive ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            <span className="text-sm font-semibold">
                              {metric.changePercent}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">
                            {metric.changeYear}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Chart */}
                      <div className="space-y-4 mb-6">
                        {metric.data.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.1 + itemIndex * 0.05,
                            }}
                          >
                            <span className="text-sm text-gray-400 w-10 font-mono">
                              {item.year}
                            </span>
                            <div className="flex-1 relative">
                              <div className="w-full bg-gray-700/50 h-3 rounded-full overflow-hidden">
                                <motion.div
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-700 ease-out rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${Math.min(item.percentage, 100)}%`,
                                  }}
                                  transition={{
                                    delay: index * 0.1 + itemIndex * 0.1 + 0.5,
                                  }}
                                />
                              </div>
                            </div>
                            <span className="text-sm text-white font-semibold w-20 text-right font-mono">
                              {formatValue(item.value, metric.unit)}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Enhanced Download button */}
                      <motion.button
                        className="flex items-center gap-3 text-sm text-gray-400 hover:text-purple-400 transition-all group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Download detailed report</span>
                        <div className="w-8 h-8 border border-gray-600 group-hover:border-purple-400 rounded-lg flex items-center justify-center transition-all group-hover:bg-purple-500/10">
                          <Download className="w-4 h-4" />
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrandKitsWithStats;
