import { useBuilderStore } from '~/domains/builder/store/builder.store'
import type { IWorkExperience } from '~/domains/builder/shared'

const DEFAULT_ITEM: IWorkExperience = {
  id: '',
  jobTitle: '',
  company: '',
  startDate: '',
  endDate: '',
  description: {} as DEContentData
}

const useWorkExperience = () => {
  const { updateSection, builderState } = useBuilderStore()

  const workExperiences = computed(() => builderState.workExperience || [])

  const removeWorkExperience = (id: string) => {
    const updated = workExperiences.value.filter((exp) => exp.id !== id)
    updateSection('workExperience', updated)
  }
  const addWorkExperience = (workExperience: IWorkExperience) => {
    const newWorkExperience = { ...workExperience, id: Date.now().toString() }
    updateSection('workExperience', [
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
      updateSection('workExperience', updated)
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
