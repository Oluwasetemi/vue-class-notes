---
layout: center
transition: slide-up
hideInToc: true
---

# Transitions & Animations

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">The &lt;Transition&gt; Component</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">&lt;TransitionGroup&gt; — List Animations</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">JavaScript Hooks</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">CSS Transitions with UnoCSS</a>

---
hideInToc: true
---

## The &lt;Transition&gt; Component

`<Transition>` wraps a single element or component and applies enter/leave CSS classes automatically.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <button @click="show = !show"
      style="padding:6px 14px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;margin-bottom:16px">
      Toggle
    </button>

    <Transition name="fade">
      <div v-if="show"
        style="padding:12px 16px;background:#1a2a1a;border:1px solid #42b883;border-radius:6px;color:#42b883;font-size:14px">
        ✅ Vue transitions use CSS classes — no JavaScript required for basic animations.
      </div>
    </Transition>

    <Transition name="slide">
      <p v-if="show" style="margin-top:10px;color:#888;font-size:13px">
        Slides in from the left using <code>transform</code> + <code>opacity</code>.
      </p>
    </Transition>
  </div>
</template>

<style scoped>
/* fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* slide */
.slide-enter-active { transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1); }
.slide-leave-active { transition: all 0.2s ease-in; }
.slide-enter-from { transform: translateX(-20px); opacity: 0; }
.slide-leave-to { transform: translateX(20px); opacity: 0; }
</style>
```

<Tips type="info">

Vue injects 6 CSS classes: `*-enter-from`, `*-enter-active`, `*-enter-to`, `*-leave-from`, `*-leave-active`, `*-leave-to`. React has no built-in equivalent — you'd use `react-transition-group` or `framer-motion`. Vue's approach is simpler for CSS-driven animations: just add a `<Transition name="x">` wrapper and write the classes.

</Tips>

---
hideInToc: true
---

## &lt;TransitionGroup&gt; — List Animations

`<TransitionGroup>` animates items in a `v-for` list as they're added, removed, or moved.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

let id = 4
const items = ref([
  { id: 1, label: 'Vue 3' },
  { id: 2, label: 'Composition API' },
  { id: 3, label: 'Reactivity' },
])

function add() {
  const labels = ['Pinia', 'VueUse', 'Vite', 'Nuxt', 'Vue Router']
  items.value.push({ id: id++, label: labels[Math.floor(Math.random() * labels.length)] })
}

function remove(id) {
  const i = items.value.findIndex(x => x.id === id)
  if (i !== -1) items.value.splice(i, 1)
}

function shuffle() {
  items.value = [...items.value].sort(() => Math.random() - 0.5)
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button @click="add"
        style="padding:5px 12px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;font-size:13px">
        + Add
      </button>
      <button @click="shuffle"
        style="padding:5px 12px;background:#60a5fa;color:white;border:none;border-radius:4px;cursor:pointer;font-size:13px">
        Shuffle
      </button>
    </div>

    <TransitionGroup name="list" tag="ul" style="padding:0;margin:0;list-style:none;display:flex;flex-direction:column;gap:4px">
      <li v-for="item in items" :key="item.id"
        style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#1a1a2e;border:1px solid #333;border-radius:5px">
        <span style="color:#e5e5e5;font-size:13px">{{ item.label }}</span>
        <button @click="remove(item.id)"
          style="padding:1px 8px;background:#f87171;color:white;border:none;border-radius:3px;cursor:pointer;font-size:12px">×</button>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-move { transition: transform 0.3s ease; }
.list-enter-from { opacity: 0; transform: translateX(-20px); }
.list-leave-to { opacity: 0; transform: translateX(20px); }
.list-leave-active { position: absolute; }
</style>
```

<Tips type="tip">

The `.list-move` class (using `transform`) enables the smooth "FLIP" repositioning when items shuffle. Without it, items would jump. `position: absolute` on `.list-leave-active` lets remaining items flow smoothly into position while the removed item fades out. React requires `react-flip-move` or similar libs for the same effect.

</Tips>

---
hideInToc: true
---

## JavaScript Transition Hooks

For complex animations (GSAP, Web Animations API), use `<Transition>`'s event hooks instead of CSS.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const show = ref(false)

function onEnter(el, done) {
  el.style.opacity = '0'
  el.style.transform = 'scale(0.8) rotate(-5deg)'
  el.style.transition = 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
  requestAnimationFrame(() => {
    el.style.opacity = '1'
    el.style.transform = 'scale(1) rotate(0deg)'
    setTimeout(done, 450)
  })
}

function onLeave(el, done) {
  el.style.transition = 'all 0.25s ease-in'
  el.style.opacity = '0'
  el.style.transform = 'scale(0.9) translateY(10px)'
  setTimeout(done, 250)
}
</script>

<template>
  <div style="padding:16px;font-family:system-ui;min-height:120px">
    <button @click="show = !show"
      style="padding:6px 14px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;margin-bottom:16px">
      {{ show ? 'Hide' : 'Show' }} card
    </button>

    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <div v-if="show"
        style="padding:14px 18px;background:linear-gradient(135deg,#1a3a2a,#0d1f17);border:1px solid #42b883;border-radius:8px;color:#e5e5e5;font-size:13px;max-width:280px">
        🎨 JavaScript hooks give full control over timing and easing — perfect for spring animations or GSAP.
      </div>
    </Transition>
  </div>
</template>
```

<Tips type="tip">

Set `:css="false"` to tell Vue to skip its CSS class injection entirely — this avoids conflicts with JS-driven animations. The `done` callback signals Vue that the transition is complete so it can remove the element. Equivalent to Framer Motion's `onAnimationComplete` in React.

</Tips>

---
hideInToc: true
---

## CSS Transitions — UnoCSS Utilities

UnoCSS ships built-in `transition-*` utilities that work directly in class bindings without writing custom CSS.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const hovered = ref(false)
const active = ref(false)
const tab = ref('vue')
</script>

<template>
  <div style="padding:16px;font-family:system-ui;display:flex;flex-direction:column;gap-16px">

    <!-- Hover scale + shadow -->
    <div
      @mouseenter="hovered = true" @mouseleave="hovered = false"
      :style="{
        padding: '12px 18px',
        background: hovered ? '#1a3a2a' : '#1a1a1a',
        border: '1px solid',
        borderColor: hovered ? '#42b883' : '#333',
        borderRadius: '8px',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(66,184,131,0.2)' : 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        fontSize: '13px',
        color: hovered ? '#42b883' : '#888',
      }"
    >
      Hover me — smooth transition via inline style bindings
    </div>

    <!-- Tab switcher -->
    <div style="display:flex;gap:4px;margin-top:8px">
      <button v-for="t in ['vue', 'react', 'svelte']" :key="t"
        @click="tab = t"
        :style="{
          padding: '5px 14px',
          background: tab === t ? '#42b883' : 'transparent',
          color: tab === t ? 'white' : '#888',
          border: '1px solid',
          borderColor: tab === t ? '#42b883' : '#444',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '13px',
          transition: 'all 0.15s ease',
        }"
      >{{ t }}</button>
    </div>
    <p style="font-size:13px;color:#555;margin-top:6px">Active: <strong style="color:#42b883">{{ tab }}</strong></p>
  </div>
</template>
```

<Tips type="info">

Vue's `:style` binding with reactive state + CSS `transition` is a lightweight alternative to `<Transition>` for hover effects and toggle states. No lifecycle hooks needed — just bind style properties reactively and let the browser CSS engine handle interpolation. This is identical in React with `style={{ ... }}` and a `useState` for hover state.

</Tips>
