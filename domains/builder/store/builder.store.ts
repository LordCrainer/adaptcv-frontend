import type {
  IBuilder,
  BuilderSections
} from '@lordcrainer/adaptcv-shared-types'
import { defineStore } from 'pinia'
import { useBuilder } from '../composables/useBuilder'

export const useBuilderStore = defineStore(
  'builder',
  () => {
    const { builderService } = useBuilder()
    const builderState = ref<Partial<IBuilder>>({
      status: 'draft'
    })
    const loading = ref(false)

    async function creationBuilder(data: IBuilder) {
      try {
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        loading.value = true
        return await builderService.create(data)
      } catch (error) {
        console.error('Error creating CV:', error)
      } finally {
        loading.value = false
      }
    }

    async function loadBuilders() {
      try {
        loading.value = true
        const { data, pagination } = await builderService.getAll()
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        return {
          data: data,
          pagination
        }
      } catch (error) {
        console.error('Error loading CVs:', error)
      } finally {
        loading.value = false
      }
    }

    async function getBuilder(id: string) {
      try {
        loading.value = true
        const { data } = await builderService.getById(id)
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        builderState.value = data
        return { data }
      } catch (error) {
        console.error('Error loading CV:', error)
      } finally {
        loading.value = false
      }
    }

    function updateBuilderStatus(newStatus: IBuilder['status']) {
      builderState.value.status = newStatus
    }

    function updateSection<K extends BuilderSections>(
      section: K,
      data: IBuilder[K]
    ) {
      if (!section) {
        console.error(`Error: ${section} data is undefined or null`)
        return
      }
      if (builderState.value) {
        builderState.value[section] = data
      }
    }

    function saveAll(builderData: IBuilder) {
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
      getBuilder,
      loadBuilders,
      builderState
    }
  },
  {
    persist: true
  }
)
