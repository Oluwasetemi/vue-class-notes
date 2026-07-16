import { ref } from 'vue'
import type { Ref } from 'vue'

interface AxisOptions {
  initial?: number
  min?: number
  max?: number
}

interface SplitPaneOptions {
  /** Vertical divider — controls left/right pane sizes as a percentage. */
  vertical?: AxisOptions
  /** Horizontal divider — controls bottom panel size in pixels. */
  horizontal?: AxisOptions
}

/**
 * Manages a two-axis split-pane layout: a vertical drag handle that adjusts
 * leftWidthPct, and a horizontal drag handle that adjusts consoleHeightPx.
 *
 * containerRef must point to the element whose width is used to compute the
 * vertical percentage delta.
 */
export function useSplitPane(
  containerRef: Ref<HTMLElement | undefined>,
  options: SplitPaneOptions = {},
) {
  const { vertical = {}, horizontal = {} } = options

  const leftWidthPct = ref(vertical.initial ?? 50)
  const consoleHeightPx = ref(horizontal.initial ?? 160)
  const isDraggingV = ref(false)
  const isDraggingH = ref(false)

  const vMin = vertical.min ?? 20
  const vMax = vertical.max ?? 80
  const hMin = horizontal.min ?? 60
  const hMax = horizontal.max ?? 520

  const startVerticalDrag = (e: MouseEvent) => {
    isDraggingV.value = true
    const startX = e.clientX
    const startPct = leftWidthPct.value

    const onMove = (e: MouseEvent) => {
      if (!containerRef.value) return
      const totalW = containerRef.value.offsetWidth
      const delta = ((e.clientX - startX) / totalW) * 100
      leftWidthPct.value = Math.max(vMin, Math.min(vMax, startPct + delta))
    }
    const onUp = () => {
      isDraggingV.value = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const startHorizontalDrag = (e: MouseEvent) => {
    isDraggingH.value = true
    const startY = e.clientY
    const startH = consoleHeightPx.value

    const onMove = (e: MouseEvent) => {
      // Dragging up (negative deltaY) increases console height.
      const delta = startY - e.clientY
      consoleHeightPx.value = Math.max(hMin, Math.min(hMax, startH + delta))
    }
    const onUp = () => {
      isDraggingH.value = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return {
    leftWidthPct,
    consoleHeightPx,
    isDraggingV,
    isDraggingH,
    startVerticalDrag,
    startHorizontalDrag,
  }
}
