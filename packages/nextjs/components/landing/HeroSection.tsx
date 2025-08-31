"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [torchFlicker, setTorchFlicker] = useState({ intensity: 1, offset: { x: 0, y: 0 } });
  const heroRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const torchAnimationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () => heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  useEffect(() => {
    if (isPressed && !isFullyRevealed) {
      const duration = 3000; // 3 segundos para revelar completamente
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setRevealProgress(progress * 100);

        if (progress >= 1) {
          setIsFullyRevealed(true);
        } else if (isPressed) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPressed, isFullyRevealed]);

  useEffect(() => {
    const animateTorch = () => {
      const time = Date.now() * 0.0008; // Reducido de 0.003 a 0.0008 para ser más lento
      const flickerIntensity = 0.9 + Math.sin(time * 1.2) * 0.1 + Math.sin(time * 2.8) * 0.05; // Reducidas las frecuencias
      const offsetX = Math.sin(time * 1.5) * 3 + Math.sin(time * 3.2) * 1.5; // Movimiento más lento
      const offsetY = Math.sin(time * 1.8) * 2 + Math.sin(time * 2.5) * 1; // Movimiento más lento

      setTorchFlicker({
        intensity: flickerIntensity,
        offset: { x: offsetX, y: offsetY },
      });

      torchAnimationRef.current = requestAnimationFrame(animateTorch);
    };

    if (!isFullyRevealed) {
      torchAnimationRef.current = requestAnimationFrame(animateTorch);
    }

    return () => {
      if (torchAnimationRef.current) {
        cancelAnimationFrame(torchAnimationRef.current);
      }
    };
  }, [isFullyRevealed]);

  const handleMouseDown = () => {
    if (!isFullyRevealed) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-base-100 dark:bg-base-100 flex items-center justify-center cursor-pointer select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-15"
          style={{
            backgroundImage: "url(/images/treasure-map.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-base-100/60 dark:bg-base-100/95" />
      </div>

      {!isFullyRevealed && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-75"
          style={{
            background: `radial-gradient(circle ${(80 + revealProgress * 4) * torchFlicker.intensity}px at ${
              mousePosition.x + torchFlicker.offset.x
            }px ${mousePosition.y + torchFlicker.offset.y}px, transparent 0%, transparent 25%, rgba(0,0,0,${
              0.2 * torchFlicker.intensity
            }) 50%, rgba(0,0,0,${0.5 * torchFlicker.intensity}) 70%, rgba(0,0,0,${
              0.8 * torchFlicker.intensity
            }) 85%, rgba(0,0,0,0.95) 100%)`,
          }}
        />
      )}

      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95 transition-all duration-75 ${
          isPressed ? "animate-pulse" : ""
        } ${isFullyRevealed ? "animate-pulse brightness-110 contrast-110" : ""}`}
        style={{
          backgroundImage: "url(/images/treasure-map.jpg)",
          maskImage: isFullyRevealed
            ? "none"
            : `radial-gradient(circle ${(80 + revealProgress * 4) * torchFlicker.intensity}px at ${
                mousePosition.x + torchFlicker.offset.x
              }px ${mousePosition.y + torchFlicker.offset.y}px, black 0%, black 20%, rgba(0,0,0,${
                0.9 * torchFlicker.intensity
              }) 40%, rgba(0,0,0,${0.6 * torchFlicker.intensity}) 60%, rgba(0,0,0,${
                0.3 * torchFlicker.intensity
              }) 75%, rgba(0,0,0,${0.1 * torchFlicker.intensity}) 85%, transparent 100%)`,
          WebkitMaskImage: isFullyRevealed
            ? "none"
            : `radial-gradient(circle ${(80 + revealProgress * 4) * torchFlicker.intensity}px at ${
                mousePosition.x + torchFlicker.offset.x
              }px ${mousePosition.y + torchFlicker.offset.y}px, black 0%, black 20%, rgba(0,0,0,${
                0.9 * torchFlicker.intensity
              }) 40%, rgba(0,0,0,${0.6 * torchFlicker.intensity}) 60%, rgba(0,0,0,${
                0.3 * torchFlicker.intensity
              }) 75%, rgba(0,0,0,${0.1 * torchFlicker.intensity}) 85%, transparent 100%)`,
        }}
      />

      {isFullyRevealed && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-pulse pointer-events-none" />
      )}

      <div
        className={`relative z-10 text-center max-w-5xl mx-auto px-6 transition-all duration-1000 ${
          revealProgress > 80 ? "opacity-100 transform translate-y-0" : "opacity-90 transform translate-y-2"
        } ${isFullyRevealed ? "drop-shadow-2xl" : ""}`}
      >
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-primary dark:text-primary mb-8 tracking-[0.2em] font-mono uppercase drop-shadow-lg transition-all duration-1000 ${
            isFullyRevealed ? "text-shadow-lg animate-pulse brightness-125" : ""
          }`}
        >
          ARCANA
        </h1>

        <div className="mb-10 space-y-4">
          <p className="text-lg md:text-xl lg:text-2xl text-base-content/90 dark:text-base-content/90 leading-relaxed max-w-4xl mx-auto font-mono">
            <span className="text-secondary dark:text-primary font-semibold">Organisations</span> secure, manage, and
            grow their <span className="text-accent dark:text-primary font-semibold">onchain assets</span>.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-base-content/80 dark:text-base-content/80 leading-relaxed max-w-3xl mx-auto font-mono">
            We&apos;re building the{" "}
            <span className="text-primary dark:text-primary font-semibold">largest liquidity network</span> in crypto to
            support your project&apos;s strategic goals.
          </p>
        </div>

        <button
          //   size="lg"
          className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-content font-bold px-10 py-6 text-lg font-mono uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-primary/25 dark:hover:shadow-primary/25 border-2 border-primary/20"
        >
          → IR A LA APP
        </button>
      </div>

      {!isFullyRevealed && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-base-content/60 dark:text-base-content/60 font-mono text-sm animate-pulse mb-2">
            {isPressed ? "Mantén presionado para revelar..." : "Mantén presionado para revelar el mapa"}
          </div>
          {isPressed && (
            <div className="w-48 h-1 bg-base-content/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-100 ease-out"
                style={{ width: `${revealProgress}%` }}
              />
            </div>
          )}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary/20 dark:bg-primary/30 rounded-full animate-pulse ${
              isFullyRevealed ? "bg-primary/40 dark:bg-primary/50 shadow-lg shadow-primary/50" : ""
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(139, 69, 19, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 69, 19, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </section>
  );
}
