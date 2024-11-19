<template>
  <BaseBottomSheet
    :model-value="isVisible"
    :initialHeight="42"
    @update:model-value="$emit('close')"
    @close="onClose"
  >
    <div class="settings-container">
      <!-- <BaseSwitch v-model="form.settingsOn" label="Show in the Task list" class="top-switch" /> -->

      <BaseTimeSelector v-model="form.morning" label="Wake up" />
      <BaseTimeSelector v-model="form.evening" label="Wind down" />

      <BaseButton @click="saveSettings" text="Save Settings" />
    </div>
  </BaseBottomSheet>
</template>

<script setup>
import { reactive, watch } from 'vue'

// Stores
import { useSettingsStore } from '@/stores/settingsStore'

// Components
import BaseBottomSheet from '@/components/Base/BaseBottomSheet.vue'
import BaseTimeSelector from '@/components/Base/BaseTimeSelector.vue'
import BaseSwitch from '@/components/Base/BaseSwitch.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits()

const settingsStore = useSettingsStore()

const form = reactive({
  settingsOn: settingsStore.settingsOn,
  morning: settingsStore.morning,
  evening: settingsStore.evening,
})

watch(
  () => [form.settingsOn, form.morning, form.evening],
  ([settingsOn, morning, evening]) => {
    settingsStore.updateSettings(morning, evening, settingsOn)
  }
)


const onClose = () => {
  emit('close')
}

const saveSettings = () => {
  settingsStore.updateSettings(form.morning, form.evening, form.settingsOn)
  emit('close')
}
</script>


<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.top-switch {
  margin-bottom: 1rem;
  padding: 0 0.25rem;
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
