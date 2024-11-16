<template>
  <div class="lower-panel" :style="{ backgroundColor: color }">
    <section class="dates">
      <div class="day">
        <h3 :style="{ color: titleColor }">{{ abbreviatedDay }}</h3>
        <span class="dot"></span>
      </div>

      <div class="month-year">
        <p :style="{ color: monthColor }" class="month">{{ month }} {{ day }}</p>
        <p :style="{ color: yearColor }" class="year">{{ year }}</p>
      </div>
    </section>

    <SummaryComponent />
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Stores
import { usePanelStore } from '@/stores/panelStore'
import { useDateStore } from '@/stores/dateStore'

// Components
import SummaryComponent from '@/components/SummaryComponent.vue'

const props = defineProps({
  color: {
    type: String,
    default: 'white',
  },
})

const panelStore = usePanelStore()
const dateStore = useDateStore()
const { day, abbreviatedDay, month, year } = dateStore

const getColor = (alpha) =>
  panelStore.isOpening ? `rgb(var(--colorWhite), ${alpha})` : `rgb(var(--colorBlack), ${alpha})`

const titleColor = computed(() => getColor(0.9))
const monthColor = computed(() => getColor(0.6))
const yearColor = computed(() => getColor(0.4))
</script>

<style scoped>
.lower-panel {
  height: 80%;
  width: 100%;
  position: relative;
  z-index: 1;
  font-weight: 500;
  font-family: 'Onest-SemiBold';
}

.dates {
  padding: 1.5rem;
  padding-top: 2rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.day {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

h3 {
  font-weight: 500;
  font-family: 'Onest-SemiBold';
  font-size: 3rem;
}

.dot {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: rgb(var(--colorRed), 1);
}

.month-year {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.month {
  color: rgb(var(--colorBlack), 0.6);
}

.year {
  color: rgb(var(--colorBlack), 0.4);
}

.avatar-container {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
