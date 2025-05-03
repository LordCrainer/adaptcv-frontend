<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
    hide-default-footer
    item-value="id">
    <template v-slot:item.options="{ item }">
      <div class="d-flex ga-2 justify-end">
        <v-icon
          color="primary"
          icon="mdi-pencil"
          size="small"
          @click="() => edit(item.id)" />

        <v-icon
          color="error"
          icon="mdi-delete"
          size="small"
          @click="() => remove(item.id)" />
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
definePageMeta({
  // layout: 'profile-builder',
  name: 'builder'
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
  router.push({ path: `/builder/${builderId}` })
}
function remove(builderId: string) {
  console.log('Remove item with id:', builderId)
}
</script>

<style></style>
