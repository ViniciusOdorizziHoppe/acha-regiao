/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Yellow brand system (DOMINANT — 40%+ of surface)
        "brand": "#F5C518",
        "brand-bright": "#FFD42A",
        "brand-dark": "#D4A800",
        "brand-glow": "#FFF0A8",

        // Dark surfaces (contrast against yellow)
        "root": "#0C0C0E",
        "card": "#19191C",
        "card-light": "#222226",
        "input": "#252528",
        "border": "#333338",

        // Text
        "text-primary": "#F5F5F7",
        "text-secondary": "#B0B0B8",
        "text-muted": "#6E6E76",
        "text-on-yellow": "#1A1800",

        // Semantic
        "success": "#4ADE80",
        "error": "#F87171",
        "whatsapp": "#25D366",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "hero": ["28px", { lineHeight: "34px", fontWeight: "800" }],
        "h1": ["22px", { lineHeight: "28px", fontWeight: "700" }],
        "h2": ["17px", { lineHeight: "24px", fontWeight: "600" }],
        "body": ["14px", { lineHeight: "20px" }],
        "caption": ["12px", { lineHeight: "16px" }],
        "price": ["20px", { lineHeight: "26px", fontWeight: "800" }],
      },
      borderRadius: {
        "card": "16px",
        "button": "12px",
        "input": "14px",
        "badge": "6px",
      },
    },
  },
  plugins: [],
};
