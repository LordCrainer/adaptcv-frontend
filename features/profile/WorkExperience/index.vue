<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex justify-end pb-2">
        <v-btn
          color="secondary"
          variant="outlined"
          prepend-icon="mdi-plus"
          @click="add">
          {{ $t('actions.add') }}
        </v-btn>
      </div>
      <v-data-table
        :headers="headers"
        :items="workExperiences"
        :hide-default-footer="workExperiences.length < 11">
        <template v-slot:item.actions="{ item, index }">
          <div class="d-flex ga-2 justify-end">
            <v-icon
              color="medium-emphasis"
              icon="mdi-pencil"
              size="small"
              @click="edit(item.id)" />

            <v-icon
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
              @click="removeWorkExperience(item.id)" />
          </div>
        </template>

        <template v-slot:no-data>
          {{ $t('common.noData') }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog
    v-model="state.openDialog"
    max-width="650px"
    transition="dialog-transition">
    <WorkExperienceForm
      :title="`${state.isEditing ? 'Edit' : 'Add'} an Experience`"
      :inputData="state.record"
      @submit="submitForm"
      @cancel="reset"
      @close="close"
      v-if="state.openDialog"></WorkExperienceForm>
  </v-dialog>
</template>

<script setup lang="ts">
import type { IWorkExperience } from '..'
import useWorkExperience from './useWorkExperience'
import WorkExperienceForm from './WorkExperienceForm.vue'

const { t } = useI18n()

const {
  removeWorkExperience,
  findWorkExperience,
  workExperiences,
  updateWorkExperience,
  addWorkExperience
} = useWorkExperience()

const headers = [
  { title: t('profile.experience.jobTitle'), key: 'jobTitle' },
  { title: t('profile.experience.company'), key: 'company' },
  { title: t('common.startDate'), key: 'startDate' },
  { title: t('common.endDate'), key: 'endDate' },
  { title: t('actions.options'), key: 'actions', sortable: false }
]

const state = reactive({
  openDialog: false,
  isEditing: false,
  record: {} as IWorkExperience
})

const add = () => {
  state.openDialog = true
  state.isEditing = false
}

const edit = (id: string) => {
  const foundWorkExperience = findWorkExperience(id)

  if (!foundWorkExperience) {
    return
  }
  state.openDialog = true
  state.isEditing = true
  state.record = foundWorkExperience
}

const close = () => {
  state.openDialog = false
}

const reset = () => {
  state.openDialog = false
  state.isEditing = false
  state.record = {} as IWorkExperience
}

const submitForm = (data: IWorkExperience) => {
  if (state.isEditing) {
    updateWorkExperience(data.id, data)
  } else {
    addWorkExperience(data)
  }
}
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
