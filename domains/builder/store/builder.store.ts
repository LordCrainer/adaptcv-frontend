import type {
  IBuilder,
  BuilderSections,
  Pagination
} from '@lordcrainer/adaptcv-shared-types'
import { defineStore } from 'pinia'
import { useBuilder } from '../composables/useBuilder'

export const useBuilderStore = defineStore(
  'builder',
  () => {
    const { builderService } = useBuilder()

    const builders = ref<IBuilder[]>()
    const builderState = ref<Partial<IBuilder>>({
      status: 'draft'
    })
    const pagination = ref<Pagination>()

    const loadingDetail = ref(false)
    const loadingList = ref(false)

    async function create(data: IBuilder) {
      loadingDetail.value = true
      try {
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        return await builderService.create(data)
      } catch (error) {
        console.error('Error creating CV:', error)
        throw error
      } finally {
        loadingDetail.value = false
      }
    }

    async function loadBuilders() {
      try {
        loadingList.value = true
        const { data, pagination: pag } = await builderService.getAll()
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        builders.value = data
        pagination.value = pag
      } catch (error) {
        console.error('Error loadingList CVs:', error)
      } finally {
        loadingList.value = false
      }
    }

    async function getBuilder(id: string) {
      try {
        loadingDetail.value = true
        const { data } = await builderService.getById(id)
        if (!data) {
          throw new Error('CV data is undefined or null')
        }
        builderState.value = data
        return { data }
      } catch (error) {
        console.error('Error loadingDetail CV:', error)
      } finally {
        loadingDetail.value = false
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
      create,
      getBuilder,
      loadBuilders,
      builderState,
      builders,
      pagination,
      loadingDetail,
      loadingList
    }
  },
  {
    persist: true
  }
)
