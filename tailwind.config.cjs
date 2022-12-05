/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: { darkPrimary: "#191921" },
      fontFamily: {
        sans: ["Open Sans"],
      },
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    },
    dropShadow: {
      white: [
        "0 35px 35px rgba(155, 155, 155, 0.35)",
        "0 45px 65px rgba(155, 155, 155, 0.35)",
      ],
    },
  },

  plugins: [],
};
