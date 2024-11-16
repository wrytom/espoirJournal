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
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

// Stores
import { useDateStore } from '@/stores/dateStore'
import { usePanelStore } from '@/stores/panelStore'

// Components
import DateBox from '@/components/Singles/SinglesDateBox.vue'

gsap.registerPlugin(Draggable)

const dateStore = useDateStore()
const panelStore = usePanelStore()
const daysWrapper = ref(null)
const slideWidth = ref(0)
const draggableInstance = ref(null)
const displayBaseDate = ref(new Date())

const getWeekDates = (baseDate) => {
  const curr = new Date(baseDate)
  const week = []
  curr.setDate(curr.getDate() - curr.getDay())

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

const currentWeekDays = ref([])
const previousWeekDays = ref([])
const nextWeekDays = ref([])

const initializeWeeks = () => {
  currentWeekDays.value = getWeekDates(displayBaseDate.value)

  const prevDate = new Date(displayBaseDate.value)
  prevDate.setDate(prevDate.getDate() - 7)
  previousWeekDays.value = getWeekDates(prevDate)

  const nextDate = new Date(displayBaseDate.value)
  nextDate.setDate(nextDate.getDate() + 7)
  nextWeekDays.value = getWeekDates(nextDate)
}

const isToday = (date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const updateWeeks = (direction) => {
  if (direction === 'left') {
    const newBaseDate = new Date(displayBaseDate.value)
    newBaseDate.setDate(newBaseDate.getDate() - 7)
    displayBaseDate.value = newBaseDate

    nextWeekDays.value = [...currentWeekDays.value]
    currentWeekDays.value = [...previousWeekDays.value]
    previousWeekDays.value = getWeekDates(new Date(newBaseDate.setDate(newBaseDate.getDate() - 7)))
  } else if (direction === 'right') {
    const newBaseDate = new Date(displayBaseDate.value)
    newBaseDate.setDate(newBaseDate.getDate() + 7)
    displayBaseDate.value = newBaseDate

    previousWeekDays.value = [...currentWeekDays.value]
    currentWeekDays.value = [...nextWeekDays.value]
    nextWeekDays.value = getWeekDates(new Date(newBaseDate.setDate(newBaseDate.getDate() + 7)))
  }
}

const handleDateClick = (date) => {
  dateStore.setSelectedDay(date)
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
              updateWeeks('left')
              gsap.set(daysWrapper.value, { x: -slideWidth.value })
            },
          })
        } else {
          gsap.to(daysWrapper.value, {
            x: -slideWidth.value * 2,
            duration: 0.3,
            onComplete: () => {
              updateWeeks('right')
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

onMounted(() => {
  initializeWeeks()
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
  margin: 1.5rem;
  padding-bottom: 1rem;
}
</style>
