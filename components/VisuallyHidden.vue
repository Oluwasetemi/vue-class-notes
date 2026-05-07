<template>
  <span class="sr-only" v-bind="$attrs">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ hidden?: boolean }>(), { hidden: true })

defineOptions({ inheritAttrs: false })
</script>
