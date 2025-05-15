<template>
  <BuilderToolbar>
    <template #toolbar-items>
      <v-btn
        prepend-icon="mdi-plus"
        variant="outlined"
        @click="addNewItem"
        color="primary">
        {{ t('actions.add') }}
      </v-btn>
    </template>
  </BuilderToolbar>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
    hide-default-footer
    item-value="id">
    <template v-slot:item.options="{ item }">
      <div class="d-flex ga-2 justify-end">
        <v-btn size="small" variant="text" icon @click="edit(item.id)">
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          size="small"
          variant="text"
          icon
          color="error"
          @click="remove(item.id)">
          <v-icon color="error">mdi-delete</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import BuilderToolbar from '~/domains/builder/components/BuilderToolbar.vue'
import { builderService } from '~/domains/builder/services/builder.service'

const { getBuilders } = builderService()

const builders = ref()

onMounted(async () => {
  // Fetch the list of builders from the service
  builders.value = (await getBuilders()).data
})

const router = useRouter()
const { t } = useI18n()

const headers = [
  { title: t('builder.id'), key: 'id' },
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

const items = [
  {
    id: '1',
    name: 'John Doe',
    status: 'active',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-02'
  },
  {
    id: '2',
    name: 'Jane Smith',
    status: 'inactive',
    createdAt: '2023-01-03',
    updatedAt: '2023-01-04'
  }
]

function edit(builderId: string) {
  if (builderId) {
    router.push(`/builder/${builderId}`)
  }
}
function remove(builderId: string) {
  console.log('Remove item with id:', builderId)
}

function addNewItem() {
  // router.push('/builder/new')
}
</script>

<style></style>
