"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import ScrollToTop from "~~/components/ScrollToTop";

const HomePage = () => {
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
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content leading-tight">
                  Asset Management <span className="text-primary">Like Never Before</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-base-content/70 leading-relaxed">
                  Scaling yield safely for large volumes of capital with crosschain vaults powered by AI + DAO
                  rebalancing
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 lg:pt-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">$1B+</div>
                  <div className="text-xs sm:text-sm text-base-content/60">Target AUM</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">AI + DAO</div>
                  <div className="text-xs sm:text-sm text-base-content/60">Rebalancing</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">Crosschain</div>
                  <div className="text-xs sm:text-sm text-base-content/60">Vaults</div>
                </div>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src={isDark ? "/illustrations/dark/octopus-dark.svg" : "/illustrations/light/octopus-light.svg"}
                alt="Arcana Vault"
                width={384}
                height={384}
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-16 sm:py-20 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

      {/* Solution Section */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-4">The Solution – Arcana</h2>
            <p className="text-base sm:text-lg text-base-content/60 max-w-2xl mx-auto">
              Smart vaults with AI + DAO rebalancing for sustainable institutional yield
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
            {/* Left - Vault Types */}
            <div className="space-y-6 sm:space-y-8">
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

              <div className="bg-base-100 p-6 sm:p-8 rounded-xl border border-primary/20">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Vault V2 Crosschain</h3>
                <p className="text-sm sm:text-base text-base-content/70 mb-4">
                  Scalable, diversified, sustainable yield
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-base-content/70">
                  <li>• Multi-chain asset deployment</li>
                  <li>• Advanced risk diversification</li>
                  <li>• Institutional-grade scalability</li>
                </ul>
              </div>
            </div>

            {/* Right - AI + DAO */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 sm:p-8 rounded-xl border border-primary/20">
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

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
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
        </div>
      </section>

      {/* System Architecture */}
      <section id="system-architecture" className="py-16 sm:py-20 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

      {/* Roadmap */}
      <section id="milestones" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
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

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
