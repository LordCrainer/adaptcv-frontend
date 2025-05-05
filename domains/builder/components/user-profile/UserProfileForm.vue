<template>
  <div class="d-flex flex-column" style="width: 100%">
    <v-text-field
      prepend-icon="mdi-account"
      icon-color="primary"
      v-model="formData.name"
      :label="$t('profile.personalInfo.fullname')"
      placeholder="Ej: John Doe"
      variant="underlined"
      :rules="[required($t('profile.personalInfo.fullname'))]"
      aria-label="Full Name"
      required></v-text-field>
    <v-text-field
      v-model="formData.email"
      icon-color="primary"
      prepend-icon="mdi-email"
      :label="$t('profile.personalInfo.email')"
      placeholder="Ej: example@example.com"
      variant="underlined"
      type="email"
      aria-label="Email"
      required></v-text-field>

    <v-text-field
      v-model="formData.phone"
      icon-color="primary"
      prepend-icon="mdi-phone"
      :label="$t('profile.personalInfo.phone')"
      placeholder="Ej: +1234567890"
      variant="underlined"
      type="tel"
      aria-label="Phone"></v-text-field>

    <v-text-field
      v-model="formData.country"
      icon-color="primary"
      :label="$t('profile.personalInfo.country')"
      prepend-icon="mdi-map"
      placeholder="Ej: country"
      aria-label="Country"
      variant="underlined"></v-text-field>
    <v-text-field
      v-model="formData.city"
      icon-color="primary"
      :label="$t('profile.personalInfo.city')"
      prepend-icon="mdi-city"
      placeholder="Ej: city"
      aria-label="City"
      variant="underlined"></v-text-field>
    <v-select
      clearable
      :label="$t('profile.personalInfo.areaProfession')"
      variant="underlined"
      icon-color="primary"
      prepend-icon="mdi-briefcase"
      :items="Object.keys(areasProfession)"
      v-model="formData.areaProfession"
      autocomplete
      aria-label="Area of Profession"></v-select>
    <v-select
      v-if="formData.areaProfession"
      prepend-icon="mdi-account-hard-hat"
      icon-color="primary"
      :label="$t('profile.personalInfo.profession')"
      variant="underlined"
      :items="professions"
      v-model="formData.profession"
      autocomplete
      aria-label="Profession"></v-select>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { IUserProfile } from '~/domains/builder/shared'
import { areasProfession } from '~/domains/builder/shared/constants/profesionArea'

const { required } = useRules()

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: IUserProfile
}>()

const professions = ref<string[]>([])

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(
  () => formData.value.areaProfession,
  (newArea) => {
    professions.value = newArea ? areasProfession[newArea] : []
    formData.value.profession = ''
  },
  { immediate: true }
)
</script>
