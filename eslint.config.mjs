import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      curly: 'error',
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': 'error',
      'no-undef': 'error',

      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none',
        },
      ],

      camelcase: [
        'error',
        {
          properties: 'never',
        },
      ],

      'comma-dangle': ['error', 'always-multiline'],

      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],

      semi: ['error', 'always'],
      indent: ['error', 2],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',

      'arrow-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],

      'prefer-const': 'error',
      'no-var': 'error',
      'template-curly-spacing': ['error', 'never'],
    },
  },
];
