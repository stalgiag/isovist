/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
  plugins: [],
};
