import React from "react";

interface ProtocolStatsProps {
  tvl?: string;
  validatorStake?: string;
  isOperational?: boolean;
  operationalText?: string;
  showValidatorStake?: boolean;
  className?: string;
}

export const ProtocolStats: React.FC<ProtocolStatsProps> = ({
  tvl = "$354.32M",
  validatorStake = "$158.84M",
  isOperational = true,
  operationalText = "OPERATIONAL",
  showValidatorStake = false,
  className = "",
}) => {
  // URLs constantes
  const DOCS_URL =
    "https://puddle-feverfew-e8a.notion.site/Arcana-Whitepaper-2607f7e814af80439387cc6e0e5a0f34?source=copy_link";
  // const TERMS_URL = "https://x.com/ArcanaFinance";
  const X_URL = "https://x.com/ArcanaFinance";
  const handleLinkClick = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={`bg-base-100 border-t border-base-300 ${className}`}>
      <div className="px-4 py-2 text-base-content">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLinkClick(DOCS_URL)}
              className="text-xs font-medium uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
            >
              Whitepaper
            </button>
            {/* <span className="text-xs text-base-content/50">•</span> */}
            {/* <button
              onClick={() => handleLinkClick(TERMS_URL)}
              className="text-xs font-medium uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
            >
              TERMS
            </button> */}
            <span className="text-xs text-base-content/50">•</span>
            <button
              onClick={() => handleLinkClick(X_URL)}
              className="text-xs font-medium uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
            >
              X
            </button>
          </div>

          {/* Right side - Stats with status indicator */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-xs">
              {/* TVL - Always shown */}
              <div className="flex items-center space-x-1">
                <span className="font-medium uppercase tracking-wider text-base-content/70">TVL:</span>
                <span className="font-bold">{tvl}</span>
              </div>

              {/* Validator Stake - Optional */}
              {showValidatorStake && (
                <>
                  <span className="text-base-content/50">•</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium uppercase tracking-wider text-base-content/70">VALIDATOR STAKE:</span>
                    <span className="font-bold">{validatorStake}</span>
                  </div>
                </>
              )}

              {/* Status indicator */}
              <span className="text-base-content/50">•</span>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${isOperational ? "bg-success animate-pulse" : "bg-error"}`}
                ></div>
                <span
                  className={`font-medium uppercase tracking-wider ${isOperational ? "text-success" : "text-error"}`}
                >
                  {operationalText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
