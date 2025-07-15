import { useBuilder } from '~/modules/builder/composables/useBuilder'
import { computed } from 'vue'
import type { ILanguageItem } from '@lordcrainer/adaptcv-shared-types'

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
  const { builderState, updateSection } = useBuilder()
  const languages = computed(() => builderState.value.languages || [])

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
    const updated = languages.value.filter((_, i) => i !== index)
    updateSection('languages', updated)
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
