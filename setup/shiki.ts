import { defineShikiSetup, ShikiSetupReturn } from '@slidev/types'

export default defineShikiSetup((): ShikiSetupReturn => {
  return {
    langs: [
      'tsx',
      'jsx',
      'ts',
      'js',
      'vue',
      'html',
      'shell',
      'py',
    ],
  }
})