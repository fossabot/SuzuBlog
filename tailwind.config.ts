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
        sakuraPink: '#f6a8b8',
        skyBlue: '#5bcefa',
        lightBackground: '#ffffff',
        lightForeground: '#171717',
        // Black mode colors
        darkBackground: '#1a1a1a',
        darkForeground: '#d4d4d4',
        darkSakuraPink: '#d890a2',
        darkSkyBlue: '#4aa7e0',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
