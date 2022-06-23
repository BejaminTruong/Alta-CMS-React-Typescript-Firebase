/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      montserat: ["Montserrat"],
    },
    extend: {
      colors: {
        light: "#FFFFFF",
        normalBlue: "#4F75FF",
        lightOrange: "#F9F6F4",
        normalOrange: "#FF8A48",
        lightGray: "#F7F7F8",
        normalGray: "#EDEDED",
        lightBrown: "#8F8682",
        normalBrown: "#EDE6E6",
        darkBrown: "#766A64",
        extraDarkBrown: "#4A3C33",
        darkYellow: "#FFB800",
      },
    },
  },
  plugins: [],
};
