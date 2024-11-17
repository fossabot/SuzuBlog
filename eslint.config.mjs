import { zlAsicaTsReactConfig } from 'eslint-config-zl-asica';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  ...zlAsicaTsReactConfig,

  // Next.js Plugin Config
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      'unicorn/filename-case': 'off',
    },
  },
];
