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
  const [isScrolling, setIsScrolling] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const scrollToSection = (href: string) => {
    if (href.startsWith("#") && !isScrolling) {
      const element = document.querySelector(href);
      if (element) {
        setIsScrolling(true);

        // Calcular la posición exacta
        const navbarHeight = 70;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        // Scroll suave con easing
        const startPosition = window.pageYOffset;
        const distance = elementPosition - startPosition;
        const duration = 1000; // 1 segundo
        let start: number | null = null;

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            setIsScrolling(false);
          }
        };

        requestAnimationFrame(animation);
      }
    }
    setIsDrawerOpen(false);
  };

  // Función de easing para scroll más suave
  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };

  return (
    <div className="sticky top-0 z-50 flex justify-center navbar bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="navbar-start">
        <Link href="/" passHref className="hidden lg:flex items-center gap-1 ml-4 mr-6 shrink-0">
          <Logo />
        </Link>
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <Logo showArcana={false} />
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
                    disabled={isScrolling}
                    className={cn(
                      "!text-base-content hover:!text-primary transition-colors duration-200",
                      isActive && "!text-primary",
                      isScrolling && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={href}
                    className={cn(
                      "!text-base-content hover:!text-primary transition-colors duration-200",
                      isActive && "!text-primary",
                    )}
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
              className="menu border-base-300 border menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {landingMenuLinks.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    {href.startsWith("#") ? (
                      <button
                        onClick={() => scrollToSection(href)}
                        disabled={isScrolling}
                        className={cn(
                          "!text-base-content hover:!text-primary transition-colors duration-200",
                          isActive && "!text-primary",
                          isScrolling && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        {label}
                      </button>
                    ) : (
                      <Link
                        href={href}
                        className={cn(
                          "!text-base-content hover:!text-primary transition-colors duration-200",
                          isActive && "!text-primary",
                        )}
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
