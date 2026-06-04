/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          green: "#00FF41",
          teal: "#00FFF7",
          purple: "#BF5FFF",
          dark: "#0a0a0f",
          darker: "#050508",
          card: "#0f0f1a",
          border: "#1a1a2e",
        },
      },
      fontFamily: {
        mono: ["'Fira Code'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
