import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useVibrate } from '@vueuse/core'

export const usePanelStore = defineStore('panel', () => {
  const isOpen = ref(false)
  const isOpening = ref(false)
  const vibrate = useVibrate()

  const openPanel = () => {
    isOpening.value = true
    isOpen.value = true
    vibrate.vibrate([100])
  }

  const closePanel = () => {
    isOpening.value = false
    isOpen.value = false
    vibrate.vibrate([50])
  }

  return {
    isOpen,
    isOpening,
    openPanel,
    closePanel,
  }
})
