import { Download } from "lucide-react";

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
}

const PortfolioStats = () => {
  const metrics: PortfolioMetric[] = [
    {
      title: "Managed portfolio carbon footprint",
      unit: "tCO2e",
      currentValue: "45,048",
      changePercent: "-16%",
      changeYear: "from 2019",
      data: [
        { year: "2022", value: 45048, percentage: 100 },
        { year: "2021", value: 14111, percentage: 31 },
        { year: "2020", value: 32813, percentage: 73 },
        { year: "2019", value: 38673, percentage: 86 },
      ],
    },
    {
      title: "Managed portfolio energy intensity",
      unit: "kWh/m²",
      currentValue: "123",
      changePercent: "22%",
      changeYear: "from 2019",
      data: [
        { year: "2022", value: 123, percentage: 100 },
        { year: "2021", value: 128, percentage: 104 },
        { year: "2020", value: 135, percentage: 110 },
        { year: "2019", value: 157, percentage: 128 },
      ],
    },
    {
      title: "Managed portfolio energy consumption",
      unit: "kWh",
      currentValue: "47,790,662",
      changePercent: "27%",
      changeYear: "from 2019",
      data: [
        { year: "2022", value: 47790662, percentage: 100 },
        { year: "2021", value: 43324077, percentage: 91 },
        { year: "2020", value: 48784206, percentage: 102 },
        { year: "2019", value: 65898708, percentage: 138 },
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
