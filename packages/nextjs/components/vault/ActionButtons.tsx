import React from "react";

interface ActionButtonsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
  isMobile?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDeposit, onWithdraw, isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 p-4 z-40">
        <div className="grid grid-cols-2 gap-3 mx-auto">
          <button
            onClick={onDeposit}
            className="bg-primary text-primary-content py-3 px-4 text-center font-medium hover:bg-primary/90 transition-colors"
          >
            DEPOSIT
          </button>
          <button
            onClick={onWithdraw}
            className="bg-primary text-primary-content py-3 px-4 text-center font-medium hover:bg-primary/90 transition-colors"
          >
            WITHDRAW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex gap-2 w-full">
      <button
        onClick={onDeposit}
        className="flex-1 bg-primary text-primary-content py-3 text-center font-medium hover:bg-primary/90 transition-colors"
      >
        DEPOSIT
      </button>
      <button
        onClick={onWithdraw}
        className="flex-1 bg-primary text-primary-content py-3 text-center font-medium hover:bg-primary/90 transition-colors"
      >
        WITHDRAW
      </button>
    </div>
  );
};

export default ActionButtons;
