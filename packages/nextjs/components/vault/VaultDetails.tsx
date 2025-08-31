import React from "react";

interface VaultDetailsData {
  strategic: string;
  platform: string;
  withdrawal: string;
  deposit: string;
  exchange: string;
}

interface VaultDetailsProps {
  details: VaultDetailsData;
}

const VaultDetails: React.FC<VaultDetailsProps> = ({ details }) => {
  return (
    <div className="bg-base-100 border border-base-300">
      <div className="p-4 border-b border-base-300">
        <h3 className="font-medium">VAULT DETAILS</h3>
      </div>
      <div className="p-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-base-content/70">Strategic</span>
          <span className="font-medium">{details.strategic}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/70">Platform Fee</span>
          <span className="font-medium">{details.platform}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/70">Withdrawal Period</span>
          <span className="font-medium">{details.withdrawal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/70">Deposit Lock Period</span>
          <span className="font-medium">{details.deposit}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/70">Exchange Rate</span>
          <span className="font-medium">{details.exchange}</span>
        </div>
      </div>
    </div>
  );
};

export default VaultDetails;
