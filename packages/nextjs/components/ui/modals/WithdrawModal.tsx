"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "../Modal";
import TokenSelector from "../TokenSelector";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaultName: string;
  userArcUSDBalance: number;
  onWithdraw: (amount: string) => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  vaultName,
  userArcUSDBalance,
  onWithdraw,
}) => {
  const [amount, setAmount] = useState("");
  const [selectedReceiveToken, setSelectedReceiveToken] = useState("LSK");
  const [isLoading, setIsLoading] = useState(false);

  const handleMaxClick = () => {
    setAmount(userArcUSDBalance.toString());
  };

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsLoading(true);
    try {
      await onWithdraw(amount);
      setAmount("");
      onClose();
    } catch (error) {
      console.error("Withdraw failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Withdraw from ${vaultName}`} size="md">
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
              className="flex-1 bg-base-100 border border-base-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="bg-base-200 border border-base-300 px-3 py-2 border-l-0 text-sm font-medium flex items-center space-x-2">
              <Image src="/tokens/ArcUSD.png" alt="ArcUSD" width={20} height={20} className="rounded-full" />
              <span>ArcUSD</span>
            </div>
          </div>
          <div className="text-xs flex items-center justify-end text-base-content/70 mt-1">
            <span className="mr-2 text-md">Balance: {userArcUSDBalance.toFixed(2)} ArcUSD</span>
            <button onClick={handleMaxClick} className="bg-primary p-2">
              MAX
            </button>
          </div>
          <div>
            <label className="block text-sm font-light text-base-content/50 mb-2">Receive</label>
            <TokenSelector
              selectedToken={selectedReceiveToken}
              onTokenSelect={setSelectedReceiveToken}
              className="w-full"
            />
          </div>
        </div>

        {/* Receive Token Selector */}

        {/* Preview */}
        <div className="bg-base-200 border border-base-300 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">You will receive</span>
            <span className="font-medium">
              {amount || "0.00"} {selectedReceiveToken}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Withdrawal fee</span>
            <span className="font-medium">0.00%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Processing time</span>
            <span className="font-medium">Instant</span>
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-base-content/70 bg-base-200/50 p-3 border border-base-300">
          Withdrawals are processed immediately. No cooldown period applies to this vault.
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleWithdraw}
            disabled={!amount || parseFloat(amount) <= 0 || isLoading}
            className="flex-1 bg-primary text-primary-content py-3 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Withdraw ArcUSD"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
