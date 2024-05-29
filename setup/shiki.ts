import { defineShikiSetup, ShikiSetupReturn } from '@slidev/types'

export default defineShikiSetup((): ShikiSetupReturn => {
  return {
    langs: [
      'ts',
      'js',
      'vue',
      'html',
      'shell',
    ],
  }
})