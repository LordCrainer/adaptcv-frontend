<template>
  <div class="d-flex flex-column ga-2">
    <v-text-field
      prepend-inner-icon="mdi-watermark"
      v-model="formData.slogan"
      :label="$t('profile.aboutMe.slogan')"
      active
      icon-color="primary"
      placeholder="Your slogan here"
      variant="outlined"
      aria-label="Slogan"
      required></v-text-field>

    <v-textarea
      hide-details
      prepend-inner-icon="mdi-text-box"
      v-model="formData.summary"
      :label="$t('profile.aboutMe.summary')"
      active
      icon-color="primary"
      placeholder="Your summary here"
      variant="outlined"
      counter="500"
      class="fill-height d-flex flex-column"
      aria-label="Summary"
      required></v-textarea>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IAboutMe } from '~/domains/builder/shared'

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
