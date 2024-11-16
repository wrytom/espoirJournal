<template>
  <div class="bottom-bar-wrapper">
    <div class="bottom-bar" ref="bottomBar">
      <BaseIconButton @click="toggleVisibility('isSettingsVisible', true)" :icon="SettingsIcon" />
      <div class="add-button" @click="toggleVisibility('isSheetVisible', true)">
        <div class="button-inside"></div>
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
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: linear-gradient(
      157.5deg,
      rgb(148, 31, 115) 0%,
      rgb(148, 31, 115) 42%,
      rgb(129, 38, 114) 42%,
      rgb(129, 38, 114) 53%,
      rgb(110, 44, 113) 53%,
      rgb(110, 44, 113) 68%,
      rgb(91, 51, 113) 68%,
      rgb(91, 51, 113) 70%,
      rgb(72, 58, 112) 70%,
      rgb(72, 58, 112) 83%,
      rgb(53, 64, 111) 83%,
      rgb(53, 64, 111) 97%,
      rgb(34, 71, 110) 97%,
      rgb(34, 71, 110) 100%
    ),
    linear-gradient(
      90deg,
      rgb(148, 31, 115) 0%,
      rgb(148, 31, 115) 42%,
      rgb(129, 38, 114) 42%,
      rgb(129, 38, 114) 53%,
      rgb(110, 44, 113) 53%,
      rgb(110, 44, 113) 68%,
      rgb(91, 51, 113) 68%,
      rgb(91, 51, 113) 70%,
      rgb(72, 58, 112) 70%,
      rgb(72, 58, 112) 83%,
      rgb(53, 64, 111) 83%,
      rgb(53, 64, 111) 97%,
      rgb(34, 71, 110) 97%,
      rgb(34, 71, 110) 100%
    ),
    linear-gradient(
      0deg,
      rgb(148, 31, 115) 0%,
      rgb(148, 31, 115) 42%,
      rgb(129, 38, 114) 42%,
      rgb(129, 38, 114) 53%,
      rgb(110, 44, 113) 53%,
      rgb(110, 44, 113) 68%,
      rgb(91, 51, 113) 68%,
      rgb(91, 51, 113) 70%,
      rgb(72, 58, 112) 70%,
      rgb(72, 58, 112) 83%,
      rgb(53, 64, 111) 83%,
      rgb(53, 64, 111) 97%,
      rgb(34, 71, 110) 97%,
      rgb(34, 71, 110) 100%
    ),
    linear-gradient(90deg, rgb(43, 115, 147), rgb(213, 181, 127));
  background-blend-mode: overlay, overlay, overlay, normal;
  background-size: 200%;
  animation: fluidBackground 10s infinite alternate-reverse;
  overflow: hidden;
}

.button-inside {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: rgba(var(--colorLightGrey), 1);
  backdrop-filter: blur(13px);
}
</style>
