import React from "react";

interface UserStatsProps {
  yourValue: number;
  yieldEarned: number;
  unboost: number;
  depositAssets?: string[];
}

const UserStats: React.FC<UserStatsProps> = ({ yourValue, yieldEarned, unboost }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div className="bg-base-100 border border-base-300 p-4">
        <div className="text-sm text-base-content/70 mb-1">YOUR $ VALUE</div>
        <div className="font-medium">${yourValue.toFixed(2)}</div>
      </div>
      <div className="bg-base-100 border border-base-300 p-4">
        <div className="text-sm text-base-content/70 mb-1">YIELD EARNED</div>
        <div className="font-medium">${yieldEarned.toFixed(2)}</div>
      </div>
      <div className="bg-base-100 border border-base-300 p-4">
        <div className="text-sm text-base-content/70 mb-1">arcUSDC</div>
        <div className="font-medium">{unboost.toFixed(2)}</div>
        {/* <div className="flex mt-2 space-x-1">
          {depositAssets.map((asset, index) => (
            <div key={index} className="w-5 h-5 bg-base-300 rounded-full flex items-center justify-center text-xs">
              {asset.charAt(0)}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default UserStats;
