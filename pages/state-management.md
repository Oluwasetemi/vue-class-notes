---
layout: center
transition: slide-up
hideInToc: true
---

# State Management with Pinia

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Why Pinia?</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Defining a Store</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Using a Store in Components</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">$patch, $subscribe, $reset</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Setup Stores</a>

---
hideInToc: true
---

## Why Pinia?

**Pinia** is Vue's official state management library. It replaces Vuex and is the recommended solution for sharing state across components that aren't directly related.

<v-clicks>

- **Devtools integration** — time-travel debugging, state snapshots
- **TypeScript first** — full type inference without extra boilerplate
- **Modular** — each store is independent; no global mutation namespace
- **Composable-friendly** — setup stores use the same Composition API you already know
- **Tiny** (~1kb gzip)

</v-clicks>

<Tips type="info">

Pinia is Vue's equivalent of **Zustand** or **Redux Toolkit** in the React ecosystem. Like Zustand, Pinia stores are plain functions — no boilerplate reducers or action types. Like Redux DevTools, Pinia integrates with Vue DevTools for time-travel debugging.

</Tips>

---
hideInToc: true
---

## Defining a Store (Options Store)

```vue {monaco-run}
<script setup>
import { defineStore, createPinia, setActivePinia } from 'pinia'

// Required in isolated sandbox: activate a Pinia instance before using stores
setActivePinia(createPinia())

// Define the store
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Counter' }),
  getters: {
    doubled: (state) => state.count * 2,
    label: (state) => `${state.name}: ${state.count}`,
  },
  actions: {
    increment() { this.count++ },
    reset() { this.count = 0 },
  },
})

// Use the store
const store = useCounterStore()
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p>{{ store.label }} <em style="color:#888">(×2 = {{ store.doubled }})</em></p>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button @click="store.increment()" style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">+1</button>
      <button @click="store.reset()" style="padding:6px 12px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer">Reset</button>
      <button @click="store.count += 10" style="padding:6px 12px;background:#444;color:white;border:none;border-radius:4px;cursor:pointer">+10 direct</button>
    </div>
  </div>
</template>
```

<Tips type="info">

The Options store maps directly to Redux/Zustand concepts: `state` ≈ initial state, `getters` ≈ selectors/derived state, `actions` ≈ action creators/reducers. Unlike Redux, Pinia allows **direct mutation** of state inside actions (via `this.count++`) — no immutability required.

</Tips>

---
hideInToc: true
---

## Using a Store in Components

When using a store in a component, use `storeToRefs()` to destructure reactive state without losing reactivity.

```vue {monaco-run}
<script setup>
import { defineStore, storeToRefs, createPinia, setActivePinia } from 'pinia'

setActivePinia(createPinia())

const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
      { id: 1, name: 'Vue Sticker', price: 5, qty: 1 },
      { id: 2, name: 'Pinia Pin', price: 8, qty: 2 },
    ]
  }),
  getters: {
    total: (state) => state.items.reduce((s, i) => s + i.price * i.qty, 0),
    itemCount: (state) => state.items.reduce((s, i) => s + i.qty, 0),
  },
  actions: {
    addQty(id) {
      const item = this.items.find(i => i.id === id)
      if (item) item.qty++
    },
    removeQty(id) {
      const item = this.items.find(i => i.id === id)
      if (item && item.qty > 0) item.qty--
    }
  }
})

const cart = useCartStore()
// storeToRefs preserves reactivity when destructuring state/getters
const { items, total, itemCount } = storeToRefs(cart)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <div v-for="item in items" :key="item.id" style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <span style="flex:1">{{ item.name }} (${{ item.price }})</span>
      <button @click="cart.removeQty(item.id)" style="padding:2px 8px;background:#666;color:white;border:none;border-radius:3px;cursor:pointer">−</button>
      <span style="width:24px;text-align:center">{{ item.qty }}</span>
      <button @click="cart.addQty(item.id)" style="padding:2px 8px;background:#42b883;color:white;border:none;border-radius:3px;cursor:pointer">+</button>
    </div>
    <p style="font-weight:bold;border-top:1px solid #eee;padding-top:8px;margin-top:4px">
      {{ itemCount }} items — Total: ${{ total }}
    </p>
  </div>
</template>
```

<Tips type="danger">

