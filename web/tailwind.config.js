const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Open Sans", ...defaultTheme.fontFamily.sans],
        "serif": ["Merriweather", ...defaultTheme.fontFamily.serif],
        "header-sans": ["Open Sans Bold", ...defaultTheme.fontFamily.sans],
        "header-serif": ["Merriweather Bold", ...defaultTheme.fontFamily.serif]
      },
      keyframes: {
        beat: {
          "0%, 100%": { color: "#de8e81" },
          "50%": { color: "#e16c55" }
        }
      },
      animation: {
        beat: "beat 1.2s ease-in-out infinite"
      }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: {
        300: "#72aeba",
        400: "#6aaab6",
        500: "#337382",
        600: "#27897c",
        700: "#00666d"
      },
      orange: {
        300: "#e4bb61",
        500: "#bb7929",
        600: "#de8e81",
        700: "#e16c55"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
