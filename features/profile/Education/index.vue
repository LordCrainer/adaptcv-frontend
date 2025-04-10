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
        :items="formData"
        :hide-default-footer="formData.length < 11">
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
              @click="remove(item.id)" />
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
      @cancel="cancel"
      @close="close"
      v-if="state.openDialog"></EducationForm>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EducationForm from './EducationForm.vue'
import type { IEducationItem } from '..'

const formData = ref<IEducationItem[]>([])

const headers = [
  { title: 'Degree', key: 'degree' },
  { title: 'Institution', key: 'institution' },
  { title: 'Start Date', key: 'startDate' },
  { title: 'End Date', key: 'endDate' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const state = ref({
  openDialog: false,
  isEditing: false,
  record: {} as IEducationItem
})

const add = () => {
  state.value.openDialog = true
  // Logic to add a new education item
}

const edit = (id: string) => {
  // Logic to edit an existing education item
}

const remove = (id: string) => {
  formData.value = formData.value.filter((item) => item.id !== id)
}

const close = () => {
  state.value.openDialog = false
}
const cancel = () => {
  state.value.openDialog = false
}

const submitForm = () => {
  console.log('Education submitted:', formData.value)
}
</script>
