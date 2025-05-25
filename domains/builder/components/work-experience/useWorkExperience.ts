import { useBuilderStore } from '~/domains/builder/store/builder.store'
import type { IWorkExperience } from '@lordcrainer/adaptcv-shared-types'

const DEFAULT_ITEM: IWorkExperience = {
  id: '',
  jobTitle: '',
  company: '',
  startDate: '',
  endDate: '',
  description: {} as DEContentData
}

const useWorkExperience = () => {
  const builderStore = useBuilderStore()

  const workExperiences = computed(
    () => builderStore.builderState.workExperience || []
  )

  const removeWorkExperience = (id: string) => {
    const updated = workExperiences.value.filter((exp) => exp.id !== id)
    builderStore.updateSection('workExperience', updated)
  }
  const addWorkExperience = (workExperience: IWorkExperience) => {
    const newWorkExperience = { ...workExperience, id: Date.now().toString() }
    builderStore.updateSection('workExperience', [
      ...workExperiences.value,
      newWorkExperience
    ])
  }

  const updateWorkExperience = (
    id: string,
    workExperience: IWorkExperience
  ) => {
    const index = workExperiences.value.findIndex((exp) => exp.id === id)
    if (index !== -1) {
      const updated = workExperiences.value.map((exp) =>
        exp.id === id ? workExperience : exp
      )
      builderStore.updateSection('workExperience', updated)
    }
  }

  const findWorkExperience = (id: string): IWorkExperience | undefined => {
    return workExperiences.value.find((exp) => exp.id === id)
  }

  return {
    removeWorkExperience,
    addWorkExperience,
    updateWorkExperience,
    findWorkExperience,
    workExperiences,
    DEFAULT_ITEM
  }
}

export default useWorkExperience
