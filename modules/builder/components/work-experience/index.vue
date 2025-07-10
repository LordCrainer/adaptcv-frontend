<template>
  <CardDefault
    title="profile.experience.title"
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
        :items="experiences"
        :hide-default-footer="workExperiences.length < 11">
        <template v-slot:item.description="{ item }">
          <v-chip v-if="item.description" color="primary" variant="outlined">
            {{ cleanHtml(item.description).length }} characters
          </v-chip>
          <v-chip v-else color="grey" variant="outlined">0 characters</v-chip>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <div class="d-flex flex-grow-1 justify-end">
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
  </CardDefault>

  <v-dialog
    v-model="state.openDialog"
    max-width="650px"
    transition="dialog-transition">
    <CardDefault :title="state.isEditing ? 'profile.experience.edit' : 'profile.experience.add'">
      <template #right-items>
        <v-btn
          color="primary"
          variant="text"
          size="small"
          icon="mdi-close"
          aria-label="Close Work Experience Form"
          @click="close"></v-btn>
      </template>
      <WorkExperienceForm
        v-model="state.record"
        @submit="submitForm"
        @close="close"
        @cancel="close"></WorkExperienceForm>
    </CardDefault>
  </v-dialog>
</template>

<script setup lang="ts">
import type { IWorkExperience } from '@lordcrainer/adaptcv-shared-types'
import useWorkExperience from '~/modules/builder/components/work-experience/useWorkExperience'
import WorkExperienceForm from './WorkExperienceForm.vue'
import CardDefault from '~/components/card/CardDefault.vue'

const { t } = useI18n()

const {
  removeWorkExperience,
  findWorkExperience,
  workExperiences,
  updateWorkExperience,
  addWorkExperience
} = useWorkExperience()

const { standardFormatDate } = useFormatDate()

const experiences = computed(() => {
  return workExperiences.value.map((exp) => ({
    ...exp,
    startDate: standardFormatDate(exp.startDate),
    endDate: standardFormatDate(exp.endDate)
  }))
})

const headers = [
  { title: t('profile.experience.jobTitle'), key: 'jobTitle' },
  { title: t('profile.experience.company'), key: 'company' },
  { title: t('common.startDate'), key: 'startDate' },
  { title: t('common.endDate'), key: 'endDate' },
  {
    title: t('profile.experience.description'),
    key: 'description',
    align: 'center'
  },
  { title: t('actions.options'), key: 'actions', sortable: false, align: 'end' }
] as const

const state = ref({
  openDialog: false,
  isEditing: false,
  record: {} as IWorkExperience
})

function editionMode(isEditing: boolean) {
  state.value.isEditing = isEditing
  state.value.openDialog = isEditing
}

function cleanHtml(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  if (['undefined', 'null'].includes(doc.body?.textContent || '')) {
    return ''
  }
  return doc.body.textContent || ''
}

const add = () => {
  editionMode(true)
}

const edit = (id: string) => {
  const foundWorkExperience = findWorkExperience(id)

  if (!foundWorkExperience) {
    return
  }
  editionMode(true)
  state.value.record = foundWorkExperience
}

const close = () => {
  editionMode(false)
  state.value.record = {} as IWorkExperience
}

const remove = (id: string) => {
  removeWorkExperience(id)
}

const submitForm = async (data: IWorkExperience) => {
  if (state.value.isEditing && data.id) {
    await updateWorkExperience(data.id, data)
  } else {
    await addWorkExperience(data)
  }
  close()
}
</script>

<style>
.dragon-editor .de-text-block {
  outline: 0;
  min-height: 1.3em;
}

.dragon-editor .de-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 15px;
  line-height: 1.6;
  height: 200px;
}
</style>
