/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#2d2d2d',
        accent: '#c9a961',
        'accent-dark': '#b39451',
        'text-light': '#666666',
        border: '#e5e5e5',
        background: '#ffffff',
        'background-alt': '#f8f8f8',
        whatsapp: '#25D366',
        instagram: '#E4405F',
      },
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
