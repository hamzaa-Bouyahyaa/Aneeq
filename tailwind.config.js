/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        navy: {
          DEFAULT: "#14213D",
          light: "#1e3a6d",
          dark: "#0d1526",
        },
        gold: {
          DEFAULT: "#FCA311",
          light: "#fdb644",
          dark: "#e08c00",
        },
        lightGray: "#E5E5E5",
        white: "#FFFFFF",

        // Alias for easier migration
        primary: {
          DEFAULT: "#14213D",
          50: "#e6e8ed",
          100: "#c3c9d6",
          200: "#9aa7bc",
          300: "#7285a1",
          400: "#536c8f",
          500: "#14213D",
          600: "#111d37",
          700: "#0e182f",
          800: "#0a1227",
          900: "#070c1a",
        },
        secondary: {
          DEFAULT: "#FCA311",
          50: "#fff8e6",
          100: "#feefc3",
          200: "#fee49c",
          300: "#fdd874",
          400: "#fcce4d",
          500: "#FCA311",
          600: "#e6940f",
          700: "#bf7b0c",
          800: "#996209",
          900: "#734a07",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        elegant:
          "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
        card: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)",
        nav: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        button: "0 4px 6px -1px rgba(252, 163, 17, 0.3)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
