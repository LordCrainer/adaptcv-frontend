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
          <v-col cols="12" md="6">
            <v-textarea
              v-model="internalOriginalText"
              label="Original Text (Spanish)"
              variant="outlined"
              rows="10"
              readonly
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="translatedText"
              label="Translated Text (English)"
              variant="outlined"
              rows="10"
              readonly
              :loading="isLoading"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
          @click="handleTranslate"
          :loading="isLoading"
          :disabled="!internalOriginalText"
        >
          Translate
        </v-btn>
        <v-btn color="grey" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTranslationApi } from '~/composables/useTranslationApi';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  originalText: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const dialog = ref(props.modelValue);
const internalOriginalText = ref(props.originalText);

const { translate, translatedText, isLoading, error } = useTranslationApi();

watch(
  () => props.modelValue,
  (newVal) => {
    dialog.value = newVal;
    if (newVal) {
      // Reset translated text when dialog opens
      translatedText.value = '';
      internalOriginalText.value = props.originalText;
    }
  }
);

watch(
  dialog,
  (newVal) => {
    emit('update:modelValue', newVal);
  }
);

const handleTranslate = async () => {
  await translate(internalOriginalText.value);
};
</script>

<style scoped>
/* Add any specific styles for the dialog here */
</style>
