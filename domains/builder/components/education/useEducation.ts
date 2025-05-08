import type { IEducationItem } from '@lordcrainer/adaptcv-shared-types'
import { useCVStore } from '~/domains/builder/store/cv.store'
// import type { IEducationItem } from '~/domains/builder/shared/index'

const DEFAULT_ITEM: IEducationItem = {
  id: '',
  degree: undefined,
  institution: '',
  startDate: '',
  endDate: '',
  fieldOfStudy: ''
}

const useEducation = () => {
  const { updateSection, curriculumVitae } = useCVStore()
  const education = computed(() => curriculumVitae.education || [])

  const addEducation = (educationItem: IEducationItem) => {
    const newEducationItem = { ...educationItem, id: Date.now().toString() }
    updateSection('education', [...education.value, newEducationItem])
  }

  const removeEducation = (id: string) => {
    const updated = education.value.filter((item) => item.id !== id)
    updateSection('education', updated)
  }

  const updateEducation = (id: string, updatedItem: IEducationItem) => {
    const index = education.value.findIndex(
      (item) => item.id === updatedItem.id
    )
    if (index !== -1) {
      const updated = education.value.map((edu) =>
        edu.id === id ? updatedItem : edu
      )
      updateSection('education', updated)
    }
  }

  const findEducation = (id: string): IEducationItem | undefined => {
    return education.value.find((item) => item.id === id)
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
    getEducation,
    DEFAULT_ITEM
  }
}

export default useEducation
