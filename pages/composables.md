---
layout: center
transition: slide-up
hideInToc: true
---

# Composables

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">What is a Composable?</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Building a Composable</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Composables with Lifecycle</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">VueUse — Composable Utilities</a>

---
hideInToc: true
---

## What is a Composable?

A **composable** is a function that uses Vue's Composition API to encapsulate and reuse **stateful logic**.

<v-clicks>

- Named with the `use` prefix by convention — `useCounter`, `useFetch`, `useLocalStorage`
- Returns reactive state and methods to be used in `<script setup>`
- Each component call creates its **own independent state** (no global sharing by default)
- Can use `ref`, `reactive`, `computed`, lifecycle hooks, and other composables inside
- The Vue equivalent of **custom hooks** in React

</v-clicks>

<Tips type="info">

React custom hooks follow the same `use` prefix convention and the same principle: encapsulate reusable stateful logic. The mental model is identical — composables *are* Vue's custom hooks. The implementation differs: Vue composables use the reactivity system (`ref`, `reactive`), while React hooks use `useState`, `useRef`, `useEffect`.

</Tips>

---
hideInToc: true
---

## Building a Composable

```vue {monaco-run}
<script setup>
import { ref, computed } from 'vue'

// Composable definition (normally in composables/useCounter.ts)
function useCounter(initial = 0, step = 1) {
  const count = ref(initial)
  const doubled = computed(() => count.value * 2)

  const increment = () => (count.value += step)
  const decrement = () => (count.value -= step)
  const reset = () => (count.value = initial)

  return { count, doubled, increment, decrement, reset }
}

// Two independent instances
const a = useCounter(0, 1)
const b = useCounter(100, 10)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <div style="margin-bottom:12px">
      <strong>Counter A</strong> (step=1): {{ a.count }} <em style="color:#888">(×2 = {{ a.doubled }})</em>
      <div style="margin-top:4px">
        <button @click="a.decrement" style="padding:4px 10px;background:#444;color:white;border:none;border-radius:3px;cursor:pointer;margin-right:4px">−</button>
        <button @click="a.increment" style="padding:4px 10px;background:#42b883;color:white;border:none;border-radius:3px;cursor:pointer;margin-right:4px">+</button>
        <button @click="a.reset" style="padding:4px 8px;background:#666;color:white;border:none;border-radius:3px;cursor:pointer;font-size:12px">reset</button>
      </div>
    </div>
    <div>
      <strong>Counter B</strong> (step=10, start=100): {{ b.count }}
      <div style="margin-top:4px">
        <button @click="b.decrement" style="padding:4px 10px;background:#444;color:white;border:none;border-radius:3px;cursor:pointer;margin-right:4px">−10</button>
        <button @click="b.increment" style="padding:4px 10px;background:#42b883;color:white;border:none;border-radius:3px;cursor:pointer;margin-right:4px">+10</button>
        <button @click="b.reset" style="padding:4px 8px;background:#666;color:white;border:none;border-radius:3px;cursor:pointer;font-size:12px">reset</button>
      </div>
    </div>
  </div>
</template>
```

<Tips type="tip">

Composables are plain JavaScript functions — no special syntax or registration. The `use` prefix is only a convention. They're typically placed in a `composables/` directory and imported in components that need them.

</Tips>

---
hideInToc: true
---

## Composables with Lifecycle and Cleanup

```vue {monaco-run}
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// useMouse composable — tracks cursor position
function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.clientX
    y.value = event.clientY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

const { x, y } = useMouse()
</script>

<template>
  <div style="padding:16px;font-family:system-ui;min-height:80px">
    <p style="color:#555;font-size:13px;margin-bottom:8px">Move your mouse over this area:</p>
    <p style="font-size:20px;font-weight:bold;color:#42b883">
      x: {{ x }}, y: {{ y }}
    </p>
    <p style="color:#888;font-size:12px">
      Lifecycle hooks inside composables run in the component's context — cleanup is automatic.
    </p>
  </div>
</template>
```

<Tips type="info">

This mirrors a React custom hook using `useEffect` with event listener setup and cleanup. The key Vue advantage: `onMounted`/`onUnmounted` inside a composable automatically bind to the **calling component's lifecycle** — no need to pass refs or contexts around.

</Tips>

---
hideInToc: true
---

## VueUse — The Composable Library

[VueUse](https://vueuse.org) provides 200+ ready-made composables covering browser APIs, sensors, state utilities, and more.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'
import { useLocalStorage, useDark, useClipboard } from '@vueuse/core'

// Persisted counter — survives page refresh
const count = useLocalStorage('vue-note-count', 0)
// Dark mode toggle
const isDark = useDark()
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p>Persistent count (open DevTools → Application → Local Storage): <strong>{{ count }}</strong></p>
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button @click="count++" style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">+1</button>
      <button @click="count = 0" style="padding:6px 12px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer">Reset</button>
    </div>
    <p>Dark mode: <strong>{{ isDark ? 'ON' : 'OFF' }}</strong>
      <button @click="isDark = !isDark" style="margin-left:8px;padding:4px 10px;background:#444;color:white;border:none;border-radius:3px;cursor:pointer">Toggle</button>
    </p>
  </div>
</template>
```

<Tips type="tip">

VueUse is the Vue equivalent of `react-use`, `@tanstack/react-query` (for data fetching composables), and various other hook libraries combined. `useLocalStorage`, `useFetch`, `useWebSocket`, `useMediaQuery`, `useGeolocation` — all follow the same composable pattern you've just learned.

</Tips>
