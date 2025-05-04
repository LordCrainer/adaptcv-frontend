import { ref } from 'vue'
import type { ILanguageItem } from '~/domains/builder/shared'

const MAX_LANGUAGES = 5

export const useLanguages = () => {
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
  }

  const removeLanguage = (index: number) => {
    languages.value.splice(index, 1)
  }

  return {
    languages,
    upsertLanguage,
    removeLanguage,
    proficiencyLevels
  }
}
