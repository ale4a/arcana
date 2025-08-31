import React from "react";

interface ProtocolData {
  name: string;
  protocol: string;
  apy: string;
  amount: string;
}

interface ProtocolsExposureProps {
  protocols: ProtocolData[];
}

const ProtocolsExposure: React.FC<ProtocolsExposureProps> = ({ protocols }) => {
  return (
    <div className="bg-base-100 border border-base-300">
      <div className="p-4 border-b border-base-300 flex justify-between items-center">
        <h3 className="font-medium">PROTOCOLS & EXCHANGES EXPOSURE</h3>
        <button className="text-base-content/70 hover:text-base-content">⚙</button>
      </div>
      <div className="divide-y divide-base-300">
        {protocols.map((protocol, index) => (
          <div key={index} className="p-3 flex justify-between items-center text-sm">
            <div>
              <div className="font-medium">{protocol.name}</div>
              <div className="text-xs text-base-content/70">{protocol.protocol}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">{protocol.apy}</div>
              <div className="text-xs text-base-content/70">{protocol.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolsExposure;
