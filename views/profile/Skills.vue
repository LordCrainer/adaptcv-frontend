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

  <v-dialog v-model="state.openDialog" max-width="500">
    <v-card
      :subtitle="`${state.isEditing ? 'Update' : 'Create'} your favorite skill`"
      :title="`${state.isEditing ? 'Edit' : 'Add'} a Skill`">
      <template v-slot:text>
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12">
              <v-combobox
                flat
                v-model="state.record.selectedSkills"
                :items="skillList"
                :label="$t('profile.skills.title')"
                prepend-inner-icon="mdi-filter-variant"
                variant="outlined"
                chips
                clearable
                closable-chips
                :multiple="state.isEditing ? false : true">
                <template v-slot:chip="{ props, item }">
                  <v-chip v-bind="props">
                    <strong>{{ item.raw }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="state.record.job"
                variant="outlined"
                label="Job"
                placeholder="Ej: My Proyect"
                required></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                variant="outlined"
                v-model="state.record.year_experiences"
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
          @click="state.openDialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

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
  job: string
  year_experiences: year_experiences | undefined
}

interface SkillForm extends Omit<Skill, 'skill'> {
  selectedSkills?: string[]
}

const DEFAULT_SKILL: SkillForm = {
  id: '',
  selectedSkills: [],
  job: '',
  year_experiences: undefined
}

interface State {
  isEditing: boolean
  openDialog: boolean
  record: SkillForm
  formData: Skill[]
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
  formData: [
    {
      id: '1',
      skill: 'JavaScript',
      job: 'Frontend Developer',
      year_experiences: '3 - 5 years'
    }
  ]
})

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

function setFormData(value: Skill): Skill {
  return {
    skill: value.skill || '',
    job: value.job || '',
    year_experiences: value.year_experiences || undefined,
    id: value.id || ''
  }
}

function save() {
  state.record.selectedSkills = Array.isArray(state.record.selectedSkills)
    ? state.record.selectedSkills
    : [state.record.selectedSkills || '']

  state.record.selectedSkills?.forEach((skill) => {
    const foundIndex = formData.value.findIndex((data) => data?.skill === skill)

    if (foundIndex !== -1) {
      formData.value[foundIndex] = setFormData({
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
    } else {
      const index = formData.value.findIndex(
        (data) => data?.id === state.record.id
      )
      if (index !== -1) {
        formData.value[index] = setFormData({
          ...state.record,
          skill: skill
        })
      }
    }
  })
  state.record = DEFAULT_SKILL
  state.openDialog = false
  state.isEditing = false
}

function add() {
  state.openDialog = true
  state.isEditing = false
  state.record = DEFAULT_SKILL
}

function remove(id: string) {
  const index = formData.value.findIndex((data) => data?.id === id)
  formData.value.splice(index, 1)
}

const submitForm = () => {
  console.log('Skill submitted:', formData.value)
}
</script>
