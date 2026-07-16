---
layout: center
transition: slide-up
hideInToc: true
---

# Data Fetching

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Fetching in onMounted</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Async Setup with Suspense</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">useFetch with VueUse</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Error Handling Patterns</a>

---
hideInToc: true
---

## Fetching in onMounted

The most straightforward pattern: fetch data when the component mounts and store results in `ref`.

```vue {monaco-run}
<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchPosts() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    posts.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px">
    <button @click="fetchPosts" :disabled="loading"
      style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;margin-bottom:10px;opacity:1"
      :style="{ opacity: loading ? 0.6 : 1 }">
      {{ loading ? '⏳ Loading…' : '↺ Refetch' }}
    </button>
    <p v-if="error" style="color:#f87171">Error: {{ error }}</p>
    <div v-for="post in posts" :key="post.id" style="border-bottom:1px solid #eee;padding:6px 0">
      <strong style="color:#42b883">#{{ post.id }}</strong> {{ post.title }}
    </div>
  </div>
</template>
```

<Tips type="info">

React uses `useEffect(() => { fetchData() }, [])` to run on mount. Vue uses `onMounted(() => { fetchData() })`. The pattern is identical: fetch on mount, store in state, show loading/error states. The async/await syntax and try/catch error handling are the same in both frameworks.

</Tips>

---
hideInToc: true
---

## Async Setup with Suspense

Vue supports `async setup()` — the component can `await` directly at the top level. Wrap it in `<Suspense>` to show a fallback while loading.

```vue {monaco-run}
<script setup>
import { defineAsyncComponent, ref, h } from 'vue'

// Simulate async data
async function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// Async child component
const AsyncUser = {
  async setup() {
    await delay(1200)
    const user = { name: 'Ada Lovelace', role: 'Engineer' }
    return () => h('div', { style: 'padding:10px;color:#42b883;font-weight:bold' },
      `✅ ${user.name} — ${user.role}`)
  }
}

const show = ref(false)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <button @click="show = !show"
      style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;margin-bottom:10px">
      {{ show ? 'Hide' : 'Load User (1.2s delay)' }}
    </button>
    <Suspense v-if="show">
      <template #default>
        <component :is="AsyncUser" />
      </template>
      <template #fallback>
        <div style="color:#888;font-size:13px">⏳ Loading user…</div>
      </template>
    </Suspense>
  </div>
</template>
```

<Tips type="info">

Vue's `<Suspense>` maps directly to React's `<Suspense>` — same concept, same purpose. React requires data-fetching libraries (like React Query or Relay) to trigger Suspense boundaries. Vue's `async setup()` triggers them natively, which is simpler for basic cases.

</Tips>

---
hideInToc: true
---

## useFetch with VueUse

`useFetch` from VueUse provides a fully-featured fetch composable with reactive state, abort support, and re-fetching.

```vue {monaco-run}
<script setup>
import { ref, watch } from 'vue'
import { useFetch } from '@vueuse/core'

const userId = ref(1)
const url = ref(`https://jsonplaceholder.typicode.com/users/${userId.value}`)

watch(userId, (id) => {
  url.value = `https://jsonplaceholder.typicode.com/users/${id}`
})

const { data, isFetching, error, execute } = useFetch(url, { refetch: true }).json()
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <label>User ID:</label>
      <input type="number" v-model="userId" min="1" max="10"
        style="width:60px;border:1px solid #42b883;padding:4px 8px;border-radius:4px" />
    </div>
    <p v-if="isFetching" style="color:#888">⏳ Fetching…</p>
    <p v-else-if="error" style="color:#f87171">Error: {{ error }}</p>
    <div v-else-if="data">
      <p><strong>{{ data.name }}</strong> ({{ data.email }})</p>
      <p style="color:#888">{{ data.company?.name }}</p>
    </div>
  </div>
</template>
```

<Tips type="tip">

`useFetch` from VueUse is the Vue equivalent of **React Query's `useQuery`** for simple cases — reactive URL, automatic re-fetch on URL change, loading/error state, abort on unmount. For complex server-state needs (caching, stale-while-revalidate, mutations), look at **TanStack Query** which has a Vue adapter.

</Tips>

---
hideInToc: true
---

## Error Handling Patterns

```vue {monaco-run}
<script setup>
import { ref, defineComponent, onErrorCaptured } from 'vue'

// Simulated child that can throw
const DataWidget = defineComponent({
  props: { shouldFail: Boolean },
  async setup(props) {
    await new Promise(r => setTimeout(r, 500))
    if (props.shouldFail) throw new Error('Network request failed: 503 Service Unavailable')
    return () => null
  },
  template: `<div style="padding:10px;color:#42b883;font-size:13px">✅ Data loaded successfully!</div>`,
})

// Parent uses onErrorCaptured as an error boundary
const shouldFail = ref(false)
const key = ref(0) // remount trigger
const caughtError = ref('')
const isLoading = ref(false)

onErrorCaptured((err) => {
  caughtError.value = err.message
  isLoading.value = false
  return false // return false to prevent error from propagating further
})

function retry() {
  caughtError.value = ''
  isLoading.value = true
  key.value++
  setTimeout(() => { isLoading.value = false }, 600)
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px;display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;gap:8px;align-items:center">
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
        <input type="checkbox" v-model="shouldFail" />
        Simulate failure
      </label>
      <button @click="retry"
        style="padding:5px 10px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">
        ↺ Load (remounts child)
      </button>
    </div>

    <!-- Error boundary UI -->
    <div v-if="caughtError"
      style="padding:10px 14px;background:#2a0a0a;border:1px solid #f87171;border-radius:6px;color:#f87171">
      <strong>❌ Caught by onErrorCaptured:</strong><br />
      <code style="font-size:11px">{{ caughtError }}</code>
      <br />
      <button @click="retry"
        style="margin-top:8px;padding:4px 10px;background:#f87171;color:white;border:none;border-radius:3px;cursor:pointer;font-size:12px">
        Retry
      </button>
    </div>

    <Suspense v-else :key="key">
      <template #default>
        <DataWidget :shouldFail="shouldFail" @vue:mounted="isLoading = false" />
      </template>
      <template #fallback>
        <div style="color:#888;font-size:13px">⏳ Loading…</div>
      </template>
    </Suspense>
  </div>
</template>
```

<Tips type="info">

`onErrorCaptured` is Vue's **Error Boundary** hook — it catches errors thrown by any descendant component (including async setup). Returning `false` stops the error from propagating to the parent. In React, error boundaries require a class component with `componentDidCatch`. Vue's approach is a composable hook, which means you can add error boundary behaviour to any component without changing its class structure.

</Tips>
