import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])

  const formatDate = (date) => {
    if (typeof date === 'string' && date.includes('GMT')) {
      date = new Date(date)
    }
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }
    return date 
  }

  const loadTasks = (selectedDate) => {
    try {
      const formattedDate = formatDate(selectedDate)
      console.log('Loading tasks for date:', formattedDate) 
      
      const journalData = JSON.parse(localStorage.getItem('espoirJournal')) || { tasks: [] }
      tasks.value = Object.values(journalData.tasks || {})
        .filter(task => task.date === formattedDate)
        .sort((a, b) => {
          return a.time.localeCompare(b.time)
        })
      
      console.log('Loaded tasks:', tasks.value) 
    } catch (error) {
      console.error('Error loading tasks:', error)
      tasks.value = []
    }
  }

  const createTask = (taskData) => {
    try {
      const journalData = JSON.parse(localStorage.getItem('espoirJournal')) || { tasks: {} }
      const taskId = `task_${Date.now()}`
      const newTask = {
        id: taskId,
        content: taskData.content,
        type: taskData.type || 'task',
        time: taskData.time,
        date: formatDate(taskData.date),
        completed: false
      }
      journalData.tasks = {
        ...journalData.tasks,
        [taskId]: newTask
      }
      localStorage.setItem('espoirJournal', JSON.stringify(journalData))
      loadTasks(taskData.date)
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const deleteTask = (taskId, date) => {
    try {
      const journalData = JSON.parse(localStorage.getItem('espoirJournal'))
      if (!journalData?.tasks) return
      const { [taskId]: deletedTask, ...remainingTasks } = journalData.tasks
      journalData.tasks = remainingTasks
      localStorage.setItem('espoirJournal', JSON.stringify(journalData))
      loadTasks(date)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const toggleTaskCompletion = (taskId, date) => {
    try {
      const journalData = JSON.parse(localStorage.getItem('espoirJournal'))
      if (!journalData?.tasks?.[taskId]) return
      journalData.tasks[taskId].completed = !journalData.tasks[taskId].completed
      localStorage.setItem('espoirJournal', JSON.stringify(journalData))
      loadTasks(date)
    } catch (error) {
      console.error('Error toggling task completion:', error)
    }
  }

  const initializeStore = () => {
    const today = formatDate(new Date())
    const now = new Date()
    const currentHour = now.getHours().toString().padStart(2, '0')
    const currentMinutes = now.getMinutes().toString().padStart(2, '0')
    const currentTime = `${currentHour}:${currentMinutes}`
  
    const sampleTasks = {
      tasks: {
        "task_1": {
          id: "task_1",
          content: "Drag down for a summary",
          type: "task",
          time: currentTime,
          date: today,
          completed: false
        },
        "task_2": {
          id: "task_2",
          content: "Swipe me left to complete",
          type: "task",
          time: currentTime,
          date: today,
          completed: false
        },
        "task_3": {
          id: "task_3",
          content: "Swipe me right to delete",
          type: "task",
          time: currentTime,
          date: today,
          completed: false
        }
      }
    }
  
    const journalData = JSON.parse(localStorage.getItem('espoirJournal')) || {}
    if (!journalData.tasks) {
      localStorage.setItem('espoirJournal', JSON.stringify(sampleTasks))
    }
  }

  return {
    tasks,
    loadTasks,
    createTask,
    deleteTask,
    toggleTaskCompletion,
    initializeStore
  }
})