<template>
  <div class="container">
    <LowerPanel :color="lowerPanelBgColor" />
    <UpperPanel class="upper-panel" ref="upperPanelRef" />
  </div>
  <BottomBar />
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useDraggable } from '@/composables/useDraggable'

// Components
import LowerPanel from '@/components/Panels/PanelsLower.vue'
import UpperPanel from '@/components/Panels/PanelsUpper.vue'
import BottomBar from '@/components/NavigationBar.vue'

const upperPanelRef = ref(null)
const lowerPanelBgColor = ref('rgb(255, 255, 255)')

const { initializeDraggable } = useDraggable(upperPanelRef, lowerPanelBgColor)

onMounted(() => {
  nextTick(() => {
    initializeDraggable()
  })
})

watch(lowerPanelBgColor, (newColor) => {
  const themeColorMetaTag = document.querySelector('meta[name="theme-color"]')
  if (themeColorMetaTag) {
    themeColorMetaTag.setAttribute('content', newColor)
  } else {
    console.error('Meta theme-color tag not found')
  }
})
</script>

<style scoped>
.container {
  height: 100dvh;
  width: 100%;
  position: relative;
  z-index: 0;
  overflow-y: hidden;
}

.upper-panel {
  position: absolute;
  width: 100%;
  touch-action: none;
  top: 15%;
}
</style>
