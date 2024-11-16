<template>
  <div :class="{ 'date-box': true, active: props.active, selected: props.selected }">
    <span v-if="active" class="dot"></span>
    <p class="date">{{ date }}</p>
    <p class="day">{{ day }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    default: 9,
  },
  day: {
    type: String,
    default: 'Mon',
  },
})
</script>

<style scoped>
.date-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0.75rem 0.5rem;
  border: 1px solid transparent;
  border-radius: 1rem;
  cursor: pointer;
}

.date,
.day {
  font-weight: 500;
  font-family: 'Onest-SemiBold';
}

.date {
  font-size: 1.1rem;
  color: rgb(var(--colorBlack), 0.35);
}

.day {
  font-size: 0.6rem;
  color: rgb(var(--colorBlack), 0.35);
}

.selected {
  border: 1px solid rgb(var(--colorBlack), 0.15);
}

.selected .date {
  color: rgb(var(--colorBlack), 0.8);
}

.selected .day {
  color: rgb(var(--colorRed), 1);
}

.dot {
  background-color: rgb(var(--colorRed), 1);
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  position: absolute;
  top: 12%;
}
</style>
