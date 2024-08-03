/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pryColor: '#53127d',
        secColor: '#ffa24f',
        white: '#fff',
        black: '#131214',
        positive: '#20af0b',
        negative: '#ff3b2d',
      },

      boxShadow: {
        '3xl': '0px 0px 40px 0px #0000000D',
      },
    },
  },
  plugins: [],
};
