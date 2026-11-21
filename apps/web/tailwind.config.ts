import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aurelex: {
          bordeaux: {
            DEFAULT: '#6B0F1A',
            hover: '#540A13',
            dark: '#3D070D',
            light: '#851422',
            subtle: '#FAF0F1',
          },
          champagne: {
            DEFAULT: '#C59B27',
            hover: '#B0881F',
            light: '#DFB949',
            soft: '#F4ECE1',
          },
          ivoire: {
            DEFAULT: '#FAF7F2',
            light: '#FDFBF9',
            muted: '#F0EAE1',
          },
          beige: {
            DEFAULT: '#F3ECE2',
            border: '#E2D5C3',
            dark: '#C8B69E',
          },
          ebene: {
            DEFAULT: '#23070B',
            soft: '#360D13',
            text: '#1C0609',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
