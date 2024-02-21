/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7E84",
        primary: {
          DEFAULT: "#FF7E84",
          600: "#e57076",
        },
        secondary: "#30BEAD",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addComponents }) {
      addComponents({
        ".form-checkbox": {
          "&:checked": {
            backgroundColor: "#FF7E84",
            borderColor: "#FF7E84",
          },
        },
      });
    },
  ],
};
