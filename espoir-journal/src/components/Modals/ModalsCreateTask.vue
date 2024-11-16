<template>
  <BaseBottomSheet
    :model-value="isVisible"
    @update:model-value="$emit('close')"
    @close="onClose"
    :initialHeight="65"
  >
    <form @submit.prevent="createNewTask" class="task-form">
      <div class="input-group">
        <label for="taskContent">Task</label>
        <BaseInput
          id="taskContent"
          v-model="taskData.content"
          type="text"
          placeholder="What needs to be done?"
          :maxlength="40"
          :showChars="true"
          required
        />
      </div>

      <div class="input-group">
        <label>Type</label>
        <div class="type-selector">
          <button
            type="button"
            class="type-option"
            :class="{ selected: taskData.type === 'task' }"
            @click="taskData.type = 'task'"
          >
            <TaskIcon :class="{ 'icon-selected': taskData.type === 'task' }" />
            <span>Task</span>
          </button>
          <button
            type="button"
            class="type-option"
            :class="{ selected: taskData.type === 'starred' }"
            @click="taskData.type = 'starred'"
          >
            <StarIcon
              :class="{
                'icon-selected': taskData.type === 'starred',
                starred: taskData.type === 'starred',
              }"
            />
            <span>Starred</span>
          </button>
          <button
            type="button"
            class="type-option"
            :class="{ selected: taskData.type === 'fun' }"
            @click="taskData.type = 'fun'"
          >
            <PartyIcon :class="{ 'icon-selected': taskData.type === 'fun' }" />
            <span>Fun</span>
          </button>
        </div>
      </div>

      <div class="input-group">
        <label>Time</label>
        <div class="time-selector">
          <label class="type-option time-option" :class="{ selected: isTimeSelected }">
            <TimeIcon :class="{ 'icon-selected': isTimeSelected }" />
            <span>{{ displayTime }}</span>
            <input
              ref="timeInput"
              v-model="taskData.time"
              type="time"
              required
              class="time-input"
            />
          </label>
        </div>
      </div>

      <BaseButton type="submit" text="Create Task" />
    </form>
  </BaseBottomSheet>
</template>

<script setup>
import { ref, computed } from 'vue'

// Stores
import { useTaskStore } from '@/stores/taskStore'
import { useDateStore } from '@/stores/dateStore'

// Components
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseBottomSheet from '@/components/Base/BaseBottomSheet.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

// Icons
import TaskIcon from '@/assets/icons/TaskIcon.vue'
import StarIcon from '@/assets/icons/StarIcon.vue'
import PartyIcon from '@/assets/icons/PartyIcon.vue'
import TimeIcon from '@/assets/icons/TimeIcon.vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const taskStore = useTaskStore()
const dateStore = useDateStore()
const timeInput = ref(null)

const taskData = ref({
  content: '',
  type: 'task',
  time: '',
  date: '',
})

const isTimeSelected = computed(() => !!taskData.value.time)

const displayTime = computed(() => {
  if (!taskData.value.time) return 'Select Time'
  return new Date(`2000/01/01 ${taskData.value.time}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
})

const resetForm = () => {
  taskData.value = {
    content: '',
    type: 'task',
    time: '',
    date: '',
  }
}

const createNewTask = () => {
  taskData.value.date = dateStore.selectedDay
  taskStore.createTask(taskData.value)
  resetForm()
  emit('close')
}

const onClose = () => {
  resetForm()
  emit('close')
}
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  color: rgba(var(--colorBlack), 0.6);
}

.input-group input {
  padding: 0.75rem;
  border: 1px solid rgba(var(--colorBlack), 0.1);
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
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

.type-option span {
  font-size: 0.875rem;
  color: rgba(var(--colorBlack), 0.8);
  pointer-events: none;
}

.type-option.selected {
  border-color: rgb(var(--colorBlack));
  background-color: rgba(var(--colorBlack), 0.05);
}

.type-option svg {
  width: 1.5rem;
  height: 1.5rem;
  color: rgba(var(--colorBlack), 0.6);
  transition: color 0.2s ease;
  pointer-events: none;
}

.type-option .icon-selected {
  color: rgb(var(--colorBlack));
}

.create-button {
  background-color: rgb(var(--colorBlack));
  color: rgb(var(--colorWhite));
  padding: 1rem 0.75rem;
  border-radius: 5rem;
  font-weight: 500;
  font-family: 'Onest-Medium';
  font-size: 1rem;
  margin-top: 0.5rem;
}

.create-button:hover {
  opacity: 0.9;
}
</style>
