"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Props = {
  size?: number;
  className?: string;
};

/**
 * Arcana logo que se adapta al tema dark/light.
 */
export const Logo: React.FC<Props> = ({ size = 48, className = "" }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Renderizar un placeholder mientras carga
    return <div className={`w-${size / 4} h-${size / 4} bg-base-content/20 rounded ${className}`} />;
  }

  const strokeColor = resolvedTheme === "dark" ? "#FFFFFF" : "#000000";
  const fillColor = resolvedTheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.8411 43.8388L74.8409 43.8388M21.9202 65.76L65.7607 21.9195M21.9208 21.9196L65.7613 65.7602M43.8412 12.8379L43.8412 74.8378"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M21.9204 21.9192L65.7609 65.7598" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
      <path
        d="M43.8314 15.3492C59.5662 15.3546 72.3175 28.1148 72.3124 43.8497C72.3071 59.5843 59.5476 72.3355 43.8129 72.3307C28.0781 72.3256 15.3261 59.566 15.331 43.8312C15.336 28.0962 28.0964 15.3441 43.8314 15.3492ZM43.8298 20.1471C30.7448 20.1428 20.133 30.7477 20.1288 43.8328C20.1248 56.9176 30.7296 67.5286 43.8145 67.5328C56.8992 67.5368 67.5101 56.9328 67.5145 43.8481C67.5188 30.7632 56.9147 20.1515 43.8298 20.1471ZM43.8316 38.7555C46.6344 38.7555 48.9069 41.0276 48.9071 43.8304C48.9071 46.6332 46.6351 48.9058 43.8322 48.9059C41.0294 48.9059 38.7569 46.6338 38.7567 43.831C38.7567 41.0282 41.0289 38.7557 43.8316 38.7555Z"
        fill={fillColor}
        stroke={strokeColor}
      />
    </svg>
  );
};
