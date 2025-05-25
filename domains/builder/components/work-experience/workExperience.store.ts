import type { IWorkExperience } from '@lordcrainer/adaptcv-shared-types'

export const useWorkExperienceStore = defineStore(
  'workExperience',
  () => {
    const workExperience = ref<IWorkExperience[]>([])

    function addWorkExperience(exp: IWorkExperience) {
      workExperience.value.push(exp)
    }

    function removeWorkExperience(id: string) {
      workExperience.value = workExperience.value.filter((exp) => exp.id !== id)
    }

    function updateWorkExperience(id: string, updatedExp: IWorkExperience) {
      const index = workExperience.value.findIndex((exp) => exp.id === id)
      if (index !== -1) {
        workExperience.value[index] = updatedExp
      }
    }

    return {
      workExperience,
      addWorkExperience,
      removeWorkExperience,
      updateWorkExperience
    }
  },
  { persist: true }
)
