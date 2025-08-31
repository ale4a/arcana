import React from "react";

interface StrategyData {
  protocol: string;
  strategy: string;
  allocationPercent: string;
  allocationAmount: string;
}

interface ProtocolsExposureProps {
  protocols: StrategyData[];
}

const ProtocolsExposure: React.FC<ProtocolsExposureProps> = ({ protocols }) => {
  return (
    <div className="bg-base-100 border border-base-300">
      <div className="p-4 border-b border-base-300 flex justify-between items-center">
        <h3 className="font-medium">Protocols & exchanges exposure</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-300">
              <th className="p-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                Protocol
              </th>
              <th className="p-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                Strategy
              </th>
              <th className="p-3 text-right text-xs font-medium text-base-content/70 uppercase tracking-wider">
                Allocation (%)
              </th>
              <th className="p-3 text-right text-xs font-medium text-base-content/70 uppercase tracking-wider">
                Allocation ($)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {protocols.map((strategy, index) => (
              <tr key={index} className="hover:bg-base-200/50">
                <td className="p-3 text-sm font-medium text-base-content">{strategy.protocol}</td>
                <td className="p-3 text-sm text-base-content/70">{strategy.strategy}</td>
                <td className="p-3 text-sm font-medium text-base-content text-right">{strategy.allocationPercent}</td>
                <td className="p-3 text-sm text-base-content/70 text-right">{strategy.allocationAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProtocolsExposure;
