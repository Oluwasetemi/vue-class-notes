---
layout: center
transition: slide-up
hideInToc: true
---

# Routing with Vue Router

<TocIcon />

<div mt-2 />

- <a @click="$slidev.nav.next()">Setting Up Vue Router</a>
- <a @click="$slidev.nav.go($nav.currentPage+2)">RouterView and RouterLink</a>
- <a @click="$slidev.nav.go($nav.currentPage+3)">Dynamic Routes & Params</a>
- <a @click="$slidev.nav.go($nav.currentPage+4)">Nested & Named Routes</a>
- <a @click="$slidev.nav.go($nav.currentPage+5)">Programmatic Navigation</a>
- <a @click="$slidev.nav.go($nav.currentPage+6)">Navigation Guards</a>

---
hideInToc: true
---

## Setting Up Vue Router

Install and configure Vue Router in your app entry point.

```ts
// main.ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/about', component: () => import('./views/About.vue') },
    { path: '/users/:id', component: () => import('./views/UserProfile.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFound.vue') },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
```

<v-clicks>

- `createWebHistory()` — HTML5 History API (clean URLs, requires server config)
- `createWebHashHistory()` — hash-based URLs (`/#/about`), no server config needed
- Lazy loading: `() => import('./views/Page.vue')` — loads chunk on demand
- Catch-all: `:pathMatch(.*)*` matches all unmatched routes

</v-clicks>

<Tips type="info">

Vue Router maps directly to React Router. `createRouter` ≈ `createBrowserRouter`. Route definitions are nearly identical: `path`, `component`, and dynamic segments like `:id`. Vue uses `app.use(router)` to install; React wraps the app in `<BrowserRouter>` or passes the router to `RouterProvider`.

</Tips>

---
hideInToc: true
---

## RouterView and RouterLink

`<RouterView>` renders the matched component. `<RouterLink>` creates accessible navigation links.

```vue {monaco-run}
<script setup>
import { RouterView, RouterLink, createRouter, createMemoryHistory } from 'vue-router'

const Home = { template: '<div style="padding:12px;color:#42b883">🏠 Home Page</div>' }
const About = { template: '<div style="padding:12px;color:#60a5fa">ℹ️ About Page</div>' }
const Contact = { template: '<div style="padding:12px;color:#fbbf24">📧 Contact Page</div>' }

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
  ],
})
</script>

<template>
  <div style="font-family:system-ui">
    <nav style="display:flex;gap:8px;padding:10px;background:#1a1a1a;border-radius:6px 6px 0 0">
      <RouterLink to="/" style="padding:4px 12px;background:#42b883;color:white;border-radius:4px;text-decoration:none;font-size:13px">Home</RouterLink>
      <RouterLink to="/about" style="padding:4px 12px;background:#60a5fa;color:white;border-radius:4px;text-decoration:none;font-size:13px">About</RouterLink>
      <RouterLink to="/contact" style="padding:4px 12px;background:#fbbf24;color:white;border-radius:4px;text-decoration:none;font-size:13px">Contact</RouterLink>
    </nav>
    <div style="border:1px solid #333;border-top:none;border-radius:0 0 6px 6px;min-height:50px">
      <RouterView />
    </div>
  </div>
</template>
```

<Tips type="info">

`<RouterView>` ≈ React Router's `<Outlet>`. `<RouterLink>` ≈ React Router's `<Link>`. Both automatically apply an active class to the current route link — Vue uses `router-link-active`, React Router uses `NavLink` with an `isActive` callback.

</Tips>

---
hideInToc: true
---

## Dynamic Routes & Route Params

Access dynamic route segments and query strings with `useRoute()`.

```vue {monaco-run}
<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink, createRouter, createMemoryHistory, RouterView } from 'vue-router'

const UserCard = {
  setup() {
    const route = useRoute()
    return {
      userId: computed(() => route.params.id),
      tab: computed(() => route.query.tab || 'profile'),
    }
  },
  template: `
    <div style="padding:12px;font-family:system-ui;font-size:13px">
      <p>User ID: <strong style="color:#42b883">{{ userId }}</strong></p>
      <p>Active tab: <strong style="color:#60a5fa">{{ tab }}</strong></p>
    </div>
  `,
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', redirect: '/users/1' },
    { path: '/users/:id', component: UserCard },
  ],
})
</script>

<template>
  <div style="font-family:system-ui">
    <nav style="display:flex;gap:6px;padding:8px;background:#111;border-radius:6px 6px 0 0;flex-wrap:wrap">
      <RouterLink v-for="id in [1,2,3]" :key="id" :to="`/users/${id}`"
        style="padding:3px 10px;background:#42b883;color:white;border-radius:3px;text-decoration:none;font-size:12px">
        User {{ id }}
      </RouterLink>
      <RouterLink to="/users/1?tab=settings"
        style="padding:3px 10px;background:#60a5fa;color:white;border-radius:3px;text-decoration:none;font-size:12px">
        Settings tab
      </RouterLink>
    </nav>
    <div style="border:1px solid #333;border-top:none;border-radius:0 0 6px 6px;min-height:50px">
      <RouterView />
    </div>
  </div>
</template>
```

<Tips type="info">

`useRoute()` ≈ React Router's `useParams()` + `useSearchParams()` combined. `route.params.id` ≈ `params.id`. `route.query.tab` ≈ `searchParams.get('tab')`. Vue combines all route info into one object; React Router splits it into separate hooks.

</Tips>

---
hideInToc: true
---

## Nested & Named Routes

Nested routes let parent components own a `<RouterView>` for their children. Named routes enable navigation by name instead of path.

