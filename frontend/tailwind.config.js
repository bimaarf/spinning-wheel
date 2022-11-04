/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      headerImage: {
        "hero-pattern": "url('/Images/bg.JPG')",
      },
    },
  },
  plugins: [],
};
