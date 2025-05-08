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
  const languages = computed(() => curriculumVitae.languages || [])

  const addLanguage = (lang: ILanguageItem) => {
    if (languages.value.length >= MAX_LANGUAGES) {
      return
    }
    const updated = [...languages.value, lang]
    updateSection('languages', updated)
  }

  const updateLanguage = (index: number, lang: ILanguageItem) => {
    const updated = languages.value.map((item, i) =>
      i === index ? lang : item
    )
    updateSection('languages', updated)
  }

  const findIndexByLanguage = (language: string) => {
    return languages.value.findIndex((item) => item.name === language)
  }

  const upsertLanguage = (lang: ILanguageItem) => {
    if (!lang.name) {
      return
    }

    const index = findIndexByLanguage(lang.name)
    if (index !== -1) {
      updateLanguage(index, lang)
    } else {
      addLanguage(lang)
    }
  }

  const removeLanguage = (index: number) => {
    languages.value.splice(index, 1)
    updateSection('languages', languages.value)
  }

  return {
    languages,
    upsertLanguage,
    removeLanguage,
    PROFICIENCY_LEVELS,
    DEFAULT_LANGUAGE_ITEM,
    LANGUAGES_LIST
  }
}
