import React from "react";

interface VaultHeaderProps {
  vaultName: string;
  description: string;
  token: string;
}

const VaultHeader: React.FC<VaultHeaderProps> = ({ vaultName, description, token }) => {
  return (
    <div className="bg-base-100 border border-base-300 p-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-base-content text-base-100 rounded-full flex items-center justify-center text-sm font-bold">
          {token.charAt(0)}
        </div>
        <h1 className="text-xl font-medium">{vaultName}</h1>
      </div>
      <p className="text-sm text-base-content/70 leading-relaxed mt-2">{description}</p>
    </div>
  );
};

export default VaultHeader;
