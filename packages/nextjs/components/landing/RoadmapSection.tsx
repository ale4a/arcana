"use client";

import React from "react";

const RoadmapSection = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section id="milestones" className="min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-8 w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-4">Roadmap</h2>
          <p className="text-base sm:text-lg text-base-content/60 max-w-2xl mx-auto">
            Our path to institutional adoption and $1B+ AUM
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-primary/20 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Q1 2025</div>
            <h3 className="font-semibold text-base-content mb-2 text-sm sm:text-base">Vault V1 Launch</h3>
            <p className="text-xs sm:text-sm text-base-content/70">Mainnet deployment with initial strategies</p>
          </div>

          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Q2 2025</div>
            <h3 className="font-semibold text-base-content mb-2 text-sm sm:text-base">Crosschain Integration</h3>
            <p className="text-xs sm:text-sm text-base-content/70">B2B partnerships and multi-chain expansion</p>
          </div>

          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Q3 2025</div>
            <h3 className="font-semibold text-base-content mb-2 text-sm sm:text-base">AI + DAO Launch</h3>
            <p className="text-xs sm:text-sm text-base-content/70">Automated rebalancing with community governance</p>
          </div>

          <div className="bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-2">Q4 2025</div>
            <h3 className="font-semibold text-base-content mb-2 text-sm sm:text-base">Institutional Adoption</h3>
            <p className="text-xs sm:text-sm text-base-content/70">$100M AUM target and Web2 expansion</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
