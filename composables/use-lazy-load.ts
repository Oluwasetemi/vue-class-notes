import { onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { Ref } from 'vue'

export interface LazyLoadOptions {
  autoLoad?: boolean
}

/**
 * Manages the idle → loading → loaded state machine for a deferred iframe.
 *
 * `load()` triggers the transition. `onLoad()` should be called from the
 * iframe's load event to clear the loading spinner.
 *
 * When autoLoad is true, the iframe loads automatically once the container
 * scrolls into the viewport (IntersectionObserver, threshold 0.1).
 */
export function useLazyLoad(
  containerRef: Ref<HTMLElement | undefined>,
  options: LazyLoadOptions = {},
) {
  const isLoaded = ref(false)
  const isLoading = ref(false)

  const load = async () => {
    if (isLoaded.value || isLoading.value) return
    isLoading.value = true
    await new Promise<void>((resolve) => setTimeout(resolve, 100))
    isLoaded.value = true
    isLoading.value = false
  }

  const onLoad = () => {
    isLoading.value = false
  }

  onMounted(() => {
    if (!options.autoLoad) return
    const { stop } = useIntersectionObserver(
      containerRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting && !isLoaded.value) {
          load()
          stop()
        }
      },
      { threshold: 0.1 },
    )
  })

  return { isLoaded, isLoading, load, onLoad }
}
