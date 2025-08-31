"use client";

import React from "react";

interface Vault {
  id: string;
  name: string;
  yourDeposits: number;
  totalDeposits: number;
  supplyApy: number;
  rewards: number;
  token: string;
}

const mockVaults: Vault[] = [
  {
    id: "1",
    name: "ETH Liquid Staking",
    yourDeposits: 2.45,
    totalDeposits: 15420.67,
    supplyApy: 5.2,
    rewards: 0.127,
    token: "ETH",
  },
  {
    id: "2",
    name: "USDC Yield Farm",
    yourDeposits: 1250.0,
    totalDeposits: 892340.12,
    supplyApy: 8.7,
    rewards: 108.75,
    token: "USDC",
  },
  {
    id: "3",
    name: "LISK Staking Pool",
    yourDeposits: 5000.0,
    totalDeposits: 234567.89,
    supplyApy: 12.3,
    rewards: 615.0,
    token: "LISK",
  },
];

const VaultsPage = () => {
  const handleDeposit = (vaultId: string) => {
    // Aquí iría la lógica de depósito
    console.log(`Depositing to vault ${vaultId}`);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Vaults Table */}
        <div className="bg-base-100 border border-base-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-100 text-base-content">
                <tr>
                  <th className="p-4 text-left font-normal uppercase tracking-wider text-sm">Vault Name</th>
                  <th className="p-4 text-left font-normal uppercase tracking-wider text-sm">Your Deposits</th>
                  <th className="p-4 text-left font-normal uppercase tracking-wider text-sm">Total Deposits</th>
                  <th className="p-4 text-left font-normal uppercase tracking-wider text-sm">Supply APY</th>
                  <th className="p-4 text-left font-normal uppercase tracking-wider text-sm">Rewards</th>
                  <th className="p-4 text-left font-normal uppercase tracking-wider text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockVaults.map(vault => (
                  <tr
                    key={vault.id}
                    className="border-t border-base-300 hover:bg-base-200 transition-colors bg-base-100 text-base-content"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-base-300 flex items-center justify-center text-xs font-medium">
                          {vault.token}
                        </div>
                        <div>
                          <div className="font-normal text-base">{vault.name}</div>
                          <div className="text-sm text-base-content/70">{vault.token} Token</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-normal text-base">
                        {formatNumber(vault.yourDeposits)} {vault.token}
                      </div>
                      <div className="text-sm text-base-content/70">
                        $
                        {formatNumber(
                          vault.yourDeposits * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-normal text-base">
                        {formatNumber(vault.totalDeposits)} {vault.token}
                      </div>
                      <div className="text-sm text-base-content/70">
                        $
                        {formatNumber(
                          vault.totalDeposits * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-base text-success">{vault.supplyApy}%</div>
                    </td>
                    <td className="p-4">
                      <div className="font-normal text-base">
                        {formatNumber(vault.rewards)} {vault.token}
                      </div>
                      <div className="text-sm text-base-content/70">
                        $
                        {formatNumber(
                          vault.rewards * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeposit(vault.id)}
                        className="bg-primary text-primary-content font-medium py-2 px-4 border border-primary hover:bg-primary/90 transition-colors uppercase tracking-wide"
                      >
                        DEPOSIT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 bg-base-200 border border-base-300">
          <div className="p-6 text-base-content">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-medium uppercase tracking-wide">TVL:</span>
                <p className="font-bold text-lg">$354.32M</p>
              </div>
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-medium uppercase tracking-wide">Validator Stake:</span>
                <p className="font-bold text-lg">$147.24M</p>
              </div>
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-medium uppercase tracking-wide">Active Vaults:</span>
                <p className="font-bold text-lg">3</p>
              </div>
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-medium uppercase tracking-wide">Avg APY:</span>
                <p className="font-bold text-lg">8.73%</p>
              </div>
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-medium uppercase tracking-wide">Status:</span>
                <p className="font-bold text-lg">Operational</p>
              </div>
              <div>
                <span className="font-medium uppercase tracking-wide">Users:</span>
                <p className="font-bold text-lg">2,847</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
      </div>
    </div>
  );
};

export default VaultsPage;
