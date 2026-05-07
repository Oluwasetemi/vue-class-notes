import config from '@slidev/client/uno.config'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    shortcuts: {
      'text-gradient':
        'text-transparent bg-clip-text bg-gradient-to-tl from-green-300 via-teal-400 to-purple-500',
      'bg-main': 'bg-white text-[#181818] dark:(bg-[#121212] text-[#ddd])',
      'text-common': 'text-[#5D8392]',
      logo: 'i-logos-vue w-6em h-6em transform transition-800 hover:rotate-360',
      btn: 'px-4 py-1 bg-green-500 text-white rounded transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-50',
      card: 'p-4 shadow-md border rounded-lg',
      input:
        'px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200',
    },
    rules: [
      ['w-fill', { width: '-webkit-fill-available' }],
      ['custom-shadow', { 'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)' }],
      [
        /^grid-cols-(\d+)$/,
        ([, d]) => ({
          'grid-template-columns': `repeat(${d}, minmax(0, 1fr))`,
        }),
      ],
    ],
    presets: [
      presetWebFonts({
        fonts: {
          strong: 'Rubik Iso',
          fast: 'Ubuntu',
          hand: 'Caveat',
          mono: {
            name: 'Operator Mono',
            italic: true,
          },
        },
      }),
    ],
  },
])
