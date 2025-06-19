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
    if (unit === "kWh" && value > 1000000) {
      return value.toLocaleString();
    }
    return value.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-transparent">
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-gray-600 text-sm font-normal mb-4 leading-relaxed">
                  {metric.title}
                </h3>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-4xl font-light text-gray-900">
                    {metric.currentValue}
                  </span>
                  <span className="text-xs text-gray-500 font-normal">
                    {metric.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {metric.changeYear}
                  </span>
                  <span className="text-xs font-medium text-gray-900">
                    {metric.changePercent}
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div className="space-y-4 mb-8">
                {metric.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 w-8">
                      {item.year}
                    </span>
                    <div className="flex-1 relative">
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-red-800 h-full transition-all duration-500 ease-out rounded-full"
                          style={{
                            width: `${Math.min(item.percentage, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-900 font-medium w-16 text-right">
                      {formatValue(item.value, metric.unit)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Download button */}
              <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">
                {index === 0 && "See full breakdown of carbon footprint"}
                {index === 1 && "Download the data"}
                {index === 2 && "Download the data"}
                <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                  <Download className="w-2.5 h-2.5" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioStats;
