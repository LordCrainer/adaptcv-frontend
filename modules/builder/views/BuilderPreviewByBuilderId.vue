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
        item-value="value"></v-select>
    </v-card-item>
  </v-card>
  <div id="cv-template-container" class="mt-4" style="min-width: 800px">
    <component :is="templates[selectedTemplate].component"></component>
  </div>

  <v-dialog
    v-model="openDialog"
    max-width="650px"
    transition="dialog-transition">
    <BuilderForm :title="$t('profile.title')" @close="close"></BuilderForm>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import HarvardTemplate from '~/components/templates/HarvardTemplate.vue'
import OwnTemplate from '~/components/templates/OwnTemplate.vue'
import BuilderForm from '../components/BuilderForm.vue'
import { useBuilderStore } from '../store/builder.store'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'
import { useBuilderWrapper } from '../composables/useBuilderWrapper'

const { generatePDF } = useGeneratePDF()
const builderStore = useBuilderStore()
const { hasChanges } = useObject()
const { builderState } = storeToRefs(builderStore)
const usebuilder = useBuilderWrapper()

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

const openDialog = ref(false)

function close() {
  openDialog.value = false
}

// Exponer función para generar PDF (será llamada desde el componente padre)
const downloadTemplatePDF = async () => {
  try {
    const pdf = await generatePDF('cv-template-container')
    if (pdf) {
      const fileName = `cv_${templates.value[selectedTemplate.value].title.toLowerCase()}_${new Date().getTime()}.pdf`
      pdf.save(fileName)
    }
  } catch (error) {
    console.error('Error al generar PDF:', error)
  }
}

// Exponer métodos para el componente padre
defineExpose({
  downloadTemplatePDF
})

onUnmounted(() => {
  if (hasChanges(builderState.value, builderStateTemp.value)) {
    usebuilder.updateBuilder(builderId.value as string, builderState.value)
  }
})
</script>
