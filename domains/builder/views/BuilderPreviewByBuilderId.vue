<template>
  <BuilderToolbar>
    <template #toolbar-left>
      <v-btn
        variant="text"
        class="text-primary"
        @click="$router.push('/builder')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </template>
    <template #toolbar-title>
      {{ $t('routes.builder') }} / {{ $t('routes.preview') }}
    </template>
    <template #toolbar-items>
      <div class="d-flex ga-2 pa-2 align-center">
        <v-btn
          size="small"
          v-tooltip:start="$t('actions.edit')"
          color="warning"
          @click="toggleView"
          variant="tonal">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          size="small"
          v-tooltip:start="$t('actions.save')"
          class="text-success"
          @click="$router.push({ name: 'home' })"
          variant="tonal">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn
          size="small"
          v-tooltip:start="$t('actions.publish')"
          variant="tonal"
          @click="$router.push({ name: 'home' })"
          class="text-primary">
          <v-icon>mdi-publish</v-icon>
        </v-btn>
      </div>
    </template>
  </BuilderToolbar>
  <v-card max-width="800" width="100%" class="mx-auto pa-4 text-caption">
    <v-card-title>
      <div class="text-h5 font-weight-bold text-center pb-0">
        {{ $t('routes.preview') }}
      </div>
    </v-card-title>
    <v-card-item>
      <v-select
        :items="selectItems"
        v-model="selectedTemplate"
        item-title="title"
        item-value="value"></v-select>
    </v-card-item>
  </v-card>
  <div class="mt-4" style="min-width: 800px">
    <component :is="templates[selectedTemplate].component"></component>
  </div>
</template>

<script lang="ts" setup>
import HarvardTemplate from '~/components/templates/HarvardTemplate.vue'
import OwnTemplate from '~/components/templates/OwnTemplate.vue'
import BuilderToolbar from '~/domains/builder/components/BuilderToolbar.vue'
import type { Component } from 'vue'

interface IItem {
  label: string
  title: string
  component: Component
  props: any
}

type TemplateOptions = 'harvard' | 'own'

const templates = ref<Record<TemplateOptions, IItem>>({
  harvard: {
    label: 'harvard',
    title: 'Harvard',
    component: markRaw(HarvardTemplate),
    props: {
      title: 'Harvard'
    }
  },
  own: {
    label: 'own',
    title: 'Own',
    component: markRaw(OwnTemplate),
    props: {
      title: 'Own'
    }
  }
})

const selectedTemplate = ref<TemplateOptions>('own')
const selectItems = Object.entries(templates.value).map(
  ([value, attributes]) => ({
    value: value as TemplateOptions,
    title: attributes.title
  })
)

const route = useRoute()

function toggleView() {
  const builderId = route.params.builderId
  if (!builderId) {
    console.error('Builder ID is not defined')
    return
  }
  navigateTo(`/builder/${builderId}`)
}
</script>
