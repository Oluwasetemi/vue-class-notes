<script setup lang="ts">
import { ref } from 'vue'

// Inline composable definition for demo purposes
function useCounter(initial = 0, step = 1) {
  const count = ref(initial)
  const increment = () => (count.value += step)
  const decrement = () => (count.value -= step)
  const reset = () => (count.value = initial)
  return { count, increment, decrement, reset }
}

const counter1 = useCounter(0, 1)
const counter2 = useCounter(10, 5)
</script>

<template>
  <div class="p-4 border border-purple-500/30 rounded-lg bg-purple-500/5 font-mono text-sm">
    <div class="mb-3 text-purple-400 font-bold text-xs uppercase tracking-wider">useCounter() Composable Demo</div>

    <div class="mb-4">
      <div class="text-gray-400 text-xs mb-1">useCounter(0, step=1)</div>
      <div class="flex items-center gap-3">
        <button
          class="px-3 py-1 bg-[#444] hover:bg-[#555] text-white rounded text-xs cursor-pointer border-none"
          @click="counter1.decrement"
        >−</button>
        <span class="text-white font-bold w-8 text-center">{{ counter1.count }}</span>
        <button
          class="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs cursor-pointer border-none"
          @click="counter1.increment"
        >+</button>
        <button
          class="px-2 py-1 bg-[#333] text-gray-400 rounded text-xs cursor-pointer border-none hover:text-white"
          @click="counter1.reset"
        >reset</button>
      </div>
    </div>

    <div>
      <div class="text-gray-400 text-xs mb-1">useCounter(10, step=5)</div>
      <div class="flex items-center gap-3">
        <button
          class="px-3 py-1 bg-[#444] hover:bg-[#555] text-white rounded text-xs cursor-pointer border-none"
          @click="counter2.decrement"
        >−5</button>
        <span class="text-white font-bold w-8 text-center">{{ counter2.count }}</span>
        <button
          class="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs cursor-pointer border-none"
          @click="counter2.increment"
        >+5</button>
        <button
          class="px-2 py-1 bg-[#333] text-gray-400 rounded text-xs cursor-pointer border-none hover:text-white"
          @click="counter2.reset"
        >reset</button>
      </div>
    </div>

    <div class="mt-3 text-[10px] text-gray-500 border-t border-[#333] pt-2">
      <span class="text-gray-600">// </span>
      <span>Two independent instances — each composable call gets its own reactive state.</span>
    </div>
  </div>
</template>
