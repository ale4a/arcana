"use client";

import React from "react";
import { useScaffoldContractRead } from "../../hooks/scaffold-eth";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

interface UserStatsProps {
  yieldEarned: number;
  depositAssets?: string[];
}

const UserStats: React.FC<UserStatsProps> = ({ yieldEarned }) => {
  // Get user's connected address
  const { address } = useAccount();

  // Contract read hooks for vault data
  // Get user's vault shares balance
  const { data: userVaultShares, isLoading: isVaultSharesLoading } = useScaffoldContractRead({
    contractName: "Arcana",
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  // Calculate the value of user's vault shares using previewRedeem
  // This shows how much the user would receive if they redeemed all their shares
  const { data: previewRedeemValue, isLoading: isPreviewRedeemLoading } = useScaffoldContractRead({
    contractName: "Arcana",
    functionName: "previewRedeem",
    args: [userVaultShares || 0n],
  });

  // Handle loading and error states for vault value
  const getVaultValueDisplay = () => {
    if (isVaultSharesLoading || isPreviewRedeemLoading) {
      return "Loading...";
    }
    if (!address) {
      return "Connect wallet";
    }
    if (!userVaultShares || userVaultShares === 0n) {
      return "$0.00";
    }
    const value = previewRedeemValue ? Number(formatEther(previewRedeemValue)) : 0;
    return `$${value.toFixed(2)}`;
  };

  // Handle loading and error states for arcUSDC balance
  const getArcUSDCBalanceDisplay = () => {
    if (isVaultSharesLoading) {
      return "Loading...";
    }
    if (!address) {
      return "Connect wallet";
    }
    if (!userVaultShares || userVaultShares === 0n) {
      return "0.0000";
    }
    return Number(formatEther(userVaultShares)).toFixed(4);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div className="bg-base-100 border border-base-300 p-4">
        <div className="text-sm text-base-content/70 mb-1">YOUR $ VALUE</div>
        <div className="font-medium">
          {isVaultSharesLoading || isPreviewRedeemLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Loading...</span>
            </div>
          ) : !address ? (
            <span className="text-warning">Connect wallet</span>
          ) : (
            getVaultValueDisplay()
          )}
        </div>
      </div>
      <div className="bg-base-100 border border-base-300 p-4">
        <div className="text-sm text-base-content/70 mb-1">YIELD EARNED</div>
        <div className="font-medium">${yieldEarned.toFixed(2)}</div>
      </div>
      <div className="bg-base-100 border border-base-300 p-4">
        <div className="text-sm text-base-content/70 mb-1">arcUSDC</div>
        <div className="font-medium">
          {isVaultSharesLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Loading...</span>
            </div>
          ) : !address ? (
            <span className="text-warning">Connect wallet</span>
          ) : (
            getArcUSDCBalanceDisplay()
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStats;
