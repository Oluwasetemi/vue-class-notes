<script setup lang="ts">
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-8">
    <header class="mb-8">
      <button
        class="mb-4 text-sm text-green-500 cursor-pointer bg-transparent border-none p-0 hover:underline"
        @click="window.history.back()"
      >
        ← Back to slides
      </button>
      <h1 class="text-3xl font-bold m-0 mb-1">
        <span class="text-gradient font-hand">Changelog</span>
      </h1>
      <p class="m-0 text-gray-500 dark:text-gray-400">Updates to the vue-note presentation</p>
    </header>
    <div class="text-gray-500 dark:text-gray-400 text-sm italic">
      No entries yet.
    </div>
  </div>
</template>
