<template>
  <BuilderToolbar>
    <template #toolbar-items>
      <v-btn
        prepend-icon="mdi-plus"
        variant="outlined"
        @click="add"
        color="primary">
        {{ t('actions.add') }}
      </v-btn>
    </template>
  </BuilderToolbar>
  <v-data-table
    :headers="headers"
    :items="builders"
    :items-per-page="5"
    class="elevation-1"
    hide-default-footer
    item-value="id">
    <template v-slot:item.createdAt="{ item }">
      {{ item?.createdAt && formatDate(item?.createdAt, 'YYYY-MM-DD hh:mm') }}
    </template>
    <template v-slot:item.updatedAt="{ item }">
      {{ item?.updatedAt && formatDate(item?.updatedAt, 'YYYY-MM-DD hh:mm') }}
    </template>

    <template v-slot:item.options="{ item }">
      <div class="d-flex ga-2 justify-end">
        <v-btn
          size="small"
          variant="text"
          icon
          @click="edit(item?._id as string)">
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          size="small"
          variant="text"
          icon
          color="error"
          @click="remove(item?._id as string)">
          <v-icon color="error">mdi-delete</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>

  <v-dialog
    v-model="state.openDialog"
    max-width="650px"
    transition="dialog-transition">
    <BuilderForm
      :title="`Add an ${$t('builder.title')}`"
      @submit="submitForm"
      @close="close"
      @cancel="close"></BuilderForm>
  </v-dialog>
</template>

<script lang="ts" setup>
import BuilderToolbar from '~/modules/builder/components/BuilderToolbar.vue'
import BuilderForm from '../components/BuilderForm.vue'
import { useFormatDate } from '~/composables/useFormatDate'
import { useBuilder } from '../composables/useBuilder'

const { createBuilder, loadBuilders, deleteBuilder, builders } = useBuilder()
const { formatDate } = useFormatDate()

const state = ref({
  openDialog: false
})

onMounted(async () => {
  console.log('Mounted Builder.vue')
  await loadBuilders()
})

const router = useRouter()
const { t } = useI18n()

const headers = [
  { title: t('builder.id'), key: '_id' },
  { title: t('builder.name'), key: 'name' },
  { title: t('builder.status'), key: 'status' },
  { title: t('baseEntity.createdAt'), key: 'createdAt' },
  { title: t('baseEntity.updatedAt'), key: 'updatedAt' },
  {
    title: t('actions.options'),
    key: 'options',
    sortable: false,
    align: 'end'
  } as const
]

function edit(builderId: string) {
  if (builderId) {
    router.push(`/builder/${builderId}`)
  }
}

async function remove(builderId: string) {
  if (builderId) {
    await deleteBuilder(builderId)
  }
}

function close() {
  state.value.openDialog = false
}

function add() {
  state.value.openDialog = true
}

async function submitForm(builder: any) {
  close()
  try {
    const createdBuilder = await createBuilder(builder)
    if (createdBuilder?._id) {
      router.push(`/builder/${createdBuilder._id}`)
    }
  } catch (error) {
    console.error('Error creating builder:', error)
  }
}
</script>

<style></style>
