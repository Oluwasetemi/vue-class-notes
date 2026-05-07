---
layout: center
transition: slide-up
hideInToc: true
---

# Component Interaction

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">defineEmits — Custom Events</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Event Modifiers</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Parent ↔ Child Patterns</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Component Communication Summary</a>

---
hideInToc: true
---

## defineEmits — Custom Events

Children communicate with parents by emitting named events.

```vue {monaco-run}
<script setup>
import { ref, defineComponent } from 'vue'

const LikeButton = defineComponent({
  props: { liked: Boolean, count: Number },
  emits: {
    // Emit with validation
    like: null,
    dislike: null,
  },
  template: `
    <div style="display:flex;align-items:center;gap:8px;font-family:system-ui;font-size:14px">
      <button @click="$emit('like')"
        :style="{ padding:'6px 14px', background: liked ? '#42b883' : '#2a2a2a', color:'white', border:'1px solid #42b883', borderRadius:'4px', cursor:'pointer' }">
        ♥ {{ liked ? 'Liked' : 'Like' }}
      </button>
      <button @click="$emit('dislike')"
        :style="{ padding:'6px 14px', background: '#2a2a2a', color:'#ccc', border:'1px solid #555', borderRadius:'4px', cursor:'pointer' }">
        ✕ Dislike
      </button>
      <span style="color:#888;font-size:12px">{{ count }} likes</span>
    </div>
  `,
})

const liked = ref(false)
const count = ref(42)

function handleLike() {
  if (!liked.value) { liked.value = true; count.value++ }
}
function handleDislike() {
  if (liked.value) { liked.value = false; count.value-- }
}
</script>

<template>
  <div style="padding:16px">
    <component :is="LikeButton"
      :liked="liked"
      :count="count"
      @like="handleLike"
      @dislike="handleDislike"
    />
  </div>
</template>
```

<Tips type="info">

React uses **callback props**: `<LikeButton onLike={handleLike} />`. Vue uses **events**: `emit('like')` in the child, `@like="handleLike"` in the parent. The mental model is the same — child signals intent, parent decides. Vue's approach mirrors the native DOM event system: `@click`, `@input`, `@like` all use the same `v-on` syntax.

</Tips>

---
hideInToc: true
---

## Event Modifiers

Vue provides event modifiers that replace common `event.*` boilerplate in handlers.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const log = ref([])

function add(msg) {
  log.value.unshift(msg)
  if (log.value.length > 5) log.value.pop()
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px">
    <!-- .prevent replaces event.preventDefault() -->
    <form @submit.prevent="add('form submitted (default prevented)')" style="margin-bottom:8px">
      <button type="submit" style="padding:5px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer">
        Submit (.prevent)
      </button>
    </form>

    <!-- .stop replaces event.stopPropagation() -->
    <div @click="add('outer clicked')"
      style="padding:10px;background:#1a1a1a;border-radius:4px;margin-bottom:8px;cursor:pointer">
      Outer div
      <button @click.stop="add('inner button (.stop)')"
        style="margin-left:8px;padding:4px 10px;background:#60a5fa;color:white;border:none;border-radius:3px;cursor:pointer">
        Inner button (.stop)
      </button>
    </div>

    <!-- .once fires the handler only one time -->
    <button @click.once="add('once — fires only first time')"
      style="padding:5px 12px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer;margin-bottom:10px">
      Click me (.once)
    </button>

    <div v-for="(entry, i) in log" :key="i" style="color:#888;margin-bottom:2px">▶ {{ entry }}</div>
  </div>
</template>
```

<Tips type="info">

React requires manual calls: `e.preventDefault()`, `e.stopPropagation()` inside handlers. Vue's modifier syntax (`@submit.prevent`, `@click.stop`, `@click.once`) is declarative and keeps handlers clean. Key modifiers also exist: `@keyup.enter`, `@keyup.escape`, `@keydown.ctrl.s`.

</Tips>

---
hideInToc: true
---

## Parent ↔ Child Patterns

```vue {monaco-run}
<script setup>
import { ref, defineComponent } from 'vue'

// Controlled child — parent owns the state
const SearchInput = defineComponent({
  props: { modelValue: String, placeholder: String },
  emits: ['update:modelValue', 'search'],
  template: `
    <div style="display:flex;gap:6px">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('search', modelValue)"
        :placeholder="placeholder || 'Search...'"
        style="border:1px solid #42b883;padding:5px 10px;border-radius:4px;outline:none;font-size:13px;flex:1"
      />
      <button @click="$emit('search', modelValue)"
        style="padding:5px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;font-size:13px">
        Search
      </button>
    </div>
  `,
})

const query = ref('')
const results = ref([])

function handleSearch(q) {
  if (!q.trim()) { results.value = []; return }
  results.value = [`Result for "${q}"`, q.toUpperCase(), `${q.length} chars`]
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <component :is="SearchInput"
      v-model="query"
      placeholder="Type and press Enter"
      @search="handleSearch"
    />
    <ul style="margin-top:10px;padding-left:16px;font-size:13px">
      <li v-for="r in results" :key="r" style="margin-bottom:4px;color:#555">{{ r }}</li>
      <li v-if="!results.length" style="color:#888;list-style:none">No results yet</li>
    </ul>
  </div>
</template>
```

<Tips type="tip">

This combines `v-model` (two-way binding via `modelValue` + `update:modelValue`) with a custom `search` event. The child emits both — `v-model` keeps the input value in sync, `@search` triggers the parent's search logic. This is the standard Vue controlled input + action event pattern.

</Tips>

---
hideInToc: true
---

## Component Communication Summary

<v-clicks>

| Pattern | Direction | Vue API | React equivalent |
|---|---|---|---|
| Props | Parent → Child | `defineProps()` | Function parameters |
| Events | Child → Parent | `defineEmits()` + `$emit` | Callback props |
| v-model | Two-way | `modelValue` + `update:modelValue` | `value` + `onChange` |
| Template ref | Parent → Child | `ref` + `defineExpose` | `useImperativeHandle` |
| provide/inject | Ancestor → Descendant | `provide()` / `inject()` | `createContext` + `useContext` |
| Pinia store | Any → Any | `defineStore` | Zustand / Redux |

</v-clicks>

<Tips type="tip">

The rule of thumb: reach for the simplest pattern that works. **Props + events** for direct parent-child. **provide/inject** to skip several levels. **Pinia** when truly global or many unrelated components need the same state. Avoid over-engineering with stores when props solve the problem.

</Tips>