```vue {monaco-run}
<script setup>
import { RouterView, RouterLink, createRouter, createMemoryHistory } from 'vue-router'

const UserPosts  = { template: `<div style="padding:10px;color:#60a5fa;font-size:12px">📝 Posts tab</div>` }
const UserPhotos = { template: `<div style="padding:10px;color:#fbbf24;font-size:12px">📷 Photos tab</div>` }

// Parent component — contains its own <RouterView> for children
const UserLayout = {
  template: `
    <div style="border:1px solid #333;border-radius:0 0 6px 6px">
      <div style="display:flex;gap:4px;padding:6px;background:#111;border-bottom:1px solid #333">
        <RouterLink :to="{ name: 'user-posts',  params: { id: 1 } }"
          style="padding:3px 10px;background:#333;color:#ccc;border-radius:3px;text-decoration:none;font-size:11px">
          Posts
        </RouterLink>
        <RouterLink :to="{ name: 'user-photos', params: { id: 1 } }"
          style="padding:3px 10px;background:#333;color:#ccc;border-radius:3px;text-decoration:none;font-size:11px">
          Photos
        </RouterLink>
      </div>
      <RouterView />
    </div>
  `
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/users/:id',
      name: 'user',
      component: UserLayout,
      children: [
        { path: 'posts',  name: 'user-posts',  component: UserPosts },
        { path: 'photos', name: 'user-photos', component: UserPhotos },
      ],
    },
    { path: '/', redirect: '/users/1/posts' },
  ],
})
</script>

<template>
  <div style="font-family:system-ui">
    <nav style="display:flex;gap:6px;padding:8px;background:#1a1a1a;border-radius:6px 6px 0 0">
      <!-- navigate by name — params are injected automatically -->
      <RouterLink :to="{ name: 'user-posts',  params: { id: 1 } }"
        style="padding:4px 10px;background:#42b883;color:white;border-radius:4px;text-decoration:none;font-size:12px">
        User / Posts
      </RouterLink>
      <RouterLink :to="{ name: 'user-photos', params: { id: 1 } }"
        style="padding:4px 10px;background:#fbbf24;color:#111;border-radius:4px;text-decoration:none;font-size:12px">
        User / Photos
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
```

<Tips type="info">

React Router achieves nesting with `<Outlet>` in the parent (≈ Vue's nested `<RouterView>`). Named routes (`{ name: 'user-posts' }`) don't have a direct React Router v6 equivalent — React Router uses path-based navigation only. Named routes are useful when paths change: update the route definition in one place, and all `{ name: '...' }` links update automatically.

</Tips>

---
hideInToc: true
---

## Programmatic Navigation

Use `useRouter()` to navigate from JavaScript logic.

```vue {monaco-run}
<script setup>
import { useRouter, createRouter, createMemoryHistory, RouterView } from 'vue-router'

const Dashboard = { template: '<div style="padding:12px;color:#42b883">📊 Dashboard</div>' }
const Login = { template: '<div style="padding:12px;color:#f87171">🔒 Login</div>' }
const Profile = {
  setup() {
    const router = useRouter()
    return { router }
  },
  template: `
    <div style="padding:12px;font-family:system-ui;font-size:13px">
      <p style="color:#60a5fa;margin:0 0 8px">👤 Profile</p>
      <button @click="router.back()" style="padding:4px 10px;background:#666;color:white;border:none;border-radius:3px;cursor:pointer;margin-right:6px;font-size:12px">← Back</button>
      <button @click="router.push('/')" style="padding:4px 10px;background:#42b883;color:white;border:none;border-radius:3px;cursor:pointer;font-size:12px">Home</button>
    </div>
  `,
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
  ],
})
</script>

<template>
  <div style="font-family:system-ui">
    <nav style="display:flex;gap:6px;padding:8px;background:#111;border-radius:6px 6px 0 0">
      <button @click="router.push('/')" style="padding:4px 10px;background:#42b883;color:white;border:none;border-radius:3px;cursor:pointer;font-size:12px">Dashboard</button>
      <button @click="router.push('/profile')" style="padding:4px 10px;background:#60a5fa;color:white;border:none;border-radius:3px;cursor:pointer;font-size:12px">Profile</button>
      <button @click="router.replace('/login')" style="padding:4px 10px;background:#f87171;color:white;border:none;border-radius:3px;cursor:pointer;font-size:12px">Login (replace)</button>
    </nav>
    <div style="border:1px solid #333;border-top:none;border-radius:0 0 6px 6px;min-height:50px">
      <RouterView />
    </div>
  </div>
</template>
```

<Tips type="info">

`useRouter()` ≈ React Router's `useNavigate()`. `router.push('/path')` ≈ `navigate('/path')`. `router.replace('/path')` ≈ `navigate('/path', { replace: true })`. `router.back()` ≈ `navigate(-1)`. Vue separates read (`useRoute`) from write (`useRouter`); React merges them into `useNavigate` and `useLocation`.

</Tips>

---
hideInToc: true
---

## Navigation Guards

Guards run logic before route transitions — authentication, redirects, unsaved-change warnings.

```ts
// Global guard — runs before every navigation
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

// Per-route guard
const routes = [
  {
    path: '/admin',
    component: AdminPanel,
    beforeEnter: (to, from) => {
      if (!isAdmin()) return { path: '/' }
    },
  },
]
```

```vue
<!-- In-component guard (Composition API) -->
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    return confirm('Leave without saving?')
  }
})
</script>
```

<Tips type="info">

React Router uses `<Route loader>` for data-loading guards and wrapper components (`<ProtectedRoute>`) for auth guards. Vue Router's `beforeEach` global guard is more direct — it's middleware that runs before every navigation with no JSX required. `onBeforeRouteLeave` ≈ React Router's `useBlocker`.

</Tips>