Don't destructure store state without `storeToRefs()` — `const { count } = store` creates a plain (non-reactive) copy. Use `const { count } = storeToRefs(store)` to get reactive refs. Actions can be destructured directly from the store: `const { increment } = store`.

</Tips>

---
hideInToc: true
---

## $patch, $subscribe, and $reset

Pinia stores expose utility methods for batch updates, watching state changes, and resetting.

```vue {monaco-run}
<script setup>
import { defineStore, storeToRefs, createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'

setActivePinia(createPinia())

const useProfileStore = defineStore('profile', {
  state: () => ({ name: 'Ada', age: 30, theme: 'light' }),
  actions: {
    birthday() { this.age++ },
  },
})

const store = useProfileStore()
const { name, age, theme } = storeToRefs(store)

// $subscribe fires every time state changes
const history = ref([])
store.$subscribe((mutation, state) => {
  history.value.push(`${mutation.type}: age=${state.age} theme=${state.theme}`)
  if (history.value.length > 4) history.value.shift()
})
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px;display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button @click="store.birthday()" style="padding:5px 10px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">
        birthday() — age: {{ age }}
      </button>

      <!-- $patch — batch multiple state updates atomically -->
      <button @click="store.$patch({ name: 'Grace', age: 25, theme: 'dark' })"
        style="padding:5px 10px;background:#60a5fa;color:white;border:none;border-radius:4px;cursor:pointer">
        $patch object
      </button>

      <!-- $patch with function — for array mutations -->
      <button @click="store.$patch(s => { s.age += 5; s.theme = 'light' })"
        style="padding:5px 10px;background:#a78bfa;color:white;border:none;border-radius:4px;cursor:pointer">
        $patch fn
      </button>

      <!-- $reset — back to initial state (Options stores only) -->
      <button @click="store.$reset()"
        style="padding:5px 10px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer">
        $reset
      </button>
    </div>

    <p style="margin:0;color:#888">State: <strong style="color:#e5e5e5">{{ name }}</strong>, age <strong style="color:#42b883">{{ age }}</strong>, theme <strong style="color:#fbbf24">{{ theme }}</strong></p>

    <div style="background:#111;border-radius:4px;padding:8px;font-size:11px;color:#666">
      <div style="color:#555;margin-bottom:4px">$subscribe history:</div>
      <div v-for="(h, i) in history" :key="i" style="color:#888">{{ h }}</div>
      <div v-if="!history.length" style="color:#444;font-style:italic">No changes yet</div>
    </div>
  </div>
</template>
```

<Tips type="tip">

`$patch` is the correct way to batch multiple state mutations — it triggers `$subscribe` once, not once per property. Use the function form `$patch(state => { ... })` when you need to push to arrays or perform complex mutations. `$reset()` only works on Options stores (which have a known initial state definition); Setup stores need a manual reset action.

</Tips>

---
hideInToc: true
---

## Setup Stores — Composable Style

Setup stores use the Composition API directly — same syntax as `<script setup>`.

```vue {monaco-run}
<script setup>
import { defineStore, storeToRefs, createPinia, setActivePinia } from 'pinia'
import { ref, computed } from 'vue'

setActivePinia(createPinia())

// Setup store — feels like a composable
const useUserStore = defineStore('user', () => {
  const name = ref('Guest')
  const isLoggedIn = ref(false)
  const greeting = computed(() =>
    isLoggedIn.value ? `Welcome back, ${name.value}!` : 'Please log in.'
  )

  function login(username) {
    name.value = username
    isLoggedIn.value = true
  }
  function logout() {
    name.value = 'Guest'
    isLoggedIn.value = false
  }

  return { name, isLoggedIn, greeting, login, logout }
})

const user = useUserStore()
const { name, isLoggedIn, greeting } = storeToRefs(user)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p>{{ greeting }}</p>
    <div v-if="!isLoggedIn" style="display:flex;gap:8px;margin-top:8px">
      <button @click="user.login('Setemi')" style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">Login as Setemi</button>
    </div>
    <div v-else>
      <p style="color:#888;font-size:13px">Logged in as: {{ name }}</p>
      <button @click="user.logout()" style="padding:6px 12px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer">Logout</button>
    </div>
  </div>
</template>
```

<Tips type="tip">

Setup stores are the preferred style when using TypeScript — the type inference is automatic. They look identical to a composable, which means if your state management needs grow beyond a composable, migrating to a Pinia setup store is trivial.

</Tips>
