import type { IBuilderService } from '~/modules/builder/domain/builder-service.interface'
import type { AxiosInstance } from 'axios'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'

export class builderHttpService implements IBuilderService {
  API_BASE: string = '/v1/builders'
  constructor(private api: AxiosInstance) {}
  async getById(id: string) {
    const { data } = await this.api.get(`${this.API_BASE}/${id}`)
    if (!data) {
      throw new Error('Error loading builder')
    }
    return { data }
  }

  async getAll() {
    const result = await this.api.get(`${this.API_BASE}`)
    if (!result.data) {
      throw new Error('Error loading builders')
    }
    return {
      data: result.data,
      pagination: (result as any)?.pagination
    }
  }

  async update(id: string, builder: Partial<IBuilder>) {
    const { data } = await this.api.put(`${this.API_BASE}/${id}`, builder)
    if (!data) {
      throw new Error('Error updating builder')
    }
  }

  async delete(id: string) {
    const { data } = await this.api.delete(`${this.API_BASE}/${id}`)
    if (!data) {
      throw new Error('Error deleting builder')
    }
  }

  async create(builder: IBuilder) {
    const { data } = await this.api.post(`${this.API_BASE}`, builder)
    if (!data) {
      throw new Error('Error creating builder')
    }
    return { data }
  }
}
