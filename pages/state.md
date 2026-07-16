---
layout: center
transition: slide-up
hideInToc: true
---

# Managing State

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Declarative vs Imperative</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">v-model — Two-Way Binding</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Lifting State Up</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Props Down, Events Up</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Structuring State</a>

---
hideInToc: true
---

## Declarative vs Imperative

Vue enforces a **declarative** approach: you describe what the UI should look like for a given state, and Vue handles the DOM updates.

<v-clicks>

- **Imperative**: manually manipulate the DOM step by step (`document.getElementById`, `el.style.display = ...`)
- **Declarative**: describe the desired UI state and let the framework sync the DOM
- Identify all visual states your component can be in
- Represent each state with reactive data (`ref`, `reactive`)
- Connect event handlers to transition between states
- Let the template reflect the current state automatically

</v-clicks>

<Tips type="info">

This matches React exactly — both frameworks enforce a declarative model. React does it through JSX returning elements based on state; Vue does it through reactive templates. The mental model is identical: **UI = f(state)**.

</Tips>

---
hideInToc: true
---

## v-model — Two-Way Binding

`v-model` is syntactic sugar that combines `:value` binding and `@input` event handling in one directive.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const name = ref('')
const agreed = ref(false)
const role = ref('student')
</script>

<template>
  <div style="padding:16px;font-family:system-ui;display:flex;flex-direction:column;gap:10px">
    <label>
      Name:
      <input v-model="name" placeholder="Enter your name"
        style="margin-left:8px;border:1px solid #42b883;padding:4px 8px;border-radius:4px" />
    </label>

    <label style="display:flex;align-items:center;gap:8px">
      <input type="checkbox" v-model="agreed" />
      I agree to the terms
    </label>

    <label>
      Role:
      <select v-model="role" style="margin-left:8px;border:1px solid #42b883;padding:4px 8px;border-radius:4px">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
    </label>

    <div style="background:#f5f5f5;padding:10px;border-radius:6px;font-size:13px">
      <strong>State:</strong> {{ { name, agreed, role } }}
    </div>
  </div>
</template>
```

<Tips type="info">

React uses **controlled components**: `value={state}` + `onChange={e => setState(e.target.value)}` — two separate props. Vue's `v-model` combines both into one directive. Under the hood, `v-model` on an input expands to `:value="name" @input="name = $event.target.value"`.

</Tips>

---
hideInToc: true
---

## Lifting State Up

When multiple components need to share state, move it to their **closest common parent** and pass it down via props.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

// Inline child component definitions for demo
const Panel = {
  props: ['title', 'isOpen'],
  emits: ['toggle'],
  template: `
    <div style="border:1px solid #42b883;border-radius:6px;margin-bottom:8px;overflow:hidden">
      <button @click="$emit('toggle')"
        style="width:100%;padding:8px 12px;background:#42b883;color:white;border:none;cursor:pointer;text-align:left;font-weight:bold">
        {{ isOpen ? '▼' : '►' }} {{ title }}
      </button>
      <div v-if="isOpen" style="padding:12px;font-size:13px;color:#555">
        <slot />
      </div>
    </div>
  `
}

const openPanel = ref(null)
function togglePanel(id) {
  openPanel.value = openPanel.value === id ? null : id
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui;max-width:320px">
    <component :is="Panel" title="Vue Reactivity" :isOpen="openPanel === 'a'" @toggle="togglePanel('a')">
      ref(), reactive(), computed() — the core of Vue's reactivity system.
    </component>
    <component :is="Panel" title="Vue Router" :isOpen="openPanel === 'b'" @toggle="togglePanel('b')">
      Official routing library. useRoute(), useRouter(), RouterView.
    </component>
    <component :is="Panel" title="Pinia" :isOpen="openPanel === 'c'" @toggle="togglePanel('c')">
      Official state management. defineStore(), storeToRefs().
    </component>
  </div>
</template>
```

<Tips type="info">

Lifting state up is identical in React and Vue — it's a framework-agnostic pattern. The only difference is syntax: React passes `onToggle={fn}` (callback prop), Vue passes `@toggle="fn"` (event listener). Both work by moving the shared state to the parent.

</Tips>

---
hideInToc: true
---

## Props Down, Events Up

The core Vue data flow pattern: **parent → child via props**, **child → parent via emits**.

<v-clicks>

- Props are **read-only** in the child — never mutate a prop directly
- To change a value owned by the parent, emit an event and let the parent handle it
- This creates a **unidirectional data flow** that's easy to trace and debug
- `defineProps()` declares what a child accepts
- `defineEmits()` declares what events a child can fire

</v-clicks>

```vue
<!-- Child component -->
<script setup>
const props = defineProps<{ count: number }>()
const emit = defineEmits<{ increment: []; reset: [] }>()
</script>

<template>
  <button @click="emit('increment')">+1 ({{ props.count }})</button>
  <button @click="emit('reset')">Reset</button>
</template>
```

<Tips type="info">

React uses **callback props** for child-to-parent communication (`onIncrement={fn}`). Vue uses **events** (`emit('increment')`). The mental model is the same — child signals intent, parent acts. Vue's approach mirrors the DOM's own event system more closely.

</Tips>

---
hideInToc: true
---

## Structuring State

Guidelines for organizing reactive state effectively:

<v-clicks>

- **Group related state** — use `reactive()` for objects that always change together
- **Keep state flat** — avoid deeply nested reactive objects; use `ref()` for independent values
- **Derived state belongs in `computed()`** — don't store what you can calculate
- **Component state vs. shared state** — local state stays in the component; shared state goes to Pinia or a composable
- **Avoid redundant state** — if value A can be derived from value B, only store B

</v-clicks>

<Tips type="tip">

These rules match React's state structuring guidelines from the official docs almost exactly. The patterns are universal: single source of truth, minimal state, derive everything else. The only difference is the API used to express them.

</Tips>
