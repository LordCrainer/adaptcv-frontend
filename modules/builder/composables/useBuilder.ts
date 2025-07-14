import { computed } from 'vue'
import { useBuilderStore } from '~/modules/builder/store/builder.store'

export function useBuilder() {
  const store = useBuilderStore()

  const builders = computed(() => store.builders)
  const builderState = computed(() => store.builderState)
  const pagination = computed(() => store.pagination)
  const loadingDetail = computed(() => store.loadingDetail)
  const loadingList = computed(() => store.loadingList)

  const loadBuilders = store.loadBuilders
  const getBuilderById = store.getBuilderById
  const createBuilder = store.createBuilder
  const updateBuilder = store.updateBuilder
  const deleteBuilder = store.deleteBuilder
  const duplicateBuilder = store.duplicateBuilder
  const updateSection = store.updateSection

  return {
    builders,
    builderState,
    pagination,
    loadingDetail,
    loadingList,
    loadBuilders,
    getBuilderById,
    createBuilder,
    updateBuilder,
    deleteBuilder,
    duplicateBuilder,
    updateSection
  }
}
