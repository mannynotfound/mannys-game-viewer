/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      current: 'currentColor',
      green: '#70bf44',
      yellow: '#F0C925',
      white: '#fff',
      black: '#000',
    },
    fontFamily: {
      sans: ['PP Mono'],
      serif: ['PP Mono'],
      body: ['PP Mono'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1800px',
    },
  },
};
