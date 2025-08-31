"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const ProblemSection = () => {
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
    <section id="problem" className="min-h-[calc(100vh-80px)] flex items-center bg-base-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-8 w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-4">The Problem</h2>
          <p className="text-base sm:text-lg text-base-content/60 max-w-2xl mx-auto">
            Current DeFi limitations that prevent institutional adoption
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-error/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image
                src={isDark ? "/illustrations/dark/whale-dark.svg" : "/illustrations/light/whale-light.svg"}
                alt="Limited Liquidity"
                width={40}
                height={40}
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-3">Limited Liquidity</h3>
            <p className="text-sm sm:text-base text-base-content/70">
              Pools cannot absorb institutional-size capital, causing yield collapse at scale
            </p>
          </div>

          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image
                src={isDark ? "/illustrations/dark/compass-dark.svg" : "/illustrations/light/compass-light.svg"}
                alt="Manual Inefficiency"
                width={40}
                height={40}
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-3">Manual Inefficiency</h3>
            <p className="text-sm sm:text-base text-base-content/70">
              Funds must be moved constantly across protocols, requiring constant attention
            </p>
          </div>

          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-info/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image
                src={isDark ? "/illustrations/dark/sword-dark.svg" : "/illustrations/light/sword-light.svg"}
                alt="Lack of Tools"
                width={40}
                height={40}
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-3">Lack of Tools</h3>
            <p className="text-sm sm:text-base text-base-content/70">
              Not crosschain, not fully transparent, not audited for institutional use
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
