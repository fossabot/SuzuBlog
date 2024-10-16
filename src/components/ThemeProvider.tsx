'use client';

import { useEffect } from 'react';

export default function ThemeProvider() {
  useEffect(() => {
    // Check user system theme, set dark or light class
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    document.documentElement.classList.toggle('dark', systemPrefersDark);

    // Listen for changes in system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return null;
}
