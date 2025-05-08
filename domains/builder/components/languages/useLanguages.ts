import { useCVStore } from '~/domains/builder/store/cv.store'
import { ref } from 'vue'
import type { ILanguageItem } from '~/domains/builder/shared'

const MAX_LANGUAGES = 5

const DEFAULT_LANGUAGE_ITEM: ILanguageItem = {
  name: undefined,
  proficiency: 'beginner'
}

const LANGUAGES_LIST = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese',
  'Russian',
  'Arabic'
].sort()

const PROFICIENCY_LEVELS = ['beginner', 'intermediate', 'advanced', 'native']

export const useLanguages = () => {
  const { updateSection, curriculumVitae } = useCVStore()
  const languages = ref<ILanguageItem[]>([])

  

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
    PROFICIENCY_LEVELS,
    DEFAULT_LANGUAGE_ITEM,
    LANGUAGES_LIST
  }
}
