<template>
  <div>
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="6" class="py-1">
          <v-text-field
            v-model="formData.jobTitle"
            variant="outlined"
            :label="$t('profile.experience.jobTitle')"
            :rules="[rules.required($t('profile.experience.jobTitle'))]"
            placeholder="Ej: Software Engineer"
            required></v-text-field>
        </v-col>
        <v-col md="6" class="py-1">
          <v-text-field
            v-model="formData.company"
            :label="$t('profile.experience.company')"
            variant="outlined"
            placeholder="Ej: Tech Company"
            required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="formData.startDate"
                :label="$t('profile.experience.startDate')"
                variant="outlined"
                type="date"></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="formData.endDate"
                :label="$t('profile.experience.endDate')"
                variant="outlined"
                type="date"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <v-sheet>
      <div class="py-4">
        <h3>Redactar</h3>
      </div>
      <ClientOnly>
        <DragonEditor ref="$editor" />
      </ClientOnly>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { rules } = useRules()

const $editor = ref<DragonEditor>()

interface WorkExperienceFormData {
  jobTitle: string
  company: string
  startDate: string
  endDate: string
  description: DEContentData
}

const formData = ref<WorkExperienceFormData>({
  jobTitle: '',
  company: '',
  startDate: '',
  endDate: '',
  description: {} as DEContentData
})

const submitForm = () => {
  const description = $editor.value?.getContentData()
  if (description) {
    formData.value.description = description
  }
}

const props = defineProps({
  inputFormData: {
    type: Object as () => WorkExperienceFormData,
    required: true
  }
})

onMounted(() => {
  $editor.value?.setContentData(props.inputFormData.description)
  formData.value = {
    ...formData.value,
    ...props.inputFormData
  }
})
</script>

<style>
.dragon-editor .de-text-block {
  outline: 0;
  min-height: 1.3em;
}

.dragon-editor .de-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 15px;
  line-height: 1.6;
  height: 200px;
}
</style>
