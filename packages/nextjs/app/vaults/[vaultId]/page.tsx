"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DepositModal from "../../../components/ui/modals/DepositModal";
import WithdrawModal from "../../../components/ui/modals/WithdrawModal";
import {
  ActionButtons,
  ExpandableSections,
  PerformanceChart,
  ProtocolsExposure,
  StatsCards,
  UserStats,
  VaultDetails,
  VaultHeader,
} from "../../../components/vault";
import { useScaffoldContractRead, useScaffoldContractWrite } from "../../../hooks/scaffold-eth";
import { useVaultModals } from "../../../hooks/useVaultModals";
import { formatEther, parseEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { useBalance } from "wagmi";

const VaultPage = () => {
  const { isDepositOpen, isWithdrawOpen, openDepositModal, openWithdrawModal, closeModal } = useVaultModals();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  // Get user's connected address
  const { address } = useAccount();

  // Lisk token contract address
  const LISK_TOKEN_ADDRESS = "0xac485391EB2d7D88253a7F1eF18C37f4242D1A24";

  // Fetch Lisk token balance using wagmi's useBalance hook
  // This replaces the hardcoded balance with real-time blockchain data
  const {
    data: liskBalance,
    isLoading: isBalanceLoading,
    error: balanceError,
  } = useBalance({
    address,
    token: LISK_TOKEN_ADDRESS as `0x${string}`,
    watch: true,
  });

  // Contract write hooks for deposit, approval, and withdraw
  const { writeAsync: depositAsync, isMining: isDepositing } = useScaffoldContractWrite({
    contractName: "Arcana",
    functionName: "deposit",
    args: [0n, address as `0x${string}`],
  });

  const { writeAsync: withdrawAsync, isMining: isWithdrawing } = useScaffoldContractWrite({
    contractName: "Arcana",
    functionName: "withdraw",
    args: [0n, address as `0x${string}`, address as `0x${string}`],
  });

  // Admin rebalance function - moves assets between strategies
  const { writeAsync: rebalanceAsync, isMining: isRebalancing } = useScaffoldContractWrite({
    contractName: "Arcana",
    functionName: "rebalance",
    args: [0n, 0n, 0n],
  });

  // For Lisk token approval, we need to use the Lisk token contract directly
  const { writeAsync: approveLiskAsync, isLoading: isApprovingLisk } = useContractWrite({
    address: LISK_TOKEN_ADDRESS as `0x${string}`,
    abi: [
      {
        type: "function",
        name: "approve",
        inputs: [
          { name: "spender", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "nonpayable",
      },
    ],
    functionName: "approve",
  });

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

  // Preview withdraw function to calculate how much user would receive for a given amount
  useScaffoldContractRead({
    contractName: "Arcana",
    functionName: "previewWithdraw",
    args: [0n],
  });

  // Get total assets in the vault for rebalance calculation
  const { data: totalAssets } = useScaffoldContractRead({
    contractName: "Arcana",
    functionName: "totalAssets",
    args: undefined,
  });

  // Mock data
  const vaultData = {
    vaultName: "Hyperbeat USDT",
    token: "USDT",
    description:
      "The best risk-adjusted return on your USDT, dynamically allocating capital through strategies typically exclusive to institutions now democratized for all.",
    apy: 9.51,
    tvl: 115.93,
    yourValue: previewRedeemValue ? Number(formatEther(previewRedeemValue)) : 0,
    yieldEarned: 0.0,
    unboost: 0.0,
    userBalance: liskBalance ? Number(liskBalance.formatted) : 0,
    userArcUSDBalance: 250.75,
    depositAssets: ["USDT", "USDC", "DAI", "USDT0"],
  };

  // Handle loading and error states for balance
  const getBalanceDisplay = () => {
    if (isBalanceLoading) {
      return "Loading...";
    }
    if (balanceError) {
      return "Error loading balance";
    }
    if (!address) {
      return "Connect wallet to view balance";
    }
    return `${vaultData.userBalance.toFixed(2)} LSK`;
  };

  // Handle loading and error states for vault value
  const getVaultValueDisplay = () => {
    if (isVaultSharesLoading || isPreviewRedeemLoading) {
      return "Loading...";
    }
    if (!address) {
      return "Connect wallet to view value";
    }
    if (!userVaultShares || userVaultShares === 0n) {
      return "$0.00";
    }
    return `$${vaultData.yourValue.toFixed(2)}`;
  };

  const strategiesData = [
    { name: "Morpho", protocol: "HEV Capital Infrastructure", apy: "30.47%", amount: "$54.25M" },
    { name: "Rasa", protocol: "HEV Capital Infrastructure", apy: "12.18%", amount: "$14.41M" },
  ];

  const vaultDetails = {
    strategic: "HEV Capital Infrastructure",
    platform: "1% Performance Fee",
    withdrawal: "2 working days (instant)",
    deposit: "0",
    exchange: "1 HUUSDT = 1.042391 USDT0",
  };

  const handleDeposit = async (amount: string) => {
    if (!address || !amount || parseFloat(amount) <= 0) {
      console.error("Invalid deposit parameters");
      return;
    }

    try {
      const amountInWei = parseEther(amount);

      // First, approve the Arcana vault to spend Lisk tokens
      // The user needs to approve the Arcana vault address to spend their Lisk tokens
      console.log("Approving Lisk tokens for Arcana vault...");
      await approveLiskAsync({
        args: ["0x22EC63533e99f6CEf08DEBa30cf67cd9982cb2E2" as `0x${string}`, amountInWei],
      });

      // Then deposit into the Arcana vault
      console.log("Depositing into Arcana vault...");
      await depositAsync({
        args: [amountInWei, address],
      });

      console.log("Deposit successful!");
    } catch (error) {
      console.error("Deposit failed:", error);
      throw error;
    }
  };

  const handleWithdraw = async (amount: string) => {
    if (!address || !amount || parseFloat(amount) <= 0) {
      console.error("Invalid withdraw parameters");
      return;
    }

    try {
      const amountInWei = parseEther(amount);

      // Withdraw from the Arcana vault using the withdraw function
      // withdraw(assets, receiver, owner) - where owner is the user's address
      console.log("Withdrawing from Arcana vault...");
      await withdrawAsync({
        args: [amountInWei, address, address],
      });

      console.log("Withdraw successful!");
    } catch (error) {
      console.error("Withdraw failed:", error);
      throw error;
    }
  };

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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto p-6">
        {/* Back to all vaults */}
        <div className="mb-4">
          <button className="text-sm text-base-content/70 hover:text-base-content">← Back to all vaults</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vault Header */}
            <div className="bg-base-100 border-[1px] border-base-300 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-base-content text-base-100 rounded-full flex items-center justify-center text-sm font-bold">
                  H
                </div>
                <h1 className="text-xl font-medium">{vaultData.vaultName}</h1>
              </div>
              <p className="text-sm text-base-content/70 leading-relaxed">{vaultData.description}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* APY Card */}
              <div className="bg-base-100 border border-base-300 p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-bold">{vaultData.apy}%</span>
                  <div className="flex space-x-1">
                    <span className="text-xs bg-base-200 px-2 py-1">APY</span>
                    <span className="text-xs bg-base-200 px-2 py-1">TVL</span>
                  </div>
                </div>
                <span className="text-xs text-base-content/70">APY ⓘ</span>
              </div>

              {/* TVL Card */}
              <div className="bg-base-100 border border-base-300 p-4">
                <span className="text-2xl font-bold">${vaultData.tvl}M</span>
                <div className="text-xs text-base-content/70 mt-2">TVL</div>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-3 gap-4">
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
                <div className="font-medium">${vaultData.yieldEarned.toFixed(2)}</div>
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
                  ) : userVaultShares ? (
                    Number(formatEther(userVaultShares)).toFixed(4)
                  ) : (
                    "0.0000"
                  )}
                </div>
                <div className="flex mt-2 space-x-1">
                  {vaultData.depositAssets.map((asset, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 bg-base-300 rounded-full flex items-center justify-center text-xs"
                    >
                      {asset.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lisk Balance Display */}
            <div className="bg-base-100 border border-base-300 p-4">
              <div className="text-sm text-base-content/70 mb-1">YOUR LSK BALANCE</div>
              <div className="font-medium">
                {isBalanceLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>Loading balance...</span>
                  </div>
                ) : balanceError ? (
                  <span className="text-error">Error loading balance</span>
                ) : !address ? (
                  <span className="text-warning">Connect wallet to view balance</span>
                ) : (
                  <span>{vaultData.userBalance.toFixed(2)} LSK</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={openDepositModal}
                className="bg-base-100 border border-base-300 py-3 text-center font-medium hover:bg-base-200 transition-colors"
              >
                DEPOSIT
              </button>
              <button
                onClick={openWithdrawModal}
                className="bg-base-100 border border-base-300 py-3 text-center font-medium hover:bg-base-200 transition-colors"
              >
                WITHDRAW
              </button>
            </div>

            {/* Admin Rebalance Button */}
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

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Hyperbeat Rewards */}
              <div className="bg-base-100 border border-base-300">
                <button
                  onClick={() => toggleSection("rewards")}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
                >
                  <span className="font-medium">HYPERBEAT REWARDS</span>
                  <span className="text-xl">{expandedSections.rewards ? "−" : "+"}</span>
                </button>
                {expandedSections.rewards && (
                  <div className="p-4 border-t border-base-300">
                    <p className="text-sm text-base-content/70">
                      Earn additional rewards through the Hyperbeat protocol.
                    </p>
                  </div>
                )}
              </div>

            <StatsCards apy={vaultData.apy} tvl={vaultData.tvl} />

            <UserStats
              yourValue={vaultData.yourValue}
              yieldEarned={vaultData.yieldEarned}
              unboost={vaultData.unboost}
              depositAssets={vaultData.depositAssets}
            />

            <ActionButtons onDeposit={openDepositModal} onWithdraw={openWithdrawModal} />
          </div>

          {/* Right Column - Performance Chart */}
          <div className="hidden lg:flex lg:flex-col">
            <PerformanceChart isMobile={false} fullHeight={true} />
          </div>
        </div>

        {/* Second Row - Expandable Sections and Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Left Column - Expandable Sections */}
          <div className="space-y-4">
            <ExpandableSections expandedSections={expandedSections} toggleSection={toggleSection} />
          </div>

          {/* Right Column - Protocols and Vault Details */}
          <div className="hidden lg:block space-y-2">
            <ProtocolsExposure protocols={strategiesData} />
            <VaultDetails details={vaultDetails} />
          </div>
        </div>

        {/* Mobile Only Content */}
        <div className="lg:hidden space-y-6 mt-6">
          <PerformanceChart isMobile={true} />
          <ProtocolsExposure protocols={strategiesData} />
          <VaultDetails details={vaultDetails} />
        </div>
      </div>

      {/* Mobile Action Buttons - Sticky Footer */}
      <ActionButtons onDeposit={openDepositModal} onWithdraw={openWithdrawModal} isMobile={true} />

      {/* Mobile padding bottom to avoid content being hidden behind sticky footer */}
      <div className="md:hidden h-20"></div>

        {/* Modals */}
        <DepositModal
          isOpen={isDepositOpen}
          onClose={closeModal}
          vaultName={vaultData.vaultName}
          userBalance={vaultData.userBalance}
          apy={vaultData.apy / 100}
          onDeposit={handleDeposit}
          balanceDisplay={getBalanceDisplay()}
          isLoading={isDepositing || isApprovingLisk}
        />

        <WithdrawModal
          isOpen={isWithdrawOpen}
          onClose={closeModal}
          vaultName={vaultData.vaultName}
          userArcUSDBalance={userVaultShares ? Number(formatEther(userVaultShares)) : 0}
          onWithdraw={handleWithdraw}
          isLoading={isWithdrawing}
        />
      </div>
    </div>
  );
};

export default VaultPage;
