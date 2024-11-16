<template>
  <div class="upper-panel">
    <Week />
    <TaskList />
  </div>
</template>

<script setup>
// Components
import Week from '@/components/WeekBar.vue'
import TaskList from '@/components/TaskList.vue'
</script>

<style scoped>
.upper-panel {
  display: flex;
  flex-direction: column;
  height: 85dvh;
  width: 100%;
  background-color: rgba(var(--colorWhite), 1);
  z-index: 2;
  border-radius: 2rem 2rem 0 0;
  position: relative;
}
</style>
