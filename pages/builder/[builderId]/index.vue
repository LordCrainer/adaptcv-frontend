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
      {{ $t('routes.builder') }} / {{ currentTabTitle }}
    </template>
    <template #toolbar-items>
      <div class="d-flex ga-2 pa-2 align-center">
        <v-btn
          v-for="button in visibleToolbarActions"
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

  <v-tabs v-model="tab" bg-color="primary" @update:model-value="onTabChange">
    <v-tab value="edit">{{ $t('actions.edit') }}</v-tab>
    <v-tab value="preview">{{ $t('actions.preview') }}</v-tab>
  </v-tabs>

  <v-card-text>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="edit">
        <BuilderByBuilderId ref="editComponent" />
      </v-tabs-window-item>

      <v-tabs-window-item value="preview">
        <BuilderPreviewByBuilderId ref="previewComponent" />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card-text>

  <v-dialog
    v-model="openDialog"
    max-width="650px"
    transition="dialog-transition">
    <BuilderForm
      :title="$t('profile.title')"
      @close="closeSettings"></BuilderForm>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useBuilderStore } from '~/modules/builder/store/builder.store'
import { useBuilderWrapper } from '~/modules/builder/composables/useBuilderWrapper'
import { useBuilderToolbar } from '~/modules/builder/composables/useBuilderToolbar'

const BuilderByBuilderId = defineAsyncComponent(
  () => import('~/modules/builder/views/BuilderByBuilderId.vue')
)
const BuilderPreviewByBuilderId = defineAsyncComponent(
  () => import('~/modules/builder/views/BuilderPreviewByBuilderId.vue')
)
const BuilderToolbar = defineAsyncComponent(
  () => import('~/modules/builder/components/BuilderToolbar.vue')
)
const BuilderForm = defineAsyncComponent(
  () => import('~/modules/builder/components/BuilderForm.vue')
)

const route = useRoute()
const { t } = useI18n()
const { generatePDF, downloadPDF } = useGeneratePDF()
const builderStore = useBuilderStore()
const { builderState } = storeToRefs(builderStore)
const useBuilder = useBuilderWrapper()

// Toolbar management
const { currentTab, setBuilderTab, registerActionHandler, getToolbarActions } =
  useBuilderToolbar()

// Component refs
const editComponent = ref()
const previewComponent = ref()

// State
const tab = ref('edit')
const openDialog = ref(false)
const builderId = computed(() => route.params.builderId as string)

// Computed properties
const currentTabTitle = computed(() => {
  return tab.value === 'edit' ? t('actions.edit') : t('actions.preview')
})

const visibleToolbarActions = computed(() => {
  return getToolbarActions(builderId.value).filter((action) => {
    if (action.value === 'actions.exportPdf') return tab.value === 'preview'
    return true
  })
})

function onTabChange(newTab: unknown) {
  setBuilderTab(newTab as string)
}

function closeSettings() {
  openDialog.value = false
}

async function downloadTemplatePDF() {
  // Si estamos en el tab de preview, usar la función del componente hijo
  if (tab.value === 'preview' && previewComponent.value?.downloadTemplatePDF) {
    await previewComponent.value.downloadTemplatePDF()
    return
  }

  // Fallback para generar PDF general
  const pdf = await generatePDF('cv-template-container')
  if (!pdf) {
    console.error('No se pudo generar el PDF')
    return
  }
  try {
    const filename = `cv_${new Date().getTime()}`
    await downloadPDF(pdf, filename)
    console.log('PDF downloaded successfully')
  } catch (error) {
    console.error('Error downloading PDF:', error)
  }
}

// Register toolbar action handlers
onMounted(() => {
  // Navigation actions

  // Save action
  registerActionHandler('save', async () => {
    try {
      await useBuilder.updateBuilder(builderId.value, builderState.value)
      console.log('Saved successfully')
    } catch (error) {
      console.error('Error saving:', error)
    }
  })

  // Download PDF action
  registerActionHandler('downloadPdf', async () => {
    await downloadTemplatePDF()
  })

  // Publish action
  registerActionHandler('publish', () => {
    console.log('Publish functionality not implemented yet')
  })

  // Settings action
  registerActionHandler('settings', () => {
    openDialog.value = true
  })
})

definePageMeta({
  name: 'builder-builderId',
  ssr: false
})
</script>
