"use client";

import React, { useState } from "react";
import DepositModal from "../../../components/ui/modals/DepositModal";
import WithdrawModal from "../../../components/ui/modals/WithdrawModal";
import {
  ActionButtons,
  AdminControls,
  ExpandableSections,
  PerformanceChart,
  ProtocolsExposure,
  StatsCards,
  UserStats,
  VaultDetails,
} from "../../../components/vault";
import { useScaffoldContractRead, useScaffoldContractWrite } from "../../../hooks/scaffold-eth";
import { useVaultModals } from "../../../hooks/useVaultModals";
import { parseEther } from "viem";
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

  // Preview withdraw function to calculate how much user would receive for a given amount
  useScaffoldContractRead({
    contractName: "Arcana",
    functionName: "previewWithdraw",
    args: [0n],
  });

  // Mock data
  const vaultData = {
    vaultName: "Arcana Lisk",
    token: "LSK",
    description:
      "The best risk-adjusted return on your LSK, dynamically allocating capital through strategies typically exclusive to institutions now democratized for all.",
    apy: 9.51,
    tvl: 115.93,
    yourValue: 0, // This will be calculated in UserStats component
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
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-base-content/70 hover:text-base-content border border-base-300 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all vaults
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-2">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-2">
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
            <StatsCards apy={vaultData.apy} tvl={vaultData.tvl} />

            {/* User Stats */}
            <UserStats yieldEarned={vaultData.yieldEarned} />
            <ActionButtons onDeposit={openDepositModal} onWithdraw={openWithdrawModal} />
            {/* Admin Controls */}
            <AdminControls />
          </div>
          {/* Right Column - Performance Chart */}
          <div className="lg:col-span-2 space-y-2 bg-red-500">
            <PerformanceChart isMobile={false} fullHeight={true} />
          </div>
          {/* Second Row - Expandable Sections and Technical Details */}
        </div>
        <div className="grid lg:grid-cols-2 gap-2 lg:py-4 py-0">
          <div className="lg:col-span-1 space-y-4 hidden lg:block">
            <ExpandableSections expandedSections={expandedSections} toggleSection={toggleSection} />
          </div>

          <div className="hidden lg:block lg:grid-span-1 space-y-2">
            <ProtocolsExposure protocols={strategiesData} />
            <VaultDetails details={vaultDetails} />
          </div>
        </div>

        {/* Mobile Only Content */}
        <div className="lg:hidden space-y-4 mt-2">
          <PerformanceChart isMobile={true} />
          <ProtocolsExposure protocols={strategiesData} />
          <VaultDetails details={vaultDetails} />
          <ExpandableSections expandedSections={expandedSections} toggleSection={toggleSection} />
        </div>
        {/* Expandable Sections */}
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
          userArcUSDBalance={vaultData.userArcUSDBalance}
          onWithdraw={handleWithdraw}
          isLoading={isWithdrawing}
        />
      </div>
    </div>
  );
};

export default VaultPage;
