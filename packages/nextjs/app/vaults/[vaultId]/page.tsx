"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DepositModal from "../../../components/ui/modals/DepositModal";
import WithdrawModal from "../../../components/ui/modals/WithdrawModal";
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
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

            {/* Action Buttons - Desktop */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              <button
                onClick={openDepositModal}
                className="bg-primary border border-base-300 py-3 text-center font-medium hover:bg-base-200 transition-colors"
              >
                DEPOSIT
              </button>
              <button
                onClick={openWithdrawModal}
                className="bg-primary border border-base-300 py-3 text-center font-medium hover:bg-base-200 transition-colors"
              >
                WITHDRAW
              </button>
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

              {/* How it Works */}
              <div className="bg-base-100 border border-base-300">
                <button
                  onClick={() => toggleSection("howItWorks")}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
                >
                  <span className="font-medium">HOW IT WORKS?</span>
                  <span className="text-xl">{expandedSections.howItWorks ? "−" : "+"}</span>
                </button>
                {expandedSections.howItWorks && (
                  <div className="p-4 border-t border-base-300">
                    <p className="text-sm text-base-content/70">
                      Automated DeFi strategy that dynamically allocates capital across multiple protocols to maximize
                      yield.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ */}
              <div className="bg-base-100 border border-base-300">
                <button
                  onClick={() => toggleSection("faq")}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
                >
                  <span className="font-medium">FAQ</span>
                  <span className="text-xl">{expandedSections.faq ? "−" : "+"}</span>
                </button>
                {expandedSections.faq && (
                  <div className="p-4 border-t border-base-300">
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium mb-1">What is the USDT vault?</div>
                        <div className="text-base-content/70">
                          A yield-generating vault that optimizes returns on USDT deposits.
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">What happens to deposited assets?</div>
                        <div className="text-base-content/70">
                          Assets are allocated across various DeFi protocols to generate yield.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Audits */}
              <div className="bg-base-100 border border-base-300">
                <button
                  onClick={() => toggleSection("audits")}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
                >
                  <span className="font-medium">AUDITS</span>
                  <span className="text-xl">{expandedSections.audits ? "−" : "+"}</span>
                </button>
                {expandedSections.audits && (
                  <div className="p-4 border-t border-base-300">
                    <p className="text-sm text-base-content/70">
                      Security audits and risk assessments available in documentation.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Chart Placeholder */}
            <div className="bg-base-100 border border-base-300 p-4 h-64 flex items-center justify-center">
              <div className="text-center text-base-content/50">
                <div className="text-sm mb-2">Performance Chart</div>
                <div className="text-xs">Chart visualization would go here</div>
              </div>
            </div>

            {/* Protocols & Exchanges Exposure */}
            <div className="bg-base-100 border border-base-300">
              <div className="p-4 border-b border-base-300 flex justify-between items-center">
                <h3 className="font-medium">PROTOCOLS & EXCHANGES EXPOSURE</h3>
                <button className="text-base-content/70 hover:text-base-content">⚙</button>
              </div>
              <div className="divide-y divide-base-300">
                {protocolsData.map((protocol, index) => (
                  <div key={index} className="p-3 flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium">{protocol.name}</div>
                      <div className="text-xs text-base-content/70">{protocol.protocol}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{protocol.apy}</div>
                      <div className="text-xs text-base-content/70">{protocol.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vault Details */}
            <div className="bg-base-100 border border-base-300">
              <div className="p-4 border-b border-base-300">
                <h3 className="font-medium">VAULT DETAILS</h3>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/70">Strategic</span>
                  <span className="font-medium">{vaultDetails.strategic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Platform Fee</span>
                  <span className="font-medium">{vaultDetails.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Withdrawal Period</span>
                  <span className="font-medium">{vaultDetails.withdrawal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Deposit Lock Period</span>
                  <span className="font-medium">{vaultDetails.deposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Exchange Rate</span>
                  <span className="font-medium">{vaultDetails.exchange}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons - Sticky Footer */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 p-4 z-40">
          <div className="grid grid-cols-2 gap-3 mx-auto">
            <button
              onClick={openDepositModal}
              className="bg-primary text-primary-content py-3 px-4 text-center font-medium hover:bg-primary/90 transition-colors"
            >
              DEPOSIT
            </button>
            <button
              onClick={openWithdrawModal}
              className="bg-primary text-primary-content py-3 px-4 text-center font-medium hover:bg-primary/90 transition-colors"
            >
              WITHDRAW
            </button>
          </div>
        </div>

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
    </div>
  );
};

export default VaultPage;
