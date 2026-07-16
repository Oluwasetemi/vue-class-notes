---
layout: center
transition: slide-up
hideInToc: true
---

# Forms in Vue

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">v-model Basics</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">v-model Modifiers</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">v-model on Custom Components</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">defineModel() — Vue 3.4+</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Form Validation Pattern</a>

---
hideInToc: true
---

## v-model Basics

`v-model` creates a two-way binding between a form element and reactive state.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const text = ref('')
const checked = ref(false)
const picked = ref('vue')
const selected = ref('beginner')
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px;display:flex;flex-direction:column;gap:10px">
    <label>
      Text: <input v-model="text" placeholder="type here..."
        style="margin-left:6px;border:1px solid #42b883;padding:3px 8px;border-radius:4px" />
    </label>
    <p style="color:#888;font-size:11px;margin:0">value: "{{ text }}"</p>

    <label style="display:flex;align-items:center;gap:6px">
      <input type="checkbox" v-model="checked" /> Agreed: {{ checked }}
    </label>

    <div style="display:flex;gap:12px">
      <label><input type="radio" v-model="picked" value="vue" /> Vue</label>
      <label><input type="radio" v-model="picked" value="react" /> React</label>
      <label><input type="radio" v-model="picked" value="svelte" /> Svelte</label>
    </div>
    <p style="color:#888;font-size:11px;margin:0">picked: {{ picked }}</p>

    <label>Level:
      <select v-model="selected" style="margin-left:6px;border:1px solid #42b883;padding:3px 8px;border-radius:4px">
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </label>
    <p style="color:#888;font-size:11px;margin:0">selected: {{ selected }}</p>
  </div>
</template>
```

<Tips type="info">

React uses **controlled components** — wire `value={state}` and `onChange={e => setState(e.target.value)}` manually on every input. Vue's `v-model` does both in one directive. Under the hood, `v-model` on `<input>` expands to `:value="text" @input="text = $event.target.value"`.

</Tips>

---
hideInToc: true
---

## v-model Modifiers

Built-in modifiers transform the bound value automatically.

```vue {monaco-run}
<script setup>
import { ref } from 'vue'

const name = ref('')    // .trim strips whitespace
const age = ref(0)      // .number converts to Number
const note = ref('')    // .lazy syncs on blur not input
</script>

