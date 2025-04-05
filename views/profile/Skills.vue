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

  <v-dialog v-model="openDialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite skill`"
      :title="`${isEditing ? 'Edit' : 'Add'} a Skill`">
      <template v-slot:text>
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12">
              <v-combobox
                flat
                v-model="record.selectedSkills"
                :items="skillList"
                :label="$t('profile.skills.title')"
                prepend-inner-icon="mdi-filter-variant"
                variant="outlined"
                chips
                clearable
                closable-chips
                :multiple="isEditing ? false : true">
                <template v-slot:chip="{ props, item }">
                  <v-chip v-bind="props">
                    <strong>{{ item.raw }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="record.job"
                variant="outlined"
                label="Job"
                placeholder="Ej: My Proyect"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                variant="outlined"
                v-model="record.year_experiences"
                :items="[
                  'less than 1 year',
                  '1 - 2 years',
                  '2 - 3 years',
                  '3 - 5 years',
                  '5 - 10 years',
                  '10+ years'
                ]"
                label="Year Experiences"
                required></v-select>
            </v-col>
          </v-row>
        </v-form>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn
          text="Cancel"
          variant="plain"
          @click="openDialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const skillList = ref([
  'JavaScript',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Swift',
  'Kotlin',
  'TypeScript',
  'HTML',
  'CSS',
  'SQL',
  'C++',
  'C',
  'R',
  'MATLAB',
  'Dart',
  'Rust',
  'Scala',
  'Perl',
  'Shell Scripting'
])
const isEditing = shallowRef(false)
const openDialog = ref(false)

type year_experiences =
  | 'less than 1 year'
  | '1 - 2 years'
  | '2 - 3 years'
  | '3 - 5 years'
  | '5 - 10 years'
  | '10+ years'

interface Skill {
  id: string
  skill: string
  selectedSkills?: string[]
  job: string
  year_experiences: year_experiences | undefined
}

const DEFAULT_SKILL: Skill = {
  id: '',
  selectedSkills: [],
  skill: '',
  job: '',
  year_experiences: undefined
}

const record = ref<Skill>(DEFAULT_SKILL)

const formData = ref<Skill[]>([
  {
    id: '1',
    skill: 'JavaScript',
    job: 'Frontend Developer',
    year_experiences: '3 - 5 years'
  }
])

const headers = <any>[
  { title: 'Skill', key: 'skill', align: 'start' },
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
  openDialog.value = true
  isEditing.value = true
  const item = formData.value.find((data) => data.id === id)
  record.value = {
    id: item?.id || '',
    skill: item?.skill || '',
    job: item?.job || '',
    year_experiences: item?.year_experiences || undefined,
    selectedSkills: [item?.skill || '']
  }
}

function setFormData(value: Skill): Skill {
  return {
    skill: value.skill || '',
    job: value.job || '',
    year_experiences: value.year_experiences || undefined,
    id: value.id || ''
  }
}

function save() {
  record.value.selectedSkills = Array.isArray(record.value.selectedSkills)
    ? record.value.selectedSkills
    : [record.value.selectedSkills || '']

  record.value.selectedSkills?.forEach((skill) => {
    const foundIndex = formData.value.findIndex((data) => data?.skill === skill)

    if (foundIndex !== -1) {
      formData.value[foundIndex] = setFormData({
        ...record.value,
        skill: skill
      })
    } else if (!isEditing.value) {
      formData.value.push(
        setFormData({
          id: Date.now().toString(),
          skill: skill,
          job: record.value.job,
          year_experiences: record.value.year_experiences
        })
      )
    } else {
      const index = formData.value.findIndex(
        (data) => data?.id === record.value.id
      )
      if (index !== -1) {
        formData.value[index] = setFormData({
          ...record.value,
          skill: skill
        })
      }
    }
  })
  record.value = DEFAULT_SKILL
  openDialog.value = false
  isEditing.value = false
}

function add() {
  openDialog.value = true
  isEditing.value = false
  record.value = DEFAULT_SKILL
}

function remove(id: string) {
  const index = formData.value.findIndex((data) => data?.id === id)
  formData.value.splice(index, 1)
}

const submitForm = () => {
  console.log('Skill submitted:', formData.value)
}
</script>
