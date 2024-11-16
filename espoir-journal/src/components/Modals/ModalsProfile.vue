<template>
  <BaseBottomSheet
    :model-value="isVisible"
    :initialHeight="55"
    @update:model-value="$emit('close')"
    @close="onClose"
  >
    <div class="settings-container">
      <BaseInput
        v-model="form.name"
        label="Profile Name"
        :placeholder="form.name"
        :maxlength="10"
        :showChars="true"
      />
      <div class="input-group">
        <label class="label">Choose avatar</label>
        <div class="avatar-grid">
          <button
            v-for="(avatar, index) in userStore.avatars"
            :key="index"
            @click="form.avatar = index"
            class="avatar-button"
          >
            <div
              class="avatar-container"
              :class="{ selected: form.avatar === index }"
              :style="{ backgroundColor: userStore.avatarBackgrounds[index] }"
            >
              <img :src="avatar" class="avatar-image" />
            </div>
          </button>
        </div>
      </div>
      <BaseButton @click="saveChanges" text="Update Profile" />
    </div>
  </BaseBottomSheet>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

// Stores
import { useUserStore } from '@/stores/userStore'

// Components
import BaseBottomSheet from '@/components/Base/BaseBottomSheet.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseInput from '@/components/Base/BaseInput.vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])
const userStore = useUserStore()

const form = reactive({
  name: userStore.currentUser.name || '',
  avatar: 0,
})

const resetForm = () => {
  form.name = ''
  form.avatar = 0
}

const onClose = () => {
  resetForm()
  emit('close')
}

onMounted(() => {
  userStore.loadUserFromLocalStorage()
  form.name = userStore.currentUser.name
  form.avatar = userStore.currentUser.avatar
})

const saveChanges = () => {
  form.name = form.name.trim()
  userStore.updateUserProfile(form.name, form.avatar)
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
}

.avatar-grid {
  display: flex;
  gap: 16px;
}

.avatar-button {
  flex-grow: 1;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.avatar-container {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.avatar-container.selected {
  border: 2px solid rgba(var(--colorBlack), 0.5);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
