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
            text="Add a Language"
            border
            @click="add"></v-btn>
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
    :title="`${state.isEditing ? 'Update' : 'Create'} your favorite language`"
    scrollable
    :overlay="false"
    max-width="500px"
    transition="dialog-transition">
    <LanguagesForm
      :subtitle="`${state.isEditing ? 'Update' : 'Create'} your favorite language`"
      :title="`${state.isEditing ? 'Edit' : 'Add'} a Language`"
      :inputData="state.record"
      @submit="save"
      @cancel="resetForm"
      @close="resetForm" />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LanguagesForm from './LanguagesForm.vue'

const formData = ref([
  {
    language: '',
    proficiency: ''
  }
])

const state = ref({
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
  state.value.openDialog = true
  state.value.isEditing = false
  state.value.record = { ...formData.value }
}

const edit = (key: string) => {
  state.value.openDialog = true
  state.value.isEditing = true
}

const save = () => {
  console.log('Language submitted:', formData.value)
}

const remove = (key: string) => {
  console.log('Remove language with key:', key)
  formData.value = formData.value.filter((item) => item.language !== key)
}

const resetForm = () => {
  state.value.openDialog = false
}
</script>
