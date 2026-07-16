<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { compileSfc, isCompileError } from '../setup/compile-sfc'
import { captureConsole } from '../setup/capture-console'
import type { ConsoleEntry } from '../setup/capture-console'
import { useSplitPane } from '../composables/use-split-pane'
import { useCodeHighlight } from '../composables/use-code-highlight'

const previewRef = ref<HTMLElement>()
const splitRef = ref<HTMLElement>()
const isRunning = ref(false)
const hasRun = ref(false)
const error = ref('')

let vueApp: { unmount: () => void } | null = null
let restoreConsole: (() => void) | null = null

// ── Split pane ────────────────────────────────────────────────────────────────
const { leftWidthPct, consoleHeightPx, isDraggingV, isDraggingH, startVerticalDrag, startHorizontalDrag } =
  useSplitPane(splitRef, {
    vertical: { initial: 50, min: 20, max: 80 },
    horizontal: { initial: 160, min: 60, max: 520 },
  })

// ── Syntax highlighting ───────────────────────────────────────────────────────
const editorPreRef = ref<HTMLElement>()
const editorContainerRef = ref<HTMLElement>()
const editorTextareaRef = ref<HTMLTextAreaElement>()

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
const { highlighted: highlightedCode } = useCodeHighlight(code, 'vue')

const onEditorWheel = (e: WheelEvent) => {
  if (!e.shiftKey) return
  e.preventDefault()
  if (!editorTextareaRef.value) return
  editorTextareaRef.value.scrollLeft += e.deltaY
  if (editorPreRef.value) editorPreRef.value.scrollLeft = editorTextareaRef.value.scrollLeft
}

const syncScroll = (e: Event) => {
  const ta = e.target as HTMLTextAreaElement
  if (editorPreRef.value) {
    editorPreRef.value.scrollTop = ta.scrollTop
    editorPreRef.value.scrollLeft = ta.scrollLeft
  }
}

onMounted(() => {
  editorContainerRef.value?.addEventListener('wheel', onEditorWheel, { passive: false })
})

// ── Navigation ────────────────────────────────────────────────────────────────
const goBack = () => {
  // useRouter() returns undefined in Slidev view components (different inject
  // context). Use the native history API directly — it always works.
  if (vueApp) {
    try { vueApp.unmount() } catch { /* ignore */ }
    vueApp = null
  }
  if (restoreConsole) {
    restoreConsole()
    restoreConsole = null
  }
  window.history.back()
}

// ── Console ───────────────────────────────────────────────────────────────────
const consoleLogs = ref<ConsoleEntry[]>([])
const clearConsole = () => { consoleLogs.value = [] }

const resetCode = () => {
  code.value = DEFAULT_CODE
  error.value = ''
  clearConsole()
  hasRun.value = false
  if (previewRef.value) previewRef.value.innerHTML = ''
  if (vueApp) {
    try { vueApp.unmount() } catch { /* ignore */ }
    vueApp = null
  }
}

// ── Editor helpers ────────────────────────────────────────────────────────────
const insertTab = (e: KeyboardEvent) => {
  const ta = e.target as HTMLTextAreaElement
  const start = ta.selectionStart
  const end = ta.selectionEnd
  code.value = `${code.value.substring(0, start)}  ${code.value.substring(end)}`
  nextTick(() => { ta.selectionStart = ta.selectionEnd = start + 2 })
}

// ── Runner ────────────────────────────────────────────────────────────────────
const runCode = async () => {
  if (!previewRef.value || isRunning.value) return

  isRunning.value = true
  error.value = ''
  clearConsole()

  try {
    if (restoreConsole) restoreConsole()
    restoreConsole = captureConsole(console, (entry) => {
      consoleLogs.value.push(entry)
    })

    const result = await compileSfc(code.value, 'PlaygroundComponent.vue')
    if (isCompileError(result)) throw new Error(result.error)

    if (vueApp) {
      try { vueApp.unmount() } catch { /* ignore teardown errors */ }
      vueApp = null
    }
    previewRef.value.innerHTML = ''

    const Vue = await import('vue')
    const app = Vue.createApp(result.component as Parameters<typeof Vue.createApp>[0])
    app.config.warnHandler = (msg) => consoleLogs.value.push({ type: 'warn', text: msg })
    app.config.errorHandler = (err) =>
      consoleLogs.value.push({ type: 'error', text: err instanceof Error ? err.message : String(err) })
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
  editorContainerRef.value?.removeEventListener('wheel', onEditorWheel)
  if (restoreConsole) {
    restoreConsole()
    restoreConsole = null
  }
  try { if (vueApp) vueApp.unmount() } catch { /* ignore */ }
  vueApp = null
})
</script>

