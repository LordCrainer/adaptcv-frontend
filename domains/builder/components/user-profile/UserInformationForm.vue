<template>
  <div class="d-flex flex-column ga-2" style="width: 100%">
    <v-text-field
      density="comfortable"
      prepend-inner-icon="mdi-account"
      icon-color="primary"
      v-model="formData.name"
      :label="$t('profile.personalInfo.fullname')"
      placeholder="John Doe"
      active
      variant="outlined"
      :rules="[required($t('profile.personalInfo.fullname'))]"
      :aria-label="$t('profile.personalInfo.fullname')"
      required></v-text-field>
    <v-text-field
      density="comfortable"
      v-model="formData.email"
      icon-color="primary"
      prepend-inner-icon="mdi-email"
      :label="$t('profile.personalInfo.email')"
      placeholder="example@example.com"
      active
      variant="outlined"
      type="email"
      aria-label="Email"
      required></v-text-field>

    <v-text-field
      density="comfortable"
      v-model="formData.phone"
      icon-color="primary"
      prepend-inner-icon="mdi-phone"
      :label="$t('profile.personalInfo.phone')"
      placeholder="+1234567890"
      active
      variant="outlined"
      type="tel"
      aria-label="Phone"></v-text-field>

    <v-text-field
      density="comfortable"
      v-model="formData.country"
      icon-color="primary"
      :label="$t('profile.personalInfo.country')"
      prepend-inner-icon="mdi-map"
      placeholder="My country"
      active
      aria-label="Country"
      variant="outlined"></v-text-field>
    <v-text-field
      density="comfortable"
      v-model="formData.city"
      icon-color="primary"
      :label="$t('profile.personalInfo.city')"
      prepend-inner-icon="mdi-city"
      placeholder="My city"
      active
      aria-label="City"
      variant="outlined"></v-text-field>
    <v-select
      density="comfortable"
      clearable
      :label="$t('profile.personalInfo.areaProfession')"
      :placeholder="$t('profile.personalInfo.areaProfessionPlaceholder')"
      variant="outlined"
      active
      icon-color="primary"
      prepend-inner-icon="mdi-briefcase"
      :items="localAreaProfession"
      v-model="formData.areaProfession"
      autocomplete
      aria-label="Area of Profession"></v-select>
    <v-select
      density="comfortable"
      :disabled="!formData.areaProfession"
      active
      prepend-inner-icon="mdi-account-hard-hat"
      icon-color="primary"
      :label="$t('profile.personalInfo.profession')"
      :placeholder="$t('profile.personalInfo.professionPlaceholder')"
      variant="outlined"
      :items="localProfessions"
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

const DEFAULT_USER_PROFILE: IUserProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  country: undefined,
  city: undefined,
  areaProfession: undefined,
  profession: undefined
}

const localAreaProfession = computed(() => Object.keys(areasProfession))
const localProfessions = ref<string[]>([])

const formData = computed({
  get: () => props.modelValue ?? { ...DEFAULT_USER_PROFILE },
  set: (value) => emit('update:modelValue', { ...value })
})

watch(
  () => formData.value.areaProfession,
  (newArea) => {
    if (newArea) {
      localProfessions.value = newArea ? areasProfession[newArea] : []
    } else {
      formData.value.areaProfession = undefined
    }
    formData.value.profession = undefined
  },
  { immediate: true }
)
</script>
