---
layout: center
transition: slide-up
hideInToc: true
---

# Reactivity

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">ref() — Primitive Reactive State</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">reactive() — Object State</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">computed() — Derived State</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">watch() and watchEffect()</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Lifecycle Hooks</a>

---
hideInToc: true
---

## ref() — Primitive Reactive State

`ref()` wraps any value (primitive or object) in a reactive container. Access the value with `.value` in `<script>`, unwrapped automatically in templates.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('Vue')
const isVisible = ref(true)

function toggle() {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p>count: <strong>{{ count }}</strong></p>
    <p>name: <strong>{{ name }}</strong></p>
    <input v-model="name" style="border:1px solid #42b883;padding:4px 8px;border-radius:4px;margin-bottom:8px" />
    <br>
    <button @click="count++" style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;margin-right:8px">+1</button>
    <button @click="toggle" style="padding:6px 12px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer">
      {{ isVisible ? 'Hide' : 'Show' }}
    </button>
    <p v-if="isVisible" style="margin-top:8px;color:#42b883">👋 Hello, {{ name }}!</p>
  </div>
</template>
```

<Tips type="info">

`ref()` is Vue's equivalent of `useState()`. The key difference: Vue returns a single reactive object with a `.value` property, while React returns a `[value, setter]` tuple. In Vue templates, `.value` is unwrapped automatically — you just write `{{ count }}` not `{{ count.value }}`.

</Tips>

---
hideInToc: true
---

## reactive() — Object State

`reactive()` makes a plain object deeply reactive. Mutate properties directly — no `.value` needed.

```vue {monaco-run}
<script setup>
import { reactive, toRefs } from 'vue'

const user = reactive({
  name: 'Ada',
  age: 36,
  skills: ['Vue', 'TypeScript'],
})

function addSkill() {
  user.skills.push('Vite')
}

// toRefs preserves reactivity when destructuring
const { name, age } = toRefs(user)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <input v-model="user.name" style="border:1px solid #42b883;padding:4px 8px;border-radius:4px;margin-bottom:8px;display:block" />
    <p>Age: {{ user.age }} <button @click="user.age++" style="padding:2px 8px;background:#42b883;color:white;border:none;border-radius:3px;cursor:pointer;margin-left:4px">+1</button></p>
    <p>Skills: {{ user.skills.join(', ') }}</p>
    <button @click="addSkill" style="padding:6px 12px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer">Add Vite</button>
  </div>
</template>
```

<Tips type="info">

React's equivalent is `useState({ name: 'Ada', age: 36 })` — but React requires **immutable updates** (`setState(prev => ({ ...prev, age: prev.age + 1 }))`). Vue's `reactive()` allows **direct mutation** (`user.age++`). Vue's proxy-based reactivity tracks changes automatically.

</Tips>

---
hideInToc: true
---

## computed() — Derived State

`computed()` creates a reactive value derived from other reactive state. It caches results and only recalculates when dependencies change.

```vue {monaco-run}
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { name: 'Banana', price: 1.5, qty: 3 },
  { name: 'Apple', price: 2.0, qty: 2 },
  { name: 'Mango', price: 3.5, qty: 1 },
])
const filter = ref('')

const filtered = computed(() =>
  items.value.filter(i =>
    i.name.toLowerCase().includes(filter.value.toLowerCase())
  )
)

const total = computed(() =>
  filtered.value.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)
)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <input v-model="filter" placeholder="Search..." style="border:1px solid #42b883;padding:4px 8px;border-radius:4px;margin-bottom:8px;display:block" />
    <div v-for="item in filtered" :key="item.name" style="margin-bottom:4px">
      {{ item.name }} × {{ item.qty }} = ${{ (item.price * item.qty).toFixed(2) }}
    </div>
    <p style="margin-top:8px;font-weight:bold;color:#42b883">Total: ${{ total }}</p>
  </div>