<template>
  <div
    class="flex flex-col h-screen bg-[#0f0f0f] text-[#e5e5e5]"
    style="font-family: monospace"
    :class="{ 'select-none': isDraggingV || isDraggingH }"
  >
    <!-- Header -->
    <header class="flex items-center justify-between px-5 py-[10px] bg-[#1a1a1a] border-b border-[#333] flex-shrink-0">
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
    <div ref="splitRef" class="flex flex-1 overflow-hidden">

      <!-- ── Left: Editor ───────────────────────────────────────────────── -->
      <div
        class="flex flex-col min-w-0 overflow-hidden"
        :style="{ width: leftWidthPct + '%' }"
      >
        <div class="px-4 py-2 bg-[#1a1a1a] border-b border-[#333] text-xs text-[#888] flex items-center gap-2 flex-shrink-0">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#42b883]" />
          App.vue
          <span class="ml-auto text-[#555]">Tab = 2 spaces · Ctrl+Enter to run</span>
        </div>
        <div ref="editorContainerRef" class="relative flex-1 overflow-hidden bg-[#1e1e1e]">
          <div
            ref="editorPreRef"
            aria-hidden="true"
            class="absolute inset-0 overflow-auto p-4 pointer-events-none"
            v-html="highlightedCode"
          />
          <textarea
            ref="editorTextareaRef"
            v-model="code"
            wrap="off"
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            class="absolute inset-0 w-full h-full bg-transparent p-4 text-sm resize-none outline-none border-none leading-relaxed"
            style="tab-size: 2; font-family: 'JetBrains Mono', 'Fira Code', monospace; color: transparent; caret-color: #d4d4d4; z-index: 1; overflow: auto"
            @keydown.tab.prevent="insertTab"
            @keydown.ctrl.enter.prevent="runCode"
            @keydown.meta.enter.prevent="runCode"
            @scroll="syncScroll"
          />
        </div>
      </div>

      <!-- ── Vertical drag handle ───────────────────────────────────────── -->
      <div
        class="vertical-handle flex-shrink-0 w-[5px] bg-[#1a1a1a] border-x border-[#2a2a2a] cursor-col-resize relative group"
        :class="{ 'bg-[#42b883]/20': isDraggingV }"
        @mousedown.prevent="startVerticalDrag"
      >
        <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#333] group-hover:bg-[#42b883]/50 transition-colors duration-150" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[3px]">
          <span class="w-[3px] h-[3px] rounded-full bg-[#555] group-hover:bg-[#42b883]/70 transition-colors" />
          <span class="w-[3px] h-[3px] rounded-full bg-[#555] group-hover:bg-[#42b883]/70 transition-colors" />
          <span class="w-[3px] h-[3px] rounded-full bg-[#555] group-hover:bg-[#42b883]/70 transition-colors" />
        </div>
      </div>

      <!-- ── Right: Preview + Console ──────────────────────────────────── -->
      <div
        class="flex flex-col min-w-0 overflow-hidden"
        :style="{ width: (100 - leftWidthPct) + '%' }"
      >
        <div class="px-4 py-2 bg-[#1a1a1a] border-b border-[#333] text-xs text-[#888] flex items-center gap-2 flex-shrink-0">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
          Preview
        </div>

        <!-- Preview area -->
        <div class="flex-1 relative overflow-hidden min-h-0">
          <div
            v-show="!hasRun"
            class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm bg-white z-10"
            style="font-family: system-ui, sans-serif"
          >
            Press
            <kbd class="mx-1.5 px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600">▶ Run</kbd>
            or
            <kbd class="mx-1.5 px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600">Ctrl+Enter</kbd>
            to render
          </div>
          <div ref="previewRef" class="absolute inset-0 bg-white overflow-auto" />
        </div>

        <!-- ── Horizontal drag handle ─────────────────────────────────── -->
        <div
          class="horizontal-handle flex-shrink-0 h-[5px] bg-[#1a1a1a] border-y border-[#2a2a2a] cursor-row-resize relative group"
          :class="{ 'bg-[#42b883]/20': isDraggingH }"
          @mousedown.prevent="startHorizontalDrag"
        >
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#333] group-hover:bg-[#42b883]/50 transition-colors duration-150" />
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row gap-[3px]">
            <span class="w-[3px] h-[3px] rounded-full bg-[#555] group-hover:bg-[#42b883]/70 transition-colors" />
            <span class="w-[3px] h-[3px] rounded-full bg-[#555] group-hover:bg-[#42b883]/70 transition-colors" />
            <span class="w-[3px] h-[3px] rounded-full bg-[#555] group-hover:bg-[#42b883]/70 transition-colors" />
          </div>
        </div>

        <!-- Console -->
        <div
          class="bg-[#1e1e1e] flex flex-col overflow-hidden flex-shrink-0"
          :style="{ height: consoleHeightPx + 'px' }"
        >
          <div class="px-3 py-2 bg-[#2d2d2d] border-b border-[#444] flex items-center justify-between flex-shrink-0">
            <span class="text-xs font-bold text-[#d4d4d4]">Console</span>
            <button
              class="px-3 py-1 bg-[#444] text-[#d4d4d4] border-none rounded text-xs cursor-pointer hover:bg-[#555] transition-colors"
              @click="clearConsole"
            >
              Clear
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-3 space-y-1 min-h-0">
            <div v-if="consoleLogs.length === 0" class="text-[#555] text-xs italic">
              No output yet.
            </div>
            <div
              v-for="(log, i) in consoleLogs"
              :key="i"
              class="flex gap-2 items-start pb-1 border-b border-[#2a2a2a] text-xs"
            >
              <span
                class="flex-shrink-0"
                :style="{ color: log.type === 'error' ? '#f87171' : log.type === 'warn' ? '#fbbf24' : '#60a5fa' }"
              >{{ log.type === 'error' ? '❌' : log.type === 'warn' ? '⚠️' : '▶' }}</span>
              <span
                class="whitespace-pre-wrap break-all leading-relaxed"
                :style="{ color: log.type === 'error' ? '#fca5a5' : log.type === 'warn' ? '#fde047' : '#d4d4d4' }"
              >{{ log.text }}</span>
            </div>
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
