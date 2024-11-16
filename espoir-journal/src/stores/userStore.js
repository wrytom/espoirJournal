import { defineStore } from 'pinia'
import { ref } from 'vue'
import Memoji1 from '../assets/images/memoji-1.png'
import Memoji2 from '../assets/images/memoji-2.png'
import Memoji3 from '../assets/images/memoji-3.png'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref({ name: 'User', avatar: 0 })

  const avatars = [Memoji1, Memoji2, Memoji3]

  const avatarBackgrounds = [
    '#FFB5E8', // Pastel pink
    '#B5EAEA', // Pastel blue
    '#E7FFAC'  // Pastel green
  ]

  const loadUserFromLocalStorage = () => {
    const espoirJournal = JSON.parse(localStorage.getItem('espoirJournal') || '{}')
    if (espoirJournal.user) {
      currentUser.value = espoirJournal.user
    }
  }

  const saveUserToLocalStorage = () => {
    const espoirJournal = JSON.parse(localStorage.getItem('espoirJournal') || '{}')
    espoirJournal.user = currentUser.value
    localStorage.setItem('espoirJournal', JSON.stringify(espoirJournal))
  }

  const updateUserProfile = (name, avatar) => {
    currentUser.value.name = name.trim()
    currentUser.value.avatar = avatar
    saveUserToLocalStorage()
  }

  return {
    currentUser,
    avatars,
    avatarBackgrounds,
    loadUserFromLocalStorage,
    updateUserProfile
  }
})