</template>
```

<Tips type="info">

`computed()` is Vue's equivalent of `useMemo()`. The key difference: Vue's computed is **automatically tracked** — you don't declare dependencies manually. React's `useMemo` requires an explicit dependency array `[dep1, dep2]`, which can go stale if forgotten.

</Tips>

---
hideInToc: true
---

## watch() — Responding to State Changes

`watch()` runs a callback when specific reactive sources change. Use it for side effects (API calls, logging, syncing with external systems).

```vue {monaco-run}
<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)

// Debounced search simulation
watch(query, async (newVal, oldVal) => {
  if (!newVal) { results.value = []; return }
  loading.value = true
  await new Promise(r => setTimeout(r, 400))
  results.value = ['Result for: ' + newVal, newVal.toUpperCase(), newVal.length + ' chars']
  loading.value = false
}, { immediate: false })
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <input v-model="query" placeholder="Type to search..." style="border:1px solid #42b883;padding:6px 10px;border-radius:4px;display:block;margin-bottom:8px" />
    <p v-if="loading" style="color:#888">Searching...</p>
    <ul v-else style="margin:0;padding-left:16px">
      <li v-for="r in results" :key="r" style="margin-bottom:4px;color:#555">{{ r }}</li>
    </ul>
  </div>
</template>
```

<Tips type="info">

`watch()` maps to `useEffect()` with a dependency array. Key differences: Vue's `watch` explicitly declares the source(s) to watch (`watch(query, cb)`), while `useEffect` uses an implicit dependency array. Vue also has `{ immediate: true }` (run on mount) and `{ deep: true }` (deep object watching) as options.

</Tips>

---
hideInToc: true
---

## watchEffect() — Automatic Dependency Tracking

`watchEffect()` runs immediately and automatically tracks all reactive dependencies accessed inside it.

```vue {monaco-run}
<script setup>
import { ref, watchEffect } from 'vue'

const width = ref(300)
const height = ref(200)
const log = ref([])

watchEffect(() => {
  log.value.push(`Canvas: ${width.value} × ${height.value} = ${width.value * height.value}px²`)
  if (log.value.length > 4) log.value = log.value.slice(-4)
})
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <label style="display:block;margin-bottom:6px">
      Width: {{ width }}px
      <input type="range" v-model="width" min="100" max="500" style="margin-left:8px" />
    </label>
    <label style="display:block;margin-bottom:10px">
      Height: {{ height }}px
      <input type="range" v-model="height" min="100" max="400" style="margin-left:8px" />
    </label>
    <div v-for="(entry, i) in log" :key="i" style="font-size:12px;color:#555;margin-bottom:2px">{{ entry }}</div>
  </div>
</template>
```

<Tips type="tip">

`watchEffect` is like `useEffect(() => { ... })` with **no dependency array** — React would re-run on every render, which is usually wrong. Vue's `watchEffect` is smarter: it tracks exactly which reactive values are read and only re-runs when those change.

</Tips>

---
hideInToc: true
---

## Lifecycle Hooks

Vue components have lifecycle hooks similar to React's `useEffect` with cleanup.

```vue {monaco-run}
<script setup>
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'

const count = ref(0)
const log = ref([])
const tick = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  log.value.push('✅ onMounted — component inserted into DOM')
  timer = setInterval(() => tick.value++, 1000)
})

onUpdated(() => {
  log.value.push(`🔄 onUpdated — count is now ${count.value}`)
  if (log.value.length > 6) log.value = log.value.slice(-6)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p>Timer: {{ tick }}s since mount</p>
    <button @click="count++" style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;margin-bottom:10px">
      Update (count: {{ count }})
    </button>
    <div v-for="(entry, i) in log" :key="i" style="font-size:12px;color:#555;margin-bottom:2px">{{ entry }}</div>
  </div>
</template>
```

<Tips type="info">

`onMounted` ≈ `useEffect(() => {}, [])`. `onUnmounted` ≈ the cleanup function returned from `useEffect`. `onUpdated` ≈ `useEffect(() => {})` with no deps (runs after every render). Vue separates these into distinct hooks rather than combining them into one `useEffect`.

</Tips>
