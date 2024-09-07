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

# Code Runners

```vue {monaco-run} {autorun: false}
<script setup>
import { computed, ref } from 'vue'
const counter = ref(1);
const value = 2
const doubled = computed(() => counter.value * value);
function inc() { counter.value++ }
</script>

<template>
  <div class="select-none text-lg flex gap-4 items-center p2 border border-main">
    <span class="text-gray text-lg">
      <span class="text-orange">{{ counter }}</span>
      * {{ value }} =
      <span class="text-green">{{ doubled }}</span>
    </span>
    <button class="border border-main p2 rounded" @click="inc">+1</button>
    <button class="border border-main p2 rounded" @click="counter -= 1">-1</button>
  </div>
</template>
```

<!--
The idea here is super sweet with tailwind like css and ability to render code is powerful and the opportunities here is endless.
-->

---

# Code Runners

```jsx {monaco-run}
function Hello() {
  let useState = React.useState;
  const [counter, setCounter] = React.useState(0);
  const value = 2;
  const doubled = counter * value

  return (
    <div className="select-none text-lg flex gap-4 items-center p2 border border-main">
    <span className="text-gray text-lg">
      <span className="text-orange">{ counter }</span>{' '}
      * { value } = {' '}
      <span className="text-green">{ doubled }</span>
    </span>
    <button className="border border-main p2 rounded" onClick={() => setCounter(counter + 1)}>+1</button>
    <button className="border border-main p2 rounded" onClick={() => setCounter(counter - 1)}>-1</button>
  </div>
  );
}
```

<!--
The idea here is super sweet with tailwind like css and ability to render code is powerful and the opportunities here is endless.
-->

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

<ul>
  <li>
  <span v-mark.underline.red="">Text Interpolation</span>
  </li>
</ul>

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
<!-- shorthand version of v-bind is : -->
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
<!-- // same-name shorthand(they share the same attribute name(id) and variable name(id)) -->
<button :id>Reset</button>
<button :id="id">Reset</button>

<!-- Boolean value(its value is either true or false) -->
<button :disabled>Reset</button>
<button :disabled="disabled">Reset</button>

<!--Double binding: v-bind allows us bind more than one thing-->
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
<!-- using one object variable for multiple binding -->
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
<!--The shorthand of v-on is @ -->
<button @click="doThis"></button>
<button @click.stop="doThis"></button>
<button @click.prevent="doThis"></button>
<form @submit.prevent></form>

<!--Using v-on(@) on a button, with an argument(click),a modifier(.stop.prevent), and a value(="doThis") -->
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
```

```vue {*}
<span v-pre>{{ this will not be compiled }}</span>
```

```vue {*}
<!--V-once renders the element and component only once, and skips future updates-->
  <div v-once>
    <h1>Comment</h1>
    <p>{{msg}}</p>
  </div>
```

```vue
<!-- a v-memo -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
```

```vue
<!--v-cloak is used to hide raw templates until the component is ready-->
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

```ts {monaco-run} {autorun: false}
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

In Vue.js, conditional rendering allows you to dynamically control which parts of your component's template are displayed based on certain conditions. This is a powerful feature that helps create interactive and responsive user interfaces.

We have:

- `v-if`
- `v-show`
- `v-else`
- `v-else-if`

<ConditionalRendering />

---

# Computed Properties

A computed property is used to declaratively describe a value that depends on other values. <br>
Computed properties save you time and make your code cleaner by automatically reflecting changes in your data.
<ComputedProperties />
<p>Check the ComputedProperties.vue component for the code.</p>

---

# Watchers

<Hello />

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

````md magic-move {at:2}
```shell
//  1, Install vue router using npm, set the router up
npm install vue-router@latest
```

```vue
<script setup>
// Create a folder called View, setup vue components that will be used as view,three files in it(HomeView.vue, AboutView.vue, and NotFoundView.vue)
</script>
<!--HomeView.vue-->
<template>
    <div>
        <h1>Home</h1>
        <p>This is the home page</p>
    </div>
</template>
<!--AboutView.vue-->
<template>
    <div>
        <h1>About</h1>
        <p>This is the about page</p>
    </div>
</template>
<!--NotFoundView.vue-->
<template>
    <div>
        <h1>Not found</h1>
        <p>This is the 404 page</p>
    </div>
</template>
```

```vue
<!--3. Define your router-view and router-link for proper navigation in our App.vue-->
<!--import two components {router-link, router-view}-->
<script>
import {routerLink,routerView} from 'vue-router'
</script>
<!--create a navigation bar with links to the home, about, and not found pages-->
<template>
    <h1>Header</h1>
    <nav>
        <RouterLink to="/">Home</routerLink>
        <RouterLink to="/about">About</routerLink>
        <RouterLink to="/not-found">Not found</routerLink>
    </nav>
    <!-- this is the view where each components will be rendered -->
    <RouterView/>
</template>
```

```vue
<!--4. create a file to hold your router instance,
import {createRouter,createWebHistory} from 'vue-router' in (index.js),
routes are defined in an array, each route should be an object with at least a path and a component.-->
<script>
import {createRouter, createWebHistory } from 'vue-router'

import HomeView from './HomeView.vue'

