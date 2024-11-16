import gsap from 'gsap'
import Draggable from 'gsap/Draggable'

// Stores
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

  const calculateDragDistance = (startY, currentY) => {
    return Math.abs(currentY - startY) / window.innerHeight
  }

  const getSnapTarget = (dragDistance, currentY, snapPositions) => {
    const threshold = 0.25
    let snapTarget = snapPositions.initial
    if (dragDistance > threshold) {
      snapTarget = currentY > snapPositions.bottom / 2 ? snapPositions.bottom : snapPositions.initial
    }
    return snapTarget
  }

  const initializeDraggable = () => {
    const element = elementRef.value ? elementRef.value.$el : null
    if (element) {
      const snapPositions = getSnapPositions()
      let startY = 0
      let dragProgress = 0

      Draggable.create(element, {
        type: 'y',
        allowNativeTouchScrolling: true,
        bounds: { minY: 0, maxY: snapPositions.bottom },
        onDragStart() {
          startY = this.y
        },
        onDrag() {
          dragProgress = this.y / snapPositions.bottom
          lowerPanelBgColor.value = calculateRGB(dragProgress)
        },
        onDragEnd() {
          const dragDistance = calculateDragDistance(startY, this.y)
          const snapTarget = getSnapTarget(dragDistance, this.y, snapPositions)
          const targetProgress = snapTarget === snapPositions.bottom ? 1 : snapTarget === snapPositions.initial ? 0 : 0.4
          
          panelStore.isOpening = snapTarget === snapPositions.bottom
          
          gsap.to(element, {
            y: snapTarget,
            duration: 0.3,
            ease: 'power3.out',
            onUpdate: () => {
              const newColor = calculateRGB(targetProgress)
              gsap.to(lowerPanelBgColor, {
                value: newColor,
                ease: 'power3',
              })
            },
            onComplete: () => {
              if (snapTarget === snapPositions.initial) {
                panelStore.closePanel()
              }
              else if (snapTarget === snapPositions.bottom) {
                panelStore.openPanel()
              }
            },
          })
        },
      })
    }
  }

  return { initializeDraggable }
}
