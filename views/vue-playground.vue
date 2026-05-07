<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const previewRef = ref<HTMLElement>()
const isRunning = ref(false)
const hasRun = ref(false)
const error = ref('')
const hasConsoleLogs = ref(false)
const consoleOutputRef = ref<HTMLElement>()

let vueApp: { unmount: () => void } | null = null

// ── Syntax highlighting ───────────────────────────────────────────────────────
const highlightedCode = ref('')
const editorPreRef = ref<HTMLElement>()
let highlightTimer: ReturnType<typeof setTimeout> | null = null

const highlight = async (src: string) => {
  const { codeToHtml } = await import('shiki')
  highlightedCode.value = await codeToHtml(src, { lang: 'vue', theme: 'vitesse-dark' })
}

const syncScroll = (e: Event) => {
  const ta = e.target as HTMLTextAreaElement
  if (editorPreRef.value) {
    editorPreRef.value.scrollTop = ta.scrollTop
    editorPreRef.value.scrollLeft = ta.scrollLeft
  }
}

// ── Default starter code ──────────────────────────────────────────────────────
const DEFAULT_CODE = `<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello from Vue!')

function increment() {
  count.value++
  console.log('Count is now:', count.value)
}
<\/script>

<template>
  <div style="padding: 24px; font-family: system-ui, sans-serif;">
    <h2 style="margin: 0 0 12px; color: #1a1a1a;">
      🟢 Vue Playground
    </h2>
    <p style="margin: 0 0 8px; color: #555;">{{ message }}</p>
    <p style="margin: 0 0 16px; color: #555;">
      Count: <strong>{{ count }}</strong>
    </p>
    <button
      @click="increment"
      style="padding: 8px 20px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;"
    >
      Increment
    </button>
    <p style="margin-top: 16px; color: #888; font-size: 13px;">
      Edit this code and press ▶ Run (or Ctrl+Enter) to see changes.
    </p>
  </div>
</template>`

const code = ref(DEFAULT_CODE)

watch(code, (src) => {
  if (highlightTimer) clearTimeout(highlightTimer)
  highlightTimer = setTimeout(() => highlight(src), 250)
})

onMounted(() => highlight(code.value))

// ── Navigation ────────────────────────────────────────────────────────────────
const goBack = () => router.push('/')

const clearConsole = () => {
  if (consoleOutputRef.value) consoleOutputRef.value.innerHTML = ''
  hasConsoleLogs.value = false
}

const resetCode = () => {
  code.value = DEFAULT_CODE
  error.value = ''
  clearConsole()
  hasRun.value = false
  if (previewRef.value) previewRef.value.innerHTML = ''
  if (vueApp) {
    vueApp.unmount()
    vueApp = null
  }
}

// ── Editor helpers ────────────────────────────────────────────────────────────
const insertTab = (e: KeyboardEvent) => {
  const ta = e.target as HTMLTextAreaElement
  const start = ta.selectionStart
  const end = ta.selectionEnd
  code.value = `${code.value.substring(0, start)}  ${code.value.substring(end)}`
  nextTick(() => {
    ta.selectionStart = ta.selectionEnd = start + 2
  })
}

// ── Console helpers ───────────────────────────────────────────────────────────
const formatValue = (value: unknown): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    try { return JSON.stringify(value, null, 2) }
    catch { return String(value) }
  }
  return String(value)
}

const addLog = (type: 'log' | 'error' | 'warn', args: unknown[]) => {
  if (!consoleOutputRef.value) return
  const entry = document.createElement('div')
  entry.style.cssText = 'display:flex;gap:8px;align-items:flex-start;padding-bottom:4px;border-bottom:1px solid #2a2a2a;font-size:12px'

  const icon = document.createElement('span')
  icon.style.flexShrink = '0'
  icon.style.color = type === 'error' ? '#f87171' : type === 'warn' ? '#fbbf24' : '#60a5fa'
  icon.textContent = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '▶'

  const msg = document.createElement('span')
  msg.style.cssText = 'white-space:pre-wrap;word-break:break-all;line-height:1.5'
  msg.style.color = type === 'error' ? '#fca5a5' : type === 'warn' ? '#fde047' : '#d4d4d4'
  msg.textContent = args.map(formatValue).join(' ')

  entry.appendChild(icon)
  entry.appendChild(msg)
  consoleOutputRef.value.appendChild(entry)
  hasConsoleLogs.value = true
}

