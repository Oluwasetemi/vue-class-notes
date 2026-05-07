import { defineShikiSetup, ShikiSetupReturn } from '@slidev/types'

export default defineShikiSetup((): ShikiSetupReturn => {
  return {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    langs: [
      'vue',
      'js',
      'ts',
      'sh',
      'html',
      'css',
      'json',
      'markdown',
    ],
    transformers: [],
  }
})
