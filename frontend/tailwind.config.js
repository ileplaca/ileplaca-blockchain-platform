/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': "#1B1A1D",
        'primary-bg': "#151416",
        'primary-text': "#ffffff",
        'text': "rgb(233, 233, 233)",
        'subtext': "rgb(200, 200, 200)",
        'primary': "rgb(79 70 229)",
        'primary-hover': "rgb(67 56 202)",
        'secondary': 'rgb(163 230 53)',
        'secondary-hover': "rgb(132 204 22)",
      },
      borderRadius: {
        'button': '0.25rem'
      }
    },
  },
  plugins: [],
}

