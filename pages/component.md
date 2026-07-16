---
layout: center
transition: slide-up
hideInToc: true
---

# Components In Depth

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Props with defineProps</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Slots — Content Projection</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">provide / inject</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">defineExpose</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Multiple v-model Bindings</a>

---
hideInToc: true
---

## Props with defineProps

`defineProps()` declares what data a component accepts from its parent. Props are read-only in the child.

```vue {monaco-run}
<script setup>
import { defineComponent, ref } from 'vue'

const UserCard = defineComponent({
  props: {
    name: { type: String, required: true },
    role: { type: String, default: 'Student' },
    score: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
  },
  template: `
    <div :style="{
      padding: '10px 14px', border: '1px solid', marginBottom: '6px', borderRadius: '6px',
      borderColor: active ? '#42b883' : '#444', opacity: active ? 1 : 0.6,
    }">
      <strong :style="{ color: active ? '#42b883' : '#ccc' }">{{ name }}</strong>
      <span style="margin-left:8px;color:#888;font-size:12px">{{ role }}</span>
      <span style="float:right;color:#fbbf24;font-size:12px">{{ score }}pts</span>
    </div>
  `,
})

const users = ref([
  { name: 'Ada', role: 'Engineer', score: 98, active: true },
  { name: 'Grace', role: 'Scientist', score: 95, active: false },
  { name: 'Mary', role: 'Mathematician', score: 91, active: true },
])
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <component :is="UserCard" v-for="u in users" :key="u.name" v-bind="u" />
  </div>
</template>
```

<Tips type="info">

React props are function parameters: `function UserCard({ name, role })`. Vue uses `defineProps()` to declare them with types and defaults. Both support required validation and defaults. `v-bind="user"` (spread) ≈ React's `{...user}` spread props. **Never mutate a prop** — both frameworks enforce this; Vue warns in dev mode.

</Tips>

---
hideInToc: true
---

## Slots — Content Projection

Slots let parent components inject content into a child's template — Vue's content projection system.

```vue {monaco-run}
<script setup>
import { defineComponent } from 'vue'

const Card = defineComponent({
  template: `
    <div style="border:1px solid #42b883;border-radius:8px;overflow:hidden;max-width:300px;font-family:system-ui">
      <div style="background:#42b883;padding:10px 14px;font-weight:bold;color:white">
        <slot name="header">Default Header</slot>
      </div>
      <div style="padding:14px;color:#333;font-size:13px">
        <slot>Default body content</slot>
      </div>
      <div style="padding:10px 14px;background:#f5f5f5;border-top:1px solid #eee;display:flex;justify-content:flex-end;gap:8px">
        <slot name="footer" />
      </div>
    </div>
  `,
})
</script>

<template>
  <div style="padding:16px">
    <component :is="Card">
      <template #header>🟢 Vue Components</template>

      Slots are Vue's content projection. The <strong>parent</strong>
      controls what goes inside the child component.

      <template #footer>
        <button style="padding:4px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">Save</button>
        <button style="padding:4px 12px;background:#eee;border:none;border-radius:4px;cursor:pointer;margin-left:4px">Cancel</button>
      </template>
    </component>
  </div>
</template>
```

<Tips type="info">

Default slot = React `children`. Named slots (`#header`, `#footer`) ≈ render props or named children patterns in React (`headerContent={<h1/>}`). Scoped slots — where the child passes data back to the parent's slot template — ≈ React render props pattern.

</Tips>

---
hideInToc: true
---

## provide / inject — Dependency Injection

Share state across deeply nested components without prop drilling.

```vue {monaco-run}
<script setup>
import { provide, inject, ref, defineComponent } from 'vue'

const DeepChild = defineComponent({
  setup() {
    const theme = inject('theme', ref('light'))
    const toggleTheme = inject('toggleTheme', () => {})
    return { theme, toggleTheme }
  },
  template: `
    <div :style="{
      padding: '12px', borderRadius: '6px', fontSize: '13px',
      background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
      color: theme === 'dark' ? '#e5e5e5' : '#333',
    }">
      Deep child — theme: <strong>{{ theme }}</strong>
      <button @click="toggleTheme" style="margin-left:8px;padding:3px 10px;background:#42b883;color:white;border:none;border-radius:3px;cursor:pointer">
        Toggle
      </button>
    </div>
  `,
})

const theme = ref('light')
provide('theme', theme)
provide('toggleTheme', () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
})
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p style="font-size:13px;color:#888;margin-bottom:10px">Parent provides theme — no prop drilling:</p>
    <DeepChild />
  </div>
</template>
```

