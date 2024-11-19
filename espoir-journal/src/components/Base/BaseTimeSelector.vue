<template>
  <div class="input-group">
    <div class="time-selector">
      <label class="type-option time-option">
        {{ label }}
        <span class="grey-bg">{{ modelValue }}</span>
        <input
          ref="timeInput"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          type="time"
          required
          class="time-input"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.type-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid rgba(var(--colorBlack), 0.1);
  border-radius: 0.75rem;
  background: transparent;
  transition: all 0.2s ease;
}
.time-option {
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
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

.grey-bg {
  background: rgba(var(--colorBlack), 0.05);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
</style>
