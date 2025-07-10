<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Translate Text</span>
        <v-btn icon @click="dialog = false" variant="text">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="d-flex align-start justify-center">
            <v-select
              density="compact"
              variant="outlined"
              v-model="from"
              :items="languages"
              label="From"
              class="mr-2"
              style="max-width: 250px" />
            <v-btn
              icon
              flat
              @click="swapLanguages"
              class="mx-2"
              :disabled="isLoading">
              <v-icon>mdi-swap-horizontal</v-icon>
            </v-btn>
            <v-select
              density="compact"
              variant="outlined"
              v-model="to"
              :items="languages"
              label="To"
              class="ml-2"
              style="max-width: 250px" />
            <v-btn
              icon="mdi-translate"
              variant="text"
              color="primary"
              class="ml-4"
              @click="handleTranslate"
              :loading="isLoading"
              :disabled="!internalOriginalText?.trim() || from === to || internalOriginalText.length > 500"></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="internalOriginalText"
              :label="
                from === 'es'
                  ? 'Original Text (Spanish)'
                  : 'Original Text (English)'
              "
              append-inner-icon="mdi-content-copy"
              @click:append-inner="copyText(internalOriginalText)"
              variant="outlined"
              counter="500"
              rows="5"></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="translatedText"
              :label="
                to === 'en'
                  ? 'Translated Text (English)'
                  : 'Translated Text (Spanish)'
              "
              append-inner-icon="mdi-content-copy"
              @click:append-inner="copyText(translatedText)"
              variant="outlined"
              rows="5"
              :loading="isLoading"></v-textarea>
          </v-col>
        </v-row>

        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="grey" @click="dialog = false">Close</v-btn>
        <v-btn
          color="success"
          @click="handleSaveTranslation"
          :disabled="!translatedText || isLoading">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar" :timeout="2000" color="success">
    {{ snackbarText }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTranslationApi } from '~/composables/useTranslationApi'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  originalText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

const dialog = ref(props.modelValue)
const internalOriginalText = ref(props.originalText)

const languages = [
  { title: 'Spanish', value: 'es' },
  { title: 'English', value: 'en' }
]

const from = ref<'es' | 'en'>('es')
const to = ref<'es' | 'en'>('en')

const { translate, translatedText, isLoading, error } = useTranslationApi()

watch(
  () => props.modelValue,
  (newVal) => {
    dialog.value = newVal
    if (newVal) {
      // Reset translated text and language selection when dialog opens
      translatedText.value = ''
      internalOriginalText.value = props.originalText
      from.value = 'es'
      to.value = 'en'
    }
  }
)

watch(
  () => dialog.value,
  (newVal) => {
    emit('update:modelValue', newVal)
  }
)

const snackbar = ref(false)
const snackbarText = ref('')

function copyText(text: string) {
  if (!text) return

  if (!navigator.clipboard) {
    snackbarText.value = 'Clipboard not supported in this browser'
    snackbar.value = true
    return
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      snackbarText.value = 'Text copied to clipboard'
      snackbar.value = true
    })
    .catch((err) => {
      snackbarText.value = 'Failed to copy text'
      snackbar.value = true
      console.error('Failed to copy text: ', err)
    })
}

function swapLanguages() {
  const temp = from.value
  from.value = to.value
  to.value = temp
  translatedText.value = ''
}

function handleSaveTranslation() {
  if (!translatedText.value) return
  emit('save', translatedText.value)
  dialog.value = false
}

const handleTranslate = async () => {
  await translate({
    text: internalOriginalText.value,
    from: from.value,
    to: to.value
  })
}
</script>

<style scoped>
/* Add any specific styles for the dialog here */
</style>
