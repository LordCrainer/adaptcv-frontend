import type { IWorkExperience } from '~/domains/profile'

const useWorkExperience = () => {
  const workExperiences = ref<IWorkExperience[]>([])

  const removeWorkExperience = (id: string) => {
    workExperiences.value = workExperiences.value.filter((exp) => exp.id !== id)
  }
  const addWorkExperience = (workExperience: IWorkExperience) => {
    workExperiences.value.push({ ...workExperience, id: Date.now().toString() })
  }
  const updateWorkExperience = (
    id: string,
    workExperience: IWorkExperience
  ) => {
    const index = workExperiences.value.findIndex((exp) => exp.id === id)
    if (index !== -1) {
      workExperiences.value.splice(index, 1, workExperience)
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
    workExperiences
  }
}

export default useWorkExperience
