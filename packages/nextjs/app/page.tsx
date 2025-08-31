"use client";

import React from "react";
import ScrollToTop from "~~/components/ScrollToTop";
import {
  CTASection,
  HeroSection,
  ProblemSection,
  RoadmapSection,
  SolutionSection,
  SystemArchitectureSection,
} from "~~/components/landing";

const HomePage = () => {
  return (
    <div className="bg-base-100">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <SystemArchitectureSection />
      <RoadmapSection />
      <CTASection />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
