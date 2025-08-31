"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import TokenSelector from "../TokenSelector";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaultName: string;
  userBalance: number;
  apy: number;
  onDeposit: (amount: string, token: string) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  vaultName,
  userBalance,
  apy,
  onDeposit,
}) => {
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("LSK");
  const [isLoading, setIsLoading] = useState(false);

  const handleMaxClick = () => {
    setAmount(userBalance.toString());
  };

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsLoading(true);
    try {
      await onDeposit(amount, selectedToken);
      setAmount("");
      onClose();
    } catch (error) {
      console.error("Deposit failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const estimatedWeeklyEarnings = amount ? (parseFloat(amount) * apy * 7) / 365 : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Deposit into ${vaultName}`} size="md">
      <div className="space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-light text-base-content/50 mb-2">Amount</label>
          <div className="flex w-full gap-1">
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-2/3 bg-base-100 border border-base-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="w-1/3 border-l-0">
              <TokenSelector selectedToken={selectedToken} onTokenSelect={setSelectedToken} className="h-full" />
            </div>
          </div>
          <div className="text-xs flex items-center justify-end text-base-content/70 mt-1">
            <span className="mr-2 text-md">
              Balance: {userBalance.toFixed(2)} {selectedToken}
            </span>
            <button onClick={handleMaxClick} className="bg-primary p-2">
              MAX
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-base-200 border border-base-300 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Est. APY</span>
            <span className="font-medium">~{(apy * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Est. weekly earnings</span>
            <span className="font-medium">${estimatedWeeklyEarnings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Vault shares received</span>
            <span className="font-medium">{amount || "0.00"}</span>
          </div>
        </div>

        {/* Warning */}
        <div className="text-xs text-base-content/70 bg-base-200/50 p-3 border border-base-300">
          Yields are variable and subject to market conditions. See documentation for risks.
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleDeposit}
            disabled={!amount || parseFloat(amount) <= 0 || isLoading}
            className="flex-1 bg-primary text-primary-content py-3 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Depositing..." : `Deposit ${selectedToken}`}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DepositModal;
