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
    // 1. Ascenso escalonado inicial (25/5 a 16/6) - Patrón de escalera
    { date: "25/5", apy: 8.2, tvl: 45.2 },
    { date: "26/5", apy: 8.2, tvl: 45.2 },
    { date: "27/5", apy: 8.2, tvl: 45.2 },
    { date: "28/5", apy: 8.2, tvl: 45.2 },
    { date: "29/5", apy: 8.2, tvl: 45.2 },
    { date: "30/5", apy: 8.2, tvl: 45.2 },
    { date: "31/5", apy: 8.2, tvl: 45.2 },
    { date: "1/6", apy: 8.2, tvl: 45.2 },
    { date: "2/6", apy: 8.2, tvl: 45.2 },
    { date: "3/6", apy: 8.2, tvl: 45.2 },
    { date: "4/6", apy: 8.2, tvl: 45.2 },
    { date: "5/6", apy: 8.2, tvl: 45.2 },
    { date: "6/6", apy: 8.2, tvl: 45.2 },
    { date: "7/6", apy: 8.2, tvl: 45.2 },
    { date: "8/6", apy: 8.2, tvl: 45.2 },
    { date: "9/6", apy: 8.2, tvl: 45.2 },
    { date: "10/6", apy: 8.2, tvl: 45.2 },
    { date: "11/6", apy: 8.2, tvl: 45.2 },
    { date: "12/6", apy: 8.2, tvl: 45.2 },
    { date: "13/6", apy: 8.2, tvl: 45.2 },
    { date: "14/6", apy: 8.2, tvl: 45.2 },
    { date: "15/6", apy: 8.2, tvl: 45.2 },
    { date: "16/6", apy: 8.2, tvl: 45.2 },

    // 2. Fluctuaciones en el medio (16/6 a 13/7) - Relativamente plano con pequeñas variaciones
    { date: "17/6", apy: 8.2, tvl: 45.2 },
    { date: "18/6", apy: 8.2, tvl: 45.2 },
    { date: "19/6", apy: 8.2, tvl: 45.2 },
    { date: "20/6", apy: 8.2, tvl: 45.2 },
    { date: "21/6", apy: 8.2, tvl: 45.2 },
    { date: "22/6", apy: 8.2, tvl: 45.2 },
    { date: "23/6", apy: 8.2, tvl: 45.2 },
    { date: "24/6", apy: 8.2, tvl: 45.2 },
    { date: "25/6", apy: 8.2, tvl: 45.2 },
    { date: "26/6", apy: 8.2, tvl: 45.2 },
    { date: "27/6", apy: 8.2, tvl: 45.2 },
    { date: "28/6", apy: 8.2, tvl: 45.2 },
    { date: "29/6", apy: 8.2, tvl: 45.2 },
    { date: "30/6", apy: 8.2, tvl: 45.2 },
    { date: "1/7", apy: 8.2, tvl: 45.2 },
    { date: "2/7", apy: 8.2, tvl: 45.2 },
    { date: "3/7", apy: 8.2, tvl: 45.2 },
    { date: "4/7", apy: 8.2, tvl: 45.2 },
    { date: "5/7", apy: 8.2, tvl: 45.2 },
    { date: "6/7", apy: 8.2, tvl: 45.2 },
    { date: "7/7", apy: 8.2, tvl: 45.2 },
    { date: "8/7", apy: 8.2, tvl: 45.2 },
    { date: "9/7", apy: 8.2, tvl: 45.2 },
    { date: "10/7", apy: 8.2, tvl: 45.2 },
    { date: "11/7", apy: 8.2, tvl: 45.2 },
    { date: "12/7", apy: 8.2, tvl: 45.2 },
    { date: "13/7", apy: 8.2, tvl: 45.2 },

    // 3. Subida pronunciada al pico (13/7 a 31/7) - Ascenso rápido y continuo
    { date: "14/7", apy: 8.2, tvl: 45.2 },
    { date: "15/7", apy: 8.2, tvl: 45.2 },
    { date: "16/7", apy: 8.2, tvl: 45.2 },
    { date: "17/7", apy: 8.2, tvl: 45.2 },
    { date: "18/7", apy: 8.2, tvl: 45.2 },
    { date: "19/7", apy: 8.2, tvl: 45.2 },
    { date: "20/7", apy: 8.2, tvl: 45.2 },
    { date: "21/7", apy: 8.2, tvl: 45.2 },
    { date: "22/7", apy: 8.2, tvl: 45.2 },
    { date: "23/7", apy: 8.2, tvl: 45.2 },
    { date: "24/7", apy: 8.2, tvl: 45.2 },
    { date: "25/7", apy: 8.2, tvl: 45.2 },
    { date: "26/7", apy: 8.2, tvl: 45.2 },
    { date: "27/7", apy: 8.2, tvl: 45.2 },
    { date: "28/7", apy: 8.2, tvl: 45.2 },
    { date: "29/7", apy: 8.2, tvl: 45.2 },
    { date: "30/7", apy: 8.2, tvl: 45.2 },
    { date: "31/7", apy: 8.2, tvl: 45.2 },

    // 4. Declive (31/7 a 28/8) - Descenso pronunciado inicial, luego más suave
    { date: "1/8", apy: 8.2, tvl: 45.2 },
    { date: "2/8", apy: 8.2, tvl: 45.2 },
    { date: "3/8", apy: 8.2, tvl: 45.2 },
    { date: "4/8", apy: 8.2, tvl: 45.2 },
    { date: "5/8", apy: 8.2, tvl: 45.2 },
    { date: "6/8", apy: 8.2, tvl: 45.2 },
    { date: "7/8", apy: 8.2, tvl: 45.2 },
    { date: "8/8", apy: 8.2, tvl: 45.2 },
    { date: "9/8", apy: 8.2, tvl: 45.2 },
    { date: "10/8", apy: 8.2, tvl: 45.2 },
    { date: "11/8", apy: 8.2, tvl: 45.2 },
    { date: "12/8", apy: 8.2, tvl: 45.2 },
    { date: "13/8", apy: 8.2, tvl: 45.2 },
    { date: "14/8", apy: 8.2, tvl: 45.2 },
    { date: "15/8", apy: 8.2, tvl: 45.2 },
    { date: "16/8", apy: 8.2, tvl: 45.2 },
    { date: "17/8", apy: 8.2, tvl: 45.2 },
    { date: "18/8", apy: 8.2, tvl: 45.2 },
    { date: "19/8", apy: 8.2, tvl: 45.2 },
    { date: "20/8", apy: 8.2, tvl: 45.2 },
    { date: "21/8", apy: 8.2, tvl: 45.2 },
    { date: "22/8", apy: 8.2, tvl: 45.2 },
    { date: "23/8", apy: 8.2, tvl: 45.2 },
    { date: "24/8", apy: 8.2, tvl: 45.2 },
    { date: "25/8", apy: 8.2, tvl: 45.2 },
    { date: "26/8", apy: 8.2, tvl: 45.2 },
    { date: "27/8", apy: 8.2, tvl: 45.2 },
    { date: "28/8", apy: 8.2, tvl: 45.2 },
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
