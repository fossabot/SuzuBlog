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
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            generateStaticParams: true,
            props: true,
            params: true,
          },
        },
      ],
    },
  },
  {
    files: ['src/services/**/*.ts'],
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  },
];
