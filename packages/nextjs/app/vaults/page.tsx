"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Vault {
  id: string;
  name: string;
  yourDeposits: number;
  totalDeposits: number;
  supplyApy: number;
  rewards: number;
  token: string;
  vaultId: string;
  isAvailable: boolean;
}

const mockVaults: Vault[] = [
  {
    id: "1",
    name: "USDT0 Liquid Staking",
    yourDeposits: 2.45,
    totalDeposits: 15420.67,
    supplyApy: 5.2,
    rewards: 0.127,
    token: "USDT0",
    vaultId: "usdt0",
    isAvailable: false,
  },
  {
    id: "2",
    name: "USDT Yield Farm",
    yourDeposits: 1250.0,
    totalDeposits: 892340.12,
    supplyApy: 8.7,
    rewards: 108.75,
    token: "USDT",
    vaultId: "usdt",
    isAvailable: false,
  },
  {
    id: "3",
    name: "LSK Pool",
    yourDeposits: 5000.0,
    totalDeposits: 234567.89,
    supplyApy: 12.3,
    rewards: 615.0,
    token: "LSK",
    vaultId: "lsk",
    isAvailable: true,
  },
  {
    id: "4",
    name: "USDC0 Pool",
    yourDeposits: 1000.0,
    totalDeposits: 123456.78,
    supplyApy: 10.0,
    rewards: 123.45,
    token: "USDCE",
    vaultId: "usdce",
    isAvailable: false,
  },
];

const VaultsPage = () => {
  const router = useRouter();

  const handleDeposit = (vaultId: string) => {
    // Redireccionar a la página específica del vault
    router.push(`/vaults/${vaultId}`);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="h-full p-6">
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
                  <th className="p-4 text-left font-normal uppercase tracking-wider text-sm"></th>
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
                        {/* <div className="w-8 h-8 bg-base-300 flex items-center justify-center text-xs font-medium">
                          {vault.token}
                        </div> */}
                        <Image
                          src={`/tokens/${vault.vaultId}.png`}
                          alt={vault.token}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-normal text-base">{vault.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-normal text-base">
                        {formatNumber(vault.yourDeposits)} {vault.token}
                      </div>
                      {/* <div className="text-sm text-base-content/70">
                        $
                        {formatNumber(
                          vault.yourDeposits * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div> */}
                    </td>
                    <td className="p-4">
                      <div className="font-normal text-base">
                        {formatNumber(vault.totalDeposits)} {vault.token}
                      </div>
                      {/* <div className="text-sm text-base-content/70">
                        $
                        {formatNumber(
                          vault.totalDeposits * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div> */}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-base text-success">{vault.supplyApy}%</div>
                    </td>
                    <td className="p-4">
                      <div className="font-normal text-base">
                        {formatNumber(vault.rewards)} {vault.token}
                      </div>
                      {/* <div className="text-sm text-base-content/70">
                        $
                        {formatNumber(
                          vault.rewards * (vault.token === "ETH" ? 2500 : vault.token === "USDC" ? 1 : 0.5),
                        )}
                      </div> */}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeposit(vault.vaultId)}
                        disabled={!vault.isAvailable}
                        className={`${
                          vault.isAvailable
                            ? "bg-primary text-primary-content font-medium py-2 px-4 border border-primary hover:bg-primary/90 transition-colors uppercase tracking-wide"
                            : "bg-transparent text-gray-500 cursor-not-allowed font-medium py-2 px-4 border border-base-300 hover:bg-base-200/90 transition-colors uppercase tracking-wide"
                        }`}
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
      </div>
    </div>
  );
};

export default VaultsPage;
