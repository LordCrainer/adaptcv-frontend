<template>
  <v-col cols="12" md="8" class="d-flex flex-column ga-2">
    <div class="d-flex flex-column ga-2">
      <v-text-field
        prepend-inner-icon="mdi-account"
        v-model="formData.name"
        :label="$t('profile.personalInfo.fullname')"
        placeholder="Ej: John Doe"
        variant="outlined"
        :rules="[required($t('profile.personalInfo.fullname'))]"
        aria-label="Full Name"
        required></v-text-field>
      <v-text-field
        v-model="formData.email"
        prepend-inner-icon="mdi-email"
        :label="$t('profile.personalInfo.email')"
        placeholder="Ej: example@example.com"
        variant="outlined"
        type="email"
        aria-label="Email"
        required></v-text-field>

      <v-text-field
        v-model="formData.phone"
        prepend-inner-icon="mdi-phone"
        :label="$t('profile.personalInfo.phone')"
        placeholder="Ej: +1234567890"
        variant="outlined"
        type="tel"
        aria-label="Phone"></v-text-field>

      <v-row class="py-2">
        <v-col cols="6" class="py-0">
          <v-text-field
            v-model="formData.country"
            :label="$t('profile.personalInfo.country')"
            prepend-inner-icon="mdi-map"
            placeholder="Ej: country"
            aria-label="Country"
            variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            v-model="formData.city"
            :label="$t('profile.personalInfo.city')"
            prepend-inner-icon="mdi-city"
            placeholder="Ej: city"
            aria-label="City"
            variant="outlined"></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-select
        clearable
        :label="$t('profile.personalInfo.areaProfession')"
        variant="outlined"
        prepend-inner-icon="mdi-briefcase"
        :items="Object.keys(areasProfession)"
        v-model="formData.areaProfession"
        autocomplete
        aria-label="Area of Profession"></v-select>
      <v-select
        v-if="formData.areaProfession"
        prepend-inner-icon="mdi-account-hard-hat"
        :label="$t('profile.personalInfo.profession')"
        variant="outlined"
        :items="professions"
        v-model="formData.profession"
        autocomplete
        aria-label="Profession"></v-select>
    </div>
  </v-col>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { IUserProfile } from '../shared'
import { areasProfession } from '../shared/constants/profesionArea'

const { required } = useRules()

const emit = defineEmits(['submit', 'update:modelValue'])

const props = defineProps<{
  modelValue: IUserProfile
}>()

const formData = ref<IUserProfile>({ ...props.modelValue })

const professions = ref<string[]>([])

watch(
  () => formData.value.areaProfession,
  (newArea) => {
    if (newArea) {
      formData.value.profession = ''
      professions.value = areasProfession[newArea]
    }
  }
)

watch(
  formData,
  (newFormData) => {
    emit('update:modelValue', newFormData)
  },
  { deep: true }
)
</script>
