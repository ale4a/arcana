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
import { useVaultModals } from "../../../hooks/useVaultModals";
import { useAccount } from "wagmi";
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

  // Mock data
  const vaultData = {
    vaultName: "Hyperbeat USDT",
    token: "USDT",
    description:
      "The best risk-adjusted return on your USDT, dynamically allocating capital through strategies typically exclusive to institutions now democratized for all.",
    apy: 9.51,
    tvl: 115.93,
    yourValue: 0.0,
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

  const protocolsData = [
    { name: "HyperLiquid", protocol: "HYPE basis trade", apy: "30.47%", amount: "$54.25M" },
    { name: "Gho", protocol: "Cash", apy: "12.18%", amount: "$14.41M" },
    { name: "HyperLiquid", protocol: "ETHW basis trade", apy: "11.25%", amount: "$15.42M" },
    { name: "HyperLiquid", protocol: "PAYCOINS basis trade", apy: "10.15%", amount: "$32.06M" },
    { name: "Folks", protocol: "BORROW VAULT", apy: "8.42%", amount: "$10.06M" },
    { name: "HyperLend", protocol: "Supply USDT0", apy: "5.30%", amount: "$7.23M" },
  ];

  const vaultDetails = {
    strategic: "HEV Capital Infrastructure",
    platform: "1% Performance Fee",
    withdrawal: "2 working days (instant)",
    deposit: "0",
    exchange: "1 HUUSDT = 1.042391 USDT0",
  };

  const handleDeposit = async (amount: string, token: string) => {
    console.log("Depositing:", amount, token, "into", vaultData.vaultName);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleWithdraw = async (amount: string) => {
    console.log("Withdrawing:", amount, "ArcUSD");
    await new Promise(resolve => setTimeout(resolve, 2000));
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
                <div className="font-medium">${vaultData.yourValue.toFixed(2)}</div>
              </div>
              <div className="bg-base-100 border border-base-300 p-4">
                <div className="text-sm text-base-content/70 mb-1">YIELD EARNED</div>
                <div className="font-medium">${vaultData.yieldEarned.toFixed(2)}</div>
              </div>
              <div className="bg-base-100 border border-base-300 p-4">
                <div className="text-sm text-base-content/70 mb-1">arcUSDC</div>
                <div className="font-medium">{vaultData.unboost.toFixed(2)}</div>
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

        {/* First Row - Main Vault Info and Performance Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
          {/* Left Column - Vault Info */}
          <div className="space-y-2">
            <VaultHeader vaultName={vaultData.vaultName} description={vaultData.description} token={vaultData.token} />

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
        />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={closeModal}
        vaultName={vaultData.vaultName}
        userArcUSDBalance={vaultData.userArcUSDBalance}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
};

export default VaultPage;
