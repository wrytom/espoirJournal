import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSwipeStore = defineStore('swipe', () => {
  const isSwipeActive = ref(false)
  const swipeDirection = ref(null)
  const swipeOrigin = ref(null)

  function startSwipe(origin, direction = null) {
    isSwipeActive.value = true
    swipeOrigin.value = origin
    swipeDirection.value = direction
  }

  function endSwipe() {
    isSwipeActive.value = false
    swipeDirection.value = null
    swipeOrigin.value = null
  }

  function resetSwipe() {
    endSwipe()
  }

  return {
    isSwipeActive,
    swipeDirection,
    swipeOrigin,
    startSwipe,
    endSwipe,
    resetSwipe
  }
})