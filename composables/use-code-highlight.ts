import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Provides debounced Shiki syntax highlighting for a reactive code string.
 *
 * Pre-warms the Shiki singleton on mount so WASM + theme are loaded before
 * the first keystroke (~300ms → <10ms). Guards against post-unmount updates.
 * Falls back to escaped HTML if Shiki fails to load.
 *
 * @returns `highlighted` — a reactive string of rendered HTML, suitable for v-html
 */
export function useCodeHighlight(
  code: Ref<string>,
  lang: string,
  theme = 'vitesse-dark',
): { highlighted: Ref<string> } {
  const highlighted = ref('')
  let timer: ReturnType<typeof setTimeout> | null = null
  let active = false

  const run = async (src: string) => {
    try {
      const { codeToHtml } = await import('shiki')
      const html = await codeToHtml(src, { lang, theme })
      if (active) highlighted.value = html
    } catch {
      if (active) highlighted.value = `<pre><code>${escapeHtml(src)}</code></pre>`
    }
  }

  watch(code, (src) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => run(src), 60)
  })

  onMounted(async () => {
    active = true
    try {
      const { getSingletonHighlighter } = await import('shiki')
      await getSingletonHighlighter({ langs: [lang], themes: [theme] })
    } catch {
      /* highlight fallback handles this */
    }
    run(code.value)
  })

  onUnmounted(() => {
    active = false
    if (timer) clearTimeout(timer)
  })

  return { highlighted }
}
