import { Download, TrendingUp, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

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
  data: MetricData[];
  isPositive: boolean;
  icon: React.ReactNode;
}

const PortfolioStats = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const metrics: PortfolioMetric[] = [
    {
      title: "Managed client brand value",
      unit: "USD",
      currentValue: "24,500,000",
      changePercent: "45%",
      changeYear: "from 2021",
      isPositive: true,
      icon: <DollarSign className="w-5 h-5" />,
      data: [
        { year: "2024", value: 24500000, percentage: 100 },
        { year: "2023", value: 18200000, percentage: 74 },
        { year: "2022", value: 14800000, percentage: 60 },
        { year: "2021", value: 16900000, percentage: 69 },
      ],
    },
    {
      title: "Client portfolio growth rate",
      unit: "%",
      currentValue: "287",
      changePercent: "67%",
      changeYear: "from 2021",
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5" />,
      data: [
        { year: "2024", value: 287, percentage: 100 },
        { year: "2023", value: 245, percentage: 85 },
        { year: "2022", value: 198, percentage: 69 },
        { year: "2021", value: 172, percentage: 60 },
      ],
    },
    {
      title: "Active client partnerships",
      unit: "clients",
      currentValue: "156",
      changePercent: "34%",
      changeYear: "from 2021",
      isPositive: true,
      icon: <Users className="w-5 h-5" />,
      data: [
        { year: "2024", value: 156, percentage: 100 },
        { year: "2023", value: 134, percentage: 86 },
        { year: "2022", value: 108, percentage: 69 },
        { year: "2021", value: 116, percentage: 74 },
      ],
    },
  ];

  const formatValue = (value: number, unit: string) => {
    if (unit === "USD" && value > 1000000) {
      return (value / 1000000).toFixed(0) + "M";
    }
    if (unit === "clients") {
      return value.toString();
    }
    return value.toLocaleString();
  };

  return (
    <div
      className={`min-h-screen py-16 px-8 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Portfolio Performance
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Track our agency's growth and client success metrics across all
            managed brand portfolios
          </p>
        </motion.div>

        {/* Metrics Grid - Exact layout from image */}
        <div
          className={`rounded-2xl p-8 shadow-lg border transition-colors duration-300 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Header - Exact styling from image */}
                <div className="mb-8">
                  {/* Title with icon */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isDark
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {metric.icon}
                    </div>
                    <h3
                      className={`text-sm font-normal leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {metric.title}
                    </h3>
                  </div>

                  {/* Main value and unit */}
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className={`text-4xl font-light ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {metric.currentValue}
                    </span>
                    <span
                      className={`text-xs font-normal ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {metric.unit}
                    </span>
                  </div>

                  {/* Change indicator */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {metric.changeYear}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        metric.isPositive
                          ? isDark
                            ? "text-green-400"
                            : "text-green-600"
                          : isDark
                            ? "text-red-400"
                            : "text-red-600"
                      }`}
                    >
                      +{metric.changePercent}
                    </span>
                  </div>
                </div>

                {/* Progress bars - Exact styling from image */}
                <div className="space-y-4 mb-8">
                  {metric.data.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.2 + itemIndex * 0.1,
                        duration: 0.5,
                      }}
                      viewport={{ once: true }}
                    >
                      {/* Year */}
                      <span
                        className={`text-xs w-8 font-medium ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {item.year}
                      </span>

                      {/* Progress bar */}
                      <div className="flex-1 relative">
                        <div
                          className={`w-full h-2 rounded-full overflow-hidden ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <motion.div
                            className={`h-full transition-all duration-700 ease-out rounded-full ${
                              isDark
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : "bg-gradient-to-r from-purple-600 to-pink-600"
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${Math.min(item.percentage, 100)}%`,
                            }}
                            transition={{
                              delay: index * 0.2 + itemIndex * 0.1 + 0.3,
                              duration: 0.8,
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      {/* Value */}
                      <span
                        className={`text-xs font-medium w-16 text-right ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {formatValue(item.value, metric.unit)}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Action button - Exact styling from image */}
                <motion.button
                  className={`flex items-center gap-2 text-xs transition-colors group ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-500 hover:text-purple-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {index === 0 && "See full breakdown of brand metrics"}
                  {index === 1 && "Download the growth data"}
                  {index === 2 && "Download the client data"}
                  <div
                    className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors ${
                      isDark
                        ? "border-gray-600 group-hover:border-purple-400"
                        : "border-gray-400 group-hover:border-purple-600"
                    }`}
                  >
                    <Download className="w-2.5 h-2.5" />
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Bottom summary section */}
          <motion.div
            className={`mt-12 pt-8 border-t text-center ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Data updated monthly • Last update: December 2024
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                View Full Report
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  isDark
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Export All Data
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioStats;
