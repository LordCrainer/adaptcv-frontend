import type { Builder } from '@lordcrainer/adaptcv-shared-types'

export const builderService = () => {
  const { $api } = useNuxtApp()

  const getBuilderById = async (id: string) => {
    const { data } = await $api.get(`v1/builders/${id}`)

    return data
  }

  const getBuilders = async (): Promise<{
    data: Builder[]
    pagination: any
  }> => {
    const { data, pagination } = await $api.get('v1/builders')
    return { data, pagination }
  }

  const createBuilder = async (Builder: Builder) => {
    const { data } = await $api.post('v1/builders', Builder)
    return { data }
  }

  const deleteBuilder = async (id: string) => {
    const { data } = await $api.delete('v1/builders', { params: { id } })
    return { data }
  }

  return {
    getBuilders,
    getBuilderById,
    deleteBuilder,
    createBuilder
  }
}
