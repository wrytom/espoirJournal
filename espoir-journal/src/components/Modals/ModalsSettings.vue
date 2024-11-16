<template>
  <BaseBottomSheet
    :model-value="isVisible"
    :initialHeight="48"
    @update:model-value="$emit('close')"
    @close="onClose"
  >
    <div class="settings-container">
      <div class="input-group">
        <label style="color: rgba(var(--colorBlack), 0.6)">Morning</label>
        <div class="time-selector">
          <label class="type-option time-option">
            <SunIcon />
            <span>{{ form.morning }}</span>
            <input ref="timeInput" v-model="form.morning" type="time" required class="time-input" />
          </label>
        </div>
      </div>

      <div class="input-group">
        <label style="color: rgba(var(--colorBlack), 0.6)">Evening</label>
        <div class="time-selector">
          <label class="type-option time-option">
            <MoonIcon />
            <span>{{ form.evening }}</span>
            <input ref="timeInput" v-model="form.evening" type="time" required class="time-input" />
          </label>
        </div>
      </div>

      <BaseButton @click="saveSettings" text="Save Settings" />
    </div>
  </BaseBottomSheet>
</template>

<script setup>
import { reactive } from 'vue'

// Stores
import { useSettingsStore } from '@/stores/settingsStore'

// Components
import BaseBottomSheet from '@/components/Base/BaseBottomSheet.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

// Icons
import MoonIcon from '@/assets/icons/MoonIcon.vue'
import SunIcon from '@/assets/icons/SunIcon.vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits()

const settingsStore = useSettingsStore()

const form = reactive({
  morning: settingsStore.morning,
  evening: settingsStore.evening,
})

const onClose = () => {
  emit('close')
}

const saveSettings = () => {
  settingsStore.updateSettings(form.morning, form.evening)
  emit('close')
}
</script>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 16px 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-size: 0.875rem;
  color: rgba(var(--colorBlack), 0.6);
  display: flex;
  align-items: center;
}

.type-selector,
.time-selector {
  display: flex;
  gap: 1rem;
}

.type-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid rgba(var(--colorBlack), 0.1);
  border-radius: 0.5rem;
  background: transparent;
  transition: all 0.2s ease;
}

.time-option {
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  position: relative;
}

.time-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>
