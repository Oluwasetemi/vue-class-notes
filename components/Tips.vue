<template>
  <aside
    class="tip flex flex-col px-4 py-3 rounded mb-4 items-start max-w-[600px] border-l-5"
    :class="[typeConfig.bg, typeConfig.border]"
    :style="{ maxWidth: fullWidth ? '100%' : '' }"
    :role="role"
  >
    <section class="flex items-center gap-3 mb-2">
      <div
        class="flex-shrink-0 flex items-center text-xl"
        :class="typeConfig.icon"
      >
        <slot name="icon">
          <div v-if="type === 'tip'" class="slidev-icon i-carbon-idea" />
          <div
            v-else-if="type === 'info'"
            class="slidev-icon i-carbon-information"
          />
          <div
            v-else-if="type === 'success'"
            class="slidev-icon i-carbon-checkmark"
          />
          <div
            v-else-if="type === 'danger'"
            class="slidev-icon i-carbon-warning-alt"
          />
        </slot>
      </div>
      <div class="font-medium" :class="typeConfig.icon">
        {{ capitalizedType }}
      </div>
    </section>
    <section class="flex-grow">
      <div>
        <slot>Default tip content</slot>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'tip' | 'info' | 'success' | 'danger'>,
    default: 'info',
    validator: (value) =>
      ['tip', 'info', 'success', 'danger'].includes(value as string),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

const capitalizedType = computed(
  () => props.type.charAt(0).toUpperCase() + props.type.slice(1),
)

const role = computed(() => (props.type === 'danger' ? 'alert' : 'status'))

const typeConfig = computed(() => {
  const configs = {
    tip: {
      bg: 'bg-[#660792]',
      icon: 'text-[#660792] dark:text-white',
      border: 'border-l-[#660792]',
    },
    info: {
      bg: 'bg-[#111a2b]',
      icon: 'text-[#2196f3]',
      border: 'border-l-[#2196f3]',
    },
    success: {
      bg: 'bg-[#132a1a]',
      icon: 'text-[#4caf50]',
      border: 'border-l-[#4caf50]',
    },
    danger: {
      bg: 'bg-[#2b1518]',
      icon: 'text-[#ff4d4f]',
      border: 'border-l-[#ff4d4f]',
    },
  }
  return configs[props.type] ?? configs.info
})
</script>

<style scoped>
.tip :deep(p) {
  color: #ffffff;
  margin: 0;
}

.tip :deep(code) {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}
</style>
