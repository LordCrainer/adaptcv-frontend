import type { Builder, Sections } from '@lordcrainer/adaptcv-shared-types'
import { defineStore } from 'pinia'
const api = useApi()

export const useBuilderStore = defineStore(
  'builder',
  () => {
    const builderState = ref<Partial<Builder>>({
      status: 'draft'
    })

    async function creationBuilder(data: Builder) {
      try {
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        await api.post('/builder', data)
      } catch (error) {
        console.error('Error creating CV:', error)
      }
    }

    function updateBuilderStatus(newStatus: Builder['status']) {
      builderState.value.status = newStatus
    }

    function updateSection<K extends Sections>(section: K, data: Builder[K]) {
      if (!section) {
        console.error(`Error: ${section} data is undefined or null`)
        return
      }
      if (builderState.value) {
        builderState.value[section] = data
      }
    }

    function saveAll(builderData: Builder) {
      try {
        localStorage.setItem('builderData', JSON.stringify(builderData))
      } catch (error) {
        console.error('Error saving CV data to localStorage:', error)
      }
    }

    return {
      updateBuilderStatus,
      updateSection,
      creationBuilder,
      builderState
    }
  },
  {
    persist: true
  }
)
