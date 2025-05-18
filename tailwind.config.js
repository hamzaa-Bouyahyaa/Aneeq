/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Luxury color palette
        black: {
          DEFAULT: "#000000",
          light: "#1a1a1a",
          lighter: "#333333",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C158",
          dark: "#B39429",
          muted: "rgba(212, 175, 55, 0.15)",
        },
        silver: {
          DEFAULT: "#C0C0C0",
          light: "#D9D9D9",
          dark: "#A6A6A6",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },

        // Legacy colors for compatibility
        navy: {
          DEFAULT: "#000000",
          light: "#1a1a1a",
          dark: "#000000",
        },
        lightGray: "#E5E5E5",
        white: "#FFFFFF",

        // Alias for easier migration
        primary: {
          DEFAULT: "#000000",
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#000000",
        },
        secondary: {
          DEFAULT: "#D4AF37",
          50: "#faf6e9",
          100: "#f5edc3",
          200: "#eeda8c",
          300: "#e5c158",
          400: "#d4af37",
          500: "#b39429",
          600: "#8c7420",
          700: "#6b5819",
          800: "#4d4012",
          900: "#33290c",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        display: ["Cinzel", "serif"],
      },
      boxShadow: {
        elegant:
          "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
        card: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)",
        nav: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        button: "0 4px 6px -1px rgba(212, 175, 55, 0.3)",
        luxury: "0 10px 30px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".25em",
        luxury: ".1em",
      },
      lineHeight: {
        "extra-loose": "2.5",
        luxury: "1.8",
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
      },
    },
  },
  plugins: [],
};