<Tips type="info">

`provide` / `inject` ≈ React's `createContext` + `useContext`. Parent `provide('key', value)` ≈ `<Context.Provider value={...}>`. Child `inject('key')` ≈ `useContext(Context)`. Vue's version is string/Symbol keyed rather than object keyed, and doesn't require JSX provider wrapper tags.

</Tips>

---
hideInToc: true
---

## defineExpose — Exposing Component API

`<script setup>` components are closed by default. Use `defineExpose` to intentionally expose methods or state to parent template refs.

```vue {monaco-run}
<script setup>
import { ref, defineComponent } from 'vue'

const Counter = defineComponent({
  setup() {
    const count = ref(0)
    const increment = () => count.value++
    const reset = () => (count.value = 0)
    return { count, increment, reset }
  },
  expose: ['increment', 'reset', 'count'],
  template: `
    <div style="padding:8px;border:1px solid #42b883;border-radius:4px;font-size:13px;display:inline-block">
      Internal count: <strong>{{ count }}</strong>
    </div>
  `,
})

const counterRef = ref(null)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <component :is="Counter" ref="counterRef" style="margin-bottom:12px;display:block" />
    <div style="display:flex;gap:8px">
      <button @click="counterRef?.increment()"
        style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;font-size:13px">
        Parent → increment()
      </button>
      <button @click="counterRef?.reset()"
        style="padding:6px 12px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer;font-size:13px">
        Parent → reset()
      </button>
    </div>
    <p style="color:#888;font-size:12px;margin-top:8px">count via ref: {{ counterRef?.count }}</p>
  </div>
</template>
```

<Tips type="info">

React uses `useImperativeHandle` + `forwardRef` for the same purpose. Vue's `defineExpose` is simpler — no HOC wrapper needed. Both should be used sparingly: prefer props and events for normal communication, and reach for expose only when a parent genuinely needs to call child methods imperatively.

</Tips>

---
hideInToc: true
---

## Multiple v-model Bindings (Vue 3.4+)

A component can have multiple named `v-model` bindings — each backed by its own `defineModel()`.

```vue {monaco-run}
<script setup>
import { ref, defineComponent } from 'vue'

const RangeControl = defineComponent({
  setup() {
    const min = defineModel('min', { default: 0 })
    const max = defineModel('max', { default: 100 })
    return { min, max }
  },
  template: `
    <div style="display:flex;flex-direction:column;gap:8px;font-family:system-ui;font-size:13px">
      <label style="display:flex;align-items:center;gap:8px">
        Min <strong style="width:24px;color:#42b883">{{ min }}</strong>
        <input type="range" v-model.number="min" :max="max - 1" min="0"
          style="flex:1;accent-color:#42b883" />
      </label>
      <label style="display:flex;align-items:center;gap:8px">
        Max <strong style="width:24px;color:#60a5fa">{{ max }}</strong>
        <input type="range" v-model.number="max" :min="min + 1" max="100"
          style="flex:1;accent-color:#60a5fa" />
      </label>
    </div>
  `,
})

const rangeMin = ref(20)
const rangeMax = ref(80)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <component :is="RangeControl" v-model:min="rangeMin" v-model:max="rangeMax" />
    <p style="margin-top:12px;font-size:13px;color:#888">
      Selected range: <strong style="color:#42b883">{{ rangeMin }}</strong>
      — <strong style="color:#60a5fa">{{ rangeMax }}</strong>
    </p>
  </div>
</template>
```

<Tips type="tip">

`v-model:min="rangeMin"` is sugar for `:min="rangeMin" @update:min="rangeMin = $event"`. Each named `defineModel('name')` handles one binding independently. This is cleaner than React's pattern of passing `onMinChange` / `onMaxChange` callbacks alongside value props — the symmetry between parent and child is explicit in the template.

</Tips>
