import { ref } from 'vue'

export interface TranslationParams {
  texts?: string | string[]
  from: string
  to: string
}

interface TranslationResponse {
  translatedText: string
  isJson?: boolean
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

    const { texts, from, to } = params

    if (!texts || !from || !to) {
      error.value = 'Missing required translation parameters.'
      isLoading.value = false
      return null
    }

    try {
      const { data } = (await api.post(`${API_BASE}/`, params)) as {
        data: TranslationResponse
      }

      if (!data) {
        throw new Error('Translation failed')
      }

      if (!data.translatedText) {
        throw new Error('Invalid translation response format')
      }
      console.log('Translation response:', data.translatedText, JSON.parse(data.translatedText))
      translatedText.value = data.translatedText
      return data.translatedText
    } catch (err: unknown) {
      error.value =
        err instanceof Error
          ? err.message
          : 'An unknown error occurred during translation.'
      console.error('Error during translation API call:', err)
      return null
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
