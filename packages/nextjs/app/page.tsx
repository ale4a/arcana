"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const stats = [
    { label: "Total Value Locked", value: "$354.32M" },
    { label: "Active Vaults", value: "3" },
    { label: "Total Users", value: "2,847" },
    { label: "Average APY", value: "8.73%" },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-base-100 border border-base-300 mb-8">
          <div className="bg-base-300 text-base-content p-6">
            <h1 className="text-4xl font-bold uppercase tracking-wider">VAULT PROTOCOL</h1>
            <p className="text-lg mt-2 opacity-90">Earn yield on your crypto assets</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-base-200 border border-base-300 p-4">
                  <div className="text-sm font-medium text-base-content/70 uppercase tracking-wide">{stat.label}</div>
                  <div className="text-2xl font-bold text-base-content mt-1">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/vaults" className="block">
            <div className="bg-base-100 border border-base-300 p-6 hover:bg-base-200 transition-colors">
              <h3 className="text-xl font-bold text-base-content mb-2">Browse Vaults</h3>
              <p className="text-base-content/70 mb-4">
                Explore available vaults and start earning yield on your assets
              </p>
              <div className="inline-flex items-center text-primary font-medium">View Vaults →</div>
            </div>
          </Link>

          <Link href="/earn" className="block">
            <div className="bg-base-100 border border-base-300 p-6 hover:bg-base-200 transition-colors">
              <h3 className="text-xl font-bold text-base-content mb-2">Start Earning</h3>
              <p className="text-base-content/70 mb-4">Deposit your tokens and start earning rewards immediately</p>
              <div className="inline-flex items-center text-primary font-medium">Start Earning →</div>
            </div>
          </Link>
        </div>

        {/* Featured Vaults */}
        <div className="bg-base-100 border border-base-300">
          <div className="bg-base-300 text-base-content p-4">
            <h2 className="text-xl font-bold uppercase tracking-wider">FEATURED VAULTS</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-base-200 border border-base-300 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-base-300 border border-base-content flex items-center justify-center text-xs font-bold">
                      ETH
                    </div>
                    <span className="font-medium">ETH Liquid Staking</span>
                  </div>
                  <span className="text-success font-bold">5.2%</span>
                </div>
                <div className="text-sm text-base-content/70">TVL: $15.4M</div>
              </div>

              <div className="bg-base-200 border border-base-300 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-base-300 border border-base-content flex items-center justify-center text-xs font-bold">
                      USDC
                    </div>
                    <span className="font-medium">USDC Yield Farm</span>
                  </div>
                  <span className="text-success font-bold">8.7%</span>
                </div>
                <div className="text-sm text-base-content/70">TVL: $892.3M</div>
              </div>

              <div className="bg-base-200 border border-base-300 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-base-300 border border-base-content flex items-center justify-center text-xs font-bold">
                      LISK
                    </div>
                    <span className="font-medium">LISK Staking Pool</span>
                  </div>
                  <span className="text-success font-bold">12.3%</span>
                </div>
                <div className="text-sm text-base-content/70">TVL: $234.6M</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
