import React, { useState } from "react";
import { useTheme } from "next-themes";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartDataPoint {
  date: string;
  apy: number;
  tvl: number;
}

interface PerformanceChartProps {
  isMobile?: boolean;
  fullHeight?: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ isMobile = false, fullHeight = false }) => {
  const [selectedMetric, setSelectedMetric] = useState<"APY" | "TVL">("APY");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Definir containerClass primero
  let containerClass = "";
  if (isMobile) {
    containerClass = "lg:hidden bg-base-100 border border-base-300 p-4 h-64";
  } else if (fullHeight) {
    containerClass = "hidden lg:block bg-base-100 border border-base-300 p-4 h-full";
  } else {
    containerClass = "hidden lg:block bg-base-100 border border-base-300 p-4";
  }

  // Colores adaptativos al tema
  const isDark = resolvedTheme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const axisColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";

  // Renderizar placeholder mientras se monta el tema
  if (!mounted) {
    return (
      <div className={containerClass}>
        <div className="flex items-center justify-center h-full text-center text-base-content/50">
          <div>
            <div className="text-sm mb-2">Loading chart...</div>
          </div>
        </div>
      </div>
    );
  }

  // Mock data - estructura fácil de reemplazar con datos reales
  // Patrón similar a la imagen: ascenso escalonado inicial, fluctuaciones, subida pronunciada, declive
  const chartData: ChartDataPoint[] = [
    // 1. Inicio con APY bajo y crecimiento gradual (25/5 a 16/6)
    { date: "25/5", apy: 0.5, tvl: 12.5 },
    { date: "26/5", apy: 0.6, tvl: 13.2 },
    { date: "27/5", apy: 0.7, tvl: 14.1 },
    { date: "28/5", apy: 0.8, tvl: 15.3 },
    { date: "29/5", apy: 0.9, tvl: 16.7 },
    { date: "30/5", apy: 1.1, tvl: 18.2 },
    { date: "31/5", apy: 1.3, tvl: 19.8 },
    { date: "1/6", apy: 1.5, tvl: 21.5 },
    { date: "2/6", apy: 1.8, tvl: 23.4 },
    { date: "3/6", apy: 2.1, tvl: 25.6 },
    { date: "4/6", apy: 2.4, tvl: 27.9 },
    { date: "5/6", apy: 2.7, tvl: 30.3 },
    { date: "6/6", apy: 3.0, tvl: 32.8 },
    { date: "7/6", apy: 3.3, tvl: 35.4 },
    { date: "8/6", apy: 3.6, tvl: 38.1 },
    { date: "9/6", apy: 3.9, tvl: 40.9 },
    { date: "10/6", apy: 4.2, tvl: 43.8 },
    { date: "11/6", apy: 4.5, tvl: 46.8 },
    { date: "12/6", apy: 4.8, tvl: 49.9 },
    { date: "13/6", apy: 5.1, tvl: 53.1 },
    { date: "14/6", apy: 5.4, tvl: 56.4 },
    { date: "15/6", apy: 5.7, tvl: 59.8 },
    { date: "16/6", apy: 6.0, tvl: 63.3 },

    // 2. Fluctuaciones con algunas caídas (16/6 a 13/7)
    { date: "17/6", apy: 6.2, tvl: 66.9 },
    { date: "18/6", apy: 6.4, tvl: 70.6 },
    { date: "19/6", apy: 6.1, tvl: 68.2 }, // Caída pequeña
    { date: "20/6", apy: 6.3, tvl: 71.8 },
    { date: "21/6", apy: 6.5, tvl: 75.5 },
    { date: "22/6", apy: 6.7, tvl: 79.3 },
    { date: "23/6", apy: 6.4, tvl: 76.8 }, // Caída pequeña
    { date: "24/6", apy: 6.6, tvl: 80.5 },
    { date: "25/6", apy: 6.8, tvl: 84.3 },
    { date: "26/6", apy: 7.0, tvl: 88.2 },
    { date: "27/6", apy: 7.2, tvl: 92.1 },
    { date: "28/6", apy: 7.4, tvl: 96.1 },
    { date: "29/6", apy: 7.6, tvl: 100.2 },
    { date: "30/6", apy: 7.8, tvl: 104.3 },
    { date: "1/7", apy: 8.0, tvl: 108.5 },
    { date: "2/7", apy: 8.2, tvl: 112.8 },
    { date: "3/7", apy: 8.4, tvl: 117.2 },
    { date: "4/7", apy: 8.6, tvl: 121.7 },
    { date: "5/7", apy: 8.8, tvl: 126.3 },
    { date: "6/7", apy: 9.0, tvl: 131.0 },
    { date: "7/7", apy: 9.2, tvl: 135.8 },
    { date: "8/7", apy: 9.4, tvl: 140.7 },
    { date: "9/7", apy: 9.6, tvl: 145.7 },
    { date: "10/7", apy: 9.8, tvl: 150.8 },
    { date: "11/7", apy: 10.0, tvl: 156.0 },
    { date: "12/7", apy: 10.2, tvl: 161.3 },
    { date: "13/7", apy: 10.4, tvl: 166.7 },

    // 3. Subida pronunciada al pico máximo (13/7 a 31/7)
    { date: "14/7", apy: 10.6, tvl: 172.2 },
    { date: "15/7", apy: 10.8, tvl: 177.8 },
    { date: "16/7", apy: 11.0, tvl: 183.5 },
    { date: "17/7", apy: 11.2, tvl: 189.3 },
    { date: "18/7", apy: 11.4, tvl: 195.2 },
    { date: "19/7", apy: 11.6, tvl: 201.2 },
    { date: "20/7", apy: 11.8, tvl: 207.3 },
    { date: "21/7", apy: 12.0, tvl: 213.5 },
    { date: "22/7", apy: 12.2, tvl: 219.8 },
    { date: "23/7", apy: 12.4, tvl: 226.2 },
    { date: "24/7", apy: 12.6, tvl: 232.7 },
    { date: "25/7", apy: 12.8, tvl: 239.3 },
    { date: "26/7", apy: 13.0, tvl: 246.0 },
    { date: "27/7", apy: 13.2, tvl: 252.8 },
    { date: "28/7", apy: 13.4, tvl: 259.7 },
    { date: "29/7", apy: 13.6, tvl: 266.7 },
    { date: "30/7", apy: 13.8, tvl: 273.8 },
    { date: "31/7", apy: 14.0, tvl: 281.0 },

    // 4. Declive con recuperaciones (31/7 a 28/8)
    { date: "1/8", apy: 13.5, tvl: 275.2 }, // Caída
    { date: "2/8", apy: 13.0, tvl: 269.5 }, // Caída
    { date: "3/8", apy: 12.5, tvl: 263.9 }, // Caída
    { date: "4/8", apy: 12.0, tvl: 258.4 }, // Caída
    { date: "5/8", apy: 11.5, tvl: 253.0 }, // Caída
    { date: "6/8", apy: 11.0, tvl: 247.7 }, // Caída
    { date: "7/8", apy: 10.5, tvl: 242.5 }, // Caída
    { date: "8/8", apy: 10.0, tvl: 237.4 }, // Caída
    { date: "9/8", apy: 9.5, tvl: 232.4 }, // Caída
    { date: "10/8", apy: 9.0, tvl: 227.5 }, // Caída
    { date: "11/8", apy: 8.5, tvl: 222.7 }, // Caída
    { date: "12/8", apy: 8.0, tvl: 218.0 }, // Caída
    { date: "13/8", apy: 7.5, tvl: 213.4 }, // Caída
    { date: "14/8", apy: 7.0, tvl: 208.9 }, // Caída
    { date: "15/8", apy: 6.5, tvl: 204.5 }, // Caída
    { date: "16/8", apy: 6.0, tvl: 200.2 }, // Caída
    { date: "17/8", apy: 5.5, tvl: 196.0 }, // Caída
    { date: "18/8", apy: 5.0, tvl: 191.9 }, // Caída
    { date: "19/8", apy: 4.5, tvl: 187.9 }, // Caída
    { date: "20/8", apy: 4.0, tvl: 184.0 }, // Caída
    { date: "21/8", apy: 3.5, tvl: 180.2 }, // Caída
    { date: "22/8", apy: 3.0, tvl: 176.5 }, // Caída
    { date: "23/8", apy: 2.5, tvl: 172.9 }, // Caída
    { date: "24/8", apy: 2.0, tvl: 169.4 }, // Caída
    { date: "25/8", apy: 1.5, tvl: 166.0 }, // Caída
    { date: "26/8", apy: 1.0, tvl: 162.7 }, // Caída
    { date: "27/8", apy: 0.5, tvl: 159.5 }, // Caída
    { date: "28/8", apy: 0.0, tvl: 156.4 }, // Caída final
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; payload: ChartDataPoint }>;
    label?: string;
  }) => {
    if (active && payload && payload.length && label) {
      const date = new Date(2024, parseInt(label.split("/")[1]) - 1, parseInt(label.split("/")[0]));
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return (
        <div className="bg-base-100 border border-base-300 p-3 shadow-lg rounded">
          <p className="text-sm font-medium text-base-content">{formattedDate}</p>
          <p className="text-sm text-base-content/70">
            {selectedMetric === "APY" ? "APY 30d" : "TVL"} : {payload[0].value.toFixed(2)}
            {selectedMetric === "APY" ? "%" : "M"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={containerClass}>
      <div className="flex flex-col h-full">
        {/* Header with metric selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMetric("APY")}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                selectedMetric === "APY" ? "bg-base-content text-base-100" : "bg-base-200 text-base-content"
              }`}
            >
              APY
            </button>
            <button
              onClick={() => setSelectedMetric("TVL")}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                selectedMetric === "TVL" ? "bg-base-content text-base-100" : "bg-base-200 text-base-content"
              }`}
            >
              TVL
            </button>
          </div>
          {/* {selectedMetric === "TVL" && (
            <select
              value={timeframe}
              onChange={e => setTimeframe(e.target.value as "hourly" | "daily")}
              className="text-xs bg-base-200 border border-base-300 rounded px-2 py-1 text-base-content"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
            </select>
          )} */}
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: textColor }}
              />
              <YAxis
                stroke={axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: textColor }}
                tickFormatter={(value: number) => `${value}${selectedMetric === "APY" ? "%" : "M"}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                dataKey={selectedMetric === "APY" ? "apy" : "tvl"}
                stroke={textColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: textColor, strokeWidth: 2, fill: textColor }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
