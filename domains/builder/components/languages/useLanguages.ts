import { useCVStore } from '~/domains/builder/store/cv.store'
import { ref } from 'vue'
import type { ILanguageItem } from '~/domains/builder/shared'

const MAX_LANGUAGES = 5

export const useLanguages = () => {
  const { updateSection, curriculumVitae } = useCVStore()
  const languages = ref<ILanguageItem[]>([])

  const proficiencyLevels = ['beginner', 'intermediate', 'advanced', 'native']

  const upsertLanguage = (lang: ILanguageItem) => {
    if (languages.value.length >= MAX_LANGUAGES) {
      return
    }

    const index = languages.value.findIndex((item) => item.name === lang.name)
    if (index !== -1) {
      languages.value.splice(index, 1, lang)
    } else {
      languages.value.push(lang)
    }
    updateSection('languages', languages.value)
  }

  const setLanguages = (data: ILanguageItem[]) => {
    languages.value = data
  }

  const removeLanguage = (index: number) => {
    languages.value.splice(index, 1)
    updateSection('languages', languages.value)
  }

  onMounted(() => {
    if (curriculumVitae.languages) {
      setLanguages(curriculumVitae.languages)
    }
  })

  return {
    languages,
    upsertLanguage,
    removeLanguage,
    proficiencyLevels
  }
}
