"use client";

import React from "react";
import Link from "next/link";

const CTASection = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-8 w-full">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content">
              Ready to Scale DeFi Like Never Before?
            </h2>
            <p className="text-base sm:text-lg text-base-content/60">
              Join Arcana and experience asset management redefined for the institutional era of DeFi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vaults"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-content font-semibold rounded-lg hover:bg-primary-focus transition-colors text-sm sm:text-base"
            >
              Explore Vaults
            </Link>
            <a
              href="https://puddle-feverfew-e8a.notion.site/Arcana-Whitepaper-2607f7e814af80439387cc6e0e5a0f34?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-base-300 text-base-content font-semibold rounded-lg hover:bg-base-200 transition-colors text-sm sm:text-base"
            >
              Read Whitepaper
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-base-content/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Audited Contracts</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Open Source</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>DAO Governed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
