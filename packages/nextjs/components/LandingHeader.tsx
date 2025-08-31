"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { SwitchTheme } from "./SwitchTheme";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { cn } from "~~/utils/cn";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const landingMenuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Problem",
    href: "#problem",
  },
  {
    label: "Solution",
    href: "#how-it-works",
  },
  {
    label: "System Architecture",
    href: "#system-architecture",
  },
  {
    label: "Roadmap",
    href: "#milestones",
  },
];

const LandingHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsDrawerOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 flex justify-center navbar bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="navbar-start">
        <div className="hidden sm:flex items-center gap-2 mr-6">
          <Logo />
        </div>
        <div className="dropdown sm:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <Logo />
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal menu-md bg-base-200/50 rounded-box">
          {landingMenuLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                {href.startsWith("#") ? (
                  <button
                    onClick={() => scrollToSection(href)}
                    className={cn("!text-base-content hover:!text-primary", isActive && "!text-primary")}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={href}
                    className={cn("!text-base-content hover:!text-primary", isActive && "!text-primary")}
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end">
        <SwitchTheme />
        <div className="dropdown dropdown-end lg:hidden" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-base-100"}`}
            onClick={() => setIsDrawerOpen(prevIsOpen => !prevIsOpen)}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {landingMenuLinks.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    {href.startsWith("#") ? (
                      <button
                        onClick={() => scrollToSection(href)}
                        className={cn("!text-base-content hover:!text-primary", isActive && "!text-primary")}
                      >
                        {label}
                      </button>
                    ) : (
                      <Link
                        href={href}
                        className={cn("!text-base-content hover:!text-primary", isActive && "!text-primary")}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
