import { useState } from "react";
import { Check, MoreHorizontal } from "lucide-react";

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

const BrandKits = () => {
  const [brandKits, setBrandKits] = useState<BrandKit[]>([
    {
      id: "ecorp",
      name: "ECorp",
      iconColor: "#10B981", // green-500
      isSelected: false,
    },
    {
      id: "icorp",
      name: "ICorp",
      iconColor: "#F59E0B", // amber-500
      isSelected: false,
    },
    {
      id: "agency",
      name: "The Agency",
      iconColor: "#EF4444", // red-500
      isSelected: true,
    },
  ]);

  const toggleSelection = (id: string) => {
    setBrandKits((prev) =>
      prev.map((kit) =>
        kit.id === id ? { ...kit, isSelected: !kit.isSelected } : kit,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative">
        {/* Gradient border container */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl p-[2px]">
          <div className="bg-black rounded-2xl h-full w-full" />
        </div>

        {/* Content container */}
        <div className="relative bg-black rounded-2xl p-8 w-96">
          {/* Title */}
          <h1 className="text-white text-2xl font-semibold mb-6">Brand Kits</h1>

          {/* Brand kit cards */}
          <div className="space-y-4">
            {brandKits.map((kit) => (
              <div
                key={kit.id}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors cursor-pointer"
                onClick={() => toggleSelection(kit.id)}
              >
                <div className="flex items-center space-x-4">
                  {/* Checkbox */}
                  <div className="relative">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        kit.isSelected
                          ? "bg-purple-600 border-purple-600"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      {kit.isSelected && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>

                  {/* Cloud icon */}
                  <CloudIcon color={kit.iconColor} />

                  {/* Brand name */}
                  <span className="text-white text-lg font-medium">
                    {kit.name}
                  </span>
                </div>

                {/* Settings menu icon */}
                <button className="text-gray-400 hover:text-gray-300 transition-colors p-1">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandKits;
