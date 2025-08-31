import { useState } from "react";

export type ModalType = "deposit" | "withdraw" | null;

export const useVaultModals = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openDepositModal = () => setActiveModal("deposit");
  const openWithdrawModal = () => setActiveModal("withdraw");
  const closeModal = () => setActiveModal(null);

  const isDepositOpen = activeModal === "deposit";
  const isWithdrawOpen = activeModal === "withdraw";

  return {
    activeModal,
    isDepositOpen,
    isWithdrawOpen,
    openDepositModal,
    openWithdrawModal,
    closeModal,
  };
};
