import config from '@slidev/client/uno.config'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    shortcuts: {
      // ── Brand ────────────────────────────────────────────────────────────
      'text-gradient':
        'text-transparent bg-clip-text bg-gradient-to-tl from-green-300 via-teal-400 to-purple-500',
      'bg-main': 'bg-white text-[#181818] dark:(bg-[#121212] text-[#ddd])',
      'text-common': 'text-[#5D8392]',
      logo: 'i-logos-vue w-6em h-6em transform transition-800 hover:rotate-360',

      // ── Buttons ───────────────────────────────────────────────────────────
      btn: 'px-4 py-1 bg-green-500 text-white rounded transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-50',
      'btn-sm':
        'px-3 py-1 text-sm bg-green-600 hover:bg-green-500 text-white rounded cursor-pointer border-none transition-colors duration-200',
      'btn-ghost':
        'px-3 py-1 text-sm bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-200',

      // ── Demo primitives (used inside live monaco-run Vue templates) ────────
      'demo-wrap':
        'p-4 rounded-lg bg-[#0d1117] border border-[#21262d] font-sans text-sm leading-relaxed',
      'demo-btn':
        'px-3 py-1.5 rounded cursor-pointer border-none text-sm font-medium transition-all duration-200 select-none',
      'demo-btn-primary': 'demo-btn bg-[#238636] hover:bg-[#2ea043] text-white',
      'demo-btn-secondary':
        'demo-btn bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d]',
      'demo-input':
        'bg-[#0d1117] border border-[#30363d] focus:border-[#42b883] rounded px-2 py-1 text-white text-sm outline-none transition-colors duration-150',

      // ── Form ──────────────────────────────────────────────────────────────
      card: 'p-4 rounded-lg border border-white/10 bg-white/3 backdrop-blur-sm',
      input:
        'px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200',
      'input-dark':
        'px-2 py-1 bg-[#161b22] border border-[#30363d] focus:border-[#42b883] rounded text-white outline-none text-sm transition-colors duration-150',

      // ── Badges ────────────────────────────────────────────────────────────
      badge:
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
      'badge-vue':
        'badge bg-[#42b883]/15 text-[#42b883] border border-[#42b883]/30',
      'badge-blue':
        'badge bg-blue-500/15 text-blue-400 border border-blue-400/30',
      'badge-yellow':
        'badge bg-yellow-500/15 text-yellow-400 border border-yellow-400/30',
      'badge-red':
        'badge bg-red-500/15 text-red-400 border border-red-400/30',

      // ── Layout helpers ────────────────────────────────────────────────────
      'compare-grid': 'grid grid-cols-2 gap-4 mt-4',
      'code-label':
        'text-[10px] font-mono uppercase tracking-wider text-white/30 mb-1',
      'section-link':
        'text-[#42b883] hover:text-green-300 transition-colors duration-150 no-underline',
      'slide-subtitle': 'text-lg text-white/60 mt-2 font-light',
    },
    rules: [
      ['w-fill', { width: '-webkit-fill-available' }],
      ['custom-shadow', { 'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)' }],
      [
        'vue-glow',
        {
          'box-shadow':
            '0 0 24px rgba(66,184,131,0.18), 0 0 48px rgba(66,184,131,0.07)',
        },
      ],
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
