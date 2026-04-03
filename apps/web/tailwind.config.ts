import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // La Casa del Yeso Artístico — Brand Colors
        brand: {
          night: "#1A1A2E",    // Azul noche (primario)
          gold: "#C9A96E",     // Dorado premium (acento)
          ivory: "#F5F0EB",    // Blanco marfil (neutro)
        },
      },
    },
  },
  plugins: [],
};
export default config;
