<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  count: {
    default: 0,
    type: Number,
  },
})

const counter = ref(props.count)

const doubleCounter = computed(() => counter.value * 2)

</script>

<template>
  <div flex="~" w="min" border="~ main rounded-md">
    <button
      border="r main"
      p="2"
      font="mono"
      outline="!none"
      hover:bg="gray-400 opacity-20"
      @click="counter -= 1"
    >
      -
    </button>
    <span m="auto" p="2">{{ counter }}</span>
    <span m="auto" p="2">{{ doubleCounter }}</span>
    <button
      border="l main"
      p="2"
      font="mono"
      outline="!none"
      hover:bg="gray-400 opacity-20"
      @click="counter += 1"
    >
      +
    </button>
  </div>
</template>
