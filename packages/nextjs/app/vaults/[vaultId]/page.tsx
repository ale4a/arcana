"use client";

import React from "react";
import DepositModal from "../../../components/ui/modals/DepositModal";
import WithdrawModal from "../../../components/ui/modals/WithdrawModal";
import { useVaultModals } from "../../../hooks/useVaultModals";

const VaultPage = () => {
  const { isDepositOpen, isWithdrawOpen, openDepositModal, openWithdrawModal, closeModal } = useVaultModals();

  // Mock data
  const vaultData = {
    vaultName: "USDT Vault",
    userBalance: 1000.5,
    userArcUSDBalance: 250.75, // Balance de ArcUSD que el usuario tiene en la app
    apy: 0.11,
  };

  const handleDeposit = async (amount: string, token: string) => {
    console.log("Depositing:", amount, token, "into", vaultData.vaultName);
    // Aquí iría la lógica de depósito
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay
  };

  const handleWithdraw = async (amount: string) => {
    console.log("Withdrawing:", amount, "ArcUSD");
    // Aquí iría la lógica de retiro de ArcUSD
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay
  };

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-base-content mb-8">{vaultData.vaultName}</h1>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={openDepositModal}
            className="bg-primary text-primary-content px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
          >
            Deposit {vaultData.vaultName}
          </button>
          <button
            onClick={openWithdrawModal}
            className="bg-base-300 text-base-content px-6 py-3 font-medium hover:bg-base-300/80 transition-colors"
          >
            Withdraw {vaultData.vaultName}
          </button>
        </div>

        {/* Vault Info */}
        <div className="bg-base-200 border border-base-300 p-6">
          <h2 className="text-lg font-medium text-base-content mb-4">Your Position</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-base-content/70">Balance:</span>
              <span className="ml-2 font-medium">
                {vaultData.userBalance} {vaultData.vaultName}
              </span>
            </div>
            <div>
              <span className="text-base-content/70">ArcUSD Balance:</span>
              <span className="ml-2 font-medium">{vaultData.userArcUSDBalance} ArcUSD</span>
            </div>

            <div>
              <span className="text-base-content/70">APY:</span>
              <span className="ml-2 font-medium text-success">{(vaultData.apy * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Modals */}
        <DepositModal
          isOpen={isDepositOpen}
          onClose={closeModal}
          vaultName={vaultData.vaultName}
          userBalance={vaultData.userBalance}
          apy={vaultData.apy}
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
