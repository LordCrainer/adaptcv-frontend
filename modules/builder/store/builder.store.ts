import { ref } from 'vue'
import type {
  IBuilder,
  BuilderSections,
  Pagination
} from '@lordcrainer/adaptcv-shared-types'
import { defineStore } from 'pinia'

export const useBuilderStore = defineStore('builders', () => {
  const builders = ref<IBuilder[]>([])
  const builderState = ref<IBuilder>({
    status: 'draft',
    name: ''
  })
  const pagination = ref<Pagination>()
  const loadingDetail = ref(false)
  const loadingList = ref(false)

  function toogleLoadingDetail(value: boolean) {
    loadingDetail.value = value
  }
  function toogleLoadingList(value: boolean) {
    loadingList.value = value
  }

  async function addBuilder(data: IBuilder) {
    builders.value?.push(data)
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

  async function deleteBuilder(id: string) {
    try {
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
    addBuilder,
    deleteBuilder,
    toogleLoadingDetail,
    toogleLoadingList,
    builderState,
    builders,
    pagination,
    loadingDetail,
    loadingList
  }
})
