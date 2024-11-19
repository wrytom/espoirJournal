<template>
  <div class="lower-panel" :style="{ backgroundColor: color }">
    <div class="stars-container">
      <div
        v-for="star in stars"
        :key="star.id"
        class="star"
        :style="{
          left: star.x + 'px',
          bottom: star.y + 'px',
          opacity: star.opacity,
          transform: `scale(${star.scale})`,
          backgroundColor: star.color,
        }"
      ></div>
    </div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePanelStore } from '@/stores/panelStore'
import { useDateStore } from '@/stores/dateStore'
import SummaryComponent from '@/components/SummaryComponent.vue'

const props = defineProps({
  color: {
    type: String,
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

const stars = ref([])
let starId = 0
let animationFrame

const starColors = [
  'rgb(255, 255, 255)', // White
  'rgb(255, 255, 230)', // Warm white
  'rgb(230, 230, 255)', // Cool white
  'rgb(255, 244, 230)', // Slight orange tint
]

const createStar = () => {
  const x = Math.random() * window.innerWidth
  const y = 0
  const scale = Math.random() * 0.7 + 0.3
  const speed = Math.random() * 1.5 + 0.1
  const maxHeight = window.innerHeight

  return {
    id: starId++,
    x,
    y,
    scale,
    speed,
    color: starColors[Math.floor(Math.random() * starColors.length)],
    opacity: 1,
    maxHeight,
  }
}

const updateStars = () => {
  stars.value = stars.value.filter((star) => {
    star.y += star.speed
    if (star.y > star.maxHeight * 0.2) {
      star.opacity = Math.max(0, 1 - (star.y - star.maxHeight * 0.2) / (star.maxHeight * 0.3))
    }

    return star.y < star.maxHeight && star.opacity > 0
  })

  if (Math.random() < 0.075) {
    stars.value.push(createStar())
  }

  animationFrame = requestAnimationFrame(updateStars)
}

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    const star = createStar()
    star.y = Math.random() * window.innerHeight
    stars.value.push(star)
  }

  animationFrame = requestAnimationFrame(updateStars)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.lower-panel {
  height: 80%;
  width: 100%;
  position: relative;
  z-index: 1;
  font-weight: 500;
  font-family: 'Onest-SemiBold';
  overflow: hidden;
}

.stars-container {
  position: absolute;
  bottom: 0;
  right: 10%;
  width: 60%;
  height: 60%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.star {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 8px 1px rgba(255, 255, 255, 0.8);
  will-change: transform, opacity;
}

.dates {
  padding: 1.5rem;
  padding-top: 2rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
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
