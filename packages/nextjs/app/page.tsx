"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireccionar automáticamente a /vaults
    router.push("/vaults");
  }, [router]);

  // Mostrar un loading mientras redirecciona
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
        <p className="text-base-content/70">Redirecting to vaults...</p>
      </div>
    </div>
  );
};

export default HomePage;
