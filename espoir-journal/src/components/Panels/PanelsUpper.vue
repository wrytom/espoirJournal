<template>
  <div class="upper-panel">
    <Week />
    <TaskList
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    />
  </div>
</template>

<script setup>
import Week from '@/components/WeekBar.vue'
import TaskList from '@/components/TaskList.vue'
import { useDateStore } from '@/stores/dateStore'
import { useSwipeStore } from '@/stores/swipeStore'
import { ref } from 'vue'

const dateStore = useDateStore()
const swipeStore = useSwipeStore()

const touchStartX = ref(0)
const touchStartY = ref(0)
const touchCurrentX = ref(0)
const touchCurrentY = ref(0)

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  touchCurrentX.value = touchStartX.value
  touchCurrentY.value = touchStartY.value

  swipeStore.startSwipe('panel')
}

const handleTouchMove = (e) => {
  touchCurrentX.value = e.touches[0].clientX
  touchCurrentY.value = e.touches[0].clientY

  const deltaX = touchCurrentX.value - touchStartX.value
  const deltaY = touchCurrentY.value - touchStartY.value

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
    swipeStore.startSwipe('panel', deltaX > 0 ? 'right' : 'left')
  }
}

const handleTouchEnd = () => {
  const swipeDistance = touchCurrentX.value - touchStartX.value
  const swipeThreshold = 120

  if (swipeStore.swipeDirection) {
    if (swipeDistance > swipeThreshold) {
      const newDate = new Date(dateStore.selectedDay)
      newDate.setDate(newDate.getDate() - 1)
      dateStore.setSelectedDay(newDate)
    } else if (swipeDistance < -swipeThreshold) {
      const newDate = new Date(dateStore.selectedDay)
      newDate.setDate(newDate.getDate() + 1)
      dateStore.setSelectedDay(newDate)
    }
  }

  swipeStore.endSwipe()
}
</script>

<style scoped>
.upper-panel {
  display: flex;
  flex-direction: column;
  height: 85dvh;
  width: 100%;
  background-color: rgba(var(--colorWhite), 1);
  z-index: 2;
  border-radius: 2rem 2rem 0 0;
  position: relative;
  overflow: hidden;
}
</style>
