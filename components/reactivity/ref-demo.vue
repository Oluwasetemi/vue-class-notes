<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const name = ref('Vue')
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
function reset() {
  count.value = 0
}
</script>

<template>
  <div class="p-4 border border-green-500/30 rounded-lg bg-green-500/5 font-mono text-sm">
    <div class="mb-3 text-green-400 font-bold text-xs uppercase tracking-wider">ref() Demo</div>

    <div class="mb-3 flex items-center gap-3">
      <span class="text-gray-400">count:</span>
      <span class="text-white font-bold">{{ count }}</span>
      <span class="text-gray-500">→ doubled:</span>
      <span class="text-yellow-400 font-bold">{{ doubled }}</span>
    </div>

    <div class="mb-3 flex items-center gap-2">
      <span class="text-gray-400">name:</span>
      <input
        v-model="name"
        class="bg-[#1e1e1e] border border-[#444] rounded px-2 py-1 text-white text-xs outline-none focus:border-green-500 w-32"
      />
      <span class="text-gray-300">Hello, {{ name }}!</span>
    </div>

    <div class="flex gap-2">
      <button
        class="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-xs cursor-pointer border-none transition-colors"
        @click="increment"
      >
        +1
      </button>
      <button
        class="px-3 py-1 bg-[#444] hover:bg-[#555] text-white rounded text-xs cursor-pointer border-none transition-colors"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <div class="mt-3 text-[10px] text-gray-500">
      <span class="text-gray-600">// </span>
      <span>count.value = {{ count }} — must use .value in &lt;script&gt;, unwrapped in template</span>
    </div>
  </div>
</template>
