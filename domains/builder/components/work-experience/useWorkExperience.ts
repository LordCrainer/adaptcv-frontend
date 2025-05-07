import { useCVStore } from '~/domains/builder/store/cv.store'
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
  const { updateSection, curriculumVitae } = useCVStore()

  const workExperiences = ref<IWorkExperience[]>([])

  watch(
    () => curriculumVitae.workExperience,
    (newValue) => {
      if (newValue) {
        workExperiences.value = newValue
      }
    },
    { immediate: true, deep: true }
  )

  const removeWorkExperience = (id: string) => {
    workExperiences.value = workExperiences.value.filter((exp) => exp.id !== id)
  }
  const addWorkExperience = (workExperience: IWorkExperience) => {
    workExperiences.value.push({ ...workExperience, id: Date.now().toString() })
    updateSection('workExperiences', workExperiences.value)
  }

  const updateWorkExperience = (
    id: string,
    workExperience: IWorkExperience
  ) => {
    const index = workExperiences.value.findIndex((exp) => exp.id === id)
    if (index !== -1) {
      workExperiences.value.splice(index, 1, workExperience)
    }
    updateSection('workExperiences', workExperiences.value)
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
