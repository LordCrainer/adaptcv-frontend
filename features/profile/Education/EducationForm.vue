<template>
  <v-form @submit.prevent="submitForm">
    <v-card :title="title">
      <div class="d-flex flex-column px-4">
        <v-autocomplete
          v-model="formData.degree"
          variant="outlined"
          :items="degreeOptions"
          clearable
          :item-title="(i) => i && $t(`profile.education.${i}`)"
          :label="$t('profile.education.degree')"
          required></v-autocomplete>

        <v-text-field
          v-model="formData.institution"
          :label="$t('profile.education.institution')"
          variant="outlined"
          required></v-text-field>

        <div class="d-flex flex-row ga-4">
          <v-text-field
            v-model="formData.startDate"
            :label="$t('profile.education.startDate')"
            variant="outlined"
            type="date"></v-text-field>

          <v-text-field
            v-model="formData.endDate"
            :label="$t('profile.education.endDate')"
            variant="outlined"
            type="date"></v-text-field>
        </div>
      </div>
      <slot name="actions">
        <v-card-actions>
          <v-btn variant="flat" @click="$emit('cancel')">
            {{ $t('actions.cancel') }}
          </v-btn>

          <v-btn text="Save" color="primary" variant="tonal" type="submit">
            {{ $t('actions.save') }}
          </v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const DEFAULT_ITEM = {
  degree: '',
  institution: '',
  startDate: '',
  endDate: ''
}

const emit = defineEmits(['submit', 'cancel', 'close'])

const degreeOptions = ref<string[]>([
  'secondary',
  'highSchool',
  'technical',
  'undergraduate',
  'graduate',
  'masters',
  'doctorate'
])

const formData = ref(DEFAULT_ITEM)

const submitForm = () => {
  if (formData.value.degree && formData.value.institution) {
    emit('submit', { ...formData.value })
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
  formData.value = DEFAULT_ITEM
}
</script>
