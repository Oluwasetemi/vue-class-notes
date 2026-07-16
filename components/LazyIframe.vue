<template>
  <div class="relative w-full min-h-[200px]" ref="containerRef">
    <div
      v-if="!isLoaded"
      class="group absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-all duration-300 min-h-[200px] hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
      @click="load"
    >
      <div class="text-center text-gray-500 dark:text-gray-400">
        <div v-if="isLoading" class="flex items-center justify-center">
          <div
            class="w-10 h-10 border-4 border-gray-200 dark:border-gray-600 border-t-green-500 rounded-full animate-spin"
          />
        </div>
        <div v-else class="flex flex-col items-center gap-2">
          <div
            class="text-5xl text-green-500 transition-transform duration-200 group-hover:scale-110"
          >
            ▶
          </div>
          <p class="m-0 text-sm">Click to load iframe</p>
          <small class="text-xs text-gray-400 truncate max-w-[300px]">{{ src }}</small>
        </div>
      </div>
    </div>
    <iframe
      v-show="isLoaded"
      ref="iframeRef"
      :src="isLoaded ? src : undefined"
      :title="title || 'Embedded content'"
      :width="width"
      :height="height"
      :style="iframeStyle"
      :allow="allow"
      :sandbox="sandbox"
      frameborder="0"
      allowfullscreen
      class="rounded-lg"
      @load="onLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLazyLoad } from '../composables/use-lazy-load'

interface Props {
  src: string
  title?: string
  width?: string | number
  height?: string | number
  allow?: string
  sandbox?: string
  autoLoad?: boolean
  style?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400',
  autoLoad: false,
})

const iframeRef = ref<HTMLIFrameElement>()
const containerRef = ref<HTMLElement>()

const { isLoaded, isLoading, load, onLoad } = useLazyLoad(containerRef, {
  autoLoad: props.autoLoad,
})

const iframeStyle = computed(() => props.style || '')
</script>
