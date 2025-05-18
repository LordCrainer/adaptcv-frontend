import type {
  IBuilder,
  BuilderSections,
  Pagination
} from '@lordcrainer/adaptcv-shared-types'
import { defineStore } from 'pinia'
import { useBuilder } from '../composables/useBuilder'

export const useBuilderStore = defineStore('builders', () => {
  const { builderService } = useBuilder()
  const route = useRoute()

  const builders = ref<IBuilder[]>([])
  const builderState = ref<IBuilder>({
    status: 'draft',
    name: ''
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
      const { data: createdBuilder } = await builderService.create(data)
      if (!createdBuilder) {
        throw new Error('Error creating CV')
      }
      builders.value?.push(createdBuilder)
      return createdBuilder
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
      const mapper = (item: IBuilder[]) => item.map((i) => i.updatedAt)
      console.log('CVs loaded mapper:', mapper(builders.value), mapper(data))
    } catch (error) {
      console.error('Error loadingList CVs:', error)
      throw error
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
      throw error
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

  async function saveByBuilderId(builderId: string) {
    try {
      if (!builderState.value) {
        throw new Error('CV data is undefined or null')
      }
      await builderService.update(builderId, builderState.value)
      builderState.value = { status: 'draft', name: '' }
    } catch (error) {
      console.error('Error saving CV data to localStorage:', error)
      throw error
    }
  }

  async function deleteBuilder(id: string) {
    try {
      await builderService.delete(id)
      builders.value = (builders.value ?? []).filter(
        (builder) => builder._id !== id
      )
    } catch (error) {
      console.error('Error deleting CV:', error)
      throw error
    }
  }

  return {
    updateBuilderStatus,
    updateSection,
    create,
    getBuilder,
    deleteBuilder,
    loadBuilders,
    saveByBuilderId,
    builderState,
    builders,
    pagination,
    loadingDetail,
    loadingList
  }
})
