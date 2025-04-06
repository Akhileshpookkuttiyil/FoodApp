/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
      },
      screens: {
        "hide-range": { min: "1024px", max: "1300px" },
        "menu-range": { min: "1024px", max: "1300px" },
      },
    },
  },
  plugins: [],
};
