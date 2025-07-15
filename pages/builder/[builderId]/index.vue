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
          :loading="button.value === 'actions.exportPdf' && isGenerating"
          :disabled="button.value === 'actions.exportPdf' && isGenerating"
          v-bind="button.props">
          <v-icon>{{ button.icon }}</v-icon>
        </v-btn>
      </div>
    </template>
  </BuilderToolbar>

  <v-tabs v-model="currentTab" bg-color="primary">
    <v-tab value="edit">{{ $t('actions.edit') }}</v-tab>
    <v-tab value="preview">
      {{ $t('actions.preview') }}
      <v-progress-circular
        v-if="isGenerating && currentTab === 'preview'"
        indeterminate
        size="16"
        width="2"
        class="ml-2" />
    </v-tab>
  </v-tabs>

  <v-alert
    v-if="hasError"
    type="error"
    variant="tonal"
    closable
    class="ma-4"
    @click:close="clearError">
    <template #title>Generating PDF Error</template>
    {{ error }}
  </v-alert>

  <div class="pt-4 ga-4 justify-center align-center">
    <v-lazy
      v-if="currentTab === 'edit'"
      :options="{ threshold: 0.5 }"
      transition="fade-transition">
      <BuilderDetails />
    </v-lazy>
    <v-lazy
      v-else-if="currentTab === 'preview'"
      :options="{ threshold: 0.5 }"
      transition="fade-transition">
      <BuilderPreview />
    </v-lazy>
  </div>

  <!-- <v-sheet
    :class="
      $vuetify.display.xs || $vuetify.display.sm
        ? 'd-block'
        : 'd-flex pa-4 ga-4 justify-center align-center'
    ">
    <v-window v-model="currentTab" class="rounded-lg">
      <v-window-item value="edit">
        <v-lazy
          :options="{ threshold: 0.5 }"
          transition="fade-transition"
          class="ma-4">
          <BuilderDetails />
        </v-lazy>
      </v-window-item>
      <v-window-item value="preview">
        <v-lazy
          :options="{ threshold: 0.5 }"
          transition="fade-transition"
          class="ma-4">
          <BuilderPreview />
        </v-lazy>
      </v-window-item>
    </v-window>
  </v-sheet> -->

  <v-dialog
    v-model="openDialog"
    max-width="650px"
    transition="dialog-transition">
    <BuilderForm
      @submit="handleSubmit"
      :title="$t('profile.title')"
      @close="closeSettings"></BuilderForm>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useBuilder } from '~/modules/builder/composables/useBuilder'
import { useBuilderToolbar } from '~/modules/builder/composables/useBuilderToolbar'
import {
  useBuilderPdfGenerator,
  usePdfState
} from '~/composables/useBuilderPdfGenerator'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const BuilderDetails = defineAsyncComponent(
  () => import('~/modules/builder/views/BuilderDetails.vue')
)
const BuilderPreview = defineAsyncComponent(
  () => import('~/modules/builder/views/BuilderPreview.vue')
)
const BuilderToolbar = defineAsyncComponent(
  () => import('~/modules/builder/components/BuilderToolbar.vue')
)
const BuilderForm = defineAsyncComponent(
  () => import('~/modules/builder/components/BuilderForm.vue')
)

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { updateBuilder, builderState } = useBuilder()

// PDF Composable
const { downloadTemplatePDF, clearError } = useBuilderPdfGenerator()
const { isGenerating, error, hasError } = usePdfState()

// Toolbar management
const { registerActionHandler, getToolbarActions, currentTab } =
  useBuilderToolbar()

// State
const openDialog = ref(false)
const builderId = computed(() => route.params.builderId as string)

// Computed properties
const currentTabTitle = computed(() => {
  return currentTab.value === 'edit' ? t('actions.edit') : t('actions.preview')
})

const visibleToolbarActions = computed(() => {
  const visibleByTab: Record<string, (action: any) => boolean> = {
    edit: (action) => action.value !== 'actions.exportPdf',
    preview: () => true
  }
  return getToolbarActions().filter((action) =>
    visibleByTab[currentTab.value]?.(action)
  )
})

watch(
  () => route.query.tab,
  (tab) => {
    if (tab === 'edit' || tab === 'preview') {
      if (tab !== currentTab.value) {
        currentTab.value = tab
      }
    }
  },
  { immediate: true }
)
watch(currentTab, (tab) => {
  if (route.query.tab !== tab) {
    router.replace({ query: { ...route.query, tab } })
  }
})

// Methods
function closeSettings() {
  openDialog.value = false
}

async function handleSubmit(builder: IBuilder) {
  openDialog.value = false
  try {
    await updateBuilder(builderId.value, { ...builderState.value, ...builder })
    console.log('Saved successfully')
  } catch (error) {
    console.error('Error saving:', error)
  }
}

// Register toolbar action handlers
onMounted(() => {
  // Save action
  registerActionHandler('save', async () => {
    try {
      await updateBuilder(builderId.value, builderState.value)
      console.log('Saved successfully')
    } catch (error) {
      console.error('Error saving:', error)
    }
  })

  // Export PDF action
  registerActionHandler('downloadPdf', async () => {
    if (currentTab.value === 'preview') {
      const success = await downloadTemplatePDF()
      if (success) {
        console.log('PDF descargado exitosamente desde toolbar')
      }
    }
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
