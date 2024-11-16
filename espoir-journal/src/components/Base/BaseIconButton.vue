<template>
  <div class="icon-button" @click="$emit('click')">
    <component :is="icon" :color="color" :width="width" :height="height" />
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  color: {
    type: String,
    default: 'grey',
  },
  width: {
    type: String,
    default: '30px',
  },
  height: {
    type: String,
    default: '30px',
  },
})
</script>

<style scoped>
.icon-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
