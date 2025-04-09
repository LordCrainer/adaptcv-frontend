<template>
  <div class="d-flex justify-end">
    <v-data-table
      :headers="headers"
      :hide-default-footer="formData.length < 11"
      :items="formData">
      <template v-slot:top>
        <div class="d-flex justify-end">
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
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="edit(item.language)"></v-icon>

          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="remove(item.language)"></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        {{ $t('common.noData') }}
      </template>
    </v-data-table>
  </div>

  <v-dialog
    v-model="state.openDialog"
    max-width="500px"
    transition="dialog-transition">
    <LanguagesForm
      :subtitle="`${state.isEditing ? 'Update' : 'Create'} your favorite language`"
      :title="`${state.isEditing ? 'Edit' : 'Add'} a Language`"
      :inputData="state.record"
      @submit="save"
      @cancel="cancel"
      @close="close" />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import LanguagesForm from './LanguagesForm.vue'

const formData = ref([
  {
    language: '',
    proficiency: ''
  }
])

const state = reactive({
  openDialog: false,
  isEditing: false,
  record: {}
})

const headers = [
  { title: 'Language', key: 'language' },
  { title: 'Proficiency', key: 'proficiency' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const add = () => {
  state.openDialog = true
  state.isEditing = false
  state.record = { ...formData.value }
}

const edit = (key: string) => {
  state.openDialog = true
  state.isEditing = true
}

const save = () => {
  console.log('Language submitted:', formData.value)
}

const remove = (key: string) => {
  console.log('Remove language with key:', key)
  formData.value = formData.value.filter((item) => item.language !== key)
}

const resetForm = () => {}

const close = () => {
  state.openDialog = false
}

function cancel() {
  resetForm()
  close()
}
</script>
