import type { ICV, Sections } from '@lordcrainer/adaptcv-shared-types'
import { defineStore } from 'pinia'
const api = useApi()

export const useCVStore = defineStore(
  'cv',
  () => {
    const curriculumVitae = ref<Partial<ICV>>({
      status: 'draft'
    })

    async function creationCV(data: ICV) {
      try {
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        await api.post('/cv', data)
      } catch (error) {
        console.error('Error creating CV:', error)
      }
    }

    function updateStatus(newStatus: ICV['status']) {
      curriculumVitae.value.status = newStatus
    }

    function updateSection<K extends Sections>(section: K, data: ICV[K]) {
      if (!section) {
        console.error(`Error: ${section} data is undefined or null`)
        return
      }
      if (curriculumVitae.value) {
        curriculumVitae.value[section] = data
      }
    }

    function saveAll(cvData: ICV) {
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
