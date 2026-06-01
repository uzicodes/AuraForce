/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: 'var(--font-ubuntu)',
        satoshi: 'var(--font-satoshi)',
        tenada: 'var(--font-tenada)',
        parket: 'var(--font-parket)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
  },
};


