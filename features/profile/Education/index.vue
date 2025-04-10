<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex justify-end pb-2">
        <v-btn
          color="secondary"
          variant="outlined"
          rounded
          prepend-icon="mdi-plus"
          border
          @click="add">
          {{ $t('actions.add') }}
        </v-btn>
      </div>
      <v-data-table
        :headers="headers"
        :items="education"
        :hide-default-footer="education.length < 11">
        <template v-slot:item.actions="{ item }">
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
              @click="removeEducation(item.id)" />
          </div>
        </template>

        <template v-slot:no-data>
          {{ $t('common.noData') }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog v-model="state.openDialog" max-width="500px">
    <EducationForm
      :title="`${state.isEditing ? 'Edit' : 'Add'} an Education`"
      :inputData="state.record"
      @submit="submitForm"
      @cancel="reset"
      @close="close"
      v-if="state.openDialog"></EducationForm>
  </v-dialog>
</template>

<script setup lang="ts">
import EducationForm from './EducationForm.vue'
import type { IEducationItem } from '~/features/profile/index'
import useEducation from './useEducation'

const {
  addEducation,
  findEducation,
  updateEducation,
  removeEducation,
  education
} = useEducation()

const headers = [
  { title: 'Degree', key: 'degree' },
  { title: 'Institution', key: 'institution' },
  { title: 'Start Date', key: 'startDate' },
  { title: 'End Date', key: 'endDate' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const state = reactive({
  openDialog: false,
  isEditing: false,
  record: {} as IEducationItem
})

const add = () => {
  state.openDialog = true
}

const edit = (id: string) => {
  const foundEducation = findEducation(id)

  if (!foundEducation) {
    return
  }

  state.openDialog = true
  state.isEditing = true
  state.record = { ...foundEducation }
}

const close = () => {
  state.openDialog = false
}

const reset = () => {
  state.openDialog = false
  state.isEditing = false
  state.record = {} as IEducationItem
}

const submitForm = (education: IEducationItem) => {
  if (state.isEditing) {
    updateEducation(education)
  } else {
    addEducation(education)
  }

  reset()
}
</script>
