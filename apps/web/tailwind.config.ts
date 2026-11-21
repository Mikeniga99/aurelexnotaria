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
            dark: '#38060E',
            deep: '#200307',
            light: '#851422',
            subtle: '#FAF0F1',
          },
          champagne: {
            DEFAULT: '#C59B27',
            hover: '#AF881E',
            light: '#E2C063',
            pale: '#F6EED8',
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
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(197, 155, 39, 0.15)',
        'gold-md': '0 8px 30px rgba(197, 155, 39, 0.20)',
        'gold-lg': '0 20px 45px rgba(197, 155, 39, 0.25)',
        'bordeaux-lg': '0 20px 45px rgba(54, 6, 14, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
