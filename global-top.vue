<!-- global-top.vue -->
<script setup>
import { useNav } from '@slidev/client'

const { currentSlideNo } = useNav()

const TOC_SLIDES = new Set([])
</script>

<template>
  <TocIcon v-if="!TOC_SLIDES.has(currentSlideNo)" />
</template>
