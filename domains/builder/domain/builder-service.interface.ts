import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'

export interface IBuilderService {
  getById(id: string): Promise<{ data: IBuilder }>
  getAll(filters?: Record<string, any>): Promise<{
    data: IBuilder[]
    pagination: any
  }>
  update(id: string, builder: IBuilder): Promise<void>
  create(builder: IBuilder): Promise<{ data: IBuilder }>
  delete(id: string): Promise<void>
}
