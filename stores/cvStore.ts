import { defineStore } from 'pinia'
import type { ICV } from '~/features/profile'

export const useCvStore = defineStore('cv', () => {
  const cvData = ref<ICV>()

  function updateCVData(cv: ICV) {
    cvData.value = cv
  }

  return { cvData, updateCVData }
})
