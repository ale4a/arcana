import React from "react";

interface PerformanceChartProps {
  isMobile?: boolean;
  fullHeight?: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ isMobile = false, fullHeight = false }) => {
  let containerClass = "";

  if (isMobile) {
    containerClass = "lg:hidden bg-base-100 border border-base-300 p-4 h-64";
  } else if (fullHeight) {
    containerClass = "hidden lg:block bg-base-100 border border-base-300 p-4 h-full";
  } else {
    containerClass = "hidden lg:block bg-base-100 border border-base-300 p-4";
  }

  return (
    <div className={containerClass}>
      <div className="flex items-center justify-center h-full text-center text-base-content/50">
        <div>
          <div className="text-sm mb-2">Performance Chart</div>
          <div className="text-xs">Chart visualization would go here</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
