<template>
  <button class="base-button" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
  text: String,
  default: 'Button'
})
</script>

<style scoped>
.base-button {
  background-color: rgb(var(--colorBlack));
  color: rgb(var(--colorWhite));
  padding: 1rem 0.75rem;
  border-radius: 5rem;
  font-weight: 500;
  font-family: 'Onest-Medium';
  font-size: 1rem;
  margin-top: 0.5rem;
}

.base-button:hover {
  opacity: 0.9;
}

.base-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
