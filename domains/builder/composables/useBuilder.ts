import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'
import type { IBuilderService } from '../domain/builder-service.interface'
import { useBuilderStore } from '../store/builder.store'

export const useBuilder = (builderService: IBuilderService) => {
  const builderStore = useBuilderStore()

  async function loadBuilders() {
    builderStore.toogleLoadingList(true)
    try {
      const { data, pagination } = await builderService.getAll()
      if (!data) {
        throw new Error('CV data is undefined or null')
      }
      builderStore.builders = data
      builderStore.pagination = pagination
      builderStore.builderState = { name: '', status: 'draft' }
    } catch (error) {
      console.error('Error loadingList CVs:', error)
      throw error
    } finally {
      builderStore.toogleLoadingList(false)
    }
  }

  async function createBuilder(data: IBuilder) {
    builderStore.toogleLoadingDetail(true)
    try {
      if (!data) {
        throw new Error('CV data is undefined or null')
      }
      const { data: createdBuilder } = await builderService.create(data)
      if (!createdBuilder) {
        throw new Error('Error creating CV')
      }
      builderStore.addBuilder(createdBuilder)
      return createdBuilder
    } catch (error) {
      console.error('Error creating CV:', error)
      throw error
    } finally {
      builderStore.toogleLoadingDetail(false)
    }
  }

  async function updateBuilder(id: string, data: IBuilder) {
    builderStore.toogleLoadingDetail(true)
    try {
      if (!data) {
        throw new Error('CV data is undefined or null')
      }
      await builderService.update(id, data)
      return data
    } catch (error) {
      console.error('Error updating CV:', error)
      throw error
    } finally {
      builderStore.toogleLoadingDetail(false)
    }
  }

  async function deleteBuilder(id: string) {
    builderStore.toogleLoadingDetail(true)
    try {
      await builderService.delete(id)
    } catch (error) {
      console.error('Error deleting CV:', error)
      throw error
    } finally {
      builderStore.toogleLoadingDetail(false)
    }
  }

  return {
    createBuilder,
    updateBuilder,
    loadBuilders,
    deleteBuilder
  }
}
