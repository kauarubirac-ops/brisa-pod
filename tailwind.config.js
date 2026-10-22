/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brisa: 'rgb(var(--red-rgb) / <alpha-value>)',
        ink: 'rgb(var(--black-rgb) / <alpha-value>)',
        paper: 'rgb(var(--white-rgb) / <alpha-value>)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        float: 'float 4.5s ease-in-out infinite',
        fadeUp: 'fadeUp .6s cubic-bezier(.2,.8,.2,1) both',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
