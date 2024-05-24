---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://res.cloudinary.com/drnqdd87d/image/upload/f_auto/nmgakkzd3lmlibnfosps
# some information about your slides, markdown enabled
title: Vuejs Class Notes
info: |
  ## Vuejs Class Notes
  making of world class developers.

  join at [AltSchool Africa](https://altschoolafrica.com)
# apply any unocss classes to the current slide
class: text-center
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# https://sli.dev/guide/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
mdc: true
---

# Vuejs Class Notes

AltSchool Africa

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Are you ready to learn Vue? Press <kbd>space</kbd> on your keyboard <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/oluwasetemi/vue-class-note" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# What is Vuejs?
<br>
Vue.js is a popular open-source JavaScript framework specifically desgined for building user interfaces (UIs) and single-page applicaions(SPAs).

<br>
<br>

Read more about [Vuejs?](https://vuejs.org/)

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

<!--
Here is another comment.
-->

---

# Getting Started

Create a starter project with just `index.html` or use the vite starter to scaffold a new project.

```html {monaco}
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
  <h1>{{ message }}</h1>
  <button @click="count++">Click me</button>
  <p>Count: {{ count }}</p>
</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      const count = ref(0)
      return {
        message,
        count
      }
    }
  }).mount('#app')
</script>
```

---

# Getting Started using the Options API

Create a starter project with just `index.html` and use the CDN or use the vite starter or [create-vue](https://github.com/vuejs/create-vue) to scaffold a new project.

```html {monaco}
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
  <h1>{{ message }}</h1>
  <button @click="count++">Click me</button>
  <p>Count: {{ count }}</p>
</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    data() {
      const message = 'Hello vue!'
      const count = 0

      return {
        message,
        count
      }
    }
  }).mount('#app')
</script>
```

---

# Table of contents

- Understanding Difference between Options API/Composition API.
- Template Syntax
- Data(Vue Reactivity), methods and lifecycle hooks
- Conditional Rendering
- Computed Properties
- Custom Directives, Event handling, Filters and Watchers
- Components
- Data Fetching
- Routing
- State management (pina)

<!-- <Toc v-click minDepth="1" maxDepth="2"></Toc> -->

---

# Class Note uses a vscode monaco editor and shiki to display types with twoslash for types annotation and errors for codeblocks

```ts {all|5|7|7-8|10|all} twoslash
// More at https://shiki.style/packages/twoslash

import { computed, ref } from 'vue'

const count = ref(0);
const doubled = computed(() => count.value * 2);

doubled.value = 2
```

<arrow v-click="[4, 5]" x1="350" y1="310" x2="195" y2="334" color="#953" width="2" arrowSize="1" />

---

# Understanding Difference between Options API/Composition API

Options API uses data, method

````md magic-move
```vue {*|2|*}
<script>
  const app = createApp({
    data() {
      return {
        count: 0,
        message: 'Hello AltSchool Africa'
      }
    },
  })

  app.mount('#app')
</script>
```

Non-code blocks are ignored.

```vue {*|2|4|5|6-7|8-12|5-13|*}
<script setup>
  import {ref,createApp} from 'vue'

  const app = createApp(
    setup() {
      const message = ref('Hello vue!')
      const count = ref(0)

      return {
        message,
        count,
      }
    }
  )

  app.mount('#app')
</script>
```
````

---

# Template Syntax

<v-click>
- Text Interpolation
</v-click>

<<< @/snippets/template-syntax/1.html#snippet

- Raw HTML
<<< @/snippets/template-syntax/2.html#rawhtml
- Attribute Bindings using `v-bind:attributeName` or `:attributeName`
- Using JavaScript Expressions
- Directives

<!-- Footer -->

<!-- Inline style -->
<style>
.footnotes-sep {
  @apply mt-5 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

<!--
Notes can also sync with clicks

[click] This will be highlighted after the first click

[click] Highlighted with `count = ref(0)`

[click:3] Last click (skip two clicks)
-->

---

# Attribute Bindings using `v-bind:attributeName` or `:attributeName`

````md magic-move
```vue {*|8-11|2-6|*}
<!-- // step 1 -->
<script setup>
  const attributeValue='someValue';
  const srcPath='somePath';
  const srcAlt='someAlt';
</script>

<template>
  <button v-bind:attributeName="attributeValue">Reset</button>
  <img v-bind:src="srcPath" v-bind:alt="imageAlt" />
</template>
```

```vue {*|1-2|3-4|3-4,8}
<!-- shorthand -->
<button :id="dynamicId">Reset</button>
<button :disabled="disabled">Reset</button>
<img :src="srcPath" :alt="imageAlt" />

<script setup>
  const dynamicId='someValue';
  const disabled='someValue';
  const srcPath='somePath';
  const srcAlt='someAlt';
</script>
```

```vue {*|2-3|5|*}
<!-- // same name shorthand -->
<button :id>Reset</button>
<button :id="id">Reset</button>
<!-- Boolean value -->
<button :disabled>Reset</button>
<button :disabled="disabled">Reset</button>

<img :src v-bind:alt />
<div v-bind:id></div>

<script>
  const id = 'someId';
  const disabled = true;

  const src = './path/asset';
  const alt = 'description';
</script>
```

Non-code blocks are ignored.

```vue
<!-- using one value for multiple binding -->
<script setup>
  const multipleBinding = {
    id: 'unique-id',
    class: 'counter-button',
  };
</script>

<template>
  <div v-bind="multipleBinding">
    I am a div using multiple dynamic binding
  </div>
</template>
```
````

---

# JavaScript Expressions in Expression Slots

<<< @/snippets/vue/expressions/1.vue#snippet

---

# Directives v-*

<<< @/snippets/vue/directives/1.vue#snippet
---

# Directives v-* Image

![V-* directives](https://res.cloudinary.com/drnqdd87d/image/upload/v1715791651/l35ykffxnqagbzaryzlh)

---

# Directives using `v-name:argument.modifiers="value"`

````md magic-move
```vue {*|7-8|3|*}
<!--v-text -->
<script setup>
  const msg='Using Interpolation in Vue';
</script>

<template>
  <span v-text="msg"></span>
  <span>{{msg}}</span>
</template>
```

```vue {*|2-4|7|2-4,7|*}
<!-- v-html -->
<template>
  <div v-html="html"></div>
</template>

<script setup>
  const html=`<div>This is a valid <span style='color:red'>html</span></div>`;
</script>
```

```vue {*|2-14|16-17|*}
<!-- v-show|v-if|v-else-if|v-else -->
<template>
  <h1 v-show="ok">Hello!</h1> <!-- display: none -->
  <div v-if="type === 'A'"> <!-- can be used on template -->
  A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else>
    Not A/B/C
  </div>
</template>

<script>
  const type = 'A';
  const ok = true;
</script>
```

Non-code blocks are ignored.

```vue {*|13-18}
<!-- v-for -->
<script setup>
  const items = [{
    text: 'something',
    id: 'randomId'
  }]
  const object = {
    id: 'unique-id',
    class: 'counter-button',
  };
</script>
<template>
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  <div v-for="item in items">
    {{ item.text }}
  </div>
</template>
```

```vue {*|2|4}
<!-- v-on | @ | modifiers-stop,prevent,capture,self,{keyAlias},once,left,middle,passive -->
const dynamic = 'click'
<button v-on:click="doThis"></button>
<button v-on:[dynamic]="doThis"></button>
<button v-on:click="doThat('hello', $event)"></button>
<button @click="doThis"></button>
<button @click.stop="doThis"></button>
<button @click.prevent="doThis"></button>
<form @submit.prevent></form>

<button @click.stop.prevent="doThis"></button>

<input @keyup.enter="onEnter" />

<button v-on:click.once="doThis"></button>

<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

<MyComponent @my-event="handleThis" />

<!-- inline statement -->
<MyComponent @my-event="handleThis(123, $event)" />
```

```vue {3-5|7}
<!-- v-model for 2 way binding | modifiers |.lazy | .number | .trim-->
<template>
  <input
  :value="text"
  @input="event => text = event.target.value" />

  <input v-model="text">
</template>
```

```html {*}
<!-- v-slot content, fallback content, named slot, conditional slots, dynamic slot names, scoped Slots -->
<template>
  <FancyButton>
    Click me! <!-- slot content -->
  </FancyButton>

  <!-- created component -->
  <button class="fancy-btn">
    <slot></slot> <!-- slot outlet -->
    <slot>Submit</slot> <!-- slot default if outlet not passed -->
  </button>

  <header>
    <slot name="header"></slot>
  </header>

  <BaseLayout>
    <template v-slot:header>
      <!-- content for the header slot -->
    </template>
  </BaseLayout>
</template>
```

```vue {*}
  <span v-pre>{{ this will not be compiled }}</span>
```
```vue {*}
  <div v-once>
    <h1>Comment</h1>
    <p>{{msg}}</p>
  </div>
```
```vue
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
```
```vue
<div v-cloak>
  {{ message }}
</div>

<style scoped>
  [v-cloak] {
  display: none;
}
</style>
```

````

---

# Vue Reactivity with `ref` and `reactive`

```ts twoslash
import { reactive, ref } from 'vue'

const state = reactive({
  apiData: null,
});

const stateRef = ref(null)
```

---

# Methods

```ts {monaco-run}
import { ref } from 'vue';

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

increment()
increment()
increment()
console.log(count.value)
decrement()
console.log(count.value)
```

---

# LifeCycle hooks

<div>
<img src="https://vuejs.org/assets/lifecycle.MuZLBFAS.png" alt="Picture Showing LifeCycle Hooks" srcset="">
</div>

<style>

  img {
    height: 450px;
    object-fit: contain;
    width: -webkit-fill-available;
  }
</style>
---

# LifeCycle hooks

```ts {monaco-run}
import { onMounted } from 'vue';

onMounted(() => {
  console.log('App will log this before mounting')
})

console.log('App')
```

- `onUpdated`
- `onUnmounted`

---

# LifeCycle hooks `onMounted`

```vue
<script setup>
import { ref, onMounted } from 'vue'

const el = ref()

onMounted(() => {
  el.value // <div>
})
</script>

<template>
  <div ref="el"></div>
</template>
```

---

# LifeCycle hooks `onUpdated`

```vue
<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  // text content should be the same as current `count.value`
  console.log(document.getElementById('count').textContent);
});
</script>

<template>
  <button id="count" @click="count++">{{ count }}</button>
</template>
```

---

# LifeCycle hooks `onUnmounted`

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

let intervalId
onMounted(() => {
  intervalId = setInterval(() => {
    // ...
  })
})

onUnmounted(() => clearInterval(intervalId))
</script>
```

[Read More](https://vuejs.org/api/composition-api-lifecycle.html)
---

# Conditional Rendering
In Vue.js, conditional rendering allows you to dynamically control which parts of your component's template are displayed based on certain conditions. This is a powerful feature that helps create interactive and responsive user interfaces.<br> 
We have:<ul><li>v-if</li><li>v-show</li><li>v-else</li><li>v-else-if</li></ul>
<ConditionalRendering></ConditionalRendering>

---

# Computed Properties
A computed property is used to declaratively describe a value that depends on other values. <br>
Computed properties save you time and make your code cleaner by automatically reflecting changes in your data.
<ComputedProperties></ComputedProperties>
<p>Check the ComputedProperties.vue component for the code.</p>

---

# Watchers

TODO:

---

# Components

<div grid="~ cols-2 gap-4">
<div>

<!-- ./components/Counter.vue -->
<Counter :count="10" m="t-4" firstName="AltSchool" lastName="Africa" />

</div>
<div>

<!-- ./components/FancyButton.vue -->
<FancyButton>
  <template #icon>+</template>
  <!-- <span>Span plus sign</span> -->
</FancyButton>

</div>
</div>

<!--
Presenter note with **bold**, *italic*, and ~~striked~~ text.

Also, HTML elements are valid:
<div class="flex w-full">
  <span style="flex-grow: 1;">Left content</span>
  <span>Right content</span>
</div>
-->

---

# Component Details

- Global using `.js` and Local Registration using `.vue`
- Props
- Event
- V-model in Parent Child component(works in only input, textarea and select)
- [Slots](https://vuejs.org/guide/components/slots.html)
- Provide / Inject

Read More about [Dynamic Component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components) and [Async Component](https://vuejs.org/guide/components/async.html)

TODO: create slide content for each of the sub topic on Components

---

# Example of V-model in Parent and Child Component

<!-- ./components/V-model/App.vue -->
<App />

---

# Data Fetching using LifeCycle Hook `onMounted`

```ts {all|1|3-5|7|9|11|16|17|all} twoslash
import { computed, reactive, onMounted, ref } from 'vue'

const state = reactive({
  apiData: null,
});

const stateRef = ref(null)

onMounted(
  () => {
    fetch('https://api.github.com/users/Oluwasetemi')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // set value to reactive state | ref
        state.apiData = data
        stateRef.value = data
      });
  }
)

```

<arrow v-click="[9, 10]" x1="350" y1="310" x2="195" y2="390" color="#953" width="2" arrowSize="1" />
---

# Data Fetching using `onMounted` and `watchEffect`

```ts {all|1|3-5|7|9|11|16|all} twoslash
import { watchEffect, reactive, onMounted, ref } from 'vue'

const username = ref(null)
const state = reactive({
  apiData: null,
});

onMounted(() => {
  watchEffect(
    () => {
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          // set value to reactive state | ref
          state.apiData = data
        });
    }
  )
})

```

<arrow v-click="[9, 10]" x1="350" y1="310" x2="195" y2="390" color="#953" width="2" arrowSize="1" />

---

# [Routing](https://router.vuejs.org/guide/)

TODO: list the setup involved in setting up a vue-router
---

# [State Management](https://vuejs.org/guide/scaling-up/state-management.html)

TODO: list the setup involved in setting up state management
---

# [State Management](https://pinia.vuejs.org/)

TODO: list the setup involved in setting up state management with Pina

---

# Repo List Used For Teaching

TODO: add the repo we used for the teaching
---

# sample slide

TODO: just write markdown and mix with html with the cool features of slidev
