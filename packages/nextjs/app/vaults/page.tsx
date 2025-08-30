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
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Vaults Table */}
        <div className="bg-base-100 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden">
          <div className="bg-base-300 text-white p-4">
            <h2 className="text-2xl font-black uppercase tracking-wider">AVAILABLE VAULTS</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-300 text-white">
                <tr>
                  <th className="p-4 text-left font-black uppercase tracking-wider border-r-2 border-black">
                    Vault Name
                  </th>
                  <th className="p-4 text-left font-black uppercase tracking-wider border-r-2 border-black">
                    Your Deposits
                  </th>
                  <th className="p-4 text-left font-black uppercase tracking-wider border-r-2 border-black">
                    Total Deposits (TVL)
                  </th>
                  <th className="p-4 text-left font-black uppercase tracking-wider border-r-2 border-black">
                    Supply APY
                  </th>
                  <th className="p-4 text-left font-black uppercase tracking-wider border-r-2 border-black">Rewards</th>
                  <th className="p-4 text-left font-black uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockVaults.map((vault, index) => (
                  <tr
                    key={vault.id}
                    className={`border-t-2 border-black hover:bg-base-200 transition-colors ${
                      index % 2 === 0 ? "bg-white text-black" : "bg-base-300 text-white"
                    }`}
                  >
                    <td className="p-4 border-r-2 border-black">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-black text-sm ${
                            vault.token === "ETH"
                              ? "bg-base-300 text-white"
                              : vault.token === "USDC"
                              ? "bg-base-200 text-white"
                              : "bg-base-100 text-black"
                          }`}
                        >
                          {vault.token}
                        </div>
                        <div>
                          <div className="font-black text-lg">{vault.name}</div>
                          <div className="text-sm opacity-75">{vault.token} Token</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-r-2 border-black">
                      <div className="font-bold text-lg">
                        {formatNumber(vault.yourDeposits)} {vault.token}
                      </div>
                      <div className="text-sm opacity-75">
                        $
                        {formatNumber(
                          vault.yourDeposits * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div>
                    </td>
                    <td className="p-4 border-r-2 border-black">
                      <div className="font-bold text-lg">
                        {formatNumber(vault.totalDeposits)} {vault.token}
                      </div>
                      <div className="text-sm opacity-75">
                        $
                        {formatNumber(
                          vault.totalDeposits * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div>
                    </td>
                    <td className="p-4 border-r-2 border-black">
                      <div className="font-black text-xl text-white">{vault.supplyApy}%</div>
                    </td>
                    <td className="p-4 border-r-2 border-black">
                      <div className="font-bold text-lg">
                        {formatNumber(vault.rewards)} {vault.token}
                      </div>
                      <div className="text-sm opacity-75">
                        $
                        {formatNumber(
                          vault.rewards * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeposit(vault.id)}
                        className="bg-base-300 hover:bg-white text-white hover:text-black font-black py-3 px-6 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 uppercase tracking-wider"
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
        <div className="mt-12 bg-base-200 border-2 border-base-content shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
          <div className="p-6 text-base-content">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-bold uppercase tracking-wide">TVL:</span>
                <p className="font-black text-lg">$354.32M</p>
              </div>
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-bold uppercase tracking-wide">Validator Stake:</span>
                <p className="font-black text-lg">$147.24M</p>
              </div>
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-bold uppercase tracking-wide">Active Vaults:</span>
                <p className="font-black text-lg">3</p>
              </div>
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-bold uppercase tracking-wide">Avg APY:</span>
                <p className="font-black text-lg">8.73%</p>
              </div>
              <div className="border-r border-base-content/20 pr-4">
                <span className="font-bold uppercase tracking-wide">Status:</span>
                <p className="font-black text-lg">Operational</p>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wide">Users:</span>
                <p className="font-black text-lg">2,847</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 bg-black border-2 border-white shadow-[2px_2px_0px_0px_#ffffff]">
          <div className="p-4 text-white">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold uppercase tracking-wider">
              <a href="#" className="hover:text-accent transition-colors border-r border-white/20 pr-6">
                Brand
              </a>
              <a href="#" className="hover:text-accent transition-colors border-r border-white/20 pr-6">
                Docs
              </a>
              <a href="#" className="hover:text-accent transition-colors border-r border-white/20 pr-6">
                X
              </a>
              <a href="#" className="hover:text-accent transition-colors border-r border-white/20 pr-6">
                Discord
              </a>
              <a href="#" className="hover:text-accent transition-colors border-r border-white/20 pr-6">
                Terms
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultsPage;
