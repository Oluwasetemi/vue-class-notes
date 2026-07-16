---
background: https://res.cloudinary.com/drnqdd87d/image/upload/f_auto/nmgakkzd3lmlibnfosps
title: Vue Class Note
titleTemplate: '%s - AltSchool Africa'
info: |
  Vue.js Class Notes
  making of world class developers
  join at [AltSchool Africa](https://altschoolafrica.com)
author: Oluwasetemi
download: true
exportFilename: vue-note
export:
  format: pdf
  timeout: 1600000
  dark: false
  withClicks: false
  withToc: false
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
overviewSnapshots: false
selectable: true
hideInToc: true
monacoTypesIgnoreDefaults: true
---

<div class="logo mb-4" />

# Vue.js [Class]{.text-8xl.font-hand.mr-4.text-gradient} Notes

<p class="text-lg text-white/60 mt-1 font-light tracking-wide">The best way to ever learn Vue.js — <span class="text-[#42b883]">AltSchool Africa</span></p>

<div class="pt-10">
  <span @click="$slidev.nav.next" class="px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200 text-sm text-white/70 hover:text-white backdrop-blur-sm inline-flex items-center gap-2">
    Build reactive UIs with Vue 3 &amp; Composition API — press <kbd>space</kbd> <carbon:arrow-right class="inline opacity-70"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/oluwasetemi/vue-note" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
  <a href="/export" target="_blank" alt="Download" title="Download PDF or PPTX version of the slide"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-download />
  </a>
</div>

<!--
Vue.js Class Notes for AltSchool Africa
-->

---
hideInToc: true
---

# Table of contents

<Toc columns="2" minDepth="1" maxDepth="2"></Toc>

<div class="flex gap-2 mt-5 flex-wrap">
  <button @click="$router.push('/routes')" class="badge-blue px-3 py-1.5 text-sm cursor-pointer transition-all duration-200 hover:bg-blue-500/25 flex items-center gap-1.5"><span class="i-mdi-format-list-bulleted" /> All Sections</button>
  <button @click="$router.push('/playground')" class="badge-vue px-3 py-1.5 text-sm cursor-pointer transition-all duration-200 hover:bg-[#42b883]/25 flex items-center gap-1.5"><span class="i-mdi-code-braces" /> JS/TS Playground</button>
  <button @click="$router.push('/vue-playground')" class="badge-vue px-3 py-1.5 text-sm cursor-pointer transition-all duration-200 hover:bg-[#42b883]/25 flex items-center gap-1.5"><span class="i-logos-vue" /> Vue Playground</button>
  <button @click="$router.push('/changelog')" class="badge px-3 py-1.5 text-sm bg-purple-500/15 text-purple-400 border border-purple-400/30 cursor-pointer transition-all duration-200 hover:bg-purple-500/25 flex items-center gap-1.5"><span class="i-mdi-history" /> Changelog</button>
</div>

---
name: Introduction
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Introduction to </span>
  <span>Vue.js</span>
  <sup v-click>The Progressive Framework</sup>
</div>
<div mt1 forward:delay-300 v-click>Reactive, component-based UIs — built on HTML, CSS, and JavaScript 🟢</div>
</h1>

---
src: ./pages/intro.md
---

---
name: Template Syntax
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Template </span>
  <span>Syntax</span>
  <sup v-click>v-bind, v-on, directives</sup>
</div>
<div mt1 forward:delay-300 v-click>Declarative rendering with HTML-based template syntax 📄</div>
</h1>

---
src: ./pages/template.md
---

---
name: Reactivity
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Vue </span>
  <span>Reactivity</span>
  <sup v-click>ref, reactive, computed, watch</sup>
</div>
<div mt1 forward:delay-300 v-click>The heart of Vue — automatic DOM updates when state changes ⚡</div>
</h1>

---
src: ./pages/reactivity.md
---

---
name: Composables
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Vue </span>
  <span>Composables</span>
  <sup v-click>Reusable stateful logic</sup>
</div>
<div mt1 forward:delay-300 v-click>Extract and share logic across components — Vue's custom hooks 🔧</div>
</h1>

---
src: ./pages/composables.md
---

---
name: State
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Managing </span>
  <span>State</span>
  <sup v-click>v-model, lifting state, patterns</sup>
</div>
<div mt1 forward:delay-300 v-click>Declarative state management — UI as a function of state 🗂️</div>
</h1>

---
src: ./pages/state.md
---

---
name: State Management
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>State Management </span>
  <span>with Pinia</span>
  <sup v-click>Vue's official store</sup>
</div>
<div mt1 forward:delay-300 v-click>Global state made simple — type-safe, modular, devtools-ready 🍍</div>
</h1>

---
src: ./pages/state-management.md
---

---
name: Rendering
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Conditional & List </span>
  <span>Rendering</span>
  <sup v-click>v-if, v-for, v-show</sup>
</div>
<div mt1 forward:delay-300 v-click>Control what renders and when — declaratively 🎨</div>
</h1>

---
src: ./pages/rendering.md
---

---
name: Transitions
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Transitions &amp; </span>
  <span>Animations</span>
  <sup v-click>Transition, TransitionGroup, hooks</sup>
</div>
<div mt1 forward:delay-300 v-click>Bring your UI to life — enter/leave animations built in ✨</div>
</h1>

---
src: ./pages/transitions.md
---

---
name: Data Fetching
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Data </span>
  <span>Fetching</span>
  <sup v-click>onMounted, Suspense, useFetch</sup>
</div>
<div mt1 forward:delay-300 v-click>Fetch, display, and handle errors from async data sources 🌐</div>
</h1>

---
src: ./pages/data-fetching.md
---

---
name: Routing
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Routing with </span>
  <span>Vue Router</span>
  <sup v-click>Official client-side routing</sup>
</div>
<div mt1 forward:delay-300 v-click>Navigate between views — dynamic routes, guards, and history 🗺️</div>
</h1>

---
src: ./pages/routing.md
---

---
name: Performance
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Vue </span>
  <span>Performance</span>
  <sup v-click>v-memo, lazy loading, KeepAlive</sup>
</div>
<div mt1 forward:delay-300 v-click>Build fast apps — memoisation, code splitting, caching 🚀</div>
</h1>

---
src: ./pages/performance.md
---

---
name: Forms
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Forms </span>
  <span>in Vue</span>
  <sup v-click>v-model, modifiers, validation</sup>
</div>
<div mt1 forward:delay-300 v-click>Two-way binding and form handling — the Vue way 📝</div>
</h1>

---
src: ./pages/form.md
---

---
name: Components
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Components </span>
  <span>In Depth</span>
  <sup v-click>props, slots, provide/inject</sup>
</div>
<div mt1 forward:delay-300 v-click>Build reusable, composable UI pieces 🧩</div>
</h1>

---
src: ./pages/component.md
---

---
name: Interaction
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Component </span>
  <span>Interaction</span>
  <sup v-click>emit, modifiers, patterns</sup>
</div>
<div mt1 forward:delay-300 v-click>Props down, events up — the Vue data flow 🔁</div>
</h1>

---
src: ./pages/interaction.md
---

---
name: Testing
layout: center
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click>Testing </span>
  <span>Vue Apps</span>
  <sup v-click>Vitest + Vue Test Utils</sup>
</div>
<div mt1 forward:delay-300 v-click>Write confident tests — components, composables, and more 🧪</div>
</h1>

---
src: ./pages/test.md
---
