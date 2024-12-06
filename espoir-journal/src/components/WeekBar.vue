<template>
  <div class="week-container">
    <div class="days-wrapper" ref="daysWrapper">
      <div class="week-slide">
        <div class="days">
          <DateBox
            v-for="day in previousWeekDays"
            :key="day.date.toISOString()"
            :date="day.date.getDate()"
            :day="day.shortName"
            :active="isToday(day.date)"
            :selected="dateStore.isSelectedDay(day.date)"
            @click="handleDateClick(day.date)"
          />
        </div>
      </div>
      <div class="week-slide">
        <div class="days">
          <DateBox
            v-for="day in currentWeekDays"
            :key="day.date.toISOString()"
            :date="day.date.getDate()"
            :day="day.shortName"
            :active="isToday(day.date)"
            :selected="dateStore.isSelectedDay(day.date)"
            @click="handleDateClick(day.date)"
          />
        </div>
      </div>
      <div class="week-slide">
        <div class="days">
          <DateBox
            v-for="day in nextWeekDays"
            :key="day.date.toISOString()"
            :date="day.date.getDate()"
            :day="day.shortName"
            :active="isToday(day.date)"
            :selected="dateStore.isSelectedDay(day.date)"
            @click="handleDateClick(day.date)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

import { useDateStore } from '@/stores/dateStore'
import { usePanelStore } from '@/stores/panelStore'
import DateBox from '@/components/Singles/SinglesDateBox.vue'

gsap.registerPlugin(Draggable)

const dateStore = useDateStore()
const panelStore = usePanelStore()
const daysWrapper = ref(null)
const slideWidth = ref(0)
const draggableInstance = ref(null)

const getWeekDates = (baseDate) => {
  const week = []
  const curr = new Date(baseDate)
  
  // Adjust to Monday
  const dayOfWeek = curr.getDay()
  const diff = curr.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  curr.setDate(diff)

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(curr)
    week.push({
      date: dayDate,
      shortName: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dayDate),
    })
    curr.setDate(curr.getDate() + 1)
  }
  return week
}

const currentBaseDate = ref(new Date())

const currentWeekDays = computed(() => getWeekDates(currentBaseDate.value))
const previousWeekDays = computed(() => {
  const prevDate = new Date(currentBaseDate.value)
  prevDate.setDate(prevDate.getDate() - 7)
  return getWeekDates(prevDate)
})
const nextWeekDays = computed(() => {
  const nextDate = new Date(currentBaseDate.value)
  nextDate.setDate(nextDate.getDate() + 7)
  return getWeekDates(nextDate)
})

const isToday = (date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const handleDateClick = (date) => {
  dateStore.setSelectedDay(date)
}

const centerWeekAroundDate = (selectedDate) => {
  const newBaseDate = new Date(selectedDate)
  
  // Adjust to Monday of the week
  const dayOfWeek = newBaseDate.getDay()
  const diff = newBaseDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  newBaseDate.setDate(diff)
  
  currentBaseDate.value = newBaseDate

  if (daysWrapper.value) {
    gsap.set(daysWrapper.value, { x: -slideWidth.value })
  }
}

const initializeDraggable = () => {
  draggableInstance.value = Draggable.create(daysWrapper.value, {
    type: 'x',
    inertia: true,
    bounds: {
      minX: -slideWidth.value * 2,
      maxX: 0,
    },
    onDragEnd: function () {
      const dragDistance = this.endX - this.startX
      const threshold = slideWidth.value * 0.2

      if (Math.abs(dragDistance) > threshold) {
        if (dragDistance > 0) {
          gsap.to(daysWrapper.value, {
            x: 0,
            duration: 0.3,
            onComplete: () => {
              const baseDate = new Date(currentBaseDate.value)
              baseDate.setDate(baseDate.getDate() - 7)
              currentBaseDate.value = baseDate
              gsap.set(daysWrapper.value, { x: -slideWidth.value })
            },
          })
        } else {
          gsap.to(daysWrapper.value, {
            x: -slideWidth.value * 2,
            duration: 0.3,
            onComplete: () => {
              const baseDate = new Date(currentBaseDate.value)
              baseDate.setDate(baseDate.getDate() + 7)
              currentBaseDate.value = baseDate
              gsap.set(daysWrapper.value, { x: -slideWidth.value })
            },
          })
        }
      } else {
        gsap.to(daysWrapper.value, {
          x: -slideWidth.value,
          duration: 0.3,
        })
      }
    },
  })[0]
}

watch(() => dateStore.selectedDay, (newSelectedDay) => {
  centerWeekAroundDate(newSelectedDay)
}, { immediate: true })

onMounted(() => {
  slideWidth.value = daysWrapper.value.offsetWidth / 3
  gsap.set(daysWrapper.value, { x: -slideWidth.value })
  initializeDraggable()
})

watch(
  () => [panelStore.isOpen, panelStore.isOpening],
  ([isOpen, isOpening]) => {
    if (draggableInstance.value) {
      if (isOpen || isOpening) {
        draggableInstance.value.disable()
      } else {
        draggableInstance.value.enable()
      }
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.week-container {
  overflow: hidden;
  width: 100%;
}

.days-wrapper {
  display: flex;
  width: 300%;
  transform: translateX(-33.333%);
}

.week-slide {
  width: 33.333%;
}

.days {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  border-bottom: 1px dashed rgba(var(--colorBlack), 0.15);
  margin: 1.5rem 1.5rem 0;
  padding-bottom: 1rem;
}
</style>