//create a route instance using VueRouter
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: {
            title: 'Home',
            description: 'This is the home page'
        }
    },
  ]
})
export default router
</script>
```

```json
// more routes object can be provided
[
   {
        path: '/about',
        name: 'About',
        props: (route) => ({ page: parseInt(route.query.page) || 1 }),
        component:()=>import('./AboutView.vue'),//allows for lazy loading
        meta: { //meta is used for search engine optimization
             title: 'About',
             description: 'This is the about page'
         }
    },
    {
        path: '/:catchAll(.*)',
        name: 'not-found',
        component:()=>import('./NotFoundView.vue'),
        meta: {
            title: 'Not found',
            description: 'This is the 404 page'
        }
    }
]
```

```json
// nested routes object
 [
    {
      path: '/repo/:name/:id',
      name: 'RepoLayout',
      props: true,
      component: RepoLayoutView,
      children: [
        {
          path: '',
          name: 'SingleRepoView',
          component: () => import('../views/SingleRepoView.vue')
        },
        {
          path: 'details',
          name: 'RepoDetails',
          component: () => import('../views/RepoDetailsView.vue')
        }
      ]
    },
  ]
```

```js
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```
````

---

# [State Management](https://vuejs.org/guide/scaling-up/state-management.html)

In Vue js, there are numerous ways of managing states. Although Vuejs shares data between multiple components through the use of props. The issue with this approach is that props are unidirectional. We can only pass data or props from parent to child to grandchild, but not the other way round. Even though Custom events try to fix this, it still has its own limitations as we can not pass data to other components with either of two, and this is where the following state management come to place

- Props
- Event Bus
- Simple State Management with Reactivity API
- Vuex or Pinia

---

# 1. Emitting and Listening to Event from Child to Parent

````md magic-move
```vue {all|1|3-5|all}
<template>
  <!-- Child -->
<button @click="$emit('someEvent')">Click Me</button>
<button @click="$emit('someEvent', data)">Click Me</button>
</template>
```


```vue
<!-- Parent -->
<script setup>
function increaseCount(n) {
  count.value += n
}
</script>

<template>
  <MyComponent @some-event="callback" />
  <MyComponent @some-event.once="callback" />
  <MyButton @increase-by="(n) => count += n" />
  <MyButton @increase-by="increaseCount" />
</template>
```

```vue
<script setup>
  const emit = defineEmits(['inFocus', 'submit'])

  function buttonClick() {
    emit('submit')
  }
</script>
```
````

---

# [Continuation: State Management - Composition API](https://vuejs.org/guide/scaling-up/state-management.html)

## 2. Simple State Management with Reactivity API

<br />
````md magic-move
```js {all|1|3-5|all}
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})

// main.js - last thing after `app.use` before `app.mount`
app.provide('Gstore', store)
// enable other component to inject the store

```

```js
import {inject} from 'vue'

const store = inject('Gstore')
```

```vue
<!-- ComponentA.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From A: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From B: {{ store.count }}</template>
```

````

---

# [Continuation: State Management - VUEX](https://vuejs.org/guide/scaling-up/state-management.html)

## 3. Setting Up State Management Using Vuex

````md magic-move
```vue
<script>
  import Vuex from 'vuex';
  export default new Vuex.Store({
    state: {
      itemCount: 0
    },
    mutations: {
      addItem(state) {
        state.itemCount++;
      },
      removeItem(state){
        if (state.itemCount > 0) {
          state.itemCount--;
        }
      }
    }
  })
</script>
```
````

---

# [Continuation: State Management- Pinia](https://pinia.vuejs.org/)

````md magic-move
```vue {all|1|3-5|7|9|11|16|all}
<script>
import { defineStore } from 'pinia';
export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0
  }),
  actions: {
    increaseCount() {
      this.count++;
    },
    decreaseCount(){
      this.count--;
    }
  },
  getters: {
    oddOrEven: (state) => {
      if (state.count % 2 === 0) return 'even'
      return 'odd'
    }
  }
});
</script>
```

```js
import { createPinia } from 'pinia'

app.use(createPinia())

app.mount('#app')
```

```vue
<script>
  import {useCounterStore} from '@state/counter.js'

  const store = useCounterStore()

  console.log(store.count);
  store.increaseCount()
</script>

```
````

---

# Todo App Store

```vue {2,3|5|*}
<script setup>

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    id: 0
  }),
  actions: {
    addTodo(item) {
      this.todoList.push({ item, id: this.id++, completed: false })
    },
    deleteTodo(itemId) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== itemId
      })
    },
    toggleCompleted(idToFind) {
      const todo = this.todoList.find((obj) => obj.id === idToFind)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }
})
</script>
```

---

# Repo List Used For Teaching

- [Vue AltSchool v3 teaching](https://github.com/Oluwasetemi/vue-altschool-v3-teaching)
- [Pinia Setup](https://github.com/Oluwasetemi/vue-pinia-fifth)

---

# Using TypeScript With Vuejs

---

layout: two-cols
---

<template v-slot:default>

# Left

This shows on the left

</template>
<template v-slot:right>

# Right

This shows on the right

</template>

---

layout: two-cols
---

# Left

This shows on the left.

::right::

# Right

This shows on the right
---

# Using TypeScript With Vuejs

- Typing Component Props
- Typing Component Emits
- Typing ref()
- Typing reactive()
- Typing computed()
- Typing Event Handlers
- Typing Provide / Inject
- Typing Template Refs
- Typing Component Template Refs

---

# Contributors - Thank you all

- [Chidinma Nwosu](https://github.com/Oluwasetemi/vue-class-notes/pull/1)
- [Kofoworola Shonuyi](https://github.com/Oluwasetemi/vue-class-notes/pull/2)
- [Segun Olawale & Abosede Racheal](https://github.com/Oluwasetemi/vue-class-notes/pull/3)
