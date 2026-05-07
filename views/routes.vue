<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const sections = [
  { name: 'Introduction', slug: 'intro' },
  { name: 'Template Syntax', slug: 'template' },
  { name: 'Reactivity', slug: 'reactivity' },
  { name: 'Composables', slug: 'composables' },
  { name: 'State', slug: 'state' },
  { name: 'State Management', slug: 'state-management' },
  { name: 'Rendering', slug: 'rendering' },
  { name: 'Data Fetching', slug: 'data-fetching' },
  { name: 'Routing', slug: 'routing' },
  { name: 'Performance', slug: 'performance' },
  { name: 'Forms', slug: 'form' },
  { name: 'Components', slug: 'component' },
  { name: 'Interaction', slug: 'interaction' },
  { name: 'Testing', slug: 'test' },
]

const tools = [
  { name: '🟢 Vue Playground', route: '/vue-playground', color: 'text-green-500 dark:text-green-400', border: 'hover:border-green-500 dark:hover:border-green-400' },
  { name: '▶ JS/TS Playground', route: '/playground', color: 'text-blue-500 dark:text-blue-400', border: 'hover:border-blue-500 dark:hover:border-blue-400' },
]

function goToSlide(slug: string) {
  router.push(`/${slug}`)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-8">
    <header class="mb-8">
      <router-link
        to="/"
        class="inline-block mb-4 text-sm text-green-500 no-underline hover:underline"
      >
        ← Back to slides
      </router-link>
      <h1 class="text-3xl font-bold m-0 mb-1">
        Course <span class="text-gradient font-hand">Sections</span>
      </h1>
      <p class="m-0 text-gray-500 dark:text-gray-400">
        Jump to any topic in the presentation
      </p>
    </header>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mb-8">
      <button
        v-for="section in sections"
        :key="section.slug"
        class="flex items-center justify-between px-5 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-left cursor-pointer transition-all duration-200 shadow-sm hover:border-green-500 dark:hover:border-green-400 hover:shadow-md"
        @click="goToSlide(section.slug)"
      >
        <span class="font-semibold text-sm text-gray-800 dark:text-gray-200">{{ section.name }}</span>
        <span class="text-green-500 dark:text-green-400 text-lg">→</span>
      </button>
    </div>

    <div class="flex flex-col gap-3">
      <h2 class="text-lg font-semibold m-0 mb-2 text-gray-700 dark:text-gray-300">Tools</h2>
      <button
        v-for="tool in tools"
        :key="tool.route"
        class="flex items-center justify-between px-5 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-left cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
        :class="tool.border"
        @click="router.push(tool.route)"
      >
        <span class="font-semibold text-sm" :class="tool.color">{{ tool.name }}</span>
        <span class="text-lg" :class="tool.color">→</span>
      </button>
    </div>
  </div>
</template>
