<template>
  <v-row>
    <v-col cols="12">
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
      <v-data-table
        :headers="headers"
        :hide-default-footer="formData.length < 11"
        :items="formData">
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

  <v-dialog v-model="state.openDialog" max-width="500">
    <SkillForm
      :subtitle="`${state.isEditing ? 'Update' : 'Create'} your favorite skill`"
      :title="`${state.isEditing ? 'Edit' : 'Add'} a Skill`"
      :inputData="state.record"
      :multiple="state.isEditing ? false : true"
      @submit="save"
      @cancel="cancel"
      @close="close"
      v-if="state.openDialog"></SkillForm>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SkillForm from './skillForm.vue'
import type { ISkill, ISkillForm } from '..'

const { t } = useI18n()

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
    job: '',
    yearsOfExperience: undefined
  },
  formData: []
})

const formData = ref<ISkill[]>([])

const headers = ref([
  { title: t('profile.skills.skill'), key: 'skill' },
  { title: t('profile.skills.job'), key: 'job' },
  {
    title: t('profile.skills.yearsOfExperience'),
    key: 'yearsOfExperience'
  },
  {
    title: t('actions.options'),
    key: 'actions',
    sortable: false
  }
])

function edit(id: string) {
  state.openDialog = true
  state.isEditing = true
  const item = formData.value.find((data) => data.id === id)
  state.record = {
    id: item?.id || '',
    job: item?.job || '',
    yearsOfExperience: item?.yearsOfExperience || undefined,
    selectedSkills: [item?.skill || '']
  }
}

function setFormData(value: ISkill): ISkill {
  return {
    skill: value.skill || '',
    job: value.job || '',
    yearsOfExperience: value.yearsOfExperience || undefined,
    id: value.id || ''
  }
}

function findByIndex(prop: keyof ISkill, value: string) {
  return formData.value.findIndex((data) => data[prop] === value)
}

function save(data: ISkill[]) {
  data?.forEach((d) => {
    if (!d.skill) return
    const index = state.isEditing
      ? findByIndex('id', state.record.id)
      : findByIndex('skill', d.skill)

    if (index !== -1) {
      formData.value[index] = setFormData({
        ...state.record,
        skill: d.skill
      })
    } else if (!state.isEditing) {
      formData.value.push(
        setFormData({
          id: Date.now().toString(),
          skill: d.skill,
          job: state.record.job,
          yearsOfExperience: state.record.yearsOfExperience
        })
      )
    }
  })
}

function close() {
  state.openDialog = false
  state.isEditing = false
}

function cancel() {
  close()
}

function add() {
  state.openDialog = true
  state.isEditing = false
}

function remove(id: string) {
  const index = formData.value.findIndex((data) => data?.id === id)
  formData.value.splice(index, 1)
}
</script>
