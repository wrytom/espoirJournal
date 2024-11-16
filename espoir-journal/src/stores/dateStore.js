import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDateStore = defineStore('dateStore', () => {
  const currentDate = ref(new Date())
  const selectedDay = ref(new Date())

  const day = computed(() => currentDate.value.getDate())
  const month = computed(() => currentDate.value.toLocaleString('default', { month: 'long' }))
  const year = computed(() => currentDate.value.getFullYear())
  const abbreviatedDay = computed(() =>
    currentDate.value.toLocaleString('default', { weekday: 'short' }),
  )

  const setDate = (newDate) => {
    currentDate.value = new Date(newDate)
  }

  const setSelectedDay = (newDate) => {
    selectedDay.value = new Date(newDate)
  }

  const isSelectedDay = (date) => {
    return (
      date.getDate() === selectedDay.value.getDate() &&
      date.getMonth() === selectedDay.value.getMonth() &&
      date.getFullYear() === selectedDay.value.getFullYear()
    )
  }

  const getStartOfMonth = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1)
    return start
  }

  const generateMonthDays = (startDate) => {
    const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate()
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = new Date(startDate)
      day.setDate(i + 1)
      return {
        date: day,
        shortName: day.toLocaleString('default', { weekday: 'short' }),
      }
    })
  }

  const currentMonthDays = computed(() => {
    const startOfMonth = getStartOfMonth(currentDate.value)
    return generateMonthDays(startOfMonth)
  })

  const previousMonthDays = computed(() => {
    const prevDate = new Date(currentDate.value)
    prevDate.setMonth(prevDate.getMonth() - 1)
    const startOfPreviousMonth = getStartOfMonth(prevDate)
    return generateMonthDays(startOfPreviousMonth)
  })

  const nextMonthDays = computed(() => {
    const nextDate = new Date(currentDate.value)
    nextDate.setMonth(nextDate.getMonth() + 1)
    const startOfNextMonth = getStartOfMonth(nextDate)
    return generateMonthDays(startOfNextMonth)
  })

  return {
    currentDate,
    selectedDay,
    day,
    month,
    year,
    abbreviatedDay,
    setDate,
    setSelectedDay,
    isSelectedDay,
    currentMonthDays,
    previousMonthDays,
    nextMonthDays,
  }
})