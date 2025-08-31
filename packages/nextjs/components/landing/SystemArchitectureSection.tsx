"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const SystemArchitectureSection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return null;
  }

  return (
    <section id="system-architecture" className="min-h-[calc(100vh-80px)] flex items-center bg-base-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-8 w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-4">System Architecture</h2>
          <p className="text-base sm:text-lg text-base-content/60 max-w-2xl mx-auto">
            Integrated with leading DeFi protocols for maximum yield optimization
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image
                src={isDark ? "/illustrations/dark/ship-dark.svg" : "/illustrations/light/ship-light.svg"}
                alt="Crosschain"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2">Crosschain Vaults</h3>
            <p className="text-xs sm:text-sm text-base-content/70">
              Integrated with Aave, Curve, Compound, Beefy, Morpho, etc.
            </p>
          </div>

          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image
                src={isDark ? "/illustrations/dark/feather-dark.svg" : "/illustrations/light/feather-light.svg"}
                alt="AI"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2">AI Optimization</h3>
            <p className="text-xs sm:text-sm text-base-content/70">
              Continuous market/risk analysis and strategy optimization
            </p>
          </div>

          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image
                src={isDark ? "/illustrations/dark/book-dark.svg" : "/illustrations/light/book-light.svg"}
                alt="DAO"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2">DAO Governance</h3>
            <p className="text-xs sm:text-sm text-base-content/70">
              Community validation of AI proposals for transparency
            </p>
          </div>

          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image
                src={isDark ? "/illustrations/dark/sword-dark.svg" : "/illustrations/light/sword-light.svg"}
                alt="Security"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2">Risk Mitigation</h3>
            <p className="text-xs sm:text-sm text-base-content/70">
              Audited contracts, open-source, multi-strategy diversification
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemArchitectureSection;
