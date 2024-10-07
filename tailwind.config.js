/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cookie: ['Cookie'],
        roboto: ['Roboto', 'sans-serif'],
        roman: ['Times New Roman'],
      },
    },
  },
  plugins: [],
};
