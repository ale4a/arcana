"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const HeroSection = () => {
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
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 col-span-2">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-5xl font-bold text-base-content leading-tight">
                Asset Management <span className="text-primary">Like Never Before</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-base-content/70 leading-relaxed">
                Scaling yield safely for large volumes of capital with crosschain vaults powered by AI + DAO rebalancing
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-base-200/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">$1B+</div>
                <div className="text-sm text-base-content/70">Target AUM</div>
              </div>
              <div className="bg-base-200/50 rounded-lg p-4 text-center">
                <div className="text-lg font-semibold text-primary">AI + DAO</div>
                <div className="text-sm text-base-content/70">Rebalancing</div>
              </div>
              <div className="bg-base-200/50 rounded-lg p-4 text-center">
                <div className="text-lg font-semibold text-primary">Crosschain</div>
                <div className="text-sm text-base-content/70">Vaults</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/vaults"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-content font-semibold rounded-lg hover:bg-primary-focus transition-colors text-lg"
              >
                Explore Vaults
              </Link>
              <a
                href="https://puddle-feverfew-e8a.notion.site/Arcana-Whitepaper-2607f7e814af80439387cc6e0e5a0f34?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-base-300 text-base-content font-semibold rounded-lg hover:bg-base-200 transition-colors text-lg"
              >
                Read Whitepaper
              </a>
            </div>
          </div>

          {/* Right - Illustration */}
          <div className="flex justify-center lg:justify-end col-span-1 mt-4">
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
  );
};

export default HeroSection;
