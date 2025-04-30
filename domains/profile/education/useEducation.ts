import type { IEducationItem } from '~/domains/profile/shared/index'

const useEducation = () => {
  const education = ref<IEducationItem[]>([])

  const addEducation = (educationItem: IEducationItem) => {
    education.value.push({ ...educationItem, id: Date.now().toString() })
  }

  const removeEducation = (id: string) => {
    education.value = education.value.filter((item) => item.id !== id)
  }

  const updateEducation = (updatedItem: IEducationItem) => {
    const index = education.value.findIndex(
      (item) => item.id === updatedItem.id
    )
    if (index !== -1) {
      education.value.splice(index, 1, updatedItem)
    }
  }

  const findEducation = (id: string): IEducationItem | undefined => {
    return education.value.find((item) => item.id === id)
  }

  const clearEducation = () => {
    education.value = []
  }

  const getEducation = () => {
    return education.value
  }

  return {
    education,
    findEducation,
    addEducation,
    removeEducation,
    updateEducation,
    clearEducation,
    getEducation
  }
}

export default useEducation
