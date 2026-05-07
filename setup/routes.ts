import { defineRoutesSetup } from '@slidev/types'

export default defineRoutesSetup((routes) => {
  return [
    ...routes,
    {
      path: '/changelog',
      component: () => import('../views/changelog.vue'),
    },
    {
      path: '/routes',
      component: () => import('../views/routes.vue'),
    },
    {
      path: '/playground',
      component: () => import('../views/playground.vue'),
    },
    {
      path: '/vue-playground',
      component: () => import('../views/vue-playground.vue'),
    },
  ]
})
