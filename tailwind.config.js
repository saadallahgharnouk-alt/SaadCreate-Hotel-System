/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-shine":
          "linear-gradient(135deg, #E6C88A 0%, #C8A35A 45%, #8C6B2E 100%)",
      },
      colors: {
        brand: {
          navy: "#0B1B2B",
          "navy-soft": "#122a40",
          "navy-line": "#1a3550",
          gold: "#C8A35A",
          "gold-light": "#E6C88A",
          "gold-dark": "#8C6B2E",
          ivory: "#F6F1E7",
          cream: "#FBF8F1",
          charcoal: "#1c1c1c",
          mute: "#8a7f6e",
        },
      },
      boxShadow: {
        lux: "0 20px 60px -20px rgba(11,27,43,0.35)",
        gold: "0 12px 30px -12px rgba(200,163,90,0.55)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};