// ── Runner ────────────────────────────────────────────────────────────────────
const runCode = async () => {
  if (!previewRef.value || isRunning.value) return

  isRunning.value = true
  error.value = ''
  clearConsole()

  try {
    const Vue = await import('vue')
    const { parse, compileScript, compileTemplate, compileStyle } = await import('@vue/compiler-sfc')

    const filename = 'PlaygroundComponent.vue'
    const sfc = parse(code.value, { filename })

    if (sfc.errors.length > 0) {
      throw new Error(sfc.errors.map((e) => e.message ?? String(e)).join('\n'))
    }

    // Patch console to capture logs
    const origConsole = { log: console.log, error: console.error, warn: console.warn }
    console.log = (...args: unknown[]) => { origConsole.log(...args); addLog('log', args) }
    console.error = (...args: unknown[]) => { origConsole.error(...args); addLog('error', args) }
    console.warn = (...args: unknown[]) => { origConsole.warn(...args); addLog('warn', args) }

    let scripts = ''
    if (sfc.descriptor.scriptSetup || sfc.descriptor.script) {
      const compiled = compileScript(sfc.descriptor, {
        id: filename,
        genDefaultAs: '__Component',
        inlineTemplate: true,
      })
      scripts = compiled.content
      scripts = scripts.replace(
        /import (\{[^}]+\}) from ['"]vue['"]/g,
        (_, imports) => `const ${imports.replace(/\sas\s/g, ':')} = Vue`,
      )
    } else {
      // Template-only component
      const tpl = compileTemplate({
        source: sfc.descriptor.template?.content ?? '',
        filename,
        id: filename,
      })
      scripts = `${tpl.code.replace(/import \{([^}]+)\} from ['"]vue['"]/g, (_, i) => `const {${i}} = Vue`)}\nconst __Component = { render }`
    }

    scripts += '\nreturn __Component'

    // Restore console after compilation
    setTimeout(() => {
      console.log = origConsole.log
      console.error = origConsole.error
      console.warn = origConsole.warn
    }, 5000)

    const component = new Function('Vue', `"use strict";\n${scripts}`)(Vue)

    if (vueApp) {
      vueApp.unmount()
      vueApp = null
    }
    previewRef.value.innerHTML = ''

    const app = Vue.createApp(component)
    app.config.warnHandler = (msg) => addLog('warn', [msg])
    app.mount(previewRef.value)
    vueApp = app

    hasRun.value = true
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    isRunning.value = false
  }
}

onUnmounted(() => {
  if (vueApp) vueApp.unmount()
  if (highlightTimer) clearTimeout(highlightTimer)
})
</script>

