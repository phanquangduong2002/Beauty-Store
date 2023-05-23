/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      width: {},
      height: {},
      colors: {
        primaryColor: "rgb(25 148 39)",
        secondaryColor: "rgb(31 96 31)",
        borderColor: "rgb(69 148 41)",
        highlightColor: "rgb(255 102 0)",
        greenColor: "rgb(69 148 41)",
      },
    },
  },
  plugins: [],
};
