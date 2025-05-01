import type { ICV } from '../shared'

const { $api } = useNuxtApp()

export const cvService = async () => {
  const getCV = async () => {
    const { data } = await $api.get('cv')
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  const createCV = async (cv: ICV) => {
    const { data } = await $api.post('cv', cv)
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  const upsertCV = async (cv: ICV) => {
    const { data } = await $api.put('cv', cv)
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  const deleteCV = async (id: string) => {
    const { data } = await $api.delete('cv', { params: { id } })
    return data
  }

  return {
    getCV,
    deleteCV
  }
}
