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
          v-for="button in builderButtonsToolbar"
          :key="button.value"
          size="small"
          color="grey-darken-2"
          variant="text"
          v-tooltip:start="$t(button.value)"
          @click="button.action"
          icon
          v-bind="button.props">
          <v-icon>{{ button.icon }}</v-icon>
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
import BuilderToolbar from '~/modules/builder/components/BuilderToolbar.vue'
import BuilderForm from '../components/BuilderForm.vue'
import { useBuilderStore } from '../store/builder.store'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'
import { useBuilderWrapper } from '../composables/useBuilderWrapper'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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

const builderButtonsToolbar = [
  {
    icon: 'mdi-pencil',
    value: 'actions.preview',
    tooltip: 'Preview',
    action: () => {
      const builderId = route.params.builderId
      if (!builderId) {
        console.error('Builder ID is not defined')
        return
      }
      navigateTo(`/builder/${builderId}`)
    },
    props: {}
  },
  {
    icon: 'mdi-content-save',
    tooltip: 'Save',
    value: 'actions.save',
    action: () => {
      const builderId = route.params.builderId
      usebuilder
        .updateBuilder(builderId as string, builderState.value)
        .then(() => {
          console.log('Saved successfully')
        })
    },
    props: {}
  },
  {
    icon: 'mdi-file-pdf-box',
    value: 'actions.downloadPdf',
    tooltip: 'Download PDF',
    action: () => {
      downloadTemplatePDF()
    },
    props: {}
  },
  {
    icon: 'mdi-publish',
    value: 'actions.publish',
    tooltip: 'Publish',
    action: () => {},
    props: {}
  },
  {
    icon: 'mdi-cog',
    value: 'actions.settings',
    tooltip: 'Settings',
    action: () => {
      openDialog.value = true
    },
    props: {}
  }
]

// Función para descargar PDF directamente
async function downloadTemplatePDF() {
  try {
    const pdf = await generatePDF()
    if (pdf) {
      const fileName = `cv_${templates.value[selectedTemplate.value].title.toLocaleLowerCase()}_${new Date().getTime()}.pdf`
      pdf.save(fileName)
    }
  } catch (error) {
    console.error('Error al generar PDF:', error)
  }
}

async function generatePDF() {
  const templateElement = document.getElementById('cv-template-container')

  if (!templateElement) {
    console.error('No se encontró el elemento del template')
    return null
  }

  try {
    const canvas = await html2canvas(templateElement, {
      useCORS: true,
      allowTaint: true,
      scale: 2, 
      backgroundColor: '#ffffff',
      removeContainer: true,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('cv-template-container')
        if (clonedElement) {
          clonedElement.style.transform = 'none'
          clonedElement.style.width = '210mm' // Ancho A4
          clonedElement.style.maxWidth = '210mm'
          clonedElement.style.fontSize = '12px'
          clonedElement.style.padding = '10mm'
        }
      }
    })

    // Crear PDF con dimensiones A4
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    })

    // Calcular dimensiones para ajustar a A4
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    // Calcular escala para ajustar al ancho de la página
    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight)
    const imgWidth = canvasWidth * ratio
    const imgHeight = canvasHeight * ratio

    // Centrar la imagen en la página
    const marginX = (pdfWidth - imgWidth) / 2
    const marginY = 10 // Margen superior

    // Añadir imagen al PDF
    const imgData = canvas.toDataURL('image/png', 1.0)
    pdf.addImage(
      imgData,
      'PNG',
      marginX,
      marginY,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    )

    return pdf
  } catch (error) {
    console.error('Error generando PDF:', error)
    return null
  }
}

onUnmounted(() => {
  if (hasChanges(builderState.value, builderStateTemp.value)) {
    usebuilder.updateBuilder(builderId.value as string, builderState.value)
  }
})
</script>
