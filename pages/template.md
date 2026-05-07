---
layout: center
transition: slide-up
hideInToc: true
---

# Template Syntax

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Text Interpolation & Expressions</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Binding Attributes (v-bind)</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Handling Events (v-on)</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Directives Overview</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Template Refs</a>

---
hideInToc: true
---

## Text Interpolation & Expressions

Double curly braces `{{ }}` render reactive data into the template.

```vue {monaco-run}
<script setup>
import { ref, computed } from 'vue'
const name = ref('AltSchool')
const year = ref(2024)
const message = computed(() => `Welcome to ${name.value}!`)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p>{{ message }}</p>
    <p>Year: {{ year }}</p>
    <p>Math: {{ year + 1 }}</p>
    <p>Ternary: {{ year > 2020 ? 'Recent' : 'Old' }}</p>
    <p>Method: {{ name.toUpperCase() }}</p>
  </div>
</template>
```

<Tips type="info">

In React JSX you use `{expression}` (single braces) inside markup. Vue templates use `{{ expression }}` (double braces) for text and `:attr="expression"` for attributes. The expressions are plain JavaScript in both cases.

</Tips>

---
hideInToc: true
---

## Binding Attributes with v-bind

Use `v-bind:attr` or the `:attr` shorthand to bind dynamic values to HTML attributes.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const url = ref('https://vuejs.org')
const color = ref('#42b883')
const size = ref(16)
</script>

<template>
  <div style="padding:16px;font-family:system-ui;display:flex;flex-direction:column;gap:8px">
    <a :href="url" target="_blank" style="color:#42b883">Visit Vue docs</a>
    <p :style="{ color, fontSize: size + 'px' }">Dynamic style binding</p>
    <button
      :class="isActive ? 'active' : 'inactive'"
      :style="{ background: isActive ? '#42b883' : '#666', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }"
      @click="isActive = !isActive"
    >
      Toggle ({{ isActive ? 'Active' : 'Inactive' }})
    </button>
  </div>
</template>
```

<Tips type="info">

React uses `className` (not `class`) and inline styles as objects. Vue keeps `class` and `style` as HTML attributes, but also accepts objects/arrays for them. `:class="{ active: isActive }"` is a common Vue pattern with no direct JSX equivalent.

</Tips>

---
hideInToc: true
---

## Handling Events with v-on

Use `v-on:event` or the `@event` shorthand to listen to DOM events.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'
const count = ref(0)
const log = ref('')

function handleClick(event) {
  count.value++
  log.value = `Clicked at (${event.clientX}, ${event.clientY})`
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <button
      @click="handleClick"
      style="padding:8px 16px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;margin-bottom:8px"
    >
      Click me ({{ count }})
    </button>
    <button
      @click.once="count = 0"
      style="padding:8px 16px;background:#666;color:white;border:none;border-radius:4px;cursor:pointer;margin:0 0 8px 8px"
    >
      Reset (fires once)
    </button>
    <p style="color:#555;font-size:13px">{{ log || 'No clicks yet' }}</p>
  </div>
</template>
```

<Tips type="info">

React uses `onClick={handler}` (camelCase). Vue uses `@click="handler"`. Vue also has **event modifiers** like `@click.prevent`, `@click.stop`, `@keyup.enter` — these replace manual `event.preventDefault()` calls that React requires you to write in the handler.

</Tips>

---
hideInToc: true
---

## Directives Overview

Directives are special attributes starting with `v-` that apply reactive behaviour to the DOM.

| Directive | Purpose | React equivalent |
|---|---|---|
| `v-bind` / `:` | Bind attribute to expression | `attr={expr}` |
| `v-on` / `@` | Attach event listener | `onEvent={fn}` |
| `v-if` / `v-else` | Conditional rendering | `{cond && <El />}` |
| `v-show` | Toggle visibility (CSS) | `style={{display}}` |
| `v-for` | List rendering | `array.map()` |
| `v-model` | Two-way data binding | controlled input pattern |
| `v-memo` | Memoize subtree | `React.memo` |

<Tips type="tip">

Directives are Vue's way of extending HTML with reactive behaviour. React does this through JavaScript (JSX expressions). Vue's approach keeps templates closer to HTML; React's approach keeps everything in JS. Both are valid — different philosophy.

</Tips>

---
hideInToc: true
---

## Template Refs

Use `ref` attribute + `useTemplateRef()` (Vue 3.5+) or `ref()` to get direct access to a DOM element.

```vue {monaco-run}
<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)

onMounted(() => {
  inputEl.value?.focus()
})

function clear() {
  if (inputEl.value) {
    inputEl.value.value = ''
    inputEl.value.focus()
  }
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p style="color:#555;font-size:13px;margin-bottom:8px">Input is auto-focused on mount:</p>
    <input
      ref="inputEl"
      placeholder="Type something..."
      style="padding:6px 10px;border:1px solid #42b883;border-radius:4px;outline:none;margin-right:8px"
    />
    <button
      @click="clear"
      style="padding:6px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer"
    >
      Clear
    </button>
  </div>
</template>
```

<Tips type="info">

React uses `useRef()` and attaches it via `ref={myRef}`. Vue uses the same `ref()` primitive for both reactive state AND template refs — the `ref="inputEl"` attribute wires the DOM element to the `inputEl` ref declared in `<script setup>`.

</Tips>
