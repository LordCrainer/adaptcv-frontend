import { ref } from 'vue';

export const useTranslationApi = () => {
  const translatedText = ref('');
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const translate = async (text: string): Promise<string | null> => {
    isLoading.value = true;
    error.value = null;
    translatedText.value = '';

    if (!text) {
      isLoading.value = false;
      return null;
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.statusMessage || 'Translation failed');
      }

      const data = await response.json();
      translatedText.value = data.translatedText;
      return data.translatedText;
    } catch (err: any) {
      error.value = err.message || 'An unknown error occurred during translation.';
      console.error('Error during translation API call:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    translatedText,
    isLoading,
    error,
    translate,
  };
};
