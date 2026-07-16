---
layout: center
transition: slide-up
hideInToc: true
---

# Introduction to Vue.js

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">What is Vue.js?</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Single File Components</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Options API vs Composition API</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">The Vue Ecosystem</a>
- <a @click="$slidev.nav.go($nav.currentPage+7)">Vue DevTools</a>

---
hideInToc: true
---

## What is Vue.js?

Vue.js is a **progressive JavaScript framework** for building user interfaces. It builds on standard HTML, CSS, and JavaScript with a declarative and component-based model.

<v-clicks>

- **Progressive** — adopt as little or as much as you need; works as a library or full framework
- **Reactive** — automatically tracks JavaScript state changes and efficiently updates the DOM
- **Component-based** — compose complex UIs from small, isolated, reusable pieces
- **Approachable** — designed to be learnable on top of standard HTML/CSS/JS skills

</v-clicks>

<Tips type="info">

Vue and React share the same core goal: declarative, component-based UI. The key difference is that Vue uses **HTML templates** with a built-in reactivity system, while React uses **JSX** with an explicit immutable state model (`useState`).

</Tips>

---
hideInToc: true
---

## Single File Components (SFCs)

Vue SFCs (`.vue` files) co-locate template, logic, and styles in one file — the standard way to write Vue.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'
const count = ref(0)
const greet = () => `Hello from Vue! Count: ${count.value}`
</script>

<template>
  <div style="padding:16px; font-family:system-ui">
    <p>{{ greet() }}</p>
    <button @click="count++" style="padding:6px 14px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">
      Click me ({{ count }})
    </button>
  </div>
</template>
```

<Tips type="info">

React co-locates logic and markup in `.jsx`/`.tsx` files. Vue SFCs go further by also co-locating **styles** (via `<style scoped>`). The `<script setup>` block is Vue's equivalent of the function body in a React component.

</Tips>

---
hideInToc: true
---

## Options API vs Composition API

Vue offers two authoring styles. This course uses **Composition API** throughout.

<div grid="~ cols-2 gap-4" mt-4>
<div>

**Options API** (Vue 2 classic)
```vue
<script>
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubled() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  }
}
</script>
```
</div>
<div>

**Composition API** (Vue 3 recommended)
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
const increment = () => count.value++
</script>
```
</div>
</div>

<Tips type="tip">

Composition API is more powerful, better for TypeScript, and closer in mental model to React hooks. The `<script setup>` sugar compiles to Composition API — less boilerplate, same power.

</Tips>

---
hideInToc: true
---

## Why Composition API?

<v-clicks>

- **Logic by feature, not lifecycle** — group related code together instead of splitting across `data`, `methods`, `computed`
- **Reusable logic** — extract into *composables* (Vue's equivalent of custom hooks)
- **Better TypeScript** — full type inference without decorators or complex generics
- **Tree-shakable** — only import what you use; smaller bundles
- **Smaller components** — `<script setup>` removes boilerplate `export default {}` wrapper

</v-clicks>

<Tips type="info">

This mirrors React's evolution from class components → hooks. Options API ≈ class components (organized by lifecycle/type). Composition API ≈ hooks (organized by concern). The same motivations drove both changes.

</Tips>

---
hideInToc: true
---

## The Vue Ecosystem

<v-clicks>

- **Vue Router** — official client-side routing (≈ React Router)
- **Pinia** — official state management (≈ Zustand)
- **VueUse** — 200+ composable utilities (≈ react-use / TanStack)
- **Nuxt** — full-stack meta-framework with SSR/SSG (≈ Next.js)
- **Vite** — build tool powering Vue (shared with React ecosystem)
- **Vitest** — unit testing framework built on Vite (≈ Jest)
- **Vue Test Utils** — component testing helpers (≈ React Testing Library)

</v-clicks>

<Tips type="tip">

Most tools in the Vue ecosystem have a near-direct React analogue. If you know the React ecosystem, you already understand the *purpose* of each tool — you just need to learn the Vue-specific API.

</Tips>

---
hideInToc: true
---

## Vue DevTools

Vue DevTools is a browser extension (Chrome/Firefox) that gives you a live view into your running Vue app.

<v-clicks>

- **Component tree** — inspect every component, its props, data, and computed values in real time
- **Timeline** — record and replay state changes, events, and performance markers
- **Pinia inspector** — browse store state, trigger actions, and time-travel to previous states
- **Router** — see the current route, route history, and matched components
- **Performance** — profile component render times and spot unnecessary re-renders

</v-clicks>

<div mt-4 />

<Tips type="tip">

Install from the [Chrome Web Store](https://chrome.google.com/webstore/detail/vuejs-devtools) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/). The DevTools only activate on pages running Vue in development mode — they're automatically disabled in production builds. React DevTools works identically: same browser extension pattern, same component tree inspection model.

</Tips>
