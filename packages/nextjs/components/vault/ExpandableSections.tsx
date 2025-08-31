import React from "react";

interface ExpandableSectionsProps {
  expandedSections: { [key: string]: boolean };
  toggleSection: (section: string) => void;
}

const ExpandableSections: React.FC<ExpandableSectionsProps> = ({ expandedSections, toggleSection }) => {
  return (
    <>
      {/* Hyperbeat Rewards */}
      <div className="bg-base-100 border border-base-300">
        <button
          onClick={() => toggleSection("rewards")}
          className="w-full p-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
        >
          <span className="font-medium">HYPERBEAT REWARDS</span>
          <span className="text-xl">{expandedSections.rewards ? "−" : "+"}</span>
        </button>
        {expandedSections.rewards && (
          <div className="p-4 border-t border-base-300">
            <p className="text-sm text-base-content/70">Earn additional rewards through the Hyperbeat protocol.</p>
          </div>
        )}
      </div>

      {/* How it Works */}
      <div className="bg-base-100 border border-base-300">
        <button
          onClick={() => toggleSection("howItWorks")}
          className="w-full p-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
        >
          <span className="font-medium">HOW IT WORKS?</span>
          <span className="text-xl">{expandedSections.howItWorks ? "−" : "+"}</span>
        </button>
        {expandedSections.howItWorks && (
          <div className="p-4 border-t border-base-300">
            <p className="text-sm text-base-content/70">
              Automated DeFi strategy that dynamically allocates capital across multiple protocols to maximize yield.
            </p>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="bg-base-100 border border-base-300">
        <button
          onClick={() => toggleSection("faq")}
          className="w-full p-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
        >
          <span className="font-medium">FAQ</span>
          <span className="text-xl">{expandedSections.faq ? "−" : "+"}</span>
        </button>
        {expandedSections.faq && (
          <div className="p-4 border-t border-base-300">
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium mb-1">What is the USDT vault?</div>
                <div className="text-base-content/70">
                  A yield-generating vault that optimizes returns on USDT deposits.
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">What happens to deposited assets?</div>
                <div className="text-base-content/70">
                  Assets are allocated across various DeFi protocols to generate yield.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audits */}
      <div className="bg-base-100 border border-base-300">
        <button
          onClick={() => toggleSection("audits")}
          className="w-full p-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
        >
          <span className="font-medium">AUDITS</span>
          <span className="text-xl">{expandedSections.audits ? "−" : "+"}</span>
        </button>
        {expandedSections.audits && (
          <div className="p-4 border-t border-base-300">
            <p className="text-sm text-base-content/70">
              Security audits and risk assessments available in documentation.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ExpandableSections;
