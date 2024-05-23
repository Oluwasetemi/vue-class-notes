<!--#region snippet-->
<!-- Inside ./snippets/vue/routing/1.vue -->

<!--Steps to take in setting up a vue router-->
<!--1, Install vue router using npm, set the router up-->
  <script>
import Vue from 'vue'
import VueRouter from 'vue-router'
</script> 

<!--2. Create a folder called View, store three files in it(HomeView.vue, AboutView.vue, and NotFoundView.vue)-->
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


<!--3. Define your routes for proper navigation in our App.vue-->
<!--import two components {router-link, router-view}-->
<script>
import {routerLink,routerView} from 'vue-router'
</script>

<!--create a navigation bar with links to the home, about, and not found pages-->
<template>
    <h1>Header</h1>
    <nav>
        <routerLink to="/">Home</routerLink>
        <routerLink to="/about">About</routerLink>
        <routerLink to="/not-found">Not found</routerLink>
    </nav>
    <routerView/>
</template>

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
       {
        path: '/about',
        name: 'About',
        component:()=>import('./AboutView.vue'),
        meta: {
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

//5. Tell vue to use the vue-router plugin

}).use(router).mount('#app')

</script>




<!--#endregion-->

