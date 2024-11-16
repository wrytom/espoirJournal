<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      v-model="inputValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      class="base-input"
    />
    <span
      v-if="showChars"
      :class="{ 'char-count': true, 'near-limit': inputValue.length >= maxlength - 5 }"
      >{{ inputValue.length }} / {{ maxlength }} characters</span
    >
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  maxlength: Number,
  showChars: Boolean,
  label: String,
})

const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.875rem;
  color: rgba(var(--colorBlack), 0.6);
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid rgba(var(--colorBlack), 0.1);
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
}

input:focus,
input:active {
  border-color: rgba(var(--colorBlack), 1);
}

.char-count {
  font-size: 0.75rem;
  color: rgba(var(--colorBlack), 0.6);
  text-align: right;
}

.char-count.near-limit {
  color: rgba(var(--colorRed), 1);
  font-family: 'Onest-SemiBold';
  font-weight: 500;
}
</style>
