"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Token {
  symbol: string;
  name: string;
  logo: string;
  enabled: boolean;
}

interface TokenSelectorProps {
  selectedToken: string;
  onTokenSelect: (token: string) => void;
  className?: string;
}

const tokens: Token[] = [
  {
    symbol: "LSK",
    name: "Lisk",
    logo: "/tokens/lsk.png",
    enabled: true,
  },
  {
    symbol: "USDC.e",
    name: "USD Coin (Bridged)",
    logo: "/tokens/usdce.png",
    enabled: false,
  },
  {
    symbol: "USDT0",
    name: "Tether USD Zero",
    logo: "/tokens/usdt0.png",
    enabled: false,
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    logo: "/tokens/usdt.png",
    enabled: false,
  },
];

export const TokenSelector: React.FC<TokenSelectorProps> = ({ selectedToken, onTokenSelect, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedTokenData = tokens.find(token => token.symbol === selectedToken) || tokens[0];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTokenClick = (token: Token) => {
    if (token.enabled) {
      onTokenSelect(token.symbol);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Token Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-full items-center justify-between w-full bg-base-200 border border-base-300 px-3 py-2 hover:bg-base-200/80 transition-colors"
      >
        <div className="flex items-center space-x-2 min-w-0">
          <Image
            src={selectedTokenData.logo}
            alt={selectedTokenData.symbol}
            width={20}
            height={20}
            className="rounded-full flex-shrink-0"
          />
          <span className="font-medium text-base-content truncate">{selectedTokenData.symbol}</span>
        </div>
        <svg
          className={`w-4 h-4 text-base-content/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-base-100 border border-base-300 z-50 max-w-full">
          {tokens.map((token, index) => (
            <div key={token.symbol} className="relative">
              <button
                onClick={() => handleTokenClick(token)}
                disabled={!token.enabled}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-left transition-colors min-w-0
                  ${token.enabled ? "hover:bg-base-200 cursor-pointer" : "cursor-not-allowed opacity-50"}
                  ${selectedToken === token.symbol ? "bg-base-200" : ""}
                  ${index !== tokens.length - 1 ? "border-b border-base-300" : ""}
                `}
                title={!token.enabled ? "Próximamente" : ""}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <Image
                    src={token.logo}
                    alt={token.symbol}
                    width={20}
                    height={20}
                    className="rounded-full flex-shrink-0"
                  />
                  <span className="font-medium text-base-content truncate">{token.symbol}</span>
                </div>

                {selectedToken === token.symbol && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* Tooltip para tokens deshabilitados */}
              {!token.enabled && (
                <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
                  <div className="group relative w-full h-full">
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-base-content text-base-100 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Próximamente
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-base-content"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenSelector;
