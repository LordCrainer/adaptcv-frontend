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
        :items="workExperiences"
        :hide-default-footer="workExperiences.length < 11">
        <template v-slot:item.actions="{ item, index }">
          <div class="d-flex flex-grow-1 ga-2 justify-end">
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
    </v-card>
  </CardDefault>

  <v-dialog
    v-model="state.openDialog"
    max-width="650px"
    transition="dialog-transition">
    <WorkExperienceForm
      :title="`${state.isEditing ? 'Edit' : 'Add'} an Experience`"
      v-model="state.record"
      @submit="submitForm"
      @close="close"
      @cancel="close"
      v-if="state.openDialog"></WorkExperienceForm>
  </v-dialog>
</template>

<script setup lang="ts">
import type { IWorkExperience } from '~/domains/builder/shared'
import useWorkExperience from '~/domains/builder/components/work-experience/useWorkExperience'
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

const headers = [
  { title: t('profile.experience.jobTitle'), key: 'jobTitle' },
  { title: t('profile.experience.company'), key: 'company' },
  { title: t('common.startDate'), key: 'startDate' },
  { title: t('common.endDate'), key: 'endDate' },
  { title: t('actions.options'), key: 'actions', sortable: false }
]

const state = ref({
  openDialog: false,
  isEditing: false,
  record: {} as IWorkExperience
})

function editionMode(isEditing: boolean) {
  state.value.isEditing = isEditing
  state.value.openDialog = isEditing
}

const add = () => {
  editionMode(true)
}

const edit = (id: string) => {
  const foundWorkExperience = findWorkExperience(id)

  if (!foundWorkExperience) {
    return
  }
  state.value.record = foundWorkExperience
  editionMode(true)
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
