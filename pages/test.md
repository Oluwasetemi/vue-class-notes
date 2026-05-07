---
layout: center
transition: slide-up
hideInToc: true
---

# Testing Vue Components

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Vitest Setup</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">Mounting Components</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">User Interactions</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Testing Composables</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Testing Best Practices</a>

---
hideInToc: true
---

## Vitest Setup

Vitest is the recommended test runner for Vue 3 projects — built on Vite, fast, and Jest-compatible.

```bash
# Install
pnpm add -D vitest @vue/test-utils jsdom @vitejs/plugin-vue
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

```ts
// package.json scripts
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "coverage": "vitest run --coverage"
}
```

<Tips type="info">

Vitest ≈ Jest. They share the same API (`describe`, `it`, `expect`, `vi` ≈ `jest`). If you know Jest, you can write Vitest tests immediately. The main difference is speed — Vitest reuses Vite's transform pipeline, making it significantly faster for Vue/TypeScript projects.

</Tips>

---
hideInToc: true
---

## Mounting Components

`@vue/test-utils` provides `mount` and `shallowMount` to render components in tests.

```ts
// Counter.vue
// <script setup>
// import { ref } from 'vue'
// const count = ref(0)
// </script>
// <template>
//   <button @click="count++">Count: {{ count }}</button>
// </template>

import { mount, shallowMount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('Count: 0')
  })

  it('increments on click', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Count: 1')
  })

  it('accepts initial count prop', () => {
    const wrapper = mount(Counter, {
      props: { count: 5 }
    })
    expect(wrapper.text()).toContain('Count: 5')
  })
})
```

<Tips type="info">

`mount(Component)` ≈ `render(<Component />)` from React Testing Library. `wrapper.find('button')` ≈ `screen.getByRole('button')`. `wrapper.trigger('click')` ≈ `userEvent.click(button)`. Vue Test Utils is more selector-based; RTL is more accessibility-query-based (which is generally preferred — test what users see, not implementation details).

</Tips>

---
hideInToc: true
---

## User Interactions

Test user interactions with `trigger()` and async `nextTick`.

```ts
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'

const SearchBox = defineComponent({
  setup() {
    const query = ref('')
    const results = ref<string[]>([])
    function search() {
      results.value = query.value ? [`Result: ${query.value}`] : []
    }
    return { query, results, search }
  },
  template: `
    <div>
      <input v-model="query" data-testid="search-input" @keyup.enter="search" />
      <button @click="search" data-testid="search-btn">Search</button>
      <ul>
        <li v-for="r in results" :key="r" data-testid="result">{{ r }}</li>
      </ul>
    </div>
  `,
})

describe('SearchBox', () => {
  it('shows results after search', async () => {
    const wrapper = mount(SearchBox)
    const input = wrapper.find('[data-testid="search-input"]')

    await input.setValue('vue')
    await wrapper.find('[data-testid="search-btn"]').trigger('click')

    const results = wrapper.findAll('[data-testid="result"]')
    expect(results).toHaveLength(1)
    expect(results[0].text()).toBe('Result: vue')
  })

  it('clears results for empty query', async () => {
    const wrapper = mount(SearchBox)
    await wrapper.find('[data-testid="search-btn"]').trigger('click')
    expect(wrapper.findAll('[data-testid="result"]')).toHaveLength(0)
  })
})
```

<Tips type="tip">

Use `data-testid` attributes to target elements in tests — it decouples tests from CSS class names and component structure. Both React and Vue communities recommend this pattern. `wrapper.setValue()` sets an input value and triggers `input`/`change` events automatically.

</Tips>

---
hideInToc: true
---

## Testing Composables

Test composables in isolation — no component wrapper needed.

```ts
import { ref } from 'vue'

// The composable to test
function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => (count.value = initial)
  return { count, increment, decrement, reset }
}

// Tests
describe('useCounter', () => {
  it('initialises with default value', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })

  it('initialises with custom value', () => {
    const { count } = useCounter(10)
    expect(count.value).toBe(10)
  })

  it('increments count', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })

  it('resets to initial value', () => {
    const { count, increment, reset } = useCounter(5)
    increment(); increment()
    reset()
    expect(count.value).toBe(5)
  })

  it('each call creates independent state', () => {
    const a = useCounter(0)
    const b = useCounter(0)
    a.increment()
    expect(a.count.value).toBe(1)
    expect(b.count.value).toBe(0)
  })
})
```

<Tips type="info">

Testing composables is simpler than testing React custom hooks — you just call the function directly in a test. React hooks require `renderHook` from `@testing-library/react` because they must run inside a component's React tree. Vue composables are plain functions: call them, check the reactive values.

</Tips>

---
hideInToc: true
---

## Testing Best Practices

<v-clicks>

- **Test behaviour, not implementation** — assert what users see, not internal reactive state
- **Use `data-testid`** — stable selectors that survive refactoring
- **Prefer `mount` over `shallowMount`** — shallow mocks children, hiding integration issues
- **`await nextTick()`** — always await after state changes before asserting DOM
- **Test composables separately** — pure function tests are fast and focused
- **Mock external dependencies** — `vi.mock('axios')`, not the composable itself
- **Snapshot tests sparingly** — useful for catching unintended output changes

</v-clicks>

```ts
// ✅ Testing what the user sees
expect(wrapper.text()).toContain('Welcome, Ada')

// ❌ Testing internal state (brittle)
expect(wrapper.vm.userName).toBe('Ada')
```

<Tips type="tip">

The **testing pyramid** applies equally in Vue and React: many unit tests (composables, utils), fewer component tests, few E2E tests. For E2E, **Playwright** and **Cypress** both have excellent Vue support and are framework-agnostic — the same skills transfer.

</Tips>
