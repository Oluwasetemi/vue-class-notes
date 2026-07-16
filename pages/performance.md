---
layout: center
transition: slide-up
hideInToc: true
---

# Performance

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">v-memo — Memoizing Templates</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">shallowRef and markRaw</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">defineAsyncComponent</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">KeepAlive</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">v-once — Static Content</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Performance Checklist</a>

---
hideInToc: true
---

## v-memo — Memoizing Template Subtrees

`v-memo` skips re-rendering a subtree when the listed dependencies haven't changed.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const selected = ref(null)
const tick = ref(0)

const items = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px">
    <p style="color:#888;margin-bottom:8px">
      Selected: <strong style="color:#42b883">{{ selected ?? 'none' }}</strong>
      <button @click="tick++" style="margin-left:12px;padding:3px 8px;background:#444;color:white;border:none;border-radius:3px;cursor:pointer">
        Force update (tick={{ tick }})
      </button>
    </p>
    <!-- v-memo only re-renders this item when its selected state changes -->
    <div
      v-for="item in items"
      :key="item.id"
      v-memo="[selected === item.id]"
      @click="selected = item.id"
      :style="{
        padding: '8px 12px', marginBottom: '4px', borderRadius: '4px', cursor: 'pointer',
        background: selected === item.id ? '#42b883' : '#2a2a2a',
        color: selected === item.id ? 'white' : '#ccc',
        border: `1px solid ${selected === item.id ? '#42b883' : '#444'}`
      }"
    >
      {{ item.name }} {{ selected === item.id ? '✓' : '' }}
    </div>
  </div>
</template>
```

<Tips type="info">

`v-memo` is Vue's equivalent of `React.memo()`. Both skip re-renders when specified values are unchanged. The difference: `React.memo` wraps whole components; `v-memo` applies to **any template element or block**, making it useful for memoizing rows inside `v-for` lists without extracting a separate component.

</Tips>

---
hideInToc: true
---

## shallowRef and markRaw

Use shallow variants to avoid the cost of deep reactive tracking on large objects.

```vue {monaco-run}
<script setup>
import { shallowRef, triggerRef, markRaw, ref } from 'vue'

// shallowRef — only tracks top-level .value replacement
const list = shallowRef([
  { id: 1, name: 'Alice', score: 95 },
  { id: 2, name: 'Bob', score: 87 },
  { id: 3, name: 'Carol', score: 92 },
])

const updates = ref(0)

function sortByScore() {
  list.value = [...list.value].sort((a, b) => b.score - a.score)
  updates.value++
}

