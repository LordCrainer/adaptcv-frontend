<template>
  <v-form ref="form" class="d-flex flex-column ga-2" style="width: 100%">
    <v-text-field
      @blur="updateFormData"
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
      @blur="updateFormData"
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
      @blur="updateFormData"
      density="comfortable"
      v-model="formData.phone"
      icon-color="primary"
      prepend-inner-icon="mdi-phone"
      :label="$t('profile.personalInfo.phone')"
      placeholder="1234567890"
      active
      variant="outlined"
      type="tel"
      aria-label="Phone"></v-text-field>

    <v-text-field
      @blur="updateFormData"
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
      @blur="updateFormData"
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
      @update:modelValue="updateFormData"
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
      @update:modelValue="updateFormData"
      density="comfortable"
      :disabled="!formData.areaProfession"
      active
      prepend-inner-icon="mdi-account-hard-hat"
      icon-color="primary"
      :label="$t('profile.personalInfo.profession')"
      :placeholder="$t('profile.personalInfo.professionPlaceholder')"
      variant="outlined"
      :items="PROFESSION_LIST"
      v-model="formData.profession"
      autocomplete
      aria-label="Profession"></v-select>
  </v-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { IUserProfile } from '@lordcrainer/adaptcv-shared-types'
import { areasProfession } from '@lordcrainer/adaptcv-shared-types/dist/src/types/builder/constants'
import { useUserProfile } from '~/modules/builder/components/user-profile/useUserProfile'
import { useObject } from '~/utils/useObject'

const { DEFAULT_USER_PROFILE } = useUserProfile()
const { hasChanges } = useObject()

const { required } = useRules()

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: IUserProfile
}>()

const localAreaProfession = computed(() => Object.keys(areasProfession))
const PROFESSION_LIST = ref<string[]>([])

const form = ref()

const formData = ref<IUserProfile>({
  ...DEFAULT_USER_PROFILE,
  ...props.modelValue
})
const oldData = ref<IUserProfile>({
  ...props.modelValue
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (hasChanges(newVal, formData.value)) {
      formData.value = { ...DEFAULT_USER_PROFILE, ...newVal }
      oldData.value = { ...formData.value }
    }
  }
)

async function updateFormData() {
  if (!form.value) return
  const { valid } = await form.value.validate()
  if (valid && hasChanges(formData.value, oldData.value)) {
    oldData.value = { ...formData.value }
    emit('update:modelValue', formData.value)
  }
}

watch(
  () => formData.value.areaProfession,
  (newArea) => {
    if (newArea) {
      PROFESSION_LIST.value = newArea ? areasProfession[newArea] : []
    } else {
      formData.value.areaProfession = undefined
      formData.value.profession = undefined
    }
  },
  { immediate: true }
)
</script>
