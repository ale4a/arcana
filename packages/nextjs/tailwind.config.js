/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          // Tema "Pergamino Claro" - Colores puros y cálidos
          primary: "#8B4513", // Marrón cuero
          "primary-content": "#FFFFFF", // Blanco puro
          secondary: "#CD853F", // Marrón dorado
          "secondary-content": "#FFFFFF", // Blanco puro
          accent: "#B22222", // Rojo óxido
          "accent-content": "#FFFFFF", // Blanco puro
          neutral: "#654321", // Marrón tierra
          "neutral-content": "#FFFFFF", // Blanco puro
          "base-100": "#F4E2C8", // Beige cálido base
          "base-200": "#F0D9B5", // Beige más oscuro
          "base-300": "#E8CFA2", // Beige aún más oscuro
          "base-content": "#2F1B14", // Marrón muy oscuro para texto
          info: "#4682B4", // Azul acero
          success: "#228B22", // Verde bosque
          warning: "#DAA520", // Dorado
          error: "#DC143C", // Rojo carmesí

          "--rounded-btn": "0.5rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          // Tema "Negro Típico" - Negro puro y elegante
          primary: "#3B82F6", // Azul moderno
          "primary-content": "#FFFFFF", // Blanco puro
          secondary: "#6B7280", // Gris neutro
          "secondary-content": "#FFFFFF", // Blanco puro
          accent: "#F59E0B", // Amarillo/naranja
          "accent-content": "#000000", // Negro puro
          neutral: "#374151", // Gris oscuro
          "neutral-content": "#FFFFFF", // Blanco puro
          "base-100": "#000000", // Negro puro base
          "base-200": "#1F1F1F", // Gris muy oscuro
          "base-300": "#2D2D2D", // Gris oscuro
          "base-content": "#FFFFFF", // Blanco puro para texto
          info: "#3B82F6", // Azul
          success: "#10B981", // Verde
          warning: "#F59E0B", // Amarillo
          error: "#EF4444", // Rojo

          "--rounded-btn": "0.5rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
