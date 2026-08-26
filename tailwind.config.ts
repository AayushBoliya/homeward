import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5ebe7',
          200: '#ccd7d0',
          300: '#a7bcae',
          400: '#7f9d89',
          500: '#5e806a',
          600: '#496752',
          700: '#3a5242',
          800: '#304236',
          900: '#28372e',
          950: '#141e19',
        },
        warm: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e8dec9',
          300: '#dac7a3',
          400: '#cbb07e',
          500: '#ba9a5f',
          600: '#a78351',
          700: '#8b6943',
          800: '#72553a',
          900: '#5f4633',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card': '0 2px 12px -1px rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.02)',
        'lift': '0 12px 30px -4px rgba(22, 101, 52, 0.08)',
      }
    },
  },
  plugins: [],
};
export default config;
