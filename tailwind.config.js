/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7E84",
        secondary: "#30BEAD",
      },
    },
  },
  plugins: [],
};
