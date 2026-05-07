# vue-note Design Spec

**Date:** 2026-05-07
**Author:** oluwasetemi
**Status:** Approved

---

## Overview

Create `/Users/oluwasetemi/r/vue-note` — a sibling Slidev presentation to react-note that teaches Vue.js at AltSchool Africa. Every concept page shows the Vue approach as primary content and uses the existing `<Tips>` component to callout the React equivalent pattern so students coming from react-note can map their knowledge.

---

## Location & Git

- Path: `/Users/oluwasetemi/r/vue-note`
- Sibling to `/Users/oluwasetemi/r/react-note`
- `git init` + initial commit once scaffolded
- Same pnpm + Slidev stack (`pnpm@10`, `@slidev/cli` 52.x)

---

## Package Changes from react-note

**Remove:**
- `react`, `react-dom`
- `@babel/standalone`, `@types/babel__standalone`
- `@types/react`, `@types/react-dom`

**Keep:**
- `vue`, `@vue/compiler-sfc`
- `@vueuse/core`
- `unocss`, all Slidev packages
- `prettier`, `prettier-plugin-slidev`
- `cross-env`, `playwright-chromium`, `simple-git-hooks`, `nano-staged`

**Rename in package.json:** `"name": "vue-note"`

---

## Pages (14 total)

Each page file maps a React concept to its Vue equivalent. Every concept slide that has a React counterpart ends with a `<Tips type="info">` callout explaining the React mapping.

| File | Vue topic | React analogue |
|---|---|---|
| `pages/intro.md` | What is Vue, Options API vs Composition API, SFCs | React intro, JSX vs templates |
| `pages/template.md` | Template syntax, `v-bind`, `v-on`, interpolation, expressions | JSX |
| `pages/reactivity.md` | `ref`, `reactive`, `computed`, `watch`, `watchEffect` | `useState`, `useEffect`, `useMemo` |
| `pages/composables.md` | Composables, `use*` convention, lifecycle in composables | Custom hooks |
| `pages/state.md` | Declarative state, `v-model`, lifting state, immutability | React state patterns, controlled components |
| `pages/state-management.md` | Pinia: `defineStore`, `storeToRefs`, actions, getters | Zustand / Redux |
| `pages/rendering.md` | `v-if`, `v-else`, `v-show`, `v-for`, `:key` | Conditional rendering, `map`, `key` |
| `pages/data-fetching.md` | `async setup`, `onMounted` + fetch, `useFetch` from VueUse | `useEffect` fetch, React Query analogy |
| `pages/routing.md` | Vue Router: `<RouterView>`, `<RouterLink>`, `useRoute`, `useRouter`, dynamic routes, guards | React Router |
| `pages/performance.md` | `v-memo`, `shallowRef`, `defineAsyncComponent`, `<Suspense>`, `<KeepAlive>` | `React.memo`, `lazy`, `Suspense` |
| `pages/test.md` | Vitest + Vue Test Utils: `mount`, `wrapper`, `trigger`, `emitted` | Jest + React Testing Library |
| `pages/form.md` | `v-model` two-way binding, form validation, custom `v-model` | Controlled inputs, `onChange` |
| `pages/component.md` | Props, `defineProps`, `defineEmits`, slots, `<slot>`, `provide`/`inject` | Props, children, `createContext` |
| `pages/interaction.md` | `$emit`, `defineEmits`, component events, `v-on` custom events | Callback props, event bubbling |

---

## React Comparison Pattern

Every concept that has a direct React equivalent ends with:

```vue
<Tips type="info">
  In React, you'd use `useState` for this — Vue's `ref()` serves the same purpose
  but is unwrapped automatically in templates. No setter function needed.
</Tips>
```

Use `type="tip"` for helpful additions, `type="info"` for direct React mappings, `type="warning"` for gotchas that differ significantly from React.

---

## Vue Playground (`views/vue-playground.vue`)

Mirror of `react-playground.vue` with:
- Same split-pane layout: editor (left) + preview + console (right)
- Same Shiki syntax highlighting overlay on textarea (`lang: 'vue'` theme `vitesse-dark`)
- Same Ctrl+Enter / ⌘+Enter to run, Reset button, console capture
- Default starter code: Composition API SFC with `ref` counter
- Runner: reuse the same `@vue/compiler-sfc` logic from `setup/code-runners.ts` `vue` runner
- Header shows "🟢 Vue Playground" instead of "⚛️ React Playground"
- Preview iframe uses same white background

---

## `setup/code-runners.ts`

Copy from react-note with:
- Keep `vue` runner (compile SFCs via `@vue/compiler-sfc`)
- Keep `html` runner (isolated iframe + console interception)
- **Remove** `jsx` runner entirely

---

## `components/`

**Copy as-is:**
- `Tips.vue`
- `TocIcon.vue`
- `VisuallyHidden.vue`
- `Counter.vue` (already a Vue SFC)
- `LazyIframe.vue`

**Drop:**
- `CounterReact.jsx` and all `.jsx` files
- `components/hooks/ReactStateManagementExplained.vue` (React-specific)

**Add Vue demo components** (one per major topic, mirrors the hooks/state/intro grouping):
- `components/reactivity/RefDemo.vue`
- `components/reactivity/ReactiveDemo.vue`
- `components/state/PiniaDemo.vue`
- `components/composables/UseCounterDemo.vue`

---

## `slides.md`

Same structure as react-note:
- Title slide with Vue branding (green color scheme)
- TOC slide with buttons: All Sections, JS/TS Playground, **Vue Playground** (replaces React Playground), Changelog
- `src:` includes for all 14 pages in topic order

---

## `unocss.config.ts`

Same as react-note but:
- `logo` shortcut: `i-logos-vue w-6em h-6em transform transition-800 hover:rotate-360` (Vue logo, full rotation)
- `text-gradient`: keep green-to-purple (Vue's brand green fits)

---

## `global-bottom.vue` / `global-top.vue`

Copy as-is from react-note. WebSocket visitor counter and TocIcon injection are presentation infrastructure, not React-specific.

---

## `setup/routes.ts` / `setup/shiki.ts` / `setup/monaco.ts`

Copy as-is, they are Slidev infrastructure.

---

## Constraints

- No `react`, `react-dom`, or `@babel/standalone` in vue-note at all
- All demo components must be Vue SFCs — no `.jsx` files
- Prettier config identical to react-note (single quotes, no semis, `prettier-plugin-slidev`)
- Every page must compile and render without errors before the spec is considered implemented
