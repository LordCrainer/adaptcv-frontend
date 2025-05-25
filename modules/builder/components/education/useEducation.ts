import type { IEducationItem } from '@lordcrainer/adaptcv-shared-types'
import { useBuilderStore } from '~/modules/builder/store/builder.store'
// import type { IEducationItem } from '@lordcrainer/adaptcv-shared-types/index'

const DEFAULT_ITEM: IEducationItem = {
  id: '',
  degree: undefined,
  institution: '',
  startDate: '',
  endDate: '',
  fieldOfStudy: ''
}

const useEducation = () => {
  const builderStore = useBuilderStore()
  const education = computed(() => builderStore.builderState.education || [])

  const addEducation = (educationItem: IEducationItem) => {
    const newEducationItem = { ...educationItem, id: Date.now().toString() }
    builderStore.updateSection('education', [
      ...education.value,
      newEducationItem
    ])
  }

  const removeEducation = (id: string) => {
    const updated = education.value.filter((item) => item.id !== id)
    builderStore.updateSection('education', updated)
  }

  const updateEducation = (id: string, updatedItem: IEducationItem) => {
    const index = education.value.findIndex(
      (item) => item.id === updatedItem.id
    )
    if (index !== -1) {
      const updated = education.value.map((edu) =>
        edu.id === id ? updatedItem : edu
      )
      builderStore.updateSection('education', updated)
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