<template>
  <div style="padding:16px;font-family:system-ui;font-size:13px;display:flex;flex-direction:column;gap:10px">
    <div>
      <label>Name <code style="background:#222;padding:1px 4px;border-radius:3px">.trim</code>:
        <input v-model.trim="name" placeholder="  spaces trimmed  "
          style="margin-left:6px;border:1px solid #42b883;padding:3px 8px;border-radius:4px;width:160px" />
      </label>
      <p style="color:#888;font-size:11px;margin:2px 0 0">"{{ name }}" (length: {{ name.length }})</p>
    </div>

    <div>
      <label>Age <code style="background:#222;padding:1px 4px;border-radius:3px">.number</code>:
        <input v-model.number="age" type="number"
          style="margin-left:6px;border:1px solid #42b883;padding:3px 8px;border-radius:4px;width:70px" />
      </label>
      <p style="color:#888;font-size:11px;margin:2px 0 0">typeof: {{ typeof age }} — {{ age + 1 }} (proves it's a Number)</p>
    </div>

    <div>
      <label>Note <code style="background:#222;padding:1px 4px;border-radius:3px">.lazy</code> (syncs on blur):
        <input v-model.lazy="note" placeholder="type then click away"
          style="margin-left:6px;border:1px solid #42b883;padding:3px 8px;border-radius:4px;width:160px" />
      </label>
      <p style="color:#888;font-size:11px;margin:2px 0 0">"{{ note }}"</p>
    </div>
  </div>
</template>
```

<Tips type="tip">

React requires manual transformation in `onChange` handlers: `Number(e.target.value)` for `.number`, `e.target.value.trim()` for `.trim`, using `onBlur` for `.lazy`. Vue's modifiers eliminate that boilerplate entirely.

</Tips>

---
hideInToc: true
---

## v-model on Custom Components

Custom components support `v-model` via the `modelValue` prop + `update:modelValue` emit pattern.

```vue {monaco-run}
<script setup>
import { ref, defineComponent } from 'vue'

const StarRating = defineComponent({
  props: { modelValue: { type: Number, default: 0 } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return { props, emit }
  },
  template: `
    <div style="display:flex;gap:4px;align-items:center">
      <span v-for="n in 5" :key="n" @click="emit('update:modelValue', n)"
        :style="{ fontSize:'24px', cursor:'pointer', color: n <= props.modelValue ? '#fbbf24' : '#444', transition:'color 0.15s' }">★</span>
      <span style="margin-left:8px;color:#888;font-size:13px">{{ props.modelValue }}/5</span>
    </div>
  `,
})

const rating = ref(3)
</script>

<template>
  <div style="padding:16px;font-family:system-ui">
    <p style="color:#555;font-size:13px;margin-bottom:10px">Click to rate:</p>
    <component :is="StarRating" v-model="rating" />
    <p style="margin-top:12px;color:#42b883;font-size:13px">Rating: {{ rating }}/5</p>
  </div>
</template>
```

<Tips type="info">

React achieves this with a `value` prop + `onChange` callback: `<StarRating value={rating} onChange={setRating} />`. Vue's `v-model` on a custom component is sugar for `:modelValue="rating" @update:modelValue="rating = $event"` — the same controlled component pattern, just more concise.

</Tips>

---
hideInToc: true
---

## defineModel() — Vue 3.4+

`defineModel()` is a compiler macro that replaces the `modelValue` prop + `update:modelValue` emit boilerplate with a single reactive ref.

```vue {monaco-run}
<script setup>
import { ref, defineComponent } from 'vue'

// With defineModel — clean and concise
const PinInput = defineComponent({
  setup() {
    const model = defineModel({ default: '' })
    return { model }
  },
  template: `
    <div style="display:flex;flex-direction:column;gap:6px">
      <input
        :value="model"
        @input="model = $event.target.value.replace(/\\D/g, '').slice(0, 6)"
        placeholder="Enter PIN (digits only)"
        type="text"
        maxlength="6"
        style="padding:8px 12px;border:2px solid #42b883;border-radius:6px;font-size:16px;letter-spacing:4px;width:160px;font-family:monospace"
      />
      <span style="font-size:11px;color:#888">{{ model.length }}/6 digits</span>
    </div>
  `,
})

const pin = ref('')
</script>

<template>
  <div style="padding:16px;font-family:system-ui;display:flex;flex-direction:column;gap:12px">
    <component :is="PinInput" v-model="pin" />
    <p style="color:#42b883;font-size:13px;margin:0">
      PIN: <strong>{{ pin || '—' }}</strong>
      <span v-if="pin.length === 6" style="margin-left:8px;color:#fbbf24">✓ Complete</span>
    </p>
  </div>
</template>
```

<Tips type="tip">

`defineModel()` is shorthand for declaring the `modelValue` prop and emitting `update:modelValue`. It returns a writable `ref` — you can read and mutate it directly. For named models, pass a string: `defineModel('count')` enables `v-model:count="n"` on the parent. This eliminates the most repetitive boilerplate in Vue component authoring.

</Tips>

---
hideInToc: true
---

## Form Validation Pattern

```vue {monaco-run}
<script setup>
import { ref, computed } from 'vue'

const form = ref({ email: '', password: '' })
const touched = ref(false)

const errors = computed(() => {
  const e = {}
  if (!form.value.email.includes('@')) e.email = 'Valid email required'
  if (form.value.password.length < 6) e.password = 'Min 6 characters'
  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

function submit() {
  touched.value = true
  if (!isValid.value) return
  alert('Submitted: ' + form.value.email)
}
</script>

<template>
  <form @submit.prevent="submit"
    style="padding:16px;font-family:system-ui;display:flex;flex-direction:column;gap:10px;max-width:280px">
    <div>
      <input v-model="form.email" placeholder="Email"
        :style="{ width:'100%', border:'1px solid', borderColor: touched && errors.email ? '#f87171' : '#42b883', padding:'6px 10px', borderRadius:'4px', boxSizing:'border-box', outline:'none' }" />
      <p v-if="touched && errors.email" style="color:#f87171;font-size:11px;margin:3px 0 0">{{ errors.email }}</p>
    </div>
    <div>
      <input v-model="form.password" type="password" placeholder="Password"
        :style="{ width:'100%', border:'1px solid', borderColor: touched && errors.password ? '#f87171' : '#42b883', padding:'6px 10px', borderRadius:'4px', boxSizing:'border-box', outline:'none' }" />
      <p v-if="touched && errors.password" style="color:#f87171;font-size:11px;margin:3px 0 0">{{ errors.password }}</p>
    </div>
    <button type="submit"
      style="padding:8px;background:#42b883;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:bold">
      Submit
    </button>
  </form>
</template>
```

<Tips type="tip">

For production forms use **VeeValidate** (Composition API, Zod/Yup support) or **FormKit**. These are comparable to React Hook Form + Zod in the React ecosystem — field-level validation, async rules, and accessibility built-in.

</Tips>
