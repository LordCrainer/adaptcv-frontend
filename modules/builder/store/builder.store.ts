import { ref } from 'vue'
import type {
  IBuilder,
  BuilderSections,
  Pagination
} from '@lordcrainer/adaptcv-shared-types'
import { defineStore } from 'pinia'
import { builderHttpService } from '../services/builder-http.service'
import { useApi } from '~/composables/useApi'

export const useBuilderStore = defineStore('builders', () => {
  const builders = ref<IBuilder[]>([])
  const builderState = ref<IBuilder>({
    status: 'draft',
    name: ''
  })
  const pagination = ref<Pagination>()
  const loadingDetail = ref(false)
  const loadingList = ref(false)

  let builderServiceInstance: builderHttpService | null = null
  function getBuilderService() {
    if (!builderServiceInstance) {
      builderServiceInstance = new builderHttpService(useApi())
    }
    return builderServiceInstance
  }

  function toogleLoadingDetail(value: boolean) {
    loadingDetail.value = value
  }
  function toogleLoadingList(value: boolean) {
    loadingList.value = value
  }

  async function addBuilder(data: IBuilder) {
    builders.value?.push(data)
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

  // Nuevas acciones que delegan en el servicio
  async function loadBuilders() {
    toogleLoadingList(true)
    try {
      const { data, pagination: pag } = await getBuilderService().getAll()
      builders.value = data
      pagination.value = pag
      builderState.value = { name: '', status: 'draft' }
    } catch (error) {
      console.error('Error loading builders:', error)
      throw error
    } finally {
      toogleLoadingList(false)
    }
  }

  async function getBuilderById(id: string) {
    toogleLoadingDetail(true)
    try {
      const { data } = await getBuilderService().getById(id)
      builderState.value = data
      return data
    } catch (error) {
      console.error('Error loading builder by ID:', error)
      throw error
    } finally {
      toogleLoadingDetail(false)
    }
  }

  async function createBuilder(data: IBuilder) {
    toogleLoadingDetail(true)
    try {
      const { data: created } = await getBuilderService().create(data)
      builders.value.push(created)
      return created
    } catch (error) {
      console.error('Error creating builder:', error)
      throw error
    } finally {
      toogleLoadingDetail(false)
    }
  }

  async function updateBuilder(id: string, data: Partial<IBuilder>) {
    toogleLoadingDetail(true)
    try {
      await getBuilderService().update(id, data)
      builderState.value = { ...builderState.value, ...data }
      return data
    } catch (error) {
      console.error('Error updating builder:', error)
      throw error
    } finally {
      toogleLoadingDetail(false)
    }
  }

  async function deleteBuilder(id: string) {
    toogleLoadingDetail(true)
    try {
      await getBuilderService().delete(id)
      builders.value = builders.value.filter((b) => b._id !== id)
    } catch (error) {
      console.error('Error deleting builder:', error)
      throw error
    } finally {
      toogleLoadingDetail(false)
    }
  }

  async function duplicateBuilder(builderId: string) {
    toogleLoadingDetail(true)
    try {
      const { data: created } = await getBuilderService().duplicate(builderId)
      builders.value.push(created)
      return created
    } catch (error) {
      console.error('Error duplicating builder:', error)
      throw error
    } finally {
      toogleLoadingDetail(false)
    }
  }

  async function updateBuilderStatus(newStatus: IBuilder['status']) {
    if (!builderState.value._id) {
      throw new Error('Builder ID is required to update status')
    }
    await getBuilderService().update(builderState.value._id, {
      status: newStatus
    })
    builderState.value.status = newStatus
  }

  return {
    updateBuilderStatus,
    updateSection,
    addBuilder,
    deleteBuilder,
    toogleLoadingDetail,
    toogleLoadingList,
    builderState,
    builders,
    pagination,
    loadingDetail,
    loadingList,
    loadBuilders,
    getBuilderById,
    createBuilder,
    updateBuilder,
    duplicateBuilder
  }
})
