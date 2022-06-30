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
        lightBlue: "#27AEF9",
        normalBlue: "#4F75FF",
        lightOrange: "#F9F6F4",
        normalOrange: "#FF8A48",
        darkOrange: "#C55E00",
        extraLightGray: "#EAF1F8",
        lightGray: "#F7F7F8",
        normalGray: "#EDEDED",
        darkGray: "#F1F4F8",
        extraDarkGray: "#919DBA",
        lightBrown: "#8F8682",
        normalBrown: "#EDE6E6",
        darkBrown: "#766A64",
        extraDarkBrown: "#4A3C33",
        darkestBrown: "#4B3D36",
        darkYellow: "#FFB800",
        lightGreen: "#DEF7E0",
        normalGreen: "#03AC00",
        lightRed: "#F8EBE8",
        normalRed: "#FD5959",
      },
    },
  },
  plugins: [],
};
