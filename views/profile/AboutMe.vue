<template>
  <v-textarea
    v-model="formData.summary"
    rounded="md"
    prepend-inner-icon="mdi-file-document"
    :label="$t('profile.personalInfo.summary')"
    variant="outlined"
    placeholder="Ej: A brief summary about yourself"
    name="summary"></v-textarea>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formData = ref({
  summary: ''
})

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', formData.value)
}
</script>
