import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: { sourceType: 'module', globals: globals.browser },
    plugins: {},
    rules: { ...js.configs.recommended.rules },
  },
]
