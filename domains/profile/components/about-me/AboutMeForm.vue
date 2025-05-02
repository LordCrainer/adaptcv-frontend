<template>
  <v-col cols="12" md="8" class="d-flex flex-column ga-2">
    <div class="d-flex flex-column ga-2">
      <v-text-field
        prepend-inner-icon="mdi-watermark"
        v-model="formData.slogan"
        :label="$t('profile.aboutMe.slogan')"
        placeholder="Ej: Your slogan here"
        variant="outlined"
        aria-label="Slogan"
        required></v-text-field>

      <v-textarea
        prepend-inner-icon="mdi-text-box"
        v-model="formData.summary"
        :label="$t('profile.aboutMe.summary')"
        placeholder="Ej: Your summary here"
        variant="outlined"
        rows="5"
        aria-label="Summary"
        required></v-textarea>  
    </div>
  </v-col>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IAboutMe } from '@/domains/profile/shared'

const emit = defineEmits<{
  (e: 'update:modelValue', value: IAboutMe): void
}>()

const props = defineProps<{
  modelValue: IAboutMe
}>()

const formData = ref<IAboutMe>({ ...props.modelValue })

watch(
  formData,
  (newFormData) => {
    emit('update:modelValue', newFormData)
  },
  { deep: true }
)
</script>
