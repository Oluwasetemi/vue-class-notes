---
layout: center
transition: slide-up
hideInToc: true
---

# Rendering

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Conditional Rendering (v-if / v-show)</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">List Rendering (v-for)</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Keys and List Optimisation</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Dynamic Components</a>

---
hideInToc: true
---

## Conditional Rendering: v-if and v-show

`v-if` fully adds/removes the element from the DOM. `v-show` toggles `display: none`.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'
const loggedIn = ref(false)
const showDetails = ref(true)
const status = ref('idle') // idle | loading | success | error
</script>

<template>
  <div style="padding:16px;font-family:system-ui;display:flex;flex-direction:column;gap:10px">
    <!-- v-if: completely unmounts/remounts -->
    <div>
      <button @click="loggedIn = !loggedIn"
        style="padding:6px 14px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">
        {{ loggedIn ? 'Logout' : 'Login' }}
      </button>
      <p v-if="loggedIn" style="color:#42b883;margin:4px 0">✅ Welcome back!</p>
      <p v-else style="color:#888;margin:4px 0">🔒 Please log in</p>
    </div>

    <!-- v-show: stays in DOM, just hidden -->
    <div>
      <button @click="showDetails = !showDetails"
        style="padding:6px 14px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer">
        {{ showDetails ? 'Hide' : 'Show' }} Details
      </button>
      <p v-show="showDetails" style="color:#555;margin:4px 0;font-size:13px">
        v-show keeps this in the DOM — inspect element to see display:none
      </p>
    </div>

    <!-- v-else-if chain -->
    <div>
      <select v-model="status" style="border:1px solid #42b883;padding:4px 8px;border-radius:4px">
        <option>idle</option><option>loading</option><option>success</option><option>error</option>
      </select>
      <span v-if="status === 'idle'" style="margin-left:8px;color:#888">⏸ Idle</span>
      <span v-else-if="status === 'loading'" style="margin-left:8px;color:#fbbf24">⏳ Loading…</span>
      <span v-else-if="status === 'success'" style="margin-left:8px;color:#42b883">✅ Success</span>
      <span v-else style="margin-left:8px;color:#f87171">❌ Error</span>
    </div>
  </div>
</template>
```

<Tips type="info">

React uses JavaScript expressions: `{condition && <El />}` or ternary `{cond ? <A /> : <B />}`. Vue uses directives (`v-if`, `v-else`, `v-show`). `v-show` has no direct React equivalent — you'd write `style={{ display: show ? 'block' : 'none' }}` manually. Use `v-if` for infrequent toggles; `v-show` for frequent ones (avoids mount/unmount cost).

</Tips>

---
hideInToc: true
---

## List Rendering with v-for

`v-for` iterates over arrays or objects to render repeated elements.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const fruits = ref(['Mango', 'Banana', 'Pawpaw'])
const newFruit = ref('')

const users = ref([
  { id: 1, name: 'Ada', role: 'engineer' },
  { id: 2, name: 'Grace', role: 'scientist' },
  { id: 3, name: 'Mary', role: 'mathematician' },
])

function addFruit() {
  if (newFruit.value.trim()) {
    fruits.value.push(newFruit.value.trim())
    newFruit.value = ''
  }
}
function remove(i) {
  fruits.value.splice(i, 1)
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <!-- Array of strings -->
    <div style="margin-bottom:12px">
      <div v-for="(fruit, index) in fruits" :key="fruit"
        style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
        <span style="color:#888;font-size:12px">{{ index + 1 }}.</span>
        <span>{{ fruit }}</span>
        <button @click="remove(index)" style="padding:1px 7px;background:#f87171;color:white;border:none;border-radius:3px;cursor:pointer;font-size:11px">×</button>
      </div>
      <div style="display:flex;gap:6px;margin-top:6px">
        <input v-model="newFruit" placeholder="Add fruit…" @keyup.enter="addFruit"
          style="border:1px solid #42b883;padding:4px 8px;border-radius:4px;font-size:13px" />
        <button @click="addFruit" style="padding:4px 10px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">Add</button>
      </div>
    </div>

    <!-- Array of objects -->
    <table style="border-collapse:collapse;font-size:13px;width:100%">
      <tr v-for="user in users" :key="user.id" style="border-bottom:1px solid #eee">
        <td style="padding:4px 8px;color:#42b883">{{ user.id }}</td>
        <td style="padding:4px 8px;font-weight:bold">{{ user.name }}</td>
        <td style="padding:4px 8px;color:#888">{{ user.role }}</td>
      </tr>
    </table>
  </div>
</template>
```

<Tips type="info">

React uses `array.map((item, index) => <Element key={item.id} />)`. Vue uses `v-for="item in array"` with `:key="item.id"`. The `:key` requirement is identical — both frameworks need a stable key to reconcile lists efficiently. Vue's `v-for` also supports `(value, key, index)` for object iteration.

</Tips>

---
hideInToc: true
---

## Keys and Why They Matter

`:key` helps Vue identify which items have changed, been added, or removed during list updates.

<v-clicks>

- **Without key**: Vue reuses DOM nodes in place — may cause incorrect state (e.g., input values)
- **With stable key** (e.g., `item.id`): Vue moves the correct DOM node
- **Never use index as key** when the list can be reordered or items deleted from the middle
- Use index only for static, read-only lists that never change order

</v-clicks>

```vue
<!-- ✅ Stable key -->
<li v-for="user in users" :key="user.id">{{ user.name }}</li>

<!-- ⚠️  Index key — fine for static lists only -->
<li v-for="(item, index) in staticList" :key="index">{{ item }}</li>

<!-- ❌ No key — Vue warns and renders incorrectly -->
<li v-for="item in items">{{ item }}</li>
```

<Tips type="info">

React has the exact same requirement — the `key` prop on list items. Both frameworks warn in the console when keys are missing. The advice is identical: use a stable, unique ID from your data, not the array index.

</Tips>

---
hideInToc: true
---

## Dynamic Components

Use `<component :is="...">` to render different components based on state.

```vue {monaco-run}
<script setup>
import { ref, shallowRef } from 'vue'

const TabHome = {
  template: `<div style="padding:12px;color:#42b883">🏠 Home — Welcome to Vue Note!</div>`
}
const TabAbout = {
  template: `<div style="padding:12px;color:#60a5fa">ℹ️ About — A Vue.js teaching presentation.</div>`
}
const TabSettings = {
  template: `<div style="padding:12px;color:#fbbf24">⚙️ Settings — Dark mode coming soon.</div>`
}

const tabs = [
  { label: 'Home', component: TabHome },
  { label: 'About', component: TabAbout },
  { label: 'Settings', component: TabSettings },
]
const current = shallowRef(TabHome)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <div style="display:flex;gap:4px;margin-bottom:12px;border-bottom:2px solid #eee;padding-bottom:8px">
      <button
        v-for="tab in tabs" :key="tab.label"
        @click="current = tab.component"
        :style="{
          padding: '6px 14px',
          background: current === tab.component ? '#42b883' : '#eee',
          color: current === tab.component ? 'white' : '#333',
          border: 'none', borderRadius: '4px', cursor: 'pointer'
        }"
      >{{ tab.label }}</button>
    </div>
    <component :is="current" />
  </div>
</template>
```

<Tips type="info">

React achieves this with a lookup object and conditional rendering: `const ComponentMap = { home: Home }; const C = ComponentMap[tab]; return <C />`. Vue's `<component :is="...">` is a first-class directive for the same pattern. Wrap the component value in `shallowRef()` (not `ref()`) to avoid deep reactive conversion of component objects.

</Tips>
