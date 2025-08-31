"use client";

import React from "react";
import { useScaffoldContractRead, useScaffoldContractWrite } from "../../hooks/scaffold-eth";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

const AdminControls: React.FC = () => {
  // Get user's connected address
  const { address } = useAccount();

  // Admin rebalance function - moves assets between strategies
  const { writeAsync: rebalanceAsync, isMining: isRebalancing } = useScaffoldContractWrite({
    contractName: "Arcana",
    functionName: "rebalance",
    args: [0n, 0n, 0n],
  });

  // Get total assets in the vault for rebalance calculation
  const { data: totalAssets } = useScaffoldContractRead({
    contractName: "Arcana",
    functionName: "totalAssets",
    args: undefined,
  });

  const handleRebalance = async () => {
    if (!address) {
      console.error("Wallet not connected");
      return;
    }

    if (!totalAssets || totalAssets === 0n) {
      console.error("No assets in vault to rebalance");
      return;
    }

    try {
      // Calculate half of the total assets for rebalancing
      const halfAssets = totalAssets / 2n;

      // Rebalance half of the supply from strategy 0 to strategy 1
      // rebalance(fromIdx, toIdx, assets) - where assets is half of total supply
      console.log(`Rebalancing ${formatEther(halfAssets)} assets from strategy 0 to strategy 1...`);
      await rebalanceAsync({
        args: [0n, 1n, halfAssets],
      });

      console.log("Rebalance successful!");
    } catch (error) {
      console.error("Rebalance failed:", error);
      throw error;
    }
  };

  return (
    <div className="bg-base-100 border border-base-300 p-4">
      <div className="text-sm text-base-content/70 mb-2">ADMIN CONTROLS</div>
      <button
        onClick={handleRebalance}
        disabled={isRebalancing || !totalAssets || totalAssets === 0n}
        className="w-full bg-warning text-warning-content py-3 text-center font-medium hover:bg-warning-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRebalancing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-warning-content"></div>
            <span>Rebalancing...</span>
          </div>
        ) : (
          `Rebalance half - Morpho → Rasa`
        )}
      </button>
      <div className="text-xs text-base-content/50 mt-2">
        Moves half of total vault assets from strategy 0 to strategy 1
      </div>
    </div>
  );
};

export default AdminControls;