function bumpFirst() {
  list.value[0].score = Math.floor(Math.random() * 20) + 80
  triggerRef(list) // manual trigger after in-place mutation
  updates.value++
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px">
    <div style="display:flex;gap:8px;margin-bottom:10px">
      <button @click="sortByScore" style="padding:5px 10px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">Sort by Score</button>
      <button @click="bumpFirst" style="padding:5px 10px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer">Mutate + triggerRef</button>
    </div>
    <div v-for="(p, i) in list" :key="p.id" style="display:flex;gap:12px;margin-bottom:4px">
      <span style="color:#888">{{ i + 1 }}.</span>
      <span style="flex:1">{{ p.name }}</span>
      <span style="color:#42b883;font-weight:bold">{{ p.score }}</span>
    </div>
    <p style="color:#888;margin-top:8px">Updates: {{ updates }}</p>
  </div>
</template>
```

<Tips type="tip">

Use `shallowRef` when your data is large and you only update by replacing the whole value. Use `markRaw(obj)` to permanently opt an object out of reactivity — ideal for third-party class instances, canvas contexts, or large static datasets that should never be tracked.

</Tips>

---
hideInToc: true
---

## defineAsyncComponent — Code Splitting

Split large components into separate JS chunks loaded only when needed.

```ts
import { defineAsyncComponent } from 'vue'

// Basic — just import on demand
const HeavyChart = defineAsyncComponent(
  () => import('./components/HeavyChart.vue')
)

// With loading/error/timeout options
const AsyncModal = defineAsyncComponent({
  loader: () => import('./components/Modal.vue'),
  loadingComponent: Spinner,
  errorComponent: ErrorDisplay,
  delay: 200,     // show Spinner after 200ms
  timeout: 10000, // show ErrorDisplay after 10s
})
```

<v-clicks>

- Components load as separate chunks — excluded from the main bundle
- Works with `<Suspense>` for declarative loading states in templates
- Best for: heavy editors, chart libraries, admin sections, rarely-visited routes
- Vue Router's `component: () => import('./Page.vue')` uses the same mechanism

</v-clicks>

<Tips type="info">

`defineAsyncComponent` ≈ `React.lazy(() => import('./Component'))`. Both code-split at the component level and need a Suspense boundary to handle the loading state. Vue's version has more built-in options: loading component, error component, timeout, and retry delay.

</Tips>

---
hideInToc: true
---

## KeepAlive — Caching Component State

`<KeepAlive>` preserves component state when switching, instead of destroying and remounting.

```vue {monaco-run}
<script setup>
import { ref, shallowRef, onMounted, onActivated, onDeactivated } from 'vue'

const TabA = {
  setup() {
    const count = ref(0)
    const events = ref([])
    onMounted(() => events.value.push('mounted'))
    onActivated(() => events.value.push('activated'))
    onDeactivated(() => events.value.push('deactivated'))
    return { count, events }
  },
  template: `
    <div style="padding:10px;font-size:12px">
      <p>Count: <strong>{{ count }}</strong>
        <button @click="count++" style="margin-left:8px;padding:2px 8px;background:#42b883;color:white;border:none;border-radius:3px;cursor:pointer">+1</button>
      </p>
      <p style="color:#888">{{ events.join(' → ') }}</p>
    </div>
  `,
}
const TabB = {
  template: `<div style="padding:10px;color:#60a5fa;font-size:12px">Tab B — switching back to A preserves its count</div>`,
}

const current = shallowRef(TabA)
const keepAlive = ref(true)
</script>

<template>
  <div style="font-family:system-ui">
    <div style="display:flex;gap:6px;padding:8px;background:#111;border-radius:6px 6px 0 0;align-items:center">
      <button @click="current = TabA" :style="{padding:'4px 10px',background:current===TabA?'#42b883':'#444',color:'white',border:'none',borderRadius:'3px',cursor:'pointer',fontSize:'12px'}">Tab A</button>
      <button @click="current = TabB" :style="{padding:'4px 10px',background:current===TabB?'#60a5fa':'#444',color:'white',border:'none',borderRadius:'3px',cursor:'pointer',fontSize:'12px'}">Tab B</button>
      <label style="margin-left:auto;color:#ccc;font-size:11px;display:flex;align-items:center;gap:4px">
        <input type="checkbox" v-model="keepAlive" /> KeepAlive
      </label>
    </div>
    <div style="border:1px solid #333;border-top:none;border-radius:0 0 6px 6px;min-height:60px">
      <KeepAlive v-if="keepAlive"><component :is="current" /></KeepAlive>
      <component v-else :is="current" />
    </div>
  </div>
</template>
```

<Tips type="info">

React has no built-in `KeepAlive` — you'd hide components with CSS or lift state. Vue's `<KeepAlive>` is a first-class API. Cached components get two extra hooks: `onActivated` and `onDeactivated` instead of `onMounted`/`onUnmounted`.

</Tips>

---
hideInToc: true
---

## v-once — Static Content Optimization

`v-once` renders an element or component **once** and never updates it again, skipping all future reactivity checks.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const title = ref('Vue Performance')
const subtitle = ref('Rendering once is faster than rendering often')
const liveCounter = ref(0)
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px;display:flex;flex-direction:column;gap:10px">
    <!-- v-once: renders exactly once; subsequent changes to title are ignored -->
    <div style="padding:10px;background:#1a2a1a;border:1px solid #42b883;border-radius:6px">
      <span style="color:#888;font-size:11px">v-once (frozen at initial render):</span>
      <h2 v-once style="margin:4px 0;color:#42b883;font-size:15px">{{ title }}</h2>
      <p v-once style="margin:0;color:#aaa;font-size:12px">{{ subtitle }}</p>
    </div>

    <!-- live: updates every render -->
    <div style="padding:10px;background:#1a1a2a;border:1px solid #60a5fa;border-radius:6px">
      <span style="color:#888;font-size:11px">Normal (updates reactively):</span>
      <h2 style="margin:4px 0;color:#60a5fa;font-size:15px">{{ title }}</h2>
    </div>

    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <input v-model="title" placeholder="Change title..."
        style="padding:5px 8px;border:1px solid #42b883;border-radius:4px;background:#111;color:#e5e5e5;font-size:12px;flex:1;min-width:0" />
      <button @click="liveCounter++"
        style="padding:5px 10px;background:#a78bfa;color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;white-space:nowrap">
        Force re-render ({{ liveCounter }})
      </button>
    </div>
    <p style="color:#555;font-size:11px;margin:0">Edit the title — the v-once block stays frozen, the normal block updates.</p>
  </div>
</template>
```

<Tips type="tip">

Use `v-once` for static content that is set once from configuration or props but never changes during the component's lifetime — page headers, help text, legal disclaimers, large static tables. React's equivalent is `useMemo(() => <ExpensiveMarkup />, [])` — but Vue's `v-once` is zero boilerplate and works at the template level without extracting a component.

</Tips>

---
hideInToc: true
---

## Performance Checklist

<v-clicks>

- **Lazy-load routes** — `component: () => import('./Page.vue')` in every route
- **`v-once` for static content** — skip reactivity checks entirely on frozen subtrees
- **`v-memo` for large lists** — prevents re-rendering unchanged `v-for` rows
- **`shallowRef` for large data** — avoids deep reactive traversal of API responses
- **`markRaw` for third-party objects** — class instances, DOM nodes, external lib objects
- **`defineAsyncComponent`** — code-split heavy components out of the main bundle
- **`<KeepAlive>`** — cache tab panels that are expensive to remount
- **Computed over methods** — `computed` caches; method calls recalculate every render
- **`v-show` for frequent toggles** — avoids mount/unmount cost vs `v-if`

</v-clicks>

<Tips type="tip">

Each of these has a React analogue: `React.memo`, `useMemo`, `React.lazy`, CSS-based hiding, `useCallback`. The underlying principle is identical in both frameworks: **avoid unnecessary work, defer loading, cache results**. Measure with DevTools before optimising — Vue's reactivity is already efficient by default.

</Tips>
