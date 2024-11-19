import { ref, watch, computed } from 'vue'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import { usePanelStore } from '@/stores/panelStore'

gsap.registerPlugin(Draggable)

export const useDraggable = (elementRef, lowerPanelBgColor) => {
  const panelStore = usePanelStore()

  const calculateRGB = (progress) => {
    const value = Math.round(255 * (1 - progress))
    return `rgb(${value}, ${value}, ${value})`
  }

  const getSnapPositions = () => ({
    initial: 0,
    bottom: window.innerHeight * 0.5,
  })

  const initializeDraggable = () => {
    const element = elementRef.value ? elementRef.value.$el : null
    if (element) {
      const snapPositions = getSnapPositions()
      let dragProgress = 0
      let lastColor = lowerPanelBgColor.value

      Draggable.create(element, {
        type: 'y',
        allowNativeTouchScrolling: true,
        bounds: { minY: 0, maxY: snapPositions.bottom },
        onDrag() {
          dragProgress = this.y / snapPositions.bottom
          const newColor = calculateRGB(dragProgress)
          if (newColor !== lastColor) {
            lastColor = newColor
            lowerPanelBgColor.value = newColor
          }
        },
        onDragEnd() {
          const snapTarget = this.y > snapPositions.bottom / 2 ? snapPositions.bottom : snapPositions.initial
          const targetProgress = snapTarget === snapPositions.bottom ? 1 : 0

          panelStore.isOpening = snapTarget === snapPositions.bottom

          gsap.to(element, {
            y: snapTarget,
            duration: 0.3,
            ease: 'power3.out',
            onUpdate: () => {
              const newColor = calculateRGB(targetProgress)
              lowerPanelBgColor.value = newColor
            },
            onComplete: () => {
              if (snapTarget === snapPositions.initial) {
                panelStore.closePanel()
              } else if (snapTarget === snapPositions.bottom) {
                panelStore.openPanel()
              }
            },
          })
        },
      })
    }
  }

  return {
    initializeDraggable,
  }
}
