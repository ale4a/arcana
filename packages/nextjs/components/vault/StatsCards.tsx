import React from "react";

interface StatsCardsProps {
  apy: number;
  tvl: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ apy, tvl }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {/* APY Card */}
      <div className="bg-base-100 border border-base-300 p-4 flex flex-col justify-between items-start">
        <span className="text-4xl font-bold">{apy}%</span>
        <span className="text-xs bg-base-200 px-2 py-1">APY</span>
      </div>
      {/* TVL Card */}
      <div className="bg-base-100 border border-base-300 p-4 flex flex-col justify-between items-start">
        <span className="text-4xl font-bold">${tvl}M</span>
        <span className="text-xs bg-base-200 px-2 py-1">TVL</span>
      </div>
    </div>
  );
};

export default StatsCards;
