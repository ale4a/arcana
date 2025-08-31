import React from "react";
import { ProtocolStats } from "./ProtocolStats";

export const Footer = () => {
  return (
    <footer className="hidden lg:block sticky bottom-0 bg-base-200 border-t border-base-300">
      <ProtocolStats />
    </footer>
  );
};
