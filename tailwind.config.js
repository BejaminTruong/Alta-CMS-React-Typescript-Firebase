/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      montserat: ["Montserrat"],
    },
    extend: {
      colors: {
        lightOrange: "#F9F6F4",
        lightGray: "#EDE6E6",
        darkYellow: "#FFB800",
        light: "#FFFFFF",
        darkBrown: "#766A64",
      },
    },
  },
  plugins: [],
};
