/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "grayish-cyan": {
          100: "hsl(189, 41%, 97%)",
          200: "hsl(185, 41%, 84%)",
          300: "hsl(184, 14%, 56%)",
          400: "hsl(186, 14%, 43%)",
        },
        cyan: {
          500: "hsl(172, 67%, 45%)",
          600: "hsl(183, 100%, 15%)",
        },
      },
    },
  },
  plugins: [],
};