<template>
  <div class="flex flex-col h-screen bg-[#0f0f0f] text-[#e5e5e5]" style="font-family: monospace">
    <!-- Header -->
    <header
      class="flex items-center justify-between px-5 py-[10px] bg-[#1a1a1a] border-b border-[#333] flex-shrink-0"
    >
      <div class="flex items-center gap-4">
        <button
          class="px-[14px] py-[6px] bg-[#2a2a2a] text-[#ccc] border border-[#444] rounded-md cursor-pointer text-sm transition-colors duration-150 hover:bg-[#333]"
          @click="goBack"
        >
          ← Back to slides
        </button>
        <h1 class="m-0 text-base font-semibold text-[#e5e5e5]">🟢 Vue Playground</h1>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="px-[14px] py-[6px] bg-[#2a2a2a] text-[#ccc] border border-[#444] rounded-md cursor-pointer text-sm transition-colors duration-150 hover:bg-[#333]"
          @click="resetCode"
        >
          ↺ Reset
        </button>
        <button
          class="px-[14px] py-[6px] bg-[#42b883] text-white rounded-md cursor-pointer text-sm font-medium transition-opacity duration-150 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isRunning"
          @click="runCode"
        >
          {{ isRunning ? '⏳ Running…' : '▶ Run' }}
        </button>
      </div>
    </header>

    <!-- Error banner -->
    <div
      v-if="error"
      class="px-5 py-2 bg-red-900/40 border-b border-red-700 text-red-300 text-xs flex items-start gap-2 flex-shrink-0"
    >
      <span class="flex-shrink-0 mt-0.5">❌</span>
      <pre class="m-0 whitespace-pre-wrap break-all leading-relaxed">{{ error }}</pre>
    </div>

    <!-- Split pane -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Editor pane -->
      <div class="w-1/2 flex flex-col border-r border-[#333] min-w-0">
        <div
          class="px-4 py-2 bg-[#1a1a1a] border-b border-[#333] text-xs text-[#888] flex items-center gap-2 flex-shrink-0"
        >
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#42b883]" />
          App.vue
          <span class="ml-auto text-[#555]">Tab = 2 spaces · Ctrl+Enter to run</span>
        </div>
        <div class="relative flex-1 overflow-hidden bg-[#1e1e1e]">
          <div
            ref="editorPreRef"
            aria-hidden="true"
            class="absolute inset-0 overflow-auto p-4 pointer-events-none"
            v-html="highlightedCode"
          />
          <textarea
            v-model="code"
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            class="absolute inset-0 w-full h-full bg-transparent p-4 text-sm resize-none outline-none border-none leading-relaxed"
            style="tab-size: 2; font-family: 'JetBrains Mono', 'Fira Code', monospace; color: transparent; caret-color: #d4d4d4; z-index: 1"
            @keydown.tab.prevent="insertTab"
            @keydown.ctrl.enter.prevent="runCode"
            @keydown.meta.enter.prevent="runCode"
            @scroll="syncScroll"
          />
        </div>
      </div>

      <!-- Preview + Console pane -->
      <div class="w-1/2 flex flex-col min-w-0">
        <div
          class="px-4 py-2 bg-[#1a1a1a] border-b border-[#333] text-xs text-[#888] flex items-center gap-2 flex-shrink-0"
        >
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
          Preview
        </div>

        <div ref="previewRef" class="flex-1 bg-white overflow-auto">
          <div
            v-if="!hasRun"
            class="h-full flex items-center justify-center text-gray-400 text-sm"
            style="font-family: system-ui, sans-serif"
          >
            Press <kbd
              class="mx-1.5 px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600"
            >▶ Run</kbd> or <kbd
              class="mx-1.5 px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600"
            >Ctrl+Enter</kbd> to render
          </div>
        </div>

        <!-- Console -->
        <div
          class="h-40 bg-[#1e1e1e] border-t border-[#333] flex flex-col overflow-hidden flex-shrink-0"
        >
          <div
            class="px-3 py-2 bg-[#2d2d2d] border-b border-[#444] flex items-center justify-between flex-shrink-0"
          >
            <span class="text-xs font-bold text-[#d4d4d4]">Console</span>
            <button
              class="px-3 py-1 bg-[#444] text-[#d4d4d4] border-none rounded text-xs cursor-pointer hover:bg-[#555] transition-colors"
              @click="clearConsole"
            >
              Clear
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-3">
            <div v-if="!hasConsoleLogs" class="text-[#555] text-xs italic">
              No output yet.
            </div>
            <div ref="consoleOutputRef" class="space-y-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.shiki) {
  background-color: transparent !important;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.625;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  tab-size: 2;
  white-space: pre;
  min-height: 100%;
}
:deep(.shiki code) {
  display: block;
}
</style>
