/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        din: ["Din", "Helvetica Neue", "sans-serif"],
        "din-medium": ["Din Medium", "Helvetica Neue", "sans-serif"],
        "helvetica-neue": ["Helvetica Neue", "sans-serif"],
      },
      gridTemplateAreas: {
        "mobile-layout": [
          "top-left top-right",
          "main main",
          "nav nav",
          "footer footer",
        ],
        "desktop-layout": [
          "top top top",
          "main-left main-center main-right",
          "nav nav nav",
          "footer footer footer",
        ],
      },
      gridTemplateColumns: {
        "mobile-layout": "1fr 1fr",
        "desktop-layout": "30% 40% 30%",
      },
      gridTemplateRows: {
        "mobile-layout": "25% 40% 25% 5%",
        "desktop-layout":
          "minmax(120px, 16vh) minmax(400px, 45vh) minmax(200px, 25vh) minmax(25px, 5vh)",
      },
      colors: {
        background: "#13151a",
        foreground: "white",
        "foreground-secondary": "#f99806",
      },
      backgroundImage: {
        "foreground-gradient":
          "linear-gradient(45deg, white, #f99806 30%, white 60%)",
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
