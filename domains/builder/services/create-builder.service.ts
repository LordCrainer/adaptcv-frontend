import type { IBuilderService } from '~/domains/builder/domain/builder-service.interface'
import type { AxiosInstance } from 'axios'
import type { IBuilder, Pagination } from '@lordcrainer/adaptcv-shared-types'

const API_BASE = '/v1/builders'

export const createBuilderService = (api: AxiosInstance): IBuilderService => {
  return {
    async getById(id: string) {
      const { data } = await api.get(`${API_BASE}/${id}`)
      if (!data) {
        throw new Error('Error loading builder')
      }
      return { data }
    },

    async getAll() {
      const result = await api.get(`${API_BASE}`)
      if (!result.data) {
        throw new Error('Error loading builders')
      }
      return {
        data: result.data,
        pagination: (result as any)?.pagination
      }
    },

    async update(id: string, builder: IBuilder) {
      const { data } = await api.put(`${API_BASE}/${id}`, builder)
      if (!data) {
        throw new Error('Error updating builder')
      }
    },

    async delete(id: string) {
      const { data } = await api.delete(`${API_BASE}/${id}`)
      if (!data) {
        throw new Error('Error deleting builder')
      }
    },

    async create(builder: IBuilder) {
      const { data } = await api.post(`${API_BASE}`, builder)
      if (!data) {
        throw new Error('Error creating builder')
      }
      return { data }
    }
  }
}
