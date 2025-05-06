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
        @click="add()">
        {{ $t('actions.add') }}
      </v-btn>
    </template>
    <v-card flat border class="rounded-md fill-height">
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
import type { IEducationItem } from '~/domains/builder/shared/index'
import useEducation from '~/domains/builder/components/education/useEducation'
import CardDefault from '~/components/card/CardDefault.vue'

const { t } = useI18n()

const {
  addEducation,
  findEducation,
  updateEducation,
  removeEducation,
  education
} = useEducation()

const headers = ref([
  { title: t('profile.education.degree'), key: 'degree' },
  { title: t('profile.education.institution'), key: 'institution' },
  { title: t('profile.education.fieldOfStudy'), key: 'fieldOfStudy' },
  { title: t('common.startDate'), key: 'startDate' },
  { title: t('common.endDate'), key: 'endDate' },
  { title: t('actions.options'), key: 'actions', sortable: false }
])

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
