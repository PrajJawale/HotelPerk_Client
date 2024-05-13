/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '60%': { transform: 'scale(1.05)', opacity: '1' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        textGlow: {
          '0%, 100%': { textShadow: '0 0 8px white' },
          '50%': { textShadow: '0 0 16px white' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 1s ease-out',
        textGlow: 'textGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

