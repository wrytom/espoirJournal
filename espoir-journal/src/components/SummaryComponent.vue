<template>
  <section class="summary">
    <p class="greeting">
      {{ getTimeOfDay() }},
      <span
        class="avatar-container"
        :style="{ backgroundColor: userStore.avatarBackgrounds[currentUser.avatar] }"
      >
        <img :src="userStore.avatars[currentUser.avatar]" class="avatar-image" />
      </span>
      <span ref="userRef" class="user">{{ currentUser.name }}.</span>
    </p>

    <p>
      You have
      <span class="tasks row">
        <StarIcon color="white" class="mt-5" />
        <span class="count-wrapper" ref="starredRef">{{ starredCount }}</span>
        {{ starredCount === 1 ? 'starred task' : 'starred tasks' }},
      </span>
      <br />
      <span class="tasks">
        <TaskIcon color="white" class="mt-5" />
        <span class="count-wrapper" ref="taskRef">{{ taskCount }}</span>
        {{ taskCount === 1 ? 'task' : 'tasks' }}
      </span>
      and
      <span class="tasks">
        <PartyIcon color="white" class="mt-5" />
        <span class="count-wrapper" ref="funRef">{{ funCount }}</span>
        {{ funCount === 1 ? 'fun activity' : 'fun activities' }}.
      </span>
    </p>
    <p class="task-summary" v-html="getTaskSummary()"></p>
    <p class="last">
      <span
        ><SunIcon color="yellow" fill="yellow" width="20px" height="20px" />  {{ morningTime }}</span
      >
      <span
        ><MoonIcon color="rgb(164, 81, 241)" fill="rgb(164, 81, 241)" width="18px" height="18px" />
        {{ eveningTime }}</span
      >
    </p>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { gsap } from 'gsap'

// Stores
import { useTaskStore } from '@/stores/taskStore'
import { useUserStore } from '@/stores/userStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { usePanelStore } from '@/stores/panelStore'

// Icons
import TaskIcon from '@/assets/icons/TaskIcon.vue'
import StarIcon from '@/assets/icons/StarIcon.vue'
import PartyIcon from '@/assets/icons/PartyIcon.vue'
import SunIcon from '@/assets/icons/SunIcon.vue'
import MoonIcon from '@/assets/icons/MoonIcon.vue'

const taskStore = useTaskStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const panelStore = usePanelStore()

const currentTasks = computed(() => taskStore.tasks)
const currentUser = computed(() => userStore.currentUser)
const morningTime = computed(() => settingsStore.morning)
const eveningTime = computed(() => settingsStore.evening)
const isOpen = computed(() => panelStore.isOpen)

const starredCount = ref(0)
const taskCount = ref(0)
const funCount = ref(0)

const starredRef = ref(null)
const taskRef = ref(null)
const funRef = ref(null)

const updateCounts = () => {
  starredCount.value = currentTasks.value.filter((task) => task.type === 'starred').length
  taskCount.value = currentTasks.value.filter((task) => task.type === 'task').length
  funCount.value = currentTasks.value.filter((task) => task.type === 'fun').length
}

taskStore.initializeStore()

const animateCounts = () => {
  ;[starredRef.value, taskRef.value, funRef.value].forEach((el) => {
    gsap.set(el, {
      y: -20,
      opacity: 0,
      position: 'relative',
      display: 'inline-block',
    })

    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.25,
      ease: 'power2.out',
      clearProps: 'position,display',
    })
  })
}

watch([starredCount, taskCount, funCount], () => {
  if (isOpen.value) {
    animateCounts()
  }
})

watch(isOpen, (newVal) => {
  if (newVal) {
    animateCounts()
  } else {
    ;[starredRef.value, taskRef.value, funRef.value].forEach((el) => {
      gsap.set(el, { opacity: 0 })
    })
  }
})

watch(currentTasks, () => {
  updateCounts()
})

const getTimeOfDay = () => {
  const currentHour = new Date().getHours()
  return currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'
}

const getTaskSummary = () => {
  const totalTasks = taskCount.value + starredCount.value
  if (totalTasks >= 2) {
    const { earliestTaskTime, latestTaskTime } = currentTasks.value.reduce(
      (times, task) => {
        if (task.time < times.earliestTaskTime) times.earliestTaskTime = task.time
        if (task.time > times.latestTaskTime) times.latestTaskTime = task.time
        return times
      },
      { earliestTaskTime: '23:59', latestTaskTime: '00:00' },
    )

    return `You are <span class="white">really busy</span> between ${earliestTaskTime} and ${latestTaskTime}.`
  } else {
    return `You are <span class="white">mostly free</span> today.`
  }
}
</script>

<style scoped>
.summary {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.5rem;
  position: relative;
}

.summary p {
  color: rgb(var(--colorWhite), 0.5);
  font-size: 1.5rem;
  font-family: 'Onest-SemiBold';
  font-weight: 500;
  position: relative;
}

.greeting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.user,
.tasks {
  color: rgb(var(--colorWhite), 1);
}

.count-wrapper {
  margin-left: 0.5rem;
  opacity: 0;
}

.tasks {
  color: rgb(var(--colorWhite), 1);
}

.gap {
  margin-left: 0.5rem;
  position: relative;
}

.task-summary {
  font-size: 1.5rem !important;
}

.task-summary .white {
  color: rgb(var(--colorWhite), 1) !important;
}

.last {
  font-size: 1.25rem !important;
  color: rgb(var(--colorWhite), 1) !important;
  align-items: center;
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.last span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar-container {
  width: 2.5rem;
  height: 2.5rem;
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
