<template>
  <v-form @submit.prevent="submitForm">
    <v-card :title="title">
      <v-row class="pa-4">
        <v-col cols="12" md="6" class="py-1">
          <v-text-field
            v-model="localExperiencie.jobTitle"
            variant="outlined"
            :label="$t('profile.experience.jobTitle')"
            placeholder="Ej: Software Engineer"
            aria-label="Job Title"
            required></v-text-field>
        </v-col>
        <v-col md="6" class="py-1">
          <v-text-field
            v-model="localExperiencie.company"
            :label="$t('profile.experience.company')"
            variant="outlined"
            placeholder="Ej: Tech Company"
            aria-label="Company"
            required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="localExperiencie.startDate"
                :label="$t('common.startDate')"
                variant="outlined"
                type="date"
                aria-label="Start Date"></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="localExperiencie.endDate"
                :label="$t('common.endDate')"
                variant="outlined"
                type="date"
                aria-label="End Date"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex flex-column py-1 ga-2">
          <div>
            <h3>{{ $t('profile.experience.description') }}</h3>
          </div>
          <ClientOnly>
            <DragonEditor ref="$editor" />
          </ClientOnly>
        </v-col>
      </v-row>
      <slot name="actions">
        <v-card-actions class="pb-4 px-4">
          <v-btn variant="flat" @click="$emit('cancel')" aria-label="Cancel">
            {{ $t('actions.cancel') }}
          </v-btn>

          <v-btn
            text="Save"
            color="primary"
            variant="tonal"
            type="submit"
            aria-label="Save">
            {{ $t('actions.save') }}
          </v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IWorkExperience } from '~/domains/builder/shared';


const props = defineProps<{
  title: string
  modelValue: IWorkExperience | null
}>()

const $editor = ref<DragonEditor>()

const DEFAULT_ITEM: IWorkExperience = {
  id: '',
  jobTitle: '',
  company: '',
  startDate: '',
  endDate: '',
  description: {} as DEContentData
}

const localExperiencie = ref<IWorkExperience>(DEFAULT_ITEM)

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      localExperiencie.value = { ...newVal }
      $editor.value?.setContentData(newVal.description)
    }
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['submit', 'cancel', 'close'])

const submitForm = () => {
  if (localExperiencie.value.company && localExperiencie.value.jobTitle) {
    emit('submit', {
      ...localExperiencie.value,
      description: $editor.value?.getContentData()
    })
    emit('close')
  }
}
</script>
