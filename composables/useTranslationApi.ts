import { ref } from 'vue'

export interface TranslationParams {
  text: string
  from: string
  to: string
}

const API_BASE = '/v1/translation'

export const useTranslationApi = () => {
  const api = useNuxtApp().$api
  const translatedText = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const translate = async (
    params: TranslationParams
  ): Promise<string | null> => {
    isLoading.value = true
    error.value = null
    translatedText.value = ''

    const { text, from, to } = params

    if (!text.trim() || !from || !to) {
      error.value = 'Missing required translation parameters.'
      isLoading.value = false
      return null
    }

    try {
      const { data } = await api.post(`${API_BASE}/`, params)

      if (!data) {
        throw new Error('Translation failed')
      }

      if (!data.translatedText || typeof data.translatedText !== 'string') {
        throw new Error('Invalid translation response format')
      }

      translatedText.value = data.translatedText
      return data.translatedText
    } catch (err: unknown) {
      error.value =
        err instanceof Error
          ? err.message
          : 'An unknown error occurred during translation.'
      console.error('Error during translation API call:', err)
      return null
    }
    } finally {
      isLoading.value = false
    }
  }

  return {
    translatedText,
    isLoading,
    error,
    translate
  }
}
