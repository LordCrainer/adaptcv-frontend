import { ref, computed, readonly, watch } from 'vue'
import { useGeneratePDF } from './useGeneratePDF'

export interface TemplateConfig {
  selectedTemplate: string
  templates: Record<
    string,
    {
      label: string
      title: string
      component: any
      props?: any
    }
  >
}

export interface PdfGenerationState {
  isGenerating: boolean
  lastGeneratedAt: Date | null
  lastFileName: string | null
  error: string | null
}

const globalPdfState = ref<PdfGenerationState>({
  isGenerating: false,
  lastGeneratedAt: null,
  lastFileName: null,
  error: null
})

const globalTemplateConfig = ref<TemplateConfig | null>(null)

export const useBuilderPdfGenerator = () => {
  const { generatePDF } = useGeneratePDF()

  const pdfState = globalPdfState
  const templateConfig = globalTemplateConfig

  // 🧮 Computed properties
  const canGeneratePdf = computed(() => {
    return templateConfig.value !== null && !pdfState.value.isGenerating
  })

  const currentTemplate = computed(() => {
    return templateConfig.value?.selectedTemplate || 'unknown'
  })

  const availableTemplates = computed(() => {
    return templateConfig.value
      ? Object.keys(templateConfig.value.templates)
      : []
  })

  const isGenerating = computed(() => pdfState.value.isGenerating)
  const lastGenerated = computed(() => pdfState.value.lastGeneratedAt)
  const lastFileName = computed(() => pdfState.value.lastFileName)
  const error = computed(() => pdfState.value.error)
  const hasError = computed(() => pdfState.value.error !== null)

  // 🔧 Métodos principales

  /**
   * Configura el template actual para la generación de PDF
   */
  function setTemplateConfig(config: TemplateConfig) {
    templateConfig.value = config
    if (process.env.NODE_ENV === 'development') {
      console.log(`📄 Template configurado: ${config.selectedTemplate}`)
    }
  }

  /**
   * Selected template
   */
  function setSelectedTemplate(templateName: string) {
    if (templateConfig.value) {
      templateConfig.value.selectedTemplate = templateName
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 Template cambiado a: ${templateName}`)
      }
    }
  }

  /**
   * Downloads the PDF for the current template
   */
  async function downloadTemplatePDF(
    customElementId?: string
  ): Promise<boolean> {
    if (!canGeneratePdf.value) {
      const errorMsg =
        'Cannot generate PDF: ' + templateConfig.value === null
          ? 'Missing template configuration'
          : 'Another PDF is already being generated'

      console.error(errorMsg)
      pdfState.value.error = errorMsg
      return false
    }

    const elementId = customElementId || 'cv-template-container'

    try {
      pdfState.value.isGenerating = true
      pdfState.value.error = null

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `🔄 Iniciando generación de PDF para template: ${currentTemplate.value}`
        )
      }

      const pdf = await generatePDF(elementId)

      if (!pdf) {
        throw new Error('Cannot generate PDF: generatePDF returned null')
      }

      const templateTitle =
        templateConfig.value!.templates[currentTemplate.value]?.title ||
        currentTemplate.value
      const timestamp = new Date().getTime()
      const fileName = `cv_${templateTitle.toLowerCase().replace(/\s+/g, '_')}_${timestamp}.pdf`

      pdf.save(fileName)

      pdfState.value.lastGeneratedAt = new Date()
      pdfState.value.lastFileName = fileName

      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Generate PDF success: ${fileName}`)
      }

      return true
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error generating PDF'
      pdfState.value.error = errorMessage
      console.error('❌ Error generating PDF:', errorMessage)
      return false
    } finally {
      pdfState.value.isGenerating = false
    }
  }

  /**
   * Download a custom PDF with a specific configuration
   */
  async function downloadCustomPDF(
    config: TemplateConfig,
    elementId: string = 'cv-template-container'
  ): Promise<boolean> {
    const originalConfig = templateConfig.value

    try {
      setTemplateConfig(config)
      return await downloadTemplatePDF(elementId)
    } finally {
      templateConfig.value = originalConfig
    }
  }

  /**
   * Clear Error
   */
  function clearError() {
    pdfState.value.error = null
  }

  /**
   * Reset all state
   */
  function resetState() {
    pdfState.value = {
      isGenerating: false,
      lastGeneratedAt: null,
      lastFileName: null,
      error: null
    }
    templateConfig.value = null
  }

  if (process.env.NODE_ENV === 'development') {
    watch(
      () => pdfState.value.isGenerating,
      (isGenerating) => {
        console.log(
          `🔄 PDF Generation: ${isGenerating ? 'STARTED' : 'FINISHED'}`
        )
      }
    )

    watch(
      () => templateConfig.value?.selectedTemplate,
      (newTemplate, oldTemplate) => {
        if (newTemplate && newTemplate !== oldTemplate) {
          console.log(`📄 Template: ${oldTemplate || 'none'} → ${newTemplate}`)
        }
      }
    )
  }

  // 📤 API pública del composable
  return {
    // State
    pdfState: readonly(pdfState),
    templateConfig: readonly(templateConfig),

    // Computed properties
    canGeneratePdf,
    currentTemplate,
    availableTemplates,
    isGenerating,
    lastGenerated,
    lastFileName,
    error,
    hasError,

    // Methods
    setTemplateConfig,
    setSelectedTemplate,
    downloadTemplatePDF,
    downloadCustomPDF,
    clearError,
    resetState
  }
}

export const usePdfState = () => {
  const {
    isGenerating,
    lastGenerated,
    lastFileName,
    error,
    hasError,
    pdfState
  } = useBuilderPdfGenerator()

  return {
    isGenerating,
    lastGenerated,
    lastFileName,
    error,
    hasError,
    pdfState
  }
}
