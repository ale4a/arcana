import React from "react";

interface StatItem {
  label: string;
  value: string;
}

interface ProtocolStatsProps {
  stats?: StatItem[];
  className?: string;
}

const defaultStats: StatItem[] = [
  { label: "TVL", value: "$354.32M" },
  { label: "Validator Stake", value: "$147.24M" },
  { label: "Active Vaults", value: "3" },
  { label: "Avg APY", value: "8.73%" },
  { label: "Status", value: "Operational" },
  { label: "Users", value: "2,847" },
];

export const ProtocolStats: React.FC<ProtocolStatsProps> = ({ stats = defaultStats, className = "" }) => {
  return (
    <div className={`bg-base-200 border border-base-300 ${className}`}>
      <div className="p-4 text-base-content">
        {/* <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-medium uppercase tracking-wide text-success">LIVE</span>
          </div>
        </div> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
          {stats.map((stat, index) => (
            <div key={index}>
              <span className="font-medium uppercase tracking-wide text-base-content/70">{stat.label}:</span>
              <p className="font-bold text-base">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
