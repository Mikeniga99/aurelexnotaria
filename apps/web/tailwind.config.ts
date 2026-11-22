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
          navy: {
            DEFAULT: '#0B1938',
            deep: '#060D1F',
            surface: '#102146',
            light: '#1B3B6F',
            soft: '#244B8A',
          },
          blue: {
            DEFAULT: '#2563EB',
            vibrant: '#3B82F6',
            electric: '#38BDF8',
            cyan: '#06B6D4',
            glow: '#60A5FA',
            muted: '#93C5FD',
          },
          ice: {
            DEFAULT: '#F8FAFC',
            soft: '#F1F5F9',
            border: '#E2E8F0',
            dark: '#CBD5E1',
          },
          bordeaux: {
            DEFAULT: '#6B0F1A',
            hover: '#540A13',
            dark: '#38060E',
            deep: '#200307',
            light: '#851422',
            subtle: '#FDF2F4',
          },
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'liquid-blue': '0 8px 32px 0 rgba(37, 99, 235, 0.25)',
        'liquid-cyan': '0 8px 32px 0 rgba(56, 189, 248, 0.25)',
        'liquid-dark': '0 20px 50px 0 rgba(6, 13, 31, 0.45)',
        'glow-sm': '0 0 15px rgba(56, 189, 248, 0.35)',
        'glow-md': '0 0 30px rgba(37, 99, 235, 0.30)',
      },
    },
  },
  plugins: [],
};

export default config;
