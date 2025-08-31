"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mostrar el botón cuando el usuario haga scroll más de 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Función de easing para scroll más suave
  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };

  // Scroll suave hacia arriba
  const scrollToTop = () => {
    if (!isScrolling) {
      setIsScrolling(true);

      const startPosition = window.pageYOffset;
      const distance = -startPosition; // Ir hacia arriba
      const duration = 1200; // 1.2 segundos
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
  };

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          disabled={isScrolling}
          className={`fixed lg:bottom-10 bottom-4 lg:right-4 right-6 z-50 p-3 bg-primary text-primary-content rounded-full shadow-lg hover:bg-primary-focus transition-all duration-300 transform hover:scale-110 ${
            isScrolling ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Volver arriba"
        >
          {/* Ilustración de gancho/hook */}
          <Image
            src={isDark ? "/illustrations/dark/hook-dark.svg" : "/illustrations/light/hook-light.svg"}
            alt="Volver arriba"
            width={32}
            height={32}
          />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
