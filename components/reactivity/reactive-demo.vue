<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const state = reactive({
  firstName: 'Ada',
  lastName: 'Lovelace',
  age: 36,
})

const { firstName, lastName, age } = toRefs(state)

function birthday() {
  state.age++
}
</script>

<template>
  <div class="p-4 border border-blue-500/30 rounded-lg bg-blue-500/5 font-mono text-sm">
    <div class="mb-3 text-blue-400 font-bold text-xs uppercase tracking-wider">reactive() Demo</div>

    <div class="mb-2 flex gap-2">
      <span class="text-gray-400">firstName:</span>
      <input
        v-model="state.firstName"
        class="bg-[#1e1e1e] border border-[#444] rounded px-2 py-1 text-white text-xs outline-none focus:border-blue-500 w-28"
      />
    </div>
    <div class="mb-2 flex gap-2">
      <span class="text-gray-400">lastName:</span>
      <input
        v-model="state.lastName"
        class="bg-[#1e1e1e] border border-[#444] rounded px-2 py-1 text-white text-xs outline-none focus:border-blue-500 w-28"
      />
    </div>
    <div class="mb-3 flex items-center gap-2">
      <span class="text-gray-400">age:</span>
      <span class="text-white font-bold">{{ state.age }}</span>
      <button
        class="px-2 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs cursor-pointer border-none transition-colors"
        @click="birthday"
      >
        +1 year
      </button>
    </div>

    <div class="text-gray-300 border-t border-[#333] pt-2 mt-2">
      {{ state.firstName }} {{ state.lastName }}, age {{ state.age }}
    </div>

    <div class="mt-2 text-[10px] text-gray-500">
      <span class="text-gray-600">// </span>
      <span>reactive() wraps objects — no .value needed. Use toRefs() to destructure safely.</span>
    </div>
  </div>
</template>
