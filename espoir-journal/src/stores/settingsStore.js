import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('objectSettings', () => {

  const espoirJournal = JSON.parse(localStorage.getItem('espoirJournal')) || {}
  const morning = ref(espoirJournal.settings?.morning || '09:00')
  const evening = ref(espoirJournal.settings?.evening || '21:00')


  function updateSettings(newMorning, newEvening) {
    morning.value = newMorning
    evening.value = newEvening
    
    const espoirJournal = JSON.parse(localStorage.getItem('espoirJournal')) || {}
    espoirJournal.settings = { 
      morning: newMorning, 
      evening: newEvening 
    }
    localStorage.setItem('espoirJournal', JSON.stringify(espoirJournal))
  }

  return {
    morning,
    evening,
    updateSettings
  }
})