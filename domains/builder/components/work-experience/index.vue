<template>
  <CardDefault title="profile.experience.title"> 
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-end pb-2">
          <v-btn
            color="secondary"
            variant="outlined"
            prepend-icon="mdi-plus"
            aria-label="Add Work Experience"
            @click="openForm()">
            {{ $t('actions.add') }}
          </v-btn>
        </div>
        <v-data-table
          :headers="headers"
          :items="workExperiences"
          :hide-default-footer="workExperiences.length < 11">
          <template v-slot:item.actions="{ item, index }">
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

    <v-dialog
      v-model="state.openDialog"
      max-width="650px"
      transition="dialog-transition">
      <WorkExperienceForm
        :title="`${state.isEditing ? 'Edit' : 'Add'} an Experience`"
        v-model="state.selected"
        @submit="submitForm"
        @cancel="closeForm"
        v-if="state.openDialog"></WorkExperienceForm>
    </v-dialog>
  </CardDefault>
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

const state = reactive({
  openDialog: false,
  isEditing: false,
  selected: {} as IWorkExperience | null
})

const openForm = (experience: IWorkExperience | null = null) => {
  state.selected = experience
  state.isEditing = !!experience
  state.openDialog = true
}

const edit = (id: string) => {
  const foundWorkExperience = findWorkExperience(id)

  if (!foundWorkExperience) {
    return
  }
  openForm(foundWorkExperience)
}

const closeForm = () => {
  state.openDialog = false
  state.isEditing = false
  state.selected = null
}

const remove = (id: string) => {
  removeWorkExperience(id)
}

const submitForm = async (data: IWorkExperience) => {
  if (state.isEditing && data.id) {
    await updateWorkExperience(data.id, data)
  } else {
    await addWorkExperience(data)
  }
  closeForm()
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
