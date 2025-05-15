import type { Builder, Sections } from '@lordcrainer/adaptcv-shared-types'
import { defineStore } from 'pinia'
const api = useApi()

export const useCVStore = defineStore(
  'cv',
  () => {
    const curriculumVitae = ref<Partial<Builder>>({
      status: 'draft'
    })

    async function creationCV(data: Builder) {
      try {
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        await api.post('/cv', data)
      } catch (error) {
        console.error('Error creating CV:', error)
      }
    }

    function updateStatus(newStatus: Builder['status']) {
      curriculumVitae.value.status = newStatus
    }

    function updateSection<K extends Sections>(section: K, data: Builder[K]) {
      if (!section) {
        console.error(`Error: ${section} data is undefined or null`)
        return
      }
      if (curriculumVitae.value) {
        curriculumVitae.value[section] = data
      }
    }

    function saveAll(cvData: Builder) {
      try {
        localStorage.setItem('cvData', JSON.stringify(cvData))
      } catch (error) {
        console.error('Error saving CV data to localStorage:', error)
      }
    }

    return {
      updateStatus,
      updateSection,
      creationCV,
      curriculumVitae
    }
  },
  {
    persist: true
  }
)
