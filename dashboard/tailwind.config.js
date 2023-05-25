/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      width: {},
      height: {},
      colors: {
        secondaryColor: "rgb(25 148 39)",
        primaryColor: "rgb(31 96 31)",
        borderColor: "rgb(69 148 41)",
        highlightColor: "rgb(255 102 0)",
        redColor: "rgb(255 0 0)",
        greenColor: "rgb(69 148 41)",
        secondaryBgColor: "#eee",
        secondaryIconColor: "#999",
        textColor: "#383838",
        secondaryTextColor: "#666666",
        borderInputColor: "rgba(0 0 0 0.4)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
