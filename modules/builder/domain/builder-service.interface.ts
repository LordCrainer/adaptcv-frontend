import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'

export interface IBuilderService {
  getById(id: string): Promise<ServiceResponseData<IBuilder>>
  getAll(filters?: Record<string, any>): Promise<ServiceResponse<IBuilder[]>>
  update(id: string, builder: Partial<IBuilder>): Promise<void>
  create(builder: IBuilder): Promise<ServiceResponseData<IBuilder>>
  delete(id: string): Promise<void>
}
