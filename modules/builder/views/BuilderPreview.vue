<template>
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
        item-value="value"
        :disabled="isGenerating"></v-select>

      <!-- Generating PDF Alert -->
      <v-alert v-if="isGenerating" type="info" variant="tonal" class="mt-3">
        <v-progress-linear indeterminate class="mb-2"></v-progress-linear>
        {{ $t('generatePDF.generatingPdfForTemplate') }}: {{ currentTemplate }}
      </v-alert>
    </v-card-item>
  </v-card>
  <div id="cv-template-container" class="mt-4" style="min-width: 800px">
    <component :is="templates[selectedTemplate].component"></component>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import HarvardTemplate from '~/components/templates/HarvardTemplate.vue'
import OwnTemplate from '~/components/templates/OwnTemplate.vue'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'
import { useBuilder } from '../composables/useBuilder'
import { useBuilderPdfGenerator } from '~/composables/useBuilderPdfGenerator'

const { hasChanges } = useObject()
const { updateBuilder, builderState } = useBuilder()

// PDF Generation Composable
const {
  setTemplateConfig,
  setSelectedTemplate,
  downloadTemplatePDF,
  canGeneratePdf,
  currentTemplate,
  isGenerating
} = useBuilderPdfGenerator()

const route = useRoute()

interface IItem {
  label: string
  title: string
  component: Component
  props: any
}

const builderId = ref(route.params.builderId)
const builderStateTemp = ref<IBuilder>()

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

// Sync builder state with temporary state
watchEffect(() => {
  setTemplateConfig({
    selectedTemplate: selectedTemplate.value,
    templates: templates.value
  })
})

watch(selectedTemplate, (newTemplate) => {
  setSelectedTemplate(newTemplate)
})

// Handle builder state changes
defineExpose({
  downloadTemplatePDF,
  canDownload: canGeneratePdf,
  currentTemplate,
  isGenerating
})

onUnmounted(() => {
  if (hasChanges(builderState.value, builderStateTemp.value)) {
    updateBuilder(builderId.value as string, builderState.value)
  }
})
</script>
