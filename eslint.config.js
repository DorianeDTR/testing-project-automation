import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier/recommended';

export default [
  playwright.configs['flat/recommended'],
  prettier,
  {
    rules: {
      'playwright/no-wait-for-timeout': 'warn', // Évite les pauses fixes que l'IA adore
      'playwright/prefer-lowercase-title': 'warn',
    },
  },
];