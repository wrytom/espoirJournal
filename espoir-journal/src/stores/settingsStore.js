import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('objectSettings', () => {
  const espoirJournal = JSON.parse(localStorage.getItem('espoirJournal')) || {}
  const settingsOn = ref(espoirJournal.settings?.settingsOn  ?? true)
  const morning = ref(espoirJournal.settings?.morning || '09:00')
  const evening = ref(espoirJournal.settings?.evening || '21:00')

  function updateSettings(newMorning, newEvening, newSettingsOn) {
    morning.value = newMorning
    evening.value = newEvening
    settingsOn.value = newSettingsOn

    const espoirJournal = JSON.parse(localStorage.getItem('espoirJournal')) || {}
    espoirJournal.settings = {
      morning: newMorning,
      evening: newEvening,
      settingsOn: newSettingsOn,
    }
    localStorage.setItem('espoirJournal', JSON.stringify(espoirJournal))
  }

  return {
    settingsOn,
    morning,
    evening,
    updateSettings,
  }
})
