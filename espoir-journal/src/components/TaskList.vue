<template>
  <div class="tasks">
    
    <Task
      v-for="task in paginatedTasks"
      :key="task.id"
      :type="task.type"
      :task="task.content"
      :time="task.time"
      :completed="task.completed"
      @delete="deleteTask(task.id)"
      @toggle="toggleTaskCompletion(task.id)"
    />
    <Task v-if="isCurrentDate && settingsStore.settingsOn" type="night" task="Wind down" :time="settingsStore.evening" />
    <div v-if="tasks.length === 0" class="empty-state">
      <img src="../assets/images/yeti.png" class="yeti" />
      <div class="empty-state-text">
        <p>No tasks for this day</p>
        <p class="add-new">Add a new one</p>
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
    <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">
      <span class="icon">&#8592;</span>
    </button>
   
    <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">
      <span class="icon">&#8594;</span>
    </button>
  </div>

  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref } from 'vue'

// Stores
import { useTaskStore } from '@/stores/taskStore'
import { useDateStore } from '@/stores/dateStore'
import { useSettingsStore } from '@/stores/settingsStore'

// Components
import Task from '@/components/Singles/SinglesTask.vue'

const taskStore = useTaskStore()
const dateStore = useDateStore()
const settingsStore = useSettingsStore()

const tasks = computed(() => taskStore.tasks)

const isCurrentDate = computed(() => {
  const current = dateStore.currentDate
  const selected = dateStore.selectedDay

  return (
    current.getFullYear() === selected.getFullYear() &&
    current.getMonth() === selected.getMonth() &&
    current.getDate() === selected.getDate()
  )
})

const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => {
    if (a.type === 'morning' && b.type !== 'morning') return -1
    if (b.type === 'morning' && a.type !== 'morning') return 1
    if (a.type === 'night' && b.type !== 'night') return 1
    if (b.type === 'night' && a.type !== 'night') return -1
    return a.time.localeCompare(b.time)
  })
})

const deleteTask = (taskId) => {
  taskStore.deleteTask(taskId, dateStore.selectedDay)
}

const toggleTaskCompletion = (taskId) => {
  taskStore.toggleTaskCompletion(taskId, dateStore.selectedDay)
}

onMounted(() => {
  taskStore.loadTasks(dateStore.selectedDay)
})

const currentPage = ref(1)
const tasksPerPage = 5

const totalPages = computed(() => Math.ceil(tasks.value.length / tasksPerPage))

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * tasksPerPage
  const end = start + tasksPerPage
  return tasks.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

watch(
  () => dateStore.selectedDay,
  (newDate) => {
    taskStore.loadTasks(newDate)
  },
)
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  padding: 0 1.5rem;
  gap: 0.5rem;
}

.pagination-btn {
  background-color: rgba(var(--colorLightGrey), 1);
  color: rgba(var(--colorBlack), 0.6);
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 55rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.icon {
  font-size: 1.2rem;
}

.pagination-list {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}


.pagination-item:hover {
  background-color: var(--colorSecondaryDark);
}
</style>

<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  height: 55vh;  
  overflow-x: hidden;
  z-index: 5;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.empty-state {
  text-align: center;
  color: rgba(var(--colorBlack), 0.4);
  font-family: 'Onest-Medium';
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: fadeIn 1s ease;
}

.yeti {
  height: 6rem;
  width: 3.9rem;
}

.empty-state-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
}

.add-new {
  display: flex;
  align-items: center;
}
</style>
