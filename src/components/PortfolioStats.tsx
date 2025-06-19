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
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Minimalist container matching the image */}
        <div
          className={`p-12 transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Title and unit - exactly like the image */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3
                      className={`text-sm font-normal leading-relaxed ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {metric.title}
                    </h3>
                    <span
                      className={`text-xs font-normal ${
                        isDark ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {metric.unit}
                    </span>
                  </div>
                </div>

                {/* Large number and percentage change */}
                <div className="mb-8">
                  <div className="flex items-end justify-between mb-2">
                    <span
                      className={`text-5xl font-light ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {metric.currentValue}
                    </span>
                    <div className="text-right">
                      <div
                        className={`text-xs ${
                          isDark ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {metric.changeYear}
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          metric.isPositive
                            ? isDark
                              ? "text-green-400"
                              : "text-green-600"
                            : isDark
                              ? "text-red-400"
                              : "text-red-600"
                        }`}
                      >
                        {metric.changePercent}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bars - minimal styling matching image */}
                <div className="space-y-3 mb-8">
                  {metric.data.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1 + itemIndex * 0.05,
                        duration: 0.4,
                      }}
                      viewport={{ once: true }}
                    >
                      {/* Year */}
                      <span
                        className={`text-xs w-8 ${
                          isDark ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {item.year}
                      </span>

                      {/* Progress bar - brown/red color like in image */}
                      <div className="flex-1 relative">
                        <div
                          className={`w-full h-1.5 rounded-sm overflow-hidden ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <motion.div
                            className={`h-full transition-all duration-700 ease-out rounded-sm ${
                              isDark ? "bg-orange-600" : "bg-orange-700"
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${Math.min(item.percentage, 100)}%`,
                            }}
                            transition={{
                              delay: index * 0.1 + itemIndex * 0.05 + 0.2,
                              duration: 0.6,
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      {/* Value - right aligned */}
                      <span
                        className={`text-xs w-20 text-right ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {formatValue(item.value, metric.unit)}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Action button - minimal circular button like in image */}
                <motion.button
                  className={`flex items-center gap-2 text-xs transition-colors group ${
                    isDark
                      ? "text-gray-500 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {index === 0 && "See full breakdown of brand metrics"}
                  {index === 1 && "Download the growth data"}
                  {index === 2 && "Download the client data"}
                  <div
                    className={`w-4 h-4 border rounded-full flex items-center justify-center transition-colors ml-auto ${
                      isDark
                        ? "border-gray-600 group-hover:border-gray-400"
                        : "border-gray-400 group-hover:border-gray-600"
                    }`}
                  >
                    <Download className="w-2 h-2" />
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioStats;
