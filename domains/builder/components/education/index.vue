<template>
  <CardDefault
    title="profile.education.title"
    min-height="400px"
    class="d-flex flex-column">
    <template #right-items>
      <v-btn
        color="secondary"
        variant="outlined"
        prepend-icon="mdi-plus"
        aria-label="Add Work Experience"
        @click="add">
        {{ $t('actions.add') }}
      </v-btn>
    </template>
    <v-card flat border class="rounded-md fill-height">
      <v-data-table
        :headers="headers"
        :items="educations"
        :hide-default-footer="education.length < 11">
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-end">
            <v-btn flat size="x-small" @click="edit(item.id)" icon>
              <v-icon color="warning" icon="mdi-pencil" />
            </v-btn>
            <v-btn flat size="x-small" @click="remove(item.id)" icon>
              <v-icon color="error" icon="mdi-delete" />
            </v-btn>
          </div>
        </template>

        <template v-slot:no-data>
          {{ $t('common.noData') }}
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="state.openDialog" max-width="500px">
      <EducationForm
        :title="`${state.isEditing ? 'Edit' : 'Add'} an Education`"
        :inputData="state.record"
        @submit="submitForm"
        @cancel="reset"
        @close="close"
        v-if="state.openDialog"></EducationForm>
    </v-dialog>
  </CardDefault>
</template>

<script setup lang="ts">
import EducationForm from './EducationForm.vue'
import useEducation from '~/domains/builder/components/education/useEducation'
import CardDefault from '~/components/card/CardDefault.vue'
import type { IEducationItem } from '@lordcrainer/adaptcv-shared-types'

const { t } = useI18n()
const { standardFormatDate } = useFormatDate()
const {
  addEducation,
  findEducation,
  updateEducation,
  removeEducation,
  education
} = useEducation()

const headers = [
  { title: t('profile.education.degree'), key: 'degree' },
  { title: t('profile.education.institution'), key: 'institution' },
  { title: t('profile.education.fieldOfStudy'), key: 'fieldOfStudy' },
  { title: t('common.startDate'), key: 'startDate' },
  { title: t('common.endDate'), key: 'endDate' },
  { title: t('actions.options'), key: 'actions', sortable: false, align: 'end' }
] as const

const state = reactive({
  openDialog: false,
  isEditing: false,
  record: {} as IEducationItem
})

const educations = computed(() => {
  return education.value.map((exp) => ({
    ...exp,
    startDate: standardFormatDate(exp.startDate),
    endDate: standardFormatDate(exp.endDate)
  }))
})

const add = () => {
  editionMode(true)
}

function editionMode(isEditing: boolean) {
  state.isEditing = isEditing
  state.openDialog = isEditing
}

const edit = (id: string) => {
  const foundEducation = findEducation(id)

  if (!foundEducation) {
    return
  }

  editionMode(true)
  state.record = { ...foundEducation }
}

const close = () => {
  state.openDialog = false
}

const reset = () => {
  editionMode(false)
  state.record = {} as IEducationItem
}

const remove = (id: string) => {
  removeEducation(id)
}

const submitForm = (education: IEducationItem) => {
  if (state.isEditing && education.id) {
    updateEducation(education.id, education)
  } else {
    addEducation(education)
  }

  reset()
}
</script>
