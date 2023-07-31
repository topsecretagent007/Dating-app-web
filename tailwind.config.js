/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        pinkLight: '#E50AAC',
        blueLight: '#4FAAFF'
      },
      screens: {
        'msm': '505px',
        'maxsm': '370px'
      },
      boxShadow: {
        '3xl': '0 20px 50px 0px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

