import React from "react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo y Nombre */}
          <div className="flex items-center space-x-3">
            <Logo size={40} />
            <span className="text-xl font-medium text-base-content">Arcana</span>
          </div>

          {/* Enlaces */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm font-medium text-base-content hover:text-primary transition-colors uppercase tracking-wide"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-sm font-medium text-base-content hover:text-primary transition-colors uppercase tracking-wide"
            >
              Terms
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-base-content/70 text-center">© 2025 Arcana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
