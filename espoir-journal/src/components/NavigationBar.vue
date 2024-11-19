<template>
  <div class="bottom-bar-wrapper">
    <div class="bottom-bar" ref="bottomBar">
      <BaseIconButton @click="toggleVisibility('isSettingsVisible', true)" :icon="SettingsIcon" />
      <div class="add-button" @click="toggleVisibility('isSheetVisible', true)">
          <PlusSquareIcon color="grey" />
      </div>
      <BaseIconButton @click="toggleVisibility('isProfileVisible', true)" :icon="UserSquareIcon" />
    </div>
  </div>
  <CreateTask
    :isVisible="visibility.isSheetVisible"
    @close="toggleVisibility('isSheetVisible', false)"
  />
  <Profile
    :isVisible="visibility.isProfileVisible"
    @close="toggleVisibility('isProfileVisible', false)"
  />
  <Settings
    :isVisible="visibility.isSettingsVisible"
    @close="toggleVisibility('isSettingsVisible', false)"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

// Stores
import { usePanelStore } from '@/stores/panelStore'

// Components
import BaseIconButton from '@/components/Base/BaseIconButton.vue'
import CreateTask from '@/components/Modals/ModalsCreateTask.vue'
import Profile from '@/components/Modals/ModalsProfile.vue'
import Settings from '@/components/Modals/ModalsSettings.vue'

// Icons
import UserSquareIcon from '@/assets/icons/UserSquareIcon.vue'
import PlusSquareIcon from '@/assets/icons/PlusSquareIcon.vue'
import SettingsIcon from '@/assets/icons/SettingsIcon.vue'

const bottomBar = ref(null)
const panelStore = usePanelStore()

const visibility = ref({
  isSheetVisible: false,
  isProfileVisible: false,
  isSettingsVisible: false,
})

const toggleVisibility = (key, value) => {
  visibility.value[key] = value
}

const animateBottomBar = (width) => {
  gsap.to(bottomBar.value, {
    width,
    duration: 0.25,
    ease: 'power3.out',
  })
}

watch(
  () => panelStore.isOpening,
  (isOpening) => animateBottomBar(isOpening ? '50%' : '100%'),
)
</script>

<style scoped>
.bottom-bar-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  background-color: rgba(var(--colorLightGrey), 0.3);
  backdrop-filter: blur(13px);
}

.bottom-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-button {
  width: 4rem;
  height: 2.5rem;
  border-radius: 2rem;
  background-color: rgba(var(--colorLightGrey), 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.button-inside {
  font-size: 3rem
}
</style>
