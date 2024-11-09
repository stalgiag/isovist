/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
        "desktop-layout": "1fr 1fr 1fr",
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
