<script setup lang="ts">
import { computed, reactive, ref, } from 'vue';

const props = defineProps({
  count: {
    default: 0,
    type: Number,
  },
  msg: {
    default: 'Hello Vue 3 + Vite + WindiCSS!',
    type: String,
  },
  firstName: {
    default: 'John',
    type: String,
  },
  lastName: {
    default: 'Doe',
    type: String,
  },
})



const state = reactive({
  count: 0,
  msg: 'Hello Vue 3 + Vite + WindiCSS!',
  firstName: 'John',
  lastName: 'Doe',
  apiData: null,
})



const counter = ref(props.count)

const doubleCounter = computed(() => counter.value * 2)
// const fullName = computed(() => `${props.firstName} ${props.lastName}`)

const fullName = computed({
  // getter
  get() {
    return state.firstName + ' ' +state.lastName
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [state.firstName, state.lastName] = newValue.split(' ')
  }
})

const increment = () => {
  state.count += 1
}

fullName.value = 'Jane Doe'

const stateCounterDouble = computed(() => state.count * 2)

</script>

<template>
  <div flex="~" w="max" border="~ main rounded-md">
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
    <span m="auto" p="2">{{ state.count }}</span>
    <span m="auto" p="2">{{ fullName }}</span>
    <span m="auto" p="2">{{ stateCounterDouble }}</span>
    <button
      border="l main"
      p="2"
      font="mono"
      outline="!none"
      hover:bg="gray-400 opacity-20"
      @click="increment"
    >
      +
    </button>
    <button
      border="r main"
      p="2"
      font="mono"
      outline="!none"
      hover:bg="gray-400 opacity-20"
      @click="fullName = 'John Doe'"
    >
      set computed
    </button>
    <div>
      <!-- <pre>{{ state.apiData }}</pre> -->
      <!-- <h2>{{state.apiData?.name || 'name'}}</h2> -->
    </div>
  </div>
</template>
