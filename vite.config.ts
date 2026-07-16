import MarkdownItMagicLink from 'markdown-it-magic-link'
import { defineConfig } from 'vite'

export default defineConfig({
  slidev: {
    markdown: {
      markdownSetup(md) {
        md.use(MarkdownItMagicLink, {
          linksMap: {
            Nodejs: {
              link: 'https://nodejs.org',
              imageUrl: 'https://github.com/nodejs.png',
            },
            'Visual Studio Code': {
              link: 'https://code.visualstudio.com/download',
              imageUrl:
                'https://code.visualstudio.com/assets/images/code-stable.png',
            },
            Zed: {
              link: 'https://zed.dev',
              imageUrl: 'https://github.com/zed-industries.png',
            },
            Webstorm: {
              link: 'https://www.jetbrains.com/webstorm/',
              imageUrl: 'https://github.com/jetbrains.png',
            },
            NuxtLabs: {
              link: 'https://nuxtlabs.com',
              imageUrl: 'https://nuxtlabs.com/icon.png',
            },
            jQuery: 'https://github.com/jquery/jquery',
            TypeScript: 'https://github.com/microsoft/TypeScript',
            OXC: 'https://github.com/oxc-project/oxc',
            Rspack: 'https://github.com/web-infra-dev/rspack',
            Rollup: 'https://github.com/rollup/rollup',
            Parcel: 'https://github.com/parcel-bundler/parcel',
            Rolldown: 'https://github.com/rolldown/rolldown',
            webpack: 'https://github.com/webpack/webpack',
            turporepo: {
              link: 'https://turbo.build/',
            },
            Vitest: 'https://github.com/vitest-dev/vitest',
            Slidev: 'https://github.com/slidevjs/slidev',
            UnoCSS: 'https://github.com/unocss/unocss',
            Vue: 'https://github.com/vuejs/core',
            Pinia: {
              link: 'https://pinia.vuejs.org/',
            },
            Nuxt: 'https://github.com/nuxt/nuxt',
            npm: 'https://github.com/npm',
            yarn: 'https://github.com/yarnpkg',
            pnpm: 'https://github.com/pnpm/pnpm',
            bun: 'https://github.com/oven-sh/bun',
            deno: 'https://github.com/denoland/deno',
            snowpack: 'https://github.com/FredKSchott/snowpack',
            Svelte: 'https://github.com/sveltejs/svelte',
            Angular: 'https://github.com/angular/angular',
            React: {
              link: 'https://react.dev',
              imageUrl: 'https://github.com/react.png',
            },
            Nextjs: {
              link: 'https://nextjs.org/',
              imageUrl: 'https://github.com/nextjs.png',
            },
            Vite: 'https://github.com/vitejs/vite',
            ESLint: 'https://github.com/eslint/eslint',
            esbuild: 'https://github.com/evanw/esbuild',
            Netlify: {
              link: 'https://netlify.com',
              imageUrl: 'https://github.com/netlify.png',
            },
            Stackblitz: {
              link: 'https://stackblitz.com',
              imageUrl: 'https://github.com/stackblitz.png',
            },
            Codesandbox: {
              link: 'https://codesandbox.com',
              imageUrl: 'https://github.com/codesandbox.png',
            },
            Codepen: {
              link: 'https://codepen.io',
              imageUrl: 'https://github.com/codepen.png',
            },
            Stackoverflow: {
              link: 'https://stackoverflow.com',
              imageUrl: 'https://github.com/stackoverflow.png',
            },
            GitHub: {
              link: 'https://github.com',
              imageUrl: 'https://github.com/github.png',
            },
            Vercel: {
              link: 'https://vercel.com',
              imageUrl: 'https://github.com/vercel.png',
            },
            Prettier: 'https://github.com/prettier/prettier',
            TailwindCSS: {
              link: 'https://tailwindcss.com/',
              imageUrl: 'https://github.com/tailwindlabs.png',
            },
            ChatGPT: {
              link: 'https://chat.openai.com/',
              imageUrl: 'https://github.com/openai.png',
            },
            Figma: {
              link: 'https://figma.com',
              imageUrl: 'https://github.com/figma.png',
            },
            Slack: {
              link: 'https://slack.com',
              imageUrl: 'https://github.com/slackhq.png',
            },
            Discord: {
              link: 'https://discord.com',
              imageUrl: 'https://github.com/discord.png',
            },
            Git: {
              link: 'https://git-scm.com',
              imageUrl: 'https://github.com/git.png',
            },
            Python: {
              link: 'https://python.org',
            },
            HTML: {
              link: 'https://html.spec.whatwg.org/',
              imageUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/640px-HTML5_logo_and_wordmark.svg.png',
            },
            CSS: {
              link: 'https://www.w3.org/TR/css-syntax-3/',
              imageUrl: 'https://github.com/css.png',
            },
            JavaScript: {
              link: 'https://www.ecma-international.org/ecma-262/10.0/index.html',
              imageUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png',
            },
            shadcn: {
              link: 'https://ui.shadcn.com/',
              imageUrl: 'https://github.com/shadcn-ui.png',
            },
            Tanstack: {
              link: 'https://tanstack.com/',
              imageUrl: 'https://github.com/tanstack.png',
            },
          },
        })
        // mdc_inline_props (from @comark/markdown-it with mdc:true) also claims {…} syntax
        // and runs after "entity" — before magic-link's "before text" position. Move
        // magic-link before "entity" so it wins the {Vue} token race.
        const rules = md.inline.ruler.__rules__
        const magicIdx = rules.findIndex((r) => r.name === 'magic-link')
        const entityIdx = rules.findIndex((r) => r.name === 'entity')
        if (magicIdx !== -1 && entityIdx !== -1 && magicIdx > entityIdx) {
          const [rule] = rules.splice(magicIdx, 1)
          rules.splice(entityIdx, 0, rule)
          md.inline.ruler.__cache__ = null
        }
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    minify: 'esbuild',
    target: ['chrome90', 'firefox90', 'safari14'],
    rollupOptions: {
      external: [],
      output: {
        manualChunks: (id) => {
          if (id.includes('monaco-editor')) return 'monaco'
        },
      },
    },
  },
  optimizeDeps: {
    include: ['@vue/compiler-sfc'],
  },
  worker: {
    format: 'es',
  },
})
