<template>
  <v-form ref="form" class="d-flex flex-column ga-2">
    <v-text-field
      @blur="updateFormData"
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
      @blur="updateFormData"
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
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IAboutMe } from '~/domains/builder/shared'
import { useObject } from '~/utils/useObject'

const { hasChanges } = useObject()

const emit = defineEmits<{
  (e: 'update:modelValue', value: IAboutMe): void
}>()

const props = defineProps<{
  modelValue: IAboutMe
}>()

const form = ref()
const formData = ref<IAboutMe>({ ...props.modelValue })
const oldData = ref<IAboutMe>({ ...props.modelValue })

async function updateFormData() {
  if (!form.value) return
  const { valid } = await form.value.validate()
  if (valid && hasChanges(formData.value, oldData.value)) {
    emit('update:modelValue', formData.value)
    oldData.value = { ...formData.value }
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (hasChanges(newVal, formData.value)) {
      formData.value = { ...newVal }
      oldData.value = { ...formData.value }
    }
  }
)
</script>
