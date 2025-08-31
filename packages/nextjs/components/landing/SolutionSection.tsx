"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const SolutionSection = () => {
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
    <section id="how-it-works" className="min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-8 w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-4 mt-12">
            The Solution – Arcana
          </h2>
          <p className="text-base sm:text-lg text-base-content/60 max-w-2xl mx-auto">
            Smart vaults with AI + DAO rebalancing for sustainable institutional yield
          </p>
        </div>

        <div className="space-y-12 sm:space-y-4">
          {/* Vault V1 Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="bg-base-100 p-6 sm:p-8 rounded-xl border border-base-300">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Vault V1</h3>
              <p className="text-sm sm:text-base text-base-content/70 mb-4">
                Proof of concept, small–mid volume strategies
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-base-content/70">
                <li>• Initial deployment strategies</li>
                <li>• Risk assessment and validation</li>
                <li>• Community feedback integration</li>
              </ul>
            </div>
            <div className="bg-base-100 p-6 sm:p-8 rounded-xl border border-primary/20 order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Vault V2 Crosschain</h3>
              <p className="text-sm sm:text-base text-base-content/70 mb-4">Scalable, diversified, sustainable yield</p>
              <ul className="space-y-2 text-sm sm:text-base text-base-content/70">
                <li>• Multi-chain asset deployment</li>
                <li>• Advanced risk diversification</li>
                <li>• Institutional-grade scalability</li>
              </ul>
            </div>
          </div>

          {/* AI + DAO Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            <div className="bg-gradient-to-br from-primary/10 col-span-2 to-accent/10 p-6 sm:p-8 rounded-xl border border-primary/20">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">AI + DAO Rebalancing</h3>
              <p className="text-sm sm:text-base text-base-content/70 mb-6">
                AI proposes allocations, DAO validates for transparency & security
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-base-100/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-base-content mb-2 text-sm sm:text-base">AI Optimization Layer</h4>
                  <p className="text-xs sm:text-sm text-base-content/70">
                    Continuous market/risk analysis and strategy optimization
                  </p>
                </div>

                <div className="bg-base-100/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-base-content mb-2 text-sm sm:text-base">DAO Governance</h4>
                  <p className="text-xs sm:text-sm text-base-content/70">
                    Community validation of AI proposals for transparency
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center justify-items-center col-span-1 hidden lg:block">
              <Image
                src={isDark ? "/illustrations/dark/compass-dark.svg" : "/illustrations/light/compass-light.svg"}
                alt="AI + DAO"
                width={256}
                height={256}
                className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
              />
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-success/10 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-success">Sustainable</div>
              <div className="text-xs sm:text-sm text-base-content/70">yield</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-primary/10 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-primary">Automated</div>
              <div className="text-xs sm:text-sm text-base-content/70">management</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-accent/10 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-accent">Risk</div>
              <div className="text-xs sm:text-sm text-base-content/70">diversification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
