/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1B3B7E',
          base: '#3269CD',
          soft: '#99BBFF',
          clear: '#E3EDFF',
        },
        dark: {
          1: '#181818',
          2: '#6B7588',
          3: '#8F90A6',
          4: '#C7C9D9',
        },
        light: {
          1: '#DDE5E9',
          2: '#EBEBF0',
          3: '#F5F9FF',
        },
        feedback: {
          error: '#FF3B3B',
          warning: '#FFCC00',
          success: '#06C22F',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
