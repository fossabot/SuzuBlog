import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

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
        // Dark mode colors
        darkBackground: '#1a1a1a',
        darkForeground: '#e0e0e0',
        darkSakuraPink: '#d890a2',
        darkSkyBlue: '#4aa7e0',
        darkCardBackground: '#252525',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.lightForeground'),
            a: {
              color: theme('colors.skyBlue'),
              '&:hover': {
                color: theme('colors.sakuraPink'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.darkForeground'),
            a: {
              color: theme('colors.darkSkyBlue'),
              '&:hover': {
                color: theme('colors.darkSakuraPink'),
              },
            },
            h1: { color: theme('colors.darkForeground') },
            h2: { color: theme('colors.darkForeground') },
            h3: { color: theme('colors.darkForeground') },
            h4: { color: theme('colors.darkForeground') },
            p: { color: theme('colors.darkForeground') },
            strong: { color: theme('colors.darkForeground') },
            code: { color: theme('colors.darkForeground') },
          },
        },
      }),
    },
  },
  darkMode: 'class',
  plugins: [typography],
};

export default config;
