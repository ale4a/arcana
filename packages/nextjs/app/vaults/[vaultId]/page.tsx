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

const VaultPage = () => {
  const { isDepositOpen, isWithdrawOpen, openDepositModal, openWithdrawModal, closeModal } = useVaultModals();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  const handleBackToVaults = () => {
    router.push("/vaults");
  };

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
    userBalance: 1000.5,
    userArcUSDBalance: 250.75,
    depositAssets: ["USDT", "USDC", "DAI", "USDT0"],
  };

  const strategiesData = [
    { protocol: "Compound", strategy: "cUSDT Supply", allocationPercent: "13.3%", allocationAmount: "$15.42M" },
    { protocol: "Aave V3", strategy: "USDT Lending", allocationPercent: "12.4%", allocationAmount: "$14.41M" },
    { protocol: "Yearn", strategy: "USDT Vault", allocationPercent: "8.7%", allocationAmount: "$10.06M" },
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
          <button
            onClick={handleBackToVaults}
            className="flex items-center space-x-2 bg-base-100 border border-base-300 px-4 py-2 text-sm font-medium text-base-content hover:bg-base-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to all vaults</span>
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
          <div className="space-y-2">
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
