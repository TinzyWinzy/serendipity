/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#152D2B',
          'teal-light': '#1E3D3A',
          'teal-dark': '#0E1F1E',
          gold: '#D6C89F',
          'gold-light': '#E5D9B8',
          'gold-dark': '#B8A87A',
          cream: '#F5F2EF',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
