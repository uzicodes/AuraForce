/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: 'var(--font-space-grotesk)',
        satoshi: 'var(--font-space-grotesk)',
        ubuntu: 'var(--font-space-grotesk)',
        tenada: 'var(--font-tenada)',
        bebas: 'var(--font-bebas)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
  },
};


