"use client";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-base-100 dark:bg-base-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-base-content dark:text-base-content mb-8 tracking-tight">
          We&apos;re Scaling DeFi.
        </h1>

        <div className="mb-12 space-y-6">
          <p className="text-xl md:text-2xl lg:text-3xl text-base-content/80 dark:text-base-content/80 leading-relaxed max-w-3xl mx-auto font-light">
            Arcana ayuda a las organizaciones a asegurar, gestionar y hacer crecer sus activos onchain. Estamos
            construyendo la mayor red de liquidez en cripto para apoyar los objetivos estratégicos de tu proyecto.
          </p>
        </div>

        <div className="mb-16">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-primary mb-2">
            $1,000,000,000
          </div>
          <div className="text-lg md:text-xl text-base-content/70 dark:text-base-content/70 font-medium">
            DeFi Treasury Network
          </div>
          <div className="text-base md:text-lg text-base-content/60 dark:text-base-content/60 mt-2">
            Non-custodial products and solutions to support your onchain financial operations
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-primary hover:bg-primary/90 text-primary-content font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
            Get Started
          </button>
          <button className="border-2 border-base-content/20 hover:border-primary text-base-content dark:text-base-content font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>
    </section>
  );
}
