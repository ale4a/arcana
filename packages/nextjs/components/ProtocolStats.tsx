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
  return (
    <div className={`bg-base-100 border-t border-base-300 ${className}`}>
      <div className="px-4 py-2 text-base-content">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation links */}
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium uppercase tracking-wider">DOCS</span>
            <span className="text-xs text-base-content/50">•</span>
            <span className="text-xs font-medium uppercase tracking-wider">TERMS</span>
            <span className="text-xs text-base-content/50">•</span>
            <span className="text-xs font-medium uppercase tracking-wider">PRIVACY</span>
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
