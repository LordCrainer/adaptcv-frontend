<template>
  <v-row>
    <v-col cols="12">
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
              text="Add a Skill"
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
              @click="edit(item.id)"></v-icon>

            <v-icon
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
              @click="remove(item.id)"></v-icon>
          </div>
        </template>

        <template v-slot:no-data>
          {{ $t('common.noData') }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog v-model="state.openDialog" max-width="500">
    <SkillForm
      :subtitle="`${state.isEditing ? 'Update' : 'Create'} your favorite skill`"
      :title="`${state.isEditing ? 'Edit' : 'Add'} a Skill`"
      :inputData="state.record"
      :multiple="state.isEditing ? false : true"
      @submit="save"
      @cancel="resetForm"
      @close="resetForm"
      v-if="state.openDialog"></SkillForm>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SkillForm from './skillForm.vue'
import type { ISkill, ISkillForm } from '..'

interface State {
  isEditing: boolean
  openDialog: boolean
  record: ISkillForm
  formData: ISkill[]
}

const state = reactive<State>({
  isEditing: false,
  openDialog: false,
  record: {
    id: '',
    selectedSkills: [],
    job: '',
    year_experiences: undefined
  },
  formData: []
})

const formData = ref<ISkill[]>([])

const headers = <any>[
  { title: 'ISkill', key: 'skill', align: 'start' },
  { title: 'Job', key: 'job', align: 'start' },
  {
    title: 'Year Experiences',
    key: 'year_experiences',
    align: 'end',
    sortable: false
  },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false }
]

function edit(id: string) {
  state.openDialog = true
  state.isEditing = true
  const item = formData.value.find((data) => data.id === id)
  state.record = {
    id: item?.id || '',
    job: item?.job || '',
    year_experiences: item?.year_experiences || undefined,
    selectedSkills: [item?.skill || '']
  }
}

function setFormData(value: ISkill): ISkill {
  return {
    skill: value.skill || '',
    job: value.job || '',
    year_experiences: value.year_experiences || undefined,
    id: value.id || ''
  }
}

function findByIndex(prop: keyof ISkill, value: string) {
  return formData.value.findIndex((data) => data[prop] === value)
}

function save() {
  const skills = Array.isArray(state.record.selectedSkills)
    ? state.record.selectedSkills
    : [state.record.selectedSkills || '']

  skills?.forEach((skill) => {
    if (!skill) return
    const index = state.isEditing
      ? findByIndex('id', state.record.id)
      : findByIndex('skill', skill)

    if (index !== -1) {
      formData.value[index] = setFormData({
        ...state.record,
        skill: skill
      })
    } else if (!state.isEditing) {
      formData.value.push(
        setFormData({
          id: Date.now().toString(),
          skill: skill,
          job: state.record.job,
          year_experiences: state.record.year_experiences
        })
      )
    }
  })

  resetForm()
}

function resetForm() {
  state.record = {
    id: '',
    selectedSkills: [],
    job: '',
    year_experiences: undefined
  }
  state.isEditing = false
  state.openDialog = false
}

function add() {
  state.openDialog = true
  state.isEditing = false
}

function remove(id: string) {
  const index = formData.value.findIndex((data) => data?.id === id)
  formData.value.splice(index, 1)
}

const submitForm = () => {
  console.log('ISkill submitted:', formData.value)
}
</script>